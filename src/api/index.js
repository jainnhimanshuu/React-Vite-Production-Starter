import { CONTAINER_TYPE } from '../constants/containerType';

export const fetchCurrentScreen = async () => {
    try {
        return CONTAINER_TYPE.DASHBOARD;
    } catch (error) {
        console.error('Error fetching current screen:', error);

        return null;
    }
};
