"use strict";

import React from 'react';

import { MovieDetail } from '../components/MovieDetail';

import MovieService from '../services/MovieService';

//componentWillMount 组件出现前就是dom还没有渲染到html文档里面，componentDidMount 组件渲染完成，已经出现在dom文档里，可以在各个周期实现特定的操作。
//
// 一、与React组件的生命周期有关，组件挂载时有关的生命周期有以下几个:
//
// 1、constructor(  )
//
// 2、componentWillMount(  )
//
// 3、render(  )
//
// 4、componentDidMount(  )
//
// 上面这些方法的调用是有次序的，由上而下，也就是当说如果你要获取外部数据并加载到组件上，只能在组件"已经"挂载到真实的网页上才能作这事情，其它情况你是加载不到组件的。
//
// componentDidMount方法中的代码，是在组件已经完全挂载到网页上才会调用被执行，所以可以保证数据的加载。此外，在这方法中调用setState方法，会触发重渲染。所以，官方设计这个方法就是用来加载外部数据用的，或处理其他的副作用代码。
export class MovieDetailView extends React.Component {//四人任务最开始的点

    constructor(props) {
        super(props);
    }

    componentWillMount(props){
        this.setState({
            loading: true
        });

        let id = this.props.match.params.id;

        MovieService.getMovie(id).then((data) => {
            this.setState({
                movie: data,
                loading: false
            });
        }).catch((e) => {
            console.error(e);
        });

    }

    deleteMovie(id) {
        MovieService.deleteMovie(id).then((message) => {
            this.props.history.push('/');
        }).catch((e) => {
            console.log(e);
        });
    }

    render() {
        if (this.state.loading) {
            return (<h2>Loading...</h2>);
        }

        return (

            <MovieDetail movie={this.state.movie} onDelete={(id) => this.deleteMovie(id)}/>
        );
    }
}
