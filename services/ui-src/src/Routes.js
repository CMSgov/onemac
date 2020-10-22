import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import FAQ from "./containers/FAQ"
import Dashboard from "./containers/Dashboard";
import Login from "./containers/Login";
import NotFound from "./containers/NotFound";
import Signup from "./containers/Signup";
import Spa from "./changeRequest/Spa";
import NewWaiver from "./waivers/NewWaiver";
import Waivers from "./waivers/Waivers";
import SpaRai from "./changeRequest/SpaRai";
import WaiverRai from "./changeRequest/WaiverRai";
import Profile from "./containers/Profile"
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import UnauthenticatedRoute from "./components/UnauthenticatedRoute";

export const ROUTES = {
    AMENDMENTS: '/amendment',
    DASHBOARD: '/dashboard',
    FAQ: '/FAQ',
    HOME: '/',
    LOGIN: '/login',
    PROFILE: '/profile',
    SIGNUP: '/signup',
    SPA_RAI: '/sparai',
    WAIVER_RAI: '/waiverrai',
    WAIVERS: '/waiver'
}

export default function Routes() {
    return (
        <Switch>
            <Route exact path={ROUTES.HOME}>
                <Home />
            </Route>
            <Route exact path={ROUTES.FAQ}>
                <FAQ />
            </Route>
            <UnauthenticatedRoute exact path={ROUTES.LOGIN}>
                <Login />
            </UnauthenticatedRoute>
            <UnauthenticatedRoute exact path={ROUTES.SIGNUP}>
                <Signup />
            </UnauthenticatedRoute>
            <AuthenticatedRoute exact path={ROUTES.PROFILE}>
                <Profile />
            </AuthenticatedRoute>
            <AuthenticatedRoute exact path={ROUTES.DASHBOARD}>
                <Dashboard />
            </AuthenticatedRoute>
            <AuthenticatedRoute path={`${ROUTES.AMENDMENTS}/:id?`}>
                <Spa/>
            </AuthenticatedRoute>
            <AuthenticatedRoute exact path={`${ROUTES.WAIVERS}/new`}>
                <NewWaiver />
            </AuthenticatedRoute>
            <AuthenticatedRoute exact path={`${ROUTES.WAIVERS}/:id`}>
                <Waivers />
            </AuthenticatedRoute>
            <AuthenticatedRoute path={`${ROUTES.SPA_RAI}/:id?`}>
                <SpaRai />
            </AuthenticatedRoute>
            <AuthenticatedRoute path={`${ROUTES.WAIVER_RAI}/:id?`}>
                <WaiverRai />
            </AuthenticatedRoute>
            <Route>
                <NotFound />
            </Route>
        </Switch>
    );
}
