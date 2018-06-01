"use strict";

import React from 'react';
import SearchBar from 'material-ui-search-bar';
import '../../css/bg.css';
import Background from '../../images/palace1.jpg';


export class SearchBarComponent extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <div>
                <div>
                    <h1>Discover the Beauty of the Forbidden City in Summer</h1>
                </div>
                <div>
                    <SearchBar
                        onChange={() => console.log('onChange')}
                        onRequestSearch={() => console.log('onRequestSearch')}
                        style={{
                            margin: '0 auto',
                            maxWidth: 800
                        }}
                    />
                </div>

            </div>
        );
    }
}
