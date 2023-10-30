import React, { Component } from 'react'
import Global from '../Global';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

export default class Jugadores extends Component {
    state={
        status:false,
        personajes:[]
    }

    linkBack='/detallesseries/'+this.props.idserie;


    loadPersonajes=()=>{
        var request= 'api/series/personajesserie/';
        var  url= Global.urlSeries + request + this.props.idserie;
        //console.log(url);
        axios.get(url).then(response=>{
            this.setState({
                status:true,
                personajes:response.data
            })
        })
    }
    componentDidMount=()=>{
        this.loadPersonajes();
    }
    componentDidUpdate=(oldProps)=>{
        if(this.props.idserie != oldProps.idserie){
            this.loadPersonajes();
        }
    }
    render() {

        return (
        <div>
            <NavLink to={this.linkBack} className={'btn btn-dark'}>Volver</NavLink>
            <table className='table'>
                <thead>
                    <tr>
                        <th>Personaje</th>
                        <th>Imagen</th>
                    </tr>
                    
                </thead>
                <tbody>
                    {
                        this.state.status==true&&(
                            this.state.personajes.map((personaje,index)=>{
                                var link='/detallepersonaje/'+personaje.idPersonaje;
                                return(
                                    <tr key={index}>
                                        <td>{personaje.nombre}</td>
                                        <td><img src={personaje.imagen} style={{width:'150px',height:'150px'}}/></td>
                                    </tr>                               
                                    
                                )
                                
                            })
                            
                        )
                        
                    }

                </tbody>
            </table>

        </div>
        )
    }
}
