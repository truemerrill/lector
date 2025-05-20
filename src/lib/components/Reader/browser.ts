import type { Browser } from '$lib/types';
import { proxy, rewrite, mount } from '$lib/proxy';



function addHTTP(urlString: string) {
    if (!urlString.startsWith('http://') && !urlString.startsWith('https://')) {
        return 'http://' + urlString;
    }
    return urlString;
}


/**
 * Load a URL without any history manipulation.
 * 
 * @param browser - the browser state
 * @param urlString - the URL string
 * @returns the new browser state
 */
export async function load(browser: Browser, urlString: string): Promise<Browser> {
    const url = new URL(addHTTP(urlString));
    const {htmlString, error, status} = await proxy(url, rewrite);

    if (error || (htmlString === undefined)) {
        return {
            ...browser,
            content: undefined,
            urlString,
            error,
            status
        };
    }

    const content = mount(htmlString);
    return {
        ...browser,
        content,
        urlString,
        status
    };
}


/**
 * Load a new page and append to the history
 * 
 * @param browser - the browser state
 * @param urlString - the URL string
 * @returns the new browser state
 */
export async function goto(browser: Browser, urlString: string): Promise<Browser> {
    const b = await load(browser, urlString);
    if (b.error) return b;

    const index = b.index !== null ? b.index + 1 : 0;
    const history = [...b.history.slice(0, index), urlString];
    return {...b, history, index};
}


/**
 * Navigate back
 * 
 * @param browser - the browser state
 * @returns - the new browser state
 */
export async function back(browser: Browser): Promise<Browser> {
    if (browser.index === null) {
        return browser;
    } else if (browser.index === 0) {
        return {
            ...browser,
            content: undefined,
            urlString: undefined,
            index: null,
            status: 200,
            error: undefined
        };
    } else {
        const { history, index } = browser;
        const urlString = history.at(index - 1);

        if (urlString === undefined) {
            return browser;
        }

        const b = await load(browser, urlString);
        if (b.error) return b;
        return { ...b, index: index - 1 };
    }
}


export async function forward(browser: Browser): Promise<Browser> {
    const { history, index } = browser;
    const idx = index !== null ? index : -1;    

    const urlString = history.at(idx + 1);
    if (urlString) {
        const b = await load(browser, urlString);
        if (b.error) return b;
        return {...b, index: idx + 1};
    } else {
        return browser;
    }
}
