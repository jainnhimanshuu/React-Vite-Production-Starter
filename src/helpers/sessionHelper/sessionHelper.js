/* eslint-disable no-debugger */
import { fetchCurrentScreen } from '../../api';
import { DATA_STORE_KEYS, DataStore } from '../../providers/dataStore';
/*
 * import { UrlManager } from '../../providers/urlManager';
 * import { HttpHelper } from '../httpHelper';
 */
import { Logger } from '../loggers';

export class SessionHelper {
    //  Todo: Method to run on session init
    static async init() {
        try {
            /*
             * const payload = {
             *     body: {
             *         partnerId: '',
             *         partnerParams: {
             *             userId: userId,
             *         },
             *     },
             * };
             * await HttpHelper.fetch(UrlManager.getInitUserApiUrl());
             */
            DataStore.setItem(DATA_STORE_KEYS.IS_SESSION_INIT, true);

            return fetchCurrentScreen();
        } catch (error) {
            Logger.logError('[Session][Init] Init User Api Failed :', error);
            throw error;
        }
    }
}
