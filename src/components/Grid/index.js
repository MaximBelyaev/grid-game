// @flow
import React from 'react';
import Cell from "../Cell";
import './Grid.css';

import type { GridStructure, HandleCellClick } from '../../types';
import type { AbstractComponent } from 'react';

type Props = {
    grid: GridStructure,
    handleClick: HandleCellClick,
}

const Grid = ({ handleClick, grid }: Props) => (
    <div className='game-grid' onClick={handleClick}>
        {
            grid.map((row, rowIndex) => (
                <div className='game-grid__row' key={`${rowIndex}`}>
                    {
                        row.map((value, colIndex) => (
                                <Cell
                                    rowIndex={rowIndex}
                                    colIndex={colIndex}
                                    value={value}
                                    key={`${rowIndex}-${colIndex}`}
                                />)
                        )
                    }
                </div>
            ))
        }
    </div>
)

export default (React.memo<Props>(Grid): AbstractComponent<Props>);
