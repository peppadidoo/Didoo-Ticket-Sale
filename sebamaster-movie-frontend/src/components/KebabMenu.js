"use strict";

import React from 'react';
import PropTypes from 'prop-types';
import { MenuButton, ListItem, Avatar, FontIcon } from 'react-md';//一些元件的import进来
import { withRouter } from 'react-router-dom'

import UserService from  '../services/UserService';


class KebabMenu extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: UserService.isAuthenticated() ? UserService.getCurrentUser() : undefined
        }
    }

    logout() {//一个函数
        UserService.logout();
        this.state = {
            user: UserService.isAuthenticated() ? UserService.getCurrentUser() : undefined//一个登陆的状态
        };
        if(this.props.location.pathname != '/') {
            this.props.history.push('/');
        }
        else {
            window.location.reload();
        }
    }

    render() {
        return (
            <MenuButton
                id={this.props.id}//传入数据这边提取id
                icon
                className={this.props.className}
                menuItems={this.state.user ? [
                    <ListItem key={1} leftAvatar={<Avatar icon={<FontIcon>account_circle</FontIcon>}/>} primaryText={this.state.user.username}/>,
                    <ListItem key={2} leftAvatar={<Avatar icon={<FontIcon>add</FontIcon>}/>} primaryText="Add Movie" onClick={() => this.props.history.push('/add')}/>,
                    <ListItem key={3} primaryText="Logout" onClick={() => this.logout()}/>
                ]: [<ListItem key={1} primaryText="Login" onClick={() => this.props.history.push('/login')}/>]}
            >
                more_vert
            </MenuButton>
        );
    }
}

KebabMenu.propTypes = {
    id: PropTypes.string.isRequired,
    className: PropTypes.string,
    menuItems: PropTypes.array
};

export default withRouter(KebabMenu);