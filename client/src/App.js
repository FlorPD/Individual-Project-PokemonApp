import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from 'react';
import LandingPage from "./components/LandingPage"
import Home from "./components/Home"
import PokemonCreator from "./components/PokemonCreator"
import Detail from "./components/Detail"


function App() {
  return (
    <BrowserRouter >
    <div className="App">
      <Routes>
        <Route exact path = "/" element={<LandingPage/>}></Route>
        <Route path = "/home" element={<Home/>}></Route>
        <Route path = "/pokemons" element={<PokemonCreator/>}></Route>
        <Route path = "/pokemons/:id" element={<Detail/>}></Route>
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
