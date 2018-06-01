"use strict";

import React from 'react';
//import  SearchBarComponent  from 'material-ui-search-bar';//一些元件的import进来

import { MovieList } from '../components/MovieList';
import Background from '../../images/palace1.jpg';
import MovieService from '../services/MovieService';
const sectionStyle = {
    backgroundSize: '100% 100%',
    backgroundImage: `url(${Background})`
};
export class MovieListView extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            data: []
        };
    }

    componentWillMount() {
        this.setState({
            loading: true
        });

        MovieService.getMovies().then((data) => {
            this.setState({
                data: [...data],
                loading: false
            });
        }).catch((e) => {
            console.error(e);
        });
    }

    deleteMovie(id) {
        this.setState({
            data: [...this.state.data],
            loading: true
        });
        MovieService.deleteMovie(id).then((message) => {

            let movieIndex = this.state.data.map(movie => movie['_id']).indexOf(id);
            let movies = this.state.data;
            movies.splice(movieIndex, 1);
            this.setState({
                data: [...movies],
                loading: false
            });
        }).catch((e) => {
            console.error(e);
        });
    }

    render() {
        if (this.state.loading) {//如果state是loading，显示loading
            return (<h2>Loading...</h2>);
        }

        return (
            <div style={sectionStyle}>
            <MovieList data={this.state.data} onDelete={(id) => this.deleteMovie(id)}/>
            </div>
        );
    }
}
