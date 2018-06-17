"use strict";

import React from 'react';
import {HashRouter as Router, Route, Switch, Redirect, Link} from 'react-router-dom';
import {FontIcon, ListItem, NavigationDrawer, Avatar} from 'react-md';
import { MovieList } from '../components/MovieList';

import { withRouter } from 'react-router-dom'
import KebabMenu from './KebabMenu';
import { SVGIcon } from 'react-md';
import imgURL from '../../images/didoo123.png';
const NavLink = ({ label, to, exact, icon, leftAvatar }) => (
    <Route path={to} exact={exact}>
        {({ match }) => {
            let leftIcon;
            if (icon) {
                leftIcon = <FontIcon>{icon}</FontIcon>;
            }

            return (
            <ListItem
            component={Link}
            active={!!match}
            to={to}
            primaryText={label}
            leftIcon={leftIcon}
            //leftAvatar={leftAvatar}
            />
            );
        }}
    </Route>
);

const navItems = [{
    exact: true,
    label: 'Home',
    to: '/',
    icon: 'home',
    //leftAvatar: imgURL,
}, {
    label: 'My Order',
    to: '/page-1',
    icon: 'bookmark',
}, {
    label: 'My Favorites',
    to: '/page-2',
    icon: 'favorite',
}, {
    label: 'My Cart',
    to: '/page-3',
    icon: 'shopping_cart',
}];

class NavigationMenu extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            data: []
        };
    }

    render() {
        return (
            <Router>
                <Route render={() => {
                    return <NavigationDrawer
                        //temporaryIcon={<Avatar src={imgURL} suffix="green-300"></Avatar>}
                        drawerTitle="My Menu"
                        drawerType={NavigationDrawer.DrawerTypes.PERSISTENT_MINI}
                        toolbarTitle="DiDoo.com Main Page Toolbar"
                        navItems={navItems.map(props => <NavLink {...props} key={props.to} />)}
                    >
                        {/*<h1 className="md-text-container md-text-center hello-world">We make your trip easier!</h1>*/}
                    </NavigationDrawer>
                }}
                />

            </Router>
        );
    }
};

export default withRouter(NavigationMenu);
