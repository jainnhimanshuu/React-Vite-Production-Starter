/* eslint-disable no-debugger */
import { CommonUtils } from '../../helpers/commonUtils';

import {
    DATA_STORE_LOCAL_STORAGE_KEYS,
    DATA_STORE_SESSION_STORAGE_KEYS,
    DATA_STORE_COOKIE_STORAGE_KEYS,
} from './dataStore.config';

export class DataStore {
    static isLocalStoreKey(key) {
        return DATA_STORE_LOCAL_STORAGE_KEYS.includes(key);
    }

    static isSessionStoreKey(key) {
        return DATA_STORE_SESSION_STORAGE_KEYS.includes(key);
    }

    static isCookieStoreKey(key) {
        return DATA_STORE_COOKIE_STORAGE_KEYS.includes(key);
    }

    static cleanStoreValue(val) {
        if (val === 'undefined') return undefined;

        if (val === 'null') return null;

        return val;
    }

    static setItem(key, value, options = {}) {
        if (value === undefined || key === undefined) return;

        if (this.isCookieStoreKey(key) || options.isCookie) {
            // Todo: Set Cookie
        }

        if (this.isSessionStoreKey(key) && CommonUtils.isBrowser()) {
            window?.sessionStorage.setItem(key, value);
        }

        if (this.isLocalStoreKey(key) && CommonUtils.isBrowser()) {
            window?.localStorage.setItem(key, value);
        }
    }

    static getItem(key) {
        // Todo: Get Cookie Value

        if (CommonUtils.isBrowser() && this.isSessionStoreKey(key)) {
            return this.cleanStoreValue(window?.sessionStorage.getItem(key));
        }

        if (CommonUtils.isBrowser() && this.isLocalStoreKey(key)) {
            return this.cleanStoreValue(window?.localStorage.getItem(key));
        }
    }
}
