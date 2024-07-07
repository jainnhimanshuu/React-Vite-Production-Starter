/* eslint-disable no-debugger */
import { encode, decode } from 'url-safe-base64';

export class StringUtils {
    static isNull = str => {
        if (str === null || str === undefined) return true;

        const stringifiedValue = `${str}`;

        if (stringifiedValue.toLowerCase() === 'null' || stringifiedValue.trim() === '')
            return true;

        return false;
    };

    static isEmpty = str => {
        if (str === null || str === undefined) return true;

        const stringifiedValue = `${str}`;

        if (stringifiedValue.trim() === '') return true;

        return false;
    };

    /**
     * Convert ASCII string into Base64
     * @param {*} str
     */
    static encodeBase64 = str => {
        const encoded = btoa(unescape(encodeURIComponent(str))); // Deprecated, use encodeURIComponent directly

        return encoded;
    };

    /**
     * Convert Base64 into ASCII string
     * @param {*} str
     */
    static decodeBase64 = str => {
        const decoded = decodeURIComponent(escape(atob(str))); // Deprecated, use decodeURIComponent directly

        return decoded;
    };

    /**
     * Url safe encode
     * @param {*} str
     */
    static encodeURLSafeBase64 = str => {
        return encode(StringUtils.encodeBase64(str));
    };

    /**
     * Url Safe decode, encoded with this app's encoder
     * @param {*} str
     */
    static decodeURLSafeBase64 = str => {
        return decode(str);
    };

    /**
     * Convert ascii string into base64
     * @param {*} str
     */
    static encodeStrToBase64 = str => {
        const encoded = btoa(unescape(encodeURIComponent(str))); // Deprecated, use encodeURIComponent directly

        return encoded;
    };

    static getCapitalizeStr = str => (str ? str[0].toUpperCase() + str.slice(1) : '');

    static isString = str => typeof str === 'string' || str instanceof String;
}
