"use strict";

import React from 'react';
import Background from '../../images/palace1.jpg';
import '../../css/bg.css';
import {SearchBarComponent} from "../components/SearchBarComponent";
import Header from '../components/Header';
export class  SearchPageView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            title: ''
        }

    }

    render(){
        return (
            <section>
                <Header title={this.state.title} />
                <img src={Background} className="bg" />
                <SearchBarComponent/>
            </section>

        )

    }

}
