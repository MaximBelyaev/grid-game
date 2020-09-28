// @flow
import React from 'react';
import Cell from "../Cell";
import type { GridStructure } from '../../types';

type Props = {
    grid: GridStructure,
    handleClick: () => void,
}

const Grid = ({ handleClick, grid }: Props) => (
    <div className='game-grid' onClick={handleClick}>
        {
            grid.map((row, rowIndex) => (
                <div className='game-grid__row' key={`${rowIndex}`}>
                    {
                        row.map((value, colIndex) => {
                            return (
                                <Cell
                                    rowIndex={rowIndex}
                                    colIndex={colIndex}
                                    value={value}
                                    key={`${rowIndex}-${colIndex}`}
                                />)
                        })
                    }
                </div>
            ))
        }
    </div>
)

export default React.memo(Grid);
