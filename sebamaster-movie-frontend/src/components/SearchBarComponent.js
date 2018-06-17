"use strict";

import React from 'react';
import SearchBar from 'material-ui-search-bar';
import '../../css/bg.css';
import '../../css/title1style.css';
import '../../css/title2style.css';
export class SearchBarComponent extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <div>
                    <h1 className="title1style" >Discover the Beauty of </h1>
                <h1 className="title2style" >the Forbidden City in Summer </h1>

                <div className="searchbarstyle">
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
