import React, { Component } from 'react'
import Global from '../Global';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

export default class CreateApuesta extends Component {
    state={
        status:false,
        personajed:[],
        series:[], 
        seried:[],
        status_serie:false,
        personajes:[],
        status_personajes:false,
        status_s:false,
        status_p:false
    }

    serie=React.createRef();
    personaje=React.createRef();


    modificarPersonaje=(e)=>{
        e.preventDefault();

        var serie=parseInt(this.serie.current.value);
        var personaje=parseInt(this.personaje.current.value);
      
   
        this.setState({
            serie:serie
        })

        var request='api/personajes/'+personaje+'/'+serie;
        console.log(request);
        var url=Global.urlSeries+request;
        axios.put(url).then(response=>{
            this.setState({
                status_serie:true
            })
        })


    }
    loadSeries=()=>{
        var request='api/personajes';
        var url = Global.urlSeries + request;
        axios.get(url).then(response=>{
            this.setState({
                status:true,
                personajes:response.data
            })
        })


    }
    loadPersonajes=()=>{
        var request='api/series';
        var url = Global.urlSeries + request;
        axios.get(url).then(response=>{
            this.setState({
                status_personajes:true,
                series:response.data
            })
        })


    }
    componentDidMount=()=>{
        this.loadSeries();
        this.loadPersonajes();
    }

    mostrarInfoSerie=()=>{
        var serie=parseInt(this.serie.current.value);

        this.setState({
            serie:serie
        })
        var request='api/series/'+ serie;
        var url=Global.urlSeries+request;
        axios.get(url).then(response=>{
            this.setState({
                seried:response.data,
                status_s:true
            })
        })
        
    }
    mostrarInfoPersonaje=()=>{
        var personaje=parseInt(this.personaje.current.value);
        this.setState({
            personaje:personaje
        })
        var request='api/personajes/'+ personaje;
        var url=Global.urlSeries+request;
        axios.get(url).then(response=>{
            this.setState({
                personajed:response.data,
                status_p:true
            })
        })
        
    }
    // componentDidUpdate=(oldProps)=>{
    //     if(this.props.idserie != oldProps.idserie){
    //         this.loadPersonajes();
    //     }
    // }

    render() {
        return (
        <div className='position-absolute top-50 start-50 translate-middle'>
            <h1>Modificar Personaje</h1>
            <form>
                <label>Serie : </label><br/>
                <select ref={this.serie} onChange={this.mostrarInfoSerie}>
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
                <label>Personaje : </label><br/>
                <select ref={this.personaje} onChange={this.mostrarInfoPersonaje}>
                    {
                         this.state.status_personajes==true&&(
                            this.state.personajes.map((personaje,index)=>{
                                return(
                                    <option key={index} value={personaje.idPersonaje}>{personaje.nombre} 
                                    </option>
                                )
                                
                            })
                        )
                    }
                </select><br/>
                <button className='btn btn-success'  onClick={this.modificarPersonaje}>Modificar Personaje</button>
            </form>
            {
                this.state.status_s==true&&( 
                    
                    <div>
                        <h2>{this.state.seried.nombre}</h2>
                        <img src={this.state.seried.imagen} style={{width:"150px",heinght:"150px"}}/>
                    </div>
                    
                )         
            }
             {
                this.state.status_p==true&&( 
                    
                    <div>
                        <h2>{this.state.personajed.nombre}</h2>
                        <img src={this.state.personajed.imagen} style={{width:"150px",heinght:"150px"}}/>
                    </div>
                    
                )         
            }
            {
                this.state.status_serie==true&&( 
                    <Navigate to={"/personajes/"+this.state.serie}/>
                )         
            }
            
        </div>
        )
    }
}
