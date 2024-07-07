import { CommonUtils } from './commonUtils';
import { Logger } from './loggers';

export class HttpHelper {
    static cache = {};

    /**
     * Resolves after a delayed duration.
     * @param {*} data
     * @param {number} duration
     * @returns {Promise<unknown>}
     */
    static delayedPromise(data, duration) {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(data);
            }, duration);
        });
    }

    /**
     * Returns mock data after a delay of 100ms.
     * @param {*} data
     * @returns {Promise<unknown>}
     */
    static async getMockData(data) {
        return await this.delayedPromise(data, 100);
    }

    /**
     * Performs a GET request.
     * @param {string} url
     * @param {*} options
     * @returns {Promise<any>}
     */
    static async get(url, options = {}) {
        return this.fetch(url, options);
    }

    /**
     * Performs a raw GET request.
     * @param {string} url
     * @param {*} options
     * @returns {Promise<any>}
     */
    static async getRaw(url, options = {}) {
        return this.fetchRaw(url, options);
    }

    /**
     * Performs a POST request.
     * @param {string} url
     * @param {*} body
     * @param {*} options
     * @returns {Promise<any>}
     */
    static async post(url, body, options = {}) {
        return this.fetch(url, { ...options, method: 'POST', body });
    }

    /**
     * Performs a PUT request.
     * @param {string} url
     * @param {*} body
     * @param {*} options
     * @returns {Promise<any>}
     */
    static async put(url, body, options = {}) {
        return this.fetch(url, { ...options, method: 'PUT', body });
    }

    /**
     * Performs a fetch request.
     * @param {string} url
     * @param {*} options
     * @returns {Promise<any>}
     */
    static async fetch(url, options = {}) {
        const fetchOptions = {
            method: options.method || 'GET',
            headers: options.headers || {},
            body: options.body ? JSON.stringify(options.body) : undefined,
            mode: options.noCors ? 'no-cors' : 'cors',
            signal: options.abortController?.signal || new AbortController().signal,
        };

        if (options.queryParams) {
            const paramsString = new URLSearchParams(options.queryParams).toString();
            url = `${url}?${paramsString}`;
        }

        try {
            const response = await fetch(url, fetchOptions);

            if (response.ok) {
                return response.json();
            }

            const errMsg = `status: ${response.status}, text: ${response.statusText}, err: ${await response.text()}`;
            throw new Error(errMsg);
        } catch (error) {
            Logger.logError('[ERROR]: Error fetching url:', url, ', getting error:', error);
            throw error;
        }
    }

    /**
     * Performs a raw fetch request.
     * @param {string} url
     * @param {*} options
     * @returns {Promise<any>}
     */
    static async fetchRaw(url, options = {}) {
        const fetchOptions = {
            method: options.method || 'GET',
            headers: options.headers || {},
            body: options.body ? JSON.stringify(options.body) : undefined,
            keepalive: true,
            signal: options.abortController?.signal || new AbortController().signal,
        };

        if (options.queryParams) {
            const paramsString = new URLSearchParams(options.queryParams).toString();
            url = `${url}?${paramsString}`;
        }

        try {
            const response = await fetch(url, fetchOptions);

            if (!response.ok) {
                const errMsg = `status: ${response.status}, text: ${response.statusText}, err: ${await response.text()}`;
                throw new Error(errMsg);
            }
        } catch (error) {
            Logger.logError('[ERROR]: Error fetching raw url:', url, ', getting error:', error);
            throw error;
        }
    }

    /**
     * Sends a POST request using XMLHttpRequest.
     * @param {string} url
     * @param {*} body
     * @param {Function} errorCallback
     */
    static xmlHttpRequestPost(url, body, errorCallback) {
        const http = new XMLHttpRequest();
        http.open('POST', url, true);
        http.setRequestHeader('Content-Type', 'application/json');
        http.onreadystatechange = () => {
            if (http.readyState === XMLHttpRequest.DONE) {
                if (http.status !== 200 && http.status !== 304) {
                    if (errorCallback) {
                        errorCallback(
                            http.status,
                            http?.responseText ?? 'error_while_sending_POST_request',
                        );
                    }
                }
            }
        };

        http.send(JSON.stringify(body));
    }

    /**
     * Invalidates a cache key after a specified interval.
     * @param {string} cacheKey
     * @param {number} interval
     */
    static invalidateCacheKey(cacheKey, interval) {
        setTimeout(() => {
            delete this.cache[cacheKey];
            Logger.logMessage(`Cache key "${cacheKey}" has been invalidated.`);
        }, interval);
    }

    /**
     * Fetches data with caching support.
     * @param {string} url
     * @param {*} options
     * @param {*} cacheOptions
     * @returns {Promise<any>}
     */
    static async fetchWithCache(url, options = {}, cacheOptions = {}) {
        const cacheKey = JSON.stringify({ url, options });

        if (this.cache[cacheKey]) {
            Logger.logMessage('[Cache][HIT]: Site config cache hit', url);

            return this.cache[cacheKey];
        }

        try {
            const response = await this.fetch(url, options);

            if (!CommonUtils.isNull(response) || !CommonUtils.isEmptyObj(response)) {
                this.cache[cacheKey] = response;

                if (cacheOptions.invalidateAfter) {
                    this.invalidateCacheKey(cacheKey, cacheOptions.invalidateAfter);
                }

                Logger.logMessage('[Cache][MISS]: Site config cache miss', url);

                return response;
            }
        } catch (error) {
            Logger.logError('[ERROR]: Error fetching with cache:', url, ', getting error:', error);
            throw error;
        }
    }
}
