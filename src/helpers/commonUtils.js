import { StringUtils } from './stringUtils';
import { Logger } from './loggers';

/**
 * Clean and normalize a parsed URL query object.
 * @param {ParsedUrlQuery} parsedUrl - Parsed URL query object.
 * @returns {Object.<string, string>} - Cleaned query object with string values.
 */
export const utilCleanRouterQuery = parsedUrl => {
    const cleanedQueryObject = {};

    Object.keys(parsedUrl).forEach(key => {
        if (Array.isArray(parsedUrl[key]) && parsedUrl[key][0]) {
            cleanedQueryObject[key] = parsedUrl[key][0];
        } else {
            cleanedQueryObject[key] = parsedUrl[key];
        }
    });

    return cleanedQueryObject;
};

export class CommonUtils {
    static noop() {
        return function () {};
    }

    static isBrowser() {
        return typeof window !== 'undefined';
    }

    static getUrlParam(param) {
        const url = new URL(window.location.href);

        return url.searchParams.get(param) ?? '';
    }

    static isUrlParamPresent(param) {
        const url = new URL(window.location.href);

        return !CommonUtils.isNull(url.searchParams.get(param));
    }

    static updateUrlParam(param, value, href) {
        const url = new URL(href ?? window.location.href);
        url.searchParams.set(param, value);

        return url;
    }

    static removeParam(param, href) {
        const url = new URL(href ?? window.location.href);
        url.searchParams.delete(param);

        return url.href;
    }

    static jsonSafeParse(str) {
        try {
            return JSON.parse(str);
        } catch (e) {
            return null;
        }
    }

    static safeParseInt(str, fallback) {
        try {
            const parsedInt = parseInt(str);

            if (typeof parsedInt === 'number' && !isNaN(parsedInt)) {
                return parsedInt;
            } else {
                return fallback;
            }
        } catch (e) {
            return fallback;
        }
    }

    static jsonSafeStringify(str) {
        try {
            return JSON.stringify(str);
        } catch (e) {
            return null;
        }
    }

    static stringifyError(error) {
        if (this.isNull(error)) return 'empty error';
        const errString = JSON.stringify(error, ['message', 'arguments', 'type', 'name', 'stack']);
        console.error('error string', errString);

        return errString;
    }

    static getUserAgent() {
        return window.navigator.userAgent;
    }

    static checkMobileDevice(ua = '') {
        const userAgent = CommonUtils.isBrowser() ? this.getUserAgent() : ua;
        let isMobile = false;

        if (
            /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(
                userAgent.substring(0, 4),
            ) ||
            /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw-(n|u)|c55\/|capi|ccwa|cdm-|cell|chtm|cldc|cmd-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc-s|devi|dica|dmob|do(c|p)o|ds(12|-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(-|_)|g1 u|g560|gene|gf-5|g-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd-(m|p|t)|hei-|hi(pt|ta)|hp( i|ip)|hs-c|ht(c(-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i-(20|go|ma)|i230|iac( |-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|-[a-w])|libw|lynx|m1-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|-([1-8]|c))|phil|pire|pl(ay|uc)|pn-2|po(ck|rt|se)|prox|psio|pt-g|qa-a|qc(07|12|21|32|60|-[2-7]|i-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h-|oo|p-)|sdk\/|se(c(-|0|1)|47|mc|nd|ri)|sgh-|shar|sie(-|m)|sk-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h-|v-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl-|tdg-|tel(i|m)|tim-|t-mo|to(pl|sh)|ts(70|m-|m3|m5)|tx-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas-|your|zeto|zte-/i.test(
                userAgent.substring(0, 4),
            )
        ) {
            isMobile = true;
        }

        return isMobile;
    }

    static getObjVal(object = {}, keys = []) {
        return keys.reduce((prev, curr) => prev?.[curr], object);
    }

    static validEmail(email) {
        if (StringUtils.isEmpty(email)) {
            return false;
        }

        if (
            !(
                /^[^\s@]+@[^\s@]+\.[^\s@]{2,5}$/.test(email) &&
                /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/.test(email)
            )
        ) {
            return false;
        }

        return true;
    }

    static addScript(attribute, text, callback) {
        const s = document.createElement('script');

        for (const attr in attribute) {
            s.setAttribute(attr, attribute[attr] ? attribute[attr] : '');
        }
        s.innerHTML = text ? text : '';

        if (callback) {
            s.onload = callback;
        }
        document.body.appendChild(s);
    }

    static addLink(attribute, text, callback) {
        const s = document.createElement('link');

        for (const attr in attribute) {
            s.setAttribute(attr, attribute[attr] ? attribute[attr] : null);
        }
        s.innerHTML = text ? text : '';
        document.head.appendChild(s);

        if (callback) {
            callback();
        }
    }

    static addScriptInsideHead(attribute, text, callback) {
        const s = document.createElement('script');

        for (const attr in attribute) {
            s.setAttribute(attr, attribute[attr] ? attribute[attr] : '');
        }
        s.innerHTML = text ? text : '';

        if (callback) {
            s.onload = callback;
        }
        document.head.appendChild(s);
    }

    /**
     * @description adds script inside footer tag
     * @param {Object} attribute
     * @param {string} text
     * @param {Function} callback
     */
    static addScriptToFooter(attribute, text, callback) {
        const s = document.createElement('script');

        for (const attr in attribute) {
            if (Object.prototype.hasOwnProperty.call(attribute, attr)) {
                s.setAttribute(attr, attribute[attr] ? attribute[attr] : '');
            }
        }

        s.innerHTML = text ? text : '';

        if (callback) {
            s.onload = callback;
        }
        const footer = document.getElementsByTagName('footer')[0];
        footer?.appendChild(s);
    }

    static isLocalEnv(path) {
        const hostName = path ?? window.location.host;

        return hostName.includes('localhost');
    }

    /**
     * @description utils function to dispatch custom event
     * @param {string} eventName
     * @param {Object} data
     */
    static dispatchEvent(eventName, data) {
        if (!CommonUtils.isBrowser()) return;

        if (!data) {
            data = {};
        }
        const completeEvent = new CustomEvent(eventName, { detail: data });
        window.dispatchEvent(completeEvent);
    }

    static getCookieExpiry(minutes) {
        const date = new Date();
        date.setTime(date.getTime() + minutes * 60 * 1000);

        return date;
    }

    static safeAtob(hourlyPay) {
        try {
            return window.atob(hourlyPay);
        } catch (err) {
            console.error('[Utils] Unable to parse atob', hourlyPay, err);

            return '';
        }
    }

    static generateUUID(replaceHyphens) {
        const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            const r = (Math.random() * 16) | 0,
                v = c === 'x' ? r : (r & 0x3) | 0x8;

            return v.toString(16);
        });

        if (replaceHyphens) {
            return uuid.replace(new RegExp('-', 'g'), '');
        }

        return uuid;
    }

    static extractTextFromHtmlString(str) {
        const div = document.createElement('div');
        div.innerHTML = str;

        return div.textContent ?? div.innerText ?? '';
    }

    static isEmptyObj(obj) {
        if (!obj) return false;

        return Object.entries(obj).length === 0;
    }

    static isNull(obj) {
        return typeof obj === 'undefined' || obj === null;
    }

    static isFunction(v) {
        return typeof v === 'function';
    }

    static sleep(timeout) {
        return new Promise(res => setTimeout(res, timeout));
    }

    static isDeepEqual(x, y) {
        const ok = Object.keys,
            tx = typeof x,
            ty = typeof y;

        return x && y && tx === 'object' && tx === ty
            ? ok(x).length === ok(y).length &&
                  ok(x).every(key => CommonUtils.isDeepEqual(x[key], y[key]))
            : x === y;
    }

    static getUniqueElementsFromArray(rawArray) {
        return rawArray.filter((item, i, ar) => ar.indexOf(item) === i);
    }

    static isValidNumber(num) {
        return StringUtils.isNull(num) === false && !isNaN(Number(num));
    }

    static getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    static shuffleArray(array) {
        const shuffledArray = [...array];

        for (let i = shuffledArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
        }

        return shuffledArray;
    }

    static getPageLoadTime() {
        let duration = 0;

        if (window.performance) {
            try {
                window.performance.getEntriesByType('navigation').forEach(navigation => {
                    if (navigation.domContentLoadedEventEnd) {
                        duration = Math.floor(navigation.domContentLoadedEventEnd);
                    } else {
                        if (navigation.duration) {
                            duration = Math.floor(navigation.duration);
                        }
                    }
                });
            } catch (e) {
                console.error('[ERROR]: getEntriesByType not supported by browser', e);
            }
        }

        return duration;
    }

    static getPagePerformanceTiming() {
        let timeLoad = 0;

        if (window.performance?.timeOrigin) {
            try {
                timeLoad = Math.floor(window.performance.now());

                if (window.performance?.now()) {
                    if (timeLoad !== 0 && Math.abs(window.performance.now() - timeLoad) > 1000) {
                        console.error(`time log err::${timeLoad}::${window.performance.now()}`);
                    }
                }
            } catch (e) {
                console.error('[ERROR]: calculating timeload through time origin', e);
            }
        }

        return timeLoad;
    }

    static convertSnakeToCamel(obj) {
        if (typeof obj !== 'object' || obj === null) {
            return obj; // Return non-object values as is
        }

        if (Array.isArray(obj)) {
            return obj;
        }

        const result = {};

        for (const key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                const camelKey = key.replace(/_([a-z])/g, function (match, char) {
                    return char.toUpperCase();
                });

                result[camelKey] = CommonUtils.convertSnakeToCamel(obj[key]);
            }
        }

        return result;
    }

    static convertCamelToSnake(obj) {
        if (typeof obj !== 'object' || obj === null) {
            return obj; // Return non-object values as is
        }

        if (Array.isArray(obj)) {
            return obj;
        }

        const result = {};

        for (const key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                const snakeKey = key.replace(/[A-Z]/g, function (match) {
                    return `_${match.toLowerCase()}`;
                });
                result[snakeKey] = CommonUtils.convertCamelToSnake(obj[key]);
            }
        }

        return result;
    }

    static extractRequiredHeaders(reqHeaders) {
        const browserUA = `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.75 Safari/537.36 Edg/100.0.1185.36`;
        const headers = {
            'user-agent': reqHeaders ? reqHeaders['user-agent'] : browserUA,
        };

        const locationHeaders = [
            'x-appengine-user-ip',
            'fastly-client-ip',
            'x-forwarded-for',
            'X-Client-Geo-Location',
            'X-Client-Geo-Country',
            'X-Client-Geo-Region',
            'X-Client-Geo-City',
            'X-Client-Geo-LatLong',
        ];

        const extraHeaders = ['cookie'];

        const allHeaders = locationHeaders.concat(extraHeaders);

        for (const key of allHeaders) {
            if (reqHeaders !== null) {
                const lcKey = key.toLowerCase();

                if (reqHeaders[key]) headers[key] = reqHeaders[key];
                else if (reqHeaders[lcKey] !== null) headers[key] = reqHeaders[lcKey];
            }
        }

        return headers;
    }

    static sleepPromise(timeout = 0) {
        return new Promise(resolve => {
            setTimeout(resolve, timeout);
        });
    }

    static createCookie(keyName, value, expiryDays = 365) {
        let expires = '';

        if (expiryDays) {
            const date = new Date();
            date.setTime(date.getTime() + expiryDays * 24 * 60 * 60 * 1000);
            expires = `; expires=${date.toUTCString()}`;
        }
        document.cookie = `${keyName}=${value}${expires}; path=/`;
    }

    static getCookieFromString(name = '', cookieString = '', escapeQuotes = false) {
        const nameWithEq = `${name}=`;
        const cookieArray = cookieString.split(';').map(cookieStr => decodeURIComponent(cookieStr));

        for (let cookieStr of cookieArray) {
            while (cookieStr.charAt(0) === ' ') {
                cookieStr = cookieStr.substring(1, cookieStr.length);
            }

            if (cookieStr.indexOf(nameWithEq) === 0) {
                const returnStr = cookieStr.substring(nameWithEq.length, cookieStr.length) || '';

                return escapeQuotes ? returnStr.replaceAll('"', '') : returnStr;
            }
        }

        return null;
    }

    /**
     * @description To delete keys with value from given obj
     * @param {Object} mainObject - The main object from which keys should be removed
     * @param {(string|string[])[]} keysToRemove - Array of keys or array of arrays of keys to be removed
     * @returns {Object} - The modified mainObject with removed keys
     */
    static removeMatchingKeys(mainObject, keysToRemove) {
        for (const key of keysToRemove) {
            if (Array.isArray(key)) {
                // If the key is an array, recursively call the function
                if (mainObject[key[0]]) {
                    mainObject[key[0]] = CommonUtils.removeMatchingKeys(
                        mainObject[key[0]],
                        key.slice(1),
                    );

                    if (CommonUtils.isEmptyObj(mainObject[key[0]])) delete mainObject[key[0]];
                }
            } else {
                // Remove the key if it exists in the mainObject
                if (Object.prototype.hasOwnProperty.call(mainObject, key)) {
                    delete mainObject[key];
                }
            }
        }

        return mainObject;
    }

    /**
     * @description Omit null values from an object recursively
     * @param {Object} obj - The object from which null values should be omitted
     * @returns {Object} - The modified object with omitted null values
     */
    static omitNull(obj) {
        // Check if obj is truthy and an object
        if (obj && typeof obj === 'object') {
            // Iterate over each key in the object
            Object.keys(obj).forEach(key => {
                // Check if the value associated with the key is an object
                if (typeof obj[key] === 'object') {
                    // Recursively call omitNull for nested objects
                    obj[key] = CommonUtils.omitNull(obj[key]);

                    // Check if the nested object is empty and delete key with empty object
                    if (CommonUtils.isEmptyObj(obj[key])) delete obj[key];
                } else {
                    // For non-object values, filter and delete keys with null values
                    if (StringUtils.isNull(obj[key])) delete obj[key];
                }
            });
        }

        // Return the modified object
        return obj;
    }

    /**
     * @description Check if the device width is below 600px
     * @returns {boolean} - True if device width is below 600px, false otherwise
     */
    static isDeviceWidthBelow600px() {
        // Check the device resolution width
        if (!CommonUtils.isBrowser()) return false;

        try {
            const screenWidth =
                window.innerWidth ||
                document.documentElement.clientWidth ||
                document.body.clientWidth;

            // Return true if the width is below 600px, otherwise return false
            if (screenWidth < 600) {
                return true;
            }
        } catch (_e) {
            Logger.logError('[Err: Device Width Check]', _e);
        }

        return false;
    }

    /**
     * @description Check if the device width is below 900px
     * @returns {boolean} - True if device width is below 900px, false otherwise
     */
    static isDeviceWidthBelow900px() {
        // Check the device resolution width
        const screenWidth =
            window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

        // Return true if the width is below 900px, otherwise return false
        if (screenWidth < 900) {
            return true;
        }

        return false;
    }

    /**
     * @description Get the browser language
     * @returns {string|undefined} - The browser language or undefined if not available
     */
    static getBrowserLanguage() {
        if (!CommonUtils.isBrowser()) return;

        return window.navigator.language;
    }

    /**
     * @description Validate if a given URL is valid
     * @param {string} url - The URL to validate
     * @returns {boolean} - True if the URL is valid, false otherwise
     */
    static isValidUrl(url = '') {
        url = url.trim();
        let urlObj;

        try {
            urlObj = new URL(url);
        } catch (err) {
            Logger.logError('[Valid Url Check Err]: ');
        }

        if (urlObj) {
            return !!CommonUtils.parseValidUrl(urlObj.toString());
        }

        return !!CommonUtils.parseValidUrl(url);
    }

    /**
     * @description Parse and validate a valid URL
     * @param {string} url - The URL to parse and validate
     * @returns {string|undefined} - The parsed and validated URL or undefined if not valid
     */
    static parseValidUrl(url) {
        if (!url) {
            return;
        }

        // check for illegal characters
        if (/[^a-z0-9:/?#[\]@!$&'()*+,;=.\-_~%]/i.test(url)) return;

        // check for hex escapes that aren't complete
        if (/%[^0-9a-f]/i.test(url)) return;

        if (/%[0-9a-f](:?[^0-9a-f]|$)/i.test(url)) return;

        let splitted = [];
        let scheme = '';
        let authority = '';
        let path = '';
        let query = '';
        let fragment = '';
        let out = '';

        // from RFC 3986
        splitted = CommonUtils.splitUri(url);
        scheme = splitted[1];
        authority = splitted[2];
        path = splitted[3];
        query = splitted[4];
        fragment = splitted[5];

        // scheme and path are required, though the path can be empty
        if (!(scheme && scheme.length && path.length >= 0)) return;

        // if authority is present, the path must be empty or begin with a /
        if (authority && authority.length) {
            if (!(path.length === 0 || /^\//.test(path))) return;
        } else {
            // if authority is not present, the path must not start with //
            if (/^\/\//.test(path)) return;
        }

        // scheme must begin with a letter, then consist of letters, digits, +, ., or -
        if (!/^[a-z][a-z0-9+\-.]*$/.test(scheme.toLowerCase())) return;

        // re-assemble the URL per section 5.3 in RFC 3986
        out += `${scheme}:`;

        if (authority && authority.length) {
            out += `//${authority}`;
        }

        out += path;

        if (query && query.length) {
            out += `?${query}`;
        }

        if (fragment && fragment.length) {
            out += `#${fragment}`;
        }

        return out;
    }

    /**
     * @description Split a URI into scheme, authority, path, query, and fragment components
     * @param {string} uri - The URI to split
     * @returns {string[]} - Array containing scheme, authority, path, query, and fragment components
     */
    static splitUri(uri) {
        const splitted = uri.match(
            /(?:([^:/?#]+):)?(?:\/\/([^/?#]*))?([^?#]*)(?:\?([^#]*))?(?:#(.*))?/,
        );

        return splitted || [];
    }

    /**
     * @description Get the root domain from the current URL
     * @returns {string} - The root domain extracted from the current URL
     */
    static getRootUrl() {
        const hostname = new URL(window.location.href).hostname;
        const domain = hostname.split('.');
        let rootDomain = '';

        if (hostname.endsWith('.co.uk')) {
            rootDomain = domain.slice(-3).join('.');
        } else {
            rootDomain = domain.slice(-2).join('.');
        }

        return rootDomain;
    }
}
