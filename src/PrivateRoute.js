import React from 'react';
import {Route} from 'react-router-dom'
const privateRoute = (props) => {
    return (
        <Route path={props.path} exact={props.exact} component={props.component}></Route>
    );
};

export default privateRoute;