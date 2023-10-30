import React, { Component } from 'react';
import Global from '../Global';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

export default class DetallesEquipo extends Component {
    state={
        serie:[],
        status:false,
        link:''
    }
   

    findSerie=()=>{
        var request='api/series/'+ this.props.idserie;
        var url=Global.urlSeries+request;
        axios.get(url).then(response=>{
            this.setState({
                status:true,
                serie:response.data
            })
        })
    }
    componentDidMount=()=>{
        this.findSerie();
        this.setState({
            link:'/personajes/'+this.props.idserie
        })
    }
    componentDidUpdate=(oldProps)=>{
        if(this.props.idserie != oldProps.idserie){
            this.findSerie();
            this.setState({
                link:'/jugadores/'+this.props.idequipo
            })
        }
    }
    render() {
        return (
        <div>
            
            {
                this.state.status==true&&(                   
                        
                    <div className='position-absolute top-50 start-50 translate-middle text-center'>
                        <h1>{this.state.serie.nombre}</h1>
                        <img src={this.state.serie.imagen} style={{width:'150px',height:'150px'}}/>
                        <h2>IMBD: {this.state.serie.puntuacion}</h2>

                        <NavLink to={this.state.link} className={'btn btn-info'} style={{marginRight:'10px'}}>Personajes</NavLink>
                        {/* <NavLink to='/' className={'btn btn-dark'}>Volver</NavLink> */}
                    </div>                       
                    
                   
                )
            }

        </div>
        )
    }
}
