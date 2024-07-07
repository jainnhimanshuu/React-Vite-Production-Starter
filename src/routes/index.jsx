import { Routes, Route, Navigate } from 'react-router-dom';
import { AppContainer } from '../containers';
import { CONTAINER_TYPE } from '../constants/containerType';

const AppRoutes = () => (
    <Routes>
        <Route element={<Navigate replace={true} to="/init" />} path="/" />
        <Route element={<AppContainer containerType={CONTAINER_TYPE.INIT} />} path="/init" />
        <Route
            element={<AppContainer containerType={CONTAINER_TYPE.DASHBOARD} />}
            path="dashboard"
        />
        <Route element={<AppContainer containerType={CONTAINER_TYPE.SPLASH} />} path="splash" />
        <Route
            element={<AppContainer containerType={CONTAINER_TYPE.INTERSTITIAL} />}
            path="interstitial"
        />
    </Routes>
);

export default AppRoutes;
