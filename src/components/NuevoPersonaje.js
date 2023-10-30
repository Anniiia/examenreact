import React, { Component } from 'react'
import Global from '../Global';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

export default class CreateApuesta extends Component {
    state={
        status:false,
        series:[],
        serie:0,
        status_serie:false
    }

    nombre=React.createRef();
    imagen=React.createRef();
    serie=React.createRef();


    insertPersonaje=(e)=>{
        e.preventDefault();
        var nombre=this.nombre.current.value;
        var imagen=this.imagen.current.value;
        var serie=parseInt(this.serie.current.value);

      

        this.setState({
            serie:serie
        })
        //console.log(serie);
        
        var apuesta={
            idPersonaje:0,
            nombre:nombre,
            imagen:imagen,
            idSerie:serie
        }

        var request='api/personajes';
        var url=Global.urlSeries+request;
        axios.post(url,apuesta).then(response=>{
            this.setState({
                status_serie:true
            })
        })


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

    render() {
        return (
        <div className='position-absolute top-50 start-50 translate-middle'>
            <h1>Nuevo Personaje</h1>
            <form>
                <label>Nombre : </label><br/>
                <input type='text' ref={this.nombre}/><br/>
                <label>Imagen : </label><br/>
                <input type='text' ref={this.imagen}/><br/>
                <label>Serie : </label><br/>
                <select ref={this.serie}>
                    {
                         this.state.status==true&&(
                            this.state.series.map((serie,index)=>{
                                return(
                                    <option key={index} value={serie.idSerie}>{serie.nombre} 
                                    </option>
                                )
                                
                            })
                        )
                    }
                </select><br/>
                <button className='btn btn-success'  onClick={this.insertPersonaje}>Nuevo Personaje</button>
            </form>
            {
                this.state.status_serie==true&&( 
                    <Navigate to={"/personajes/"+this.state.serie}/>
                )         
            }
            
        </div>
        )
    }
}
