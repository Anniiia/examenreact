import React, { Component } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import Global from '../Global';
import axios from 'axios';


export default class Menu extends Component {
    state={
        series:[],
        status:false
    }

    loadSeries=()=>{
        var request='api/series';
        var url = Global.urlSeries + request;
        axios.get(url).then(response=>{
            this.setState({
                status:true,
                series:response.data
            })
        })


    }

    componentDidMount=()=>{
        this.loadSeries();
    }
    componentDidUpdate=(oldProps)=>{
        if(this.props.idequipo != oldProps.idequipo){
            this.loadSeries();
        }
    }


    render() {
        return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                <NavLink className="nav-link" to='/'>Series</NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item active">
                            <NavLink className="nav-link" to='/'>Home</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to='/nuevopersonaje'>
                                Nuevo Personaje
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to='/modificarpersonaje'>
                                Modificar Personaje
                            </NavLink>
                        </li>
                        <li className="nav-item dropdown">
                            <NavLink className="nav-link dropdown-toggle" to='./hospitales' role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Series
                            </NavLink>
                            <ul className="dropdown-menu">
                                {
                                    this.state.status==true&&(
                                        this.state.series.map((serie,index)=>{
                                            var link='./detallesseries/'+ serie.idSerie;
                                            return(
                                                <li key={index}>
        
                                                    <NavLink className="dropdown-item" to={link}>
                                                        {serie.nombre}
                                                    </NavLink>
                                                    
                                                    
                                                </li>
                                            )
                                            
                                        })
                                    )
                                }
                                
                               
                            </ul>
                        </li>
                    </ul>
                    </div>
                </div>
                </nav>
        </div>
        )
    }
}
