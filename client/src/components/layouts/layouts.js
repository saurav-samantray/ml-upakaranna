import React from 'react';
import Header from '../header/header'
import ProjectDetail from '../../pages/projectDetail'
import ProjectHome from '../../pages/projectHome';
import { Switch, Route, useRouteMatch } from "react-router-dom";


const Layout = (props) => {
    let { path } = useRouteMatch();
    return (
        <React.Fragment>
            <Header />
            <Switch>
                <Route exact path={path}><ProjectHome {...props}/></Route>
                <Route path={`${path}/:projectId`}><ProjectDetail {...props}/></Route>
            </Switch>
        </React.Fragment>

    )
}

export default Layout;