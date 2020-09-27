import React from 'react';
import './App.css';
import { DEFAULT_DIMENSION } from './constants';
import Grid from "./Grid";

const App = () => {
    const grid = new Array(DEFAULT_DIMENSION);

    for (let i = 0; i < grid.length; i++) {
        grid[i] = Array.from({length: DEFAULT_DIMENSION}, () => Math.round(Math.random()));
    }

    return (
        <Grid grid={grid} dimension={DEFAULT_DIMENSION} />
    )
}

export default App;
