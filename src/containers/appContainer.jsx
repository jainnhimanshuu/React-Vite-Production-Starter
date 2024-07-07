/* eslint-disable no-debugger */
import { Component } from 'react';
import { CommonUtils, Logger, SessionHelper, StringUtils } from '../helpers';
import { DataStore, DATA_STORE_KEYS } from '../providers/dataStore';
import PropTypes from 'prop-types';
import { CONTAINER_TYPE } from '../constants';

class AppContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isSessionInit: false,
        };
    }

    componentDidMount() {
        const isSessionInit =
            !StringUtils.isNull(DataStore.getItem(DATA_STORE_KEYS.IS_SESSION_INIT)) &&
            DataStore.getItem(DATA_STORE_KEYS.IS_SESSION_INIT) === 'true';
        this.setState({ isSessionInit });

        if (CommonUtils.isNull(isSessionInit) || !isSessionInit) {
            this.fetchUserData();
        }
    }

    fetchUserData = async () => {
        try {
            const userId = DataStore.getItem(DATA_STORE_KEYS.USER_ID) ?? '';
            await SessionHelper.init(userId);
        } catch (error) {
            Logger.logError('[Session][Init] Init User Api Failed :', error);
        }
    };

    renderContent = () => {
        const { containerType } = this.props;

        switch (containerType) {
            case CONTAINER_TYPE.INIT:
                return <div>Init content</div>;
            case CONTAINER_TYPE.DASHBOARD:
                return <div>Dashboard content</div>;
            case CONTAINER_TYPE.SPLASH:
                return <div>Splash screen content</div>;
            case CONTAINER_TYPE.INTERSTITIAL:
                return <div>Interstitial content</div>;
            case CONTAINER_TYPE.ADDITIONAL_GOAL_PLAN:
                return <div>Additional Goal Plan content</div>;
            case CONTAINER_TYPE.CUSTOM_GOAL_PLAN:
                return <div>Custom Goal Plan content</div>;
            case CONTAINER_TYPE.FOUNDATIONAL_GOAL_PLAN:
                return <div>Foundational Goal Plan content</div>;
            case CONTAINER_TYPE.GOAL_LANDING:
                return <div>Goal Landing content</div>;
            case CONTAINER_TYPE.HOUSEHOLD_DATA:
                return <div>Household Data content</div>;
            default:
                return null;
        }
    };

    render() {
        return this.renderContent();
    }
}

AppContainer.propTypes = {
    containerType: PropTypes.oneOf([
        CONTAINER_TYPE.INIT,
        CONTAINER_TYPE.DASHBOARD,
        CONTAINER_TYPE.SPLASH,
        CONTAINER_TYPE.INTERSTITIAL,
        CONTAINER_TYPE.ADDITIONAL_GOAL_PLAN,
        CONTAINER_TYPE.CUSTOM_GOAL_PLAN,
        CONTAINER_TYPE.FOUNDATIONAL_GOAL_PLAN,
        CONTAINER_TYPE.GOAL_LANDING,
        CONTAINER_TYPE.HOUSEHOLD_DATA,
    ]).isRequired,
};

export default AppContainer;
