import { IExercise, IExerciseParameter } from "./exercise";

export interface IWorkout {
    id: number;
    date: string;
    exercises: IWorkoutExercise[];
}

export interface IWorkoutExercise {
    exerciseId: number;
    sets: IWorkoutSet[];
    exerciseObject?: IExercise;
}

export interface IWorkoutSet {
    id: number;
    parameters: IWorkoutSetParameter[];
}

export interface IWorkoutSetParameter {
    parameterId: number;
    value: number;
    parameterObject?: IExerciseParameter;
}