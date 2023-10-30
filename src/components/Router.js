import React, { Component } from 'react';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Home from './Home.js';
import "bootstrap/dist/css/bootstrap.min.css";
import $ from "jquery";
import Popper from 'popper.js';
import "bootstrap/dist/js/bootstrap.bundle";
import Menu from './Menu.js';
import DetalleSeries from './DetalleSeries.js';
import Personajes from './Personajes.js'
import NuevoPersonaje from './NuevoPersonaje.js';
import ModificarPersonaje from './ModificarPersonaje';


export default class Router extends Component {
    render() {


        function DetallesSerieElement(){
            var {idserie}= useParams();
            return(<DetalleSeries idserie={idserie}/>)
        }

        function PersonajesElement(){
            var {idserie}= useParams();
            return(<Personajes idserie={idserie}/>)
        }

        return (
        <div>
            <BrowserRouter>
                <Menu/>
                <Routes>
                    <Route path='/' element={<Home/>}/>
                    <Route path='/detallesseries/:idserie' element={<DetallesSerieElement/>}/>
                    <Route path='/personajes/:idserie' element={<PersonajesElement/>}/>
                    <Route path='/nuevopersonaje' element={<NuevoPersonaje/>}/>
                    <Route path='/modificarpersonaje' element={<ModificarPersonaje/>}/>
                </Routes>
            </BrowserRouter>
        </div>
        )
    }
}
