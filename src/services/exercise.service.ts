import { IExercise } from "../models/exercise";

let exerciseArray: IExercise[] = [
    {
        id: 1,
        name: 'Squat',
        parameters: [
            {
                id: 1,
                name: 'Weight',
                display: '',
                unit: 'kg',
            },
            {
                id: 2,
                name: 'Repetitions',
                display: 'x',
                unit: '',
            },
            {
                id: 3,
                name: 'Rate of perceived exertion',
                display: '@RPE',
                unit: '',
                scale: {
                    min: 1,
                    max: 10,
                }
            },
        ],
    },
    {
        id: 2,
        name: 'Bench press',
        parameters: [
            {
                id: 1,
                name: 'Weight',
                display: '',
                unit: 'kg',
            },
            {
                id: 2,
                name: 'Repetitions',
                display: 'x',
                unit: '',
            },
            {
                id: 3,
                name: 'Rate of perceived exertion',
                display: '@RPE',
                unit: '',
                scale: {
                    min: 1,
                    max: 10,
                }
            },
        ],
    },
];

let exerciseIndex = 3;


const getExercises = (): IExercise[] => {
    return exerciseArray;
}

const getExercise = (id: number): IExercise | null => {
    return exerciseArray.find(exercise => exercise.id === id) || null;
}

const saveExercise = (exercise: IExercise) => {
    if (!exercise.id) {
        exercise.id = exerciseIndex++;

        exerciseArray.push(exercise);
    }
    else {
        exerciseArray[exercise.id - 1] = exercise;
    }
}

const ExerciseService = {
    getExercises,
    getExercise,
    saveExercise,
};

export default ExerciseService;