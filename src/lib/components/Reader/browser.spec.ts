import { describe, it, expect, vi, beforeEach } from 'vitest';
import { JSDOM } from 'jsdom';

const STATIC_HTML = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Test HTML Document</title>
</head>
<body>
    <div>
        <p>test</p>
    </div>
</body>
</html>
`;

/* Mock `proxy` so we can test without a backend */
vi.mock('$lib/proxy', async (importOriginal) => {
    return {
        ...(await importOriginal<typeof import('$lib/proxy')>()),
        proxy: vi.fn(async (url: URL, rewrite: (url: URL) => URL) => {
            if (url.host === 'test.com') {
                return {
                    htmlString: STATIC_HTML,
                    status: 200
                };
            } else {
                return {
                    error: new Error('Not found'),
                    status: 404
                };
            }
        })
    };
});

/* Mock the DOM */
beforeEach(() => {
    const dom = new JSDOM('<!DOCTYPE html><html lang="en"></html>');
    vi.stubGlobal('document', dom.window.document);
});

import { goto, back, forward } from './browser';
import type { Browser } from '../../types';

describe('goto', () => {
    it('works when the history is empty', async () => {
        const browser: Browser = {
            history: [],
            index: null,
            status: 200
        };

        const b = await goto(browser, 'https://test.com');

        expect(b.status).toBe(200);
        expect(b.error).toBeUndefined();
        expect(b.content).toBeTruthy();
        expect(b.history.length).toBe(1);
        expect(b.history.at(0)).toBe('https://test.com');
        expect(b.urlString).toBe('https://test.com');
    });

    it('works when the history is populated', async () => {
        const browser: Browser = {
            history: ['https://google.com'],
            urlString: 'https://google.com',
            index: 0,
            status: 200
        };

        const b = await goto(browser, 'https://test.com');

        expect(b.status).toBe(200);
        expect(b.error).toBeUndefined();
        expect(b.content).toBeTruthy();
        expect(b.history.length).toBe(2);
        expect(b.history.at(0)).toBe('https://google.com');
        expect(b.history.at(1)).toBe('https://test.com');
        expect(b.urlString).toBe('https://test.com');
    });

    it('works when the user has pushed back', async () => {
        const browser: Browser = {
            history: ['https://google.com', 'https://facebook.com'],
            urlString: 'https://google.com',
            index: 0,
            status: 200
        };

        const b = await goto(browser, 'https://test.com');

        expect(b.status).toBe(200);
        expect(b.error).toBeUndefined();
        expect(b.content).toBeTruthy();
        expect(b.history.length).toBe(2);
        expect(b.history.at(0)).toBe('https://google.com');
        expect(b.history.at(1)).toBe('https://test.com');
        expect(b.urlString).toBe('https://test.com');
    });

    it('works when the user has pushed back to an empty page', async () => {
        const browser: Browser = {
            history: ['https://google.com', 'https://facebook.com'],
            urlString: 'https://google.com',
            index: null,
            status: 200
        };

        const b = await goto(browser, 'https://test.com');

        expect(b.status).toBe(200);
        expect(b.error).toBeUndefined();
        expect(b.content).toBeTruthy();
        expect(b.history.length).toBe(1);
        expect(b.history.at(0)).toBe('https://test.com');
        expect(b.urlString).toBe('https://test.com');
    });
});

describe('back', () => {
    it('does nothing if the user is at the empty page', async () => {
        const browser: Browser = {
            history: [],
            index: null,
            status: 200
        };

        const b = await back(browser);

        expect(b.status).toBe(200);
        expect(b.error).toBeUndefined();
        expect(b.content).toBeUndefined();
        expect(b.history.length).toBe(0);
        expect(b.urlString).toBeUndefined();
    });

    it('goes back to an empty page', async () => {
        const browser: Browser = {
            history: ['https://google.com'],
            urlString: 'https://google.com',
            index: 0,
            status: 200
        };

        const b = await back(browser);

        expect(b.status).toBe(200);
        expect(b.error).toBeUndefined();
        expect(b.content).toBeUndefined();
        expect(b.history.length).toBe(1);
        expect(b.history.at(0)).toBe('https://google.com');
        expect(b.urlString).toBeUndefined();
        expect(b.index).toBeNull();
    });

    it('goes back to the prior page', async () => {
        const browser: Browser = {
            history: ['https://test.com', 'https://facebook.com'],
            urlString: 'https://facebook.com',
            index: 1,
            status: 200
        };

        const b = await back(browser);

        expect(b.status).toBe(200);
        expect(b.error).toBeUndefined();
        expect(b.content).toBeTruthy();
        expect(b.history.length).toBe(2);
        expect(b.urlString).toBe('https://test.com');
        expect(b.index).toBe(0);
    });
});

describe('forward', () => {
    it('does nothing if the user is at the top of the history', async () => {
        const browser: Browser = {
            history: ['https://google.com', 'https://facebook.com'],
            urlString: 'https://google.com',
            index: 1,
            status: 200
        };

        const b = await forward(browser);
        expect(b).toBe(browser);
    });

    it('works if the user is at an empty page', async () => {
        const browser: Browser = {
            history: ['https://test.com', 'https://facebook.com'],
            urlString: undefined,
            index: null,
            status: 200
        };

        const b = await forward(browser);
        expect(b.status).toBe(200);
        expect(b.error).toBeUndefined();
        expect(b.content).toBeTruthy();
        expect(b.history.length).toBe(2);
        expect(b.urlString).toBe('https://test.com');
        expect(b.index).toBe(0);
    });

    it('works if the user is at a page', async () => {
        const browser: Browser = {
            history: ['https://google.com', 'https://test.com'],
            urlString: undefined,
            index: 0,
            status: 200
        };

        const b = await forward(browser);
        expect(b.status).toBe(200);
        expect(b.error).toBeUndefined();
        expect(b.content).toBeTruthy();
        expect(b.history.length).toBe(2);
        expect(b.urlString).toBe('https://test.com');
        expect(b.index).toBe(1);
    });
});
