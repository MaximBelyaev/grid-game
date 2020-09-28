// @flow
import React from 'react';
import './Cell.css';
import { STATUS_ALIVE } from '../../constants';

import type { AbstractComponent } from 'react';

type Props = {
    rowIndex: number,
    colIndex: number,
    value: number,
}

export const getCellClass = (value: number): string => value === STATUS_ALIVE ? 'game-cell_alive' : 'game-cell_dead';

const Cell = ({rowIndex, colIndex, value}: Props): React$Node => (
    <div
        data-row={rowIndex}
        data-col={colIndex}
        data-value={value}
        className={`game-cell ${getCellClass(value)}`}
    />
)

export default (React.memo<Props>(Cell): AbstractComponent<Props>);
