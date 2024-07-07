import { CommonUtils } from './commonUtils';

export class Logger {
    static logMessage = (message, ...params) => {
        if (CommonUtils.isBrowser()) {
            console.log('[CLIENT LOG]', message, ...params);
        } else {
            console.log(
                '[SERVER LOG]',
                message,
                JSON.stringify([...params.map(CommonUtils.jsonSafeStringify)]),
            );
        }
    };

    static logError = (message, ...params) => {
        if (CommonUtils.isBrowser()) {
            console.error('[CLIENT LOG]', message, ...params);
        } else {
            console.error(
                '[SERVER LOG]',
                message,
                JSON.stringify([...params.map(CommonUtils.jsonSafeStringify)]),
            );
        }
    };

    static logWarn = (message, ...params) => {
        if (CommonUtils.isBrowser()) {
            console.warn('[CLIENT LOG]', message, ...params);
        } else {
            console.warn(
                '[SERVER LOG]',
                message,
                JSON.stringify([...params.map(CommonUtils.jsonSafeStringify)]),
            );
        }
    };
}
