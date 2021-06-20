import { IWorkout } from "../models/workout";

let workoutArray: IWorkout[] = [
    {
        id: 1,
        date: '2021-06-18',
        exercises: [
            {
                exerciseId: 1,
                sets: [
                    {
                        id: 1,
                        parameters: [
                            {
                                parameterId: 1,
                                value: 100,
                            },
                            {
                                parameterId: 2,
                                value: 5,
                            },
                            {
                                parameterId: 3,
                                value: 8,
                            },
                        ],
                    },
                    {
                        id: 2,
                        parameters: [
                            {
                                parameterId: 1,
                                value: 100,
                            },
                            {
                                parameterId: 2,
                                value: 5,
                            },
                            {
                                parameterId: 3,
                                value: 9,
                            },
                        ],
                    },
                    {
                        id: 3,
                        parameters: [
                            {
                                parameterId: 1,
                                value: 95,
                            },
                            {
                                parameterId: 2,
                                value: 5,
                            },
                            {
                                parameterId: 3,
                                value: 8.5,
                            },
                        ],
                    },
                ],
            },
            {
                exerciseId: 2,
                sets: [
                    {
                        id: 1,
                        parameters: [
                            {
                                parameterId: 1,
                                value: 60,
                            },
                            {
                                parameterId: 2,
                                value: 8,
                            },
                            {
                                parameterId: 3,
                                value: 7.5,
                            },
                        ],
                    },
                    {
                        id: 2,
                        parameters: [
                            {
                                parameterId: 1,
                                value: 60,
                            },
                            {
                                parameterId: 2,
                                value: 8,
                            },
                            {
                                parameterId: 3,
                                value: 8,
                            },
                        ],
                    },
                    {
                        id: 3,
                        parameters: [
                            {
                                parameterId: 1,
                                value: 60,
                            },
                            {
                                parameterId: 2,
                                value: 8,
                            },
                            {
                                parameterId: 3,
                                value: 8.5,
                            },
                        ],
                    },
                ],
            }
        ],
    },
    {
        id: 2,
        date: '2021-06-19',
        exercises: [
            {
                exerciseId: 1,
                sets: [
                    {
                        id: 1,
                        parameters: [
                            {
                                parameterId: 1,
                                value: 100,
                            },
                            {
                                parameterId: 2,
                                value: 5,
                            },
                            {
                                parameterId: 3,
                                value: 8,
                            },
                        ],
                    },
                    {
                        id: 2,
                        parameters: [
                            {
                                parameterId: 1,
                                value: 100,
                            },
                            {
                                parameterId: 2,
                                value: 5,
                            },
                            {
                                parameterId: 3,
                                value: 9,
                            },
                        ],
                    },
                    {
                        id: 3,
                        parameters: [
                            {
                                parameterId: 1,
                                value: 95,
                            },
                            {
                                parameterId: 2,
                                value: 5,
                            },
                            {
                                parameterId: 3,
                                value: 8.5,
                            },
                        ],
                    },
                ],
            },
            {
                exerciseId: 2,
                sets: [
                    {
                        id: 1,
                        parameters: [
                            {
                                parameterId: 1,
                                value: 60,
                            },
                            {
                                parameterId: 2,
                                value: 8,
                            },
                            {
                                parameterId: 3,
                                value: 7.5,
                            },
                        ],
                    },
                    {
                        id: 2,
                        parameters: [
                            {
                                parameterId: 1,
                                value: 60,
                            },
                            {
                                parameterId: 2,
                                value: 8,
                            },
                            {
                                parameterId: 3,
                                value: 8,
                            },
                        ],
                    },
                    {
                        id: 3,
                        parameters: [
                            {
                                parameterId: 1,
                                value: 60,
                            },
                            {
                                parameterId: 2,
                                value: 8,
                            },
                            {
                                parameterId: 3,
                                value: 8.5,
                            },
                        ],
                    },
                ],
            }
        ],
    },
];

let workoutIndex = 3;

const getWorkouts = (): IWorkout[] => {
    return workoutArray;
}

const getWorkout = (id: number): IWorkout | null => {
    return workoutArray.find(workout => workout.id === id) || null;
}

const deleteWorkout = (id: number): void => {
    const workout = workoutArray.find(workout => workout.id === id);
    if (!workout) return;

    workoutArray.splice(workoutArray.indexOf(workout), 1);
}

const saveWorkout = (workout: IWorkout): void => {
    if (!workout.id) {
        workout.id = workoutIndex++;

        workoutArray.push(workout);
    }
    else {
        workoutArray[workout.id - 1] = workout;
    }
}

const WorkoutService = {
    getWorkouts,
    getWorkout,
    deleteWorkout,
    saveWorkout,
}

export default WorkoutService;