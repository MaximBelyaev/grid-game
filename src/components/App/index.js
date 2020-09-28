// @flow
import React from 'react';
import './App.css';
import { DEFAULT_DIMENSION } from '../../constants';
import Game from "../Game";
import { createGrid, randomGridCallback } from "../../helpers/gridHelper";
import type { Node } from 'react';

const App = (): Node => (
    <div className="app">
        <Game grid={createGrid(DEFAULT_DIMENSION, randomGridCallback)} dimension={DEFAULT_DIMENSION}/>
    </div>
)

export default App;
