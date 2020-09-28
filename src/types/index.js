// @flow
export type GridStructure = Array<Array<number>>;

// Game types
export type HandleCellClick = { target : Object } => void;
export type HandleClearButtonClick = () => void;
export type HandleStartButtonClick = () => void;
export type HandleStopButtonClick = () => void;
export type IsRunning = boolean;
