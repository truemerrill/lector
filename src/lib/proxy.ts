import DOMPurify from 'dompurify';
import { Readability } from '@mozilla/readability';


function clean(url: URL, htmlString: string): string {
    DOMPurify.removeAllHooks();
    DOMPurify.addHook(
        'uponSanitizeElement',
        (node, data) => {
            if (node instanceof HTMLAnchorElement && node.hasAttribute('href')) {
                try {
                    const resolved = new URL(node.getAttribute('href')!, url);
                    if (['http:', 'https:'].includes(resolved.protocol)) {
                        node.setAttribute('data-reader-link', 'true');
                        node.setAttribute('target', '_self');
                        node.setAttribute('rel', 'noopener noreferrer');
                    } else {
                        // unsafe protocol
                        node.removeAttribute('href');
                    }
                } catch {
                    // invalid URL
                    node.removeAttribute('href');
                }
            }

            if (node instanceof HTMLImageElement && node.hasAttribute('src')) {
                try {
                    const resolved = new URL(node.getAttribute('src')!, url);
                    node.setAttribute('src', resolved.toString());
                } catch {
                    node.removeAttribute('src');
                }
            }
        }
    );

    return DOMPurify.sanitize(htmlString, {
        ALLOWED_TAGS: ['a', 'p', 'h1', 'h2', 'h3', 'ul', 'li', 'blockquote', 'pre', 'code', 'img'],
        ALLOWED_ATTR: ['href', 'target', 'rel', 'name', 'src', 'alt', 'title', 'width', 'height', 'loading']
    });
}


function readable(url: URL, htmlString: string): string {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, 'text/html');

    // Ensure base URL is set for resolving relative links
    const base = doc.createElement('base');
    base.setAttribute('href', url.toString());
    doc.head.prepend(base);

    // Check for parsing errors
    const errorNode = doc.querySelector('parserror');
    if (errorNode) {
        const msg = `Parsing error: ${errorNode.innerHTML}`;
        throw new Error(msg);
    }

    const reader = new Readability(doc);
    const parsedHtml = reader.parse();
    if (!parsedHtml) {
        throw new Error(`Readability failed to parse content from: ${url.toString()}`);
    }

    const content = parsedHtml.content;
    if (!content) {
        throw new Error('The cleaned HTML contains no content');
    }
    return content;
}


interface ProxyResponse {
    htmlString?: string,
    error?: Error,
    status: number
};


/**
 * Load and clean an external site through the proxy.
 * 
 * @param url - the source URL
 * @param rewrite - a function that rewrites the source URL to a new URL that
 *      goes through the proxy.
 * @returns the cleaned external HTML content
 */
export async function proxy(url: URL, rewrite: (url: URL) => URL): Promise<ProxyResponse> {
    const response = await fetch(rewrite(url));
    if (!response.ok) {
        const msg = `Proxy failed to fetch ${url} with error ` +
            `${response.status} - ${response.statusText}`;
        const error = new Error(msg);
        return {error, status: response.status};
    }
    const htmlString = await response.text()
        .then((htmlString) => clean(url, htmlString))
        .then((htmlString) => readable(url, htmlString));
    return {htmlString, status: response.status};
}


export function rewrite(url: URL): URL {
    const rewritten = new URL('/api/proxy', location.origin);
    rewritten.searchParams.set('url', url.toString());
    return rewritten;
}


export function mount(content: string): HTMLElement {
    const container = document.createElement('div');
    container.innerHTML = content;
    const payload = container.firstElementChild as HTMLElement | null;
    if (!payload) {
        throw new Error('Failed to mount parsed HTML');
    }
    return payload
}
