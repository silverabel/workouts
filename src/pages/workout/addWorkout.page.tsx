import { 
    IonButton,
    IonContent,
    IonFab,
    IonFabButton,
    IonIcon,
    IonInput,
    IonItem,
    IonItemGroup,
    IonLabel,
    IonList,
    IonListHeader,
    IonPage,
} from '@ionic/react';
import { actionSheetController } from '@ionic/core';
import { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import HeaderComponent from '../../components/header.component';
import { IExercise } from '../../models/exercise';
import ExerciseService from '../../services/exercise.service';
import { createOutline } from 'ionicons/icons';
import { IWorkout, IWorkoutExercise, IWorkoutSet, IWorkoutSetParameter } from '../../models/workout';
import WorkoutService from '../../services/workout.service';


const AddWorkoutPage: React.FC<RouteComponentProps> = ({ history }) => {

    const [workout, setWorkout]: [IWorkout, any] = useState({
        id: 0,
        date: '',
        exercises: [],
    });

    const [exercises, setExercises]: [IWorkoutExercise[], any] = useState([]);
    const [exercisesList, setExercisesList]: [any, any] = useState();

    useEffect(() => {
        setExercisesList(exercises.map(exercise => {
            const exerciseObject = exercise.exerciseObject;
            if (!exerciseObject) return;

            const setsList = exercise.sets.map(set => {
                const parametersList = set.parameters.map(parameter => {
                    const parameterObject = parameter.parameterObject;
                    if (!parameterObject) return;

                    return (
                        <IonItem>
                            <IonLabel>{ parameterObject.name }</IonLabel>
                            <IonInput onIonInput={(e) => setParameterValue(exercise, set, parameter)} value={ parameter.value } />
                        </IonItem>
                    );
                })

                return (
                    <IonItemGroup>
                        { parametersList }
                    </IonItemGroup>
                );
            });

            return (
                <IonList>
                    <IonListHeader>
                        <IonLabel>{ exerciseObject.name }</IonLabel>
                    </IonListHeader>
                    { setsList }
                    <div className="ion-padding">
                        <IonButton color="dark" onClick={() => {onAddSetButtonClick(exercise)}}>Add set</IonButton>
                    </div>
                </IonList>
            );
        }));
    }, [exercises]);

    const setParameterValue = (exercise: IWorkoutExercise, set: IWorkoutSet, parameter: IWorkoutSetParameter) => {

    }

    const setDate = (e: any): void => {
        workout.date = e.detail.value;
    }

    const onAddSetButtonClick = (exercise: IWorkoutExercise): void => {
        const exerciseObject = exercise.exerciseObject;
        if (!exerciseObject) return;

        const parameters: IWorkoutSetParameter[] = [];
        for (const parameter of exerciseObject.parameters) {
            parameters.push({
                parameterId: parameter.id,
                value: 0,
                parameterObject: parameter,
            });
        }
        
        const set: IWorkoutSet = {
            id: Math.floor(Math.random() * 1000),
            parameters,
        };

        const exercisesCopy: IWorkoutExercise[] = JSON.parse(JSON.stringify(exercises));
        const index = exercises.indexOf(exercise);
        exercise.sets.push(set);
        exercisesCopy[index] = exercise;
        setExercises(exercisesCopy);
    }

    const addExercise = (exercise: IExercise) => {
        let exercisesCopy: IWorkoutExercise[] = JSON.parse(JSON.stringify(exercises));
        exercisesCopy.push({
            exerciseId: exercise.id,
            sets: [],
            exerciseObject: exercise,
        });

        setExercises(exercisesCopy);
    }

    const onAddExerciseButtonClick = async () => {
        const exercises = ExerciseService.getExercises();
        const actionSheetButtons = exercises.map(exercise => {
            return {
                text: exercise.name,
                handler: () => {addExercise(exercise)},
            };
        });

        const actionSheet = await actionSheetController.create({
            header: 'Choose exercise to add',
            buttons: actionSheetButtons,
        });

        await actionSheet.present();
    }

    const onSaveWorkoutButtonClick = (): void => {
        WorkoutService.saveWorkout(workout);

        history.push('/workouts')
    }

    return (
        <IonPage>
            <HeaderComponent title="Add workout" />
            <IonContent fullscreen>
                <IonItemGroup>
                    <IonLabel position="stacked">Date</IonLabel>
                    <IonInput onIonChange={(e) => setDate(e)}></IonInput>
                </IonItemGroup>
                <IonList>
                    { exercisesList }
                </IonList>
                <div className="ion-padding">
                    <IonButton color="dark" expand="block" onClick={onAddExerciseButtonClick}>Add exercise</IonButton>
                </div>
                <div className="ion-padding">
                    <IonButton color="dark" expand="block" onClick={onSaveWorkoutButtonClick}>Save workout</IonButton>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default AddWorkoutPage;
