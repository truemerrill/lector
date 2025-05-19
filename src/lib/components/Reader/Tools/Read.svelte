<script lang="ts">
	import { _ } from 'svelte-i18n';
	import DOMPurify from 'dompurify';
	import { Readability } from '@mozilla/readability';

	let {
		content = $bindable()
	}: {
		content: HTMLElement | undefined;
	} = $props();

	interface Message {
		text: string;
		kind: 'info' | 'error';
	}

	let messages: Message[] = $state([]);
	let url: string | undefined = $state(undefined);
	let fullUrl: string | undefined = $derived.by(() => {
		if (url === undefined) {
			return undefined;
		}
		if (url.startsWith('http://') || url.startsWith('https://')) {
			return url;
		} else {
			return `https://${url}`;
		}
	});

	/**
	 * Log a message to the terminal
	 *
	 * @param text - the message text
	 * @param kind - the type of message
	 */
	function log(text: string, kind: 'info' | 'error') {
		messages.push({ text, kind });
	}

	function isUrl(maybeUrl: any): boolean {
		try {
			new URL(maybeUrl);
			return true;
		} catch (e) {
			return false;
		}
	}

	function checkUrl(): string {
		if (fullUrl === undefined) {
			throw new Error('Missing a URL');
		}

		if (!isUrl(fullUrl)) {
			throw new Error(`Not a valid URL "${fullUrl}"`);
		}
		return fullUrl;
	}

	/**
	 * Request the URL through the proxy server, returning the raw HTML
	 */
	async function loadHtml(url: string): Promise<string> {
		log(`Loading "${url}"`, 'info');
		const encodedUrl = encodeURIComponent(url);
		const result = await fetch(`/api/proxy?url=${encodedUrl}`);
		if (!result.ok) {
			const msg =
				'Proxy failed to fetch content with error ' + `${result.status} - ${result.statusText}`;
			throw new Error(msg);
		}
		log('Successfully fetched the webpage via proxy server', 'info');
		const rawHtml = await result.text();
		log(`Received ${rawHtml.length} characters of raw HTML content from the server`, 'info');
		return rawHtml;
	}

	/**
	 * Guard against XSS attacks
	 */
	function sanitizeHtml(html: string): string {
		log('Sanitizing HTML against potential XSS attacks', 'info');
		return DOMPurify.sanitize(html, {
			ALLOWED_TAGS: ['a', 'p', 'h1', 'h2', 'h3', 'ul', 'li', 'blockquote', 'pre', 'code'],
			ALLOWED_ATTR: ['href', 'target', 'rel', 'name']
		});
	}

	/**
	 * Parse html using Mozilla Readability
	 */
	function readableHtml(html: string): string {
		log('Parsing the sanitized HTML content', 'info');
		const parser = new DOMParser();
		const doc = parser.parseFromString(html, 'text/html');

		const errorNode = doc.querySelector('parserror');
		if (errorNode) {
			const msg = `Parsing error: ${errorNode.innerHTML}`;
			throw new Error(msg);
		}

		log('Removing ads with Mozilla Readability', 'info');
		const reader = new Readability(doc);
		const parsedHtml = reader.parse();
		if (!parsedHtml) {
			throw new Error('Failed clean the HTML in with Mozilla Readibility');
		}

		const content = parsedHtml.content;
		if (!content) {
			throw new Error('The cleaned HTML contains no content');
		}
		return content;
	}

	/**
	 * Mount the content onto the DOM
	 * @param html
	 */
	function mountHtml(html: string): void {
		log('Mounting parsed HTML into the reader view', 'info');
		const container = document.createElement('div');
		container.innerHTML = html;
		const payload = container.firstElementChild as HTMLElement | null;

		if (!payload) {
			throw new Error('Failed to mount parsed HTML');
		}

		content = payload;
		log('Loading complete', 'info');
	}

	async function handleLoad() {
		messages = [];
		try {
			const sanitizedUrl = checkUrl();
			const rawHtml = await loadHtml(sanitizedUrl);
			const sanitizedHtml = sanitizeHtml(rawHtml);
			const html = readableHtml(sanitizedHtml);
			mountHtml(html);
		} catch (err) {
			log(String(err), 'error');
		}
	}
</script>

<div class="flex h-full flex-col p-6">
	<div class="mb-3">
		<h3 class="h3">{$_('read')}</h3>
	</div>

	<div class="overflow-y-auto">
		<form class="max-w mt-4 space-y-4">
			<label class="label">
				<span class="label-text">{$_('read_web_content')}</span>
				<div class="input-group grid-cols-[auto_1fr_auto]">
					<div class="ig-cell preset-tonal">https://</div>
					<input class="ig-input" type="text" placeholder="www.example.com" bind:value={url} />
				</div>
			</label>
		</form>
	</div>

	<div class="terminal mt-4 flex-1 rounded-lg bg-stone-950 p-2 font-mono text-xs">
		{#each messages as message}
			<div class={message.kind}>{message.text}</div>
		{/each}
	</div>

	<div>
		<hr class="hr mt-4 mb-4" />
		<button type="button" class="btn preset-filled" onclick={handleLoad} aria-label="logout">
			{$_('load_content')}
		</button>
	</div>
</div>

<style>
	.terminal {
		min-height: 200px;
	}

	.terminal .info {
		color: green;
	}

	.terminal .error {
		color: red;
	}
</style>
