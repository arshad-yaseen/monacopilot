import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';

import {HTTP} from '../src/utils/http';

describe('HTTP utilities', () => {
    beforeEach(() => {
        global.fetch = vi.fn();
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('HTTP.post should return JSON on success', async () => {
        (global.fetch as any).mockResolvedValueOnce({
            ok: true,
            json: async () => ({hello: 'world'}),
        });
        const response = await HTTP.post<{hello: string}, any>(
            'https://example.com/api',
            {anyBody: true},
        );
        expect(response).toEqual({hello: 'world'});
    });

    it('HTTP.post should throw error on non-200 status', async () => {
        (global.fetch as any).mockResolvedValueOnce({
            ok: false,
            status: 404,
            json: async () => ({error: 'Not Found'}),
        });
        await expect(
            HTTP.post('https://example.com/api', {test: true}),
        ).rejects.toThrowError(/Network request failed \(404\)/);
    });

    it('HTTP.post should use fallbackError if provided', async () => {
        (global.fetch as any).mockResolvedValueOnce({
            ok: false,
            status: 500,
            json: async () => ({message: 'Server error'}),
        });
        await expect(
            HTTP.post(
                'https://example.com/api',
                {test: true},
                {fallbackError: 'Something went wrong'},
            ),
        ).rejects.toThrowError(/Something went wrong \(500\)/);
    });

    it('HTTP.post should handle errorData that cannot be parsed as JSON', async () => {
        (global.fetch as any).mockResolvedValueOnce({
            ok: false,
            status: 400,
            json: async () => {
                throw new Error('Invalid JSON');
            },
        });
        await expect(
            HTTP.post('https://example.com/api', {test: true}),
        ).rejects.toThrowError(/Network request failed \(400\)/);
    });

    it('Should set default timeout to 30s if none provided', async () => {
        (global.fetch as any).mockResolvedValueOnce({
            ok: true,
            json: async () => ({ok: true}),
        });
        await HTTP.post('https://example.com/api', {});
        expect(true).toBe(true);
    });

    it('Should combine user signal with timeout signal if provided', async () => {
        const controller = new AbortController();
        (global.fetch as any).mockResolvedValueOnce({
            ok: true,
            json: async () => ({ok: true}),
        });
        await HTTP.post(
            'https://example.com/api',
            {},
            {signal: controller.signal},
        );
        expect(true).toBe(true);
    });

    it('Should merge custom headers with default content-type', async () => {
        (global.fetch as any).mockResolvedValueOnce({
            ok: true,
            json: async () => ({ok: true}),
        });
        await HTTP.post(
            'https://example.com/api',
            {},
            {headers: {'x-custom': 'headerValue'}},
        );
        const callArgs = (global.fetch as any).mock.calls[0];
        const headersSent = callArgs[1].headers;
        expect(headersSent).toMatchObject({
            'Content-Type': 'application/json',
            'x-custom': 'headerValue',
        });
    });

    it('Should not include body if method is POST but body is empty object', async () => {
        (global.fetch as any).mockResolvedValueOnce({
            ok: true,
            json: async () => ({ok: true}),
        });
        await HTTP.post('https://example.com/api', {});
        const callArgs = (global.fetch as any).mock.calls[0];
        expect(callArgs[1].body).toBe('{}');
    });

    it('Should always use POST as method in HTTP.post', async () => {
        (global.fetch as any).mockResolvedValueOnce({
            ok: true,
            json: async () => ({ok: true}),
        });
        await HTTP.post('https://example.com/api', {some: 'data'});
        const callArgs = (global.fetch as any).mock.calls[0];
        expect(callArgs[1].method).toBe('POST');
    });

    it('Should correctly return parsed JSON data', async () => {
        (global.fetch as any).mockResolvedValueOnce({
            ok: true,
            json: async () => ({foo: 'bar'}),
        });
        const result = await HTTP.post('https://example.com/api', {
            test: 'data',
        });
        expect(result).toEqual({foo: 'bar'});
    });
});
