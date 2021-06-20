import { 
    IonContent,
    IonFab,
    IonFabButton,
    IonFabList,
    IonIcon,
    IonItem,
    IonLabel,
    IonList,
    IonListHeader,
    IonPage,
} from '@ionic/react';
import { actionSheetController } from '@ionic/core';
import { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import HeaderComponent from '../../components/header.component';
import ExerciseService from '../../services/exercise.service';
import { create, createOutline, remove, trash } from 'ionicons/icons';
import { IWorkout, IWorkoutExercise } from '../../models/workout';
import WorkoutService from '../../services/workout.service';


interface WorkoutPageProps extends RouteComponentProps<{id: string}> {};

const ExercisePage: React.FC<WorkoutPageProps> = ({ match, history }) => {

    const [workout, setWorkout]: [IWorkout | null, any] = useState(WorkoutService.getWorkout(Number(match.params.id)));
    const [exercises, setExercises]: [IWorkoutExercise[] | null, any] = useState(workout && workout.exercises);
    const [exercisesLists, setExercisesLists]: [any, any] = useState();

    useEffect(() => {
        setWorkout(WorkoutService.getWorkout(Number(match.params.id)));
    }, [match]);

    useEffect(() => {
        if (!workout) return;

        let workoutCopy = JSON.parse(JSON.stringify(workout));

        let exercises: IWorkoutExercise[] = workoutCopy.exercises;
        for (let exercise of exercises) {
            const exerciseObject = ExerciseService.getExercise(exercise.exerciseId);
            if (exerciseObject) exercise.exerciseObject = exerciseObject;

            for (const set of exercise.sets) {
                for (let setParameter of set.parameters) {
                    setParameter.parameterObject = exerciseObject?.parameters.find(parameter => parameter.id === setParameter.parameterId)
                }
            }
        }

        setExercises(exercises);
    }, [workout]);

    useEffect(() => {
        if (!exercises) return;

        setExercisesLists(exercises.map(exercise => {
            const exerciseObject = exercise.exerciseObject;
            if (!exerciseObject) return;

            const setList = exercise.sets.map(set => {
                let setString = '';

                for (const parameter of set.parameters) {
                    setString += parameter.parameterObject && `${parameter.parameterObject.display}${parameter.value}${parameter.parameterObject.unit} `;
                }

                return (
                    <IonItem key={ `e${exercise.exerciseId}s${set.id}`}>
                        <IonLabel>
                            { setString }
                        </IonLabel>
                    </IonItem>
                );
            });

            return (
                <IonList>
                    <IonListHeader >
                        <IonLabel>{ exerciseObject.name }</IonLabel>
                    </IonListHeader>
                    { setList }
                </IonList>
            );
        }));
    }, [exercises]);

    const onDeleteButtonClick = async () => {
        const actionSheet = await actionSheetController.create({
            header: 'Are you sure you want to delete this workout?',
            buttons: [
                {
                    text: 'Confirm',
                    role: 'destructive',
                    handler: () => {deleteWorkout()},
                },
            ],
        });

        await actionSheet.present();
    }

    const deleteWorkout = (): void => {
        if (!workout) return;

        WorkoutService.deleteWorkout(workout.id);
        history.push('/workouts')
    }

    return (
        <IonPage>
            <HeaderComponent title={ workout && `#${workout.id} ${workout.date}` || 'Workout' } />
            <IonContent fullscreen>
                { exercisesLists }
                <IonFab vertical="bottom" horizontal="end" slot="fixed">
                    <IonFabButton color="dark" onClick={() => {}} disabled={false}>
                        Edit
                    </IonFabButton>
                    <IonFabList side="start">
                        <IonFabButton color="light">
                            <IonIcon icon={ create } />
                        </IonFabButton>
                        <IonFabButton color="light" onClick={ onDeleteButtonClick }>
                            <IonIcon icon={ trash } />
                        </IonFabButton>
                    </IonFabList>
                </IonFab>
            </IonContent>
        </IonPage>
    );
};

export default ExercisePage;
