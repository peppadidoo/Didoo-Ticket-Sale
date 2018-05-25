"use strict";

import React from 'react';
import { Toolbar, Button } from 'react-md';//从react-md里面要东西
import { withRouter } from 'react-router-dom'

import KebabMenu from './KebabMenu';


class Header extends React.Component {

    constructor(props) {//构造函数，传入的数据
        super(props);
    }

    render() {
        return (
            <Toolbar
                colored
                nav={<Button onClick={() => this.props.history.push('/')} icon>home</Button>} //打开home键
                title={this.props.title}//显示home title，下面是打开上边栏
                actions={<KebabMenu id="toolbar-colored-kebab-menu" />}>
            </Toolbar>
        );
    }
};

export default withRouter(Header);