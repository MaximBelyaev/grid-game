// @flow
import React from 'react';
import './Cell.css';
import { STATUS_ALIVE } from '../constants';
import type { AbstractComponent } from 'react';

type Props = {
    rowIndex: number,
    colIndex: number,
    value: number,
    onClick: (number, number, number) => void,
}

export const getCellClass = (value: number): string => value === STATUS_ALIVE ? 'game-cell_alive' :'game-cell_dead';

const Cell = ({ rowIndex, colIndex, value, onClick }: Props): React$Node => {
    const handleCellClick = (): void => {
        onClick(rowIndex, colIndex, value)
    }

    return (
       <div
           className={`game-cell ${getCellClass(value)}`}
           onClick={handleCellClick}
       />
    );
}

export default (React.memo<Props>(Cell): AbstractComponent<Props>);
