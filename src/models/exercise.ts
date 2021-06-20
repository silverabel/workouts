import { IStringIndexable } from "./common";

export interface IExercise {
    id: number;
    name: string;
    parameters: IExerciseParameter[];
}

export interface IExerciseParameter extends IStringIndexable {
    id: number;
    name: string;
    display: string;
    unit: string;
    scale?: IExerciseParameterScale;
}

interface IExerciseParameterScale {
    min: number;
    max: number;
}