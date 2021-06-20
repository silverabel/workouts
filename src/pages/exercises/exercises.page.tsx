import {
    IonContent, IonItem,
    IonLabel,
    IonList,
    IonPage
} from '@ionic/react';
import { useEffect, useState } from 'react';
import HeaderComponent from '../../components/header.component';
import { IExercise } from '../../models/exercise';
import ExerciseService from '../../services/exercise.service';
import './exercises.css';

const ExercisesPage: React.FC = () => {

    const [exercises, setExercises]: [IExercise[], any] = useState(ExerciseService.getExercises());

    const exercisesList = exercises.map(exercise => 
        <IonItem key={ 'exercise' + exercise.id } routerLink={ 'exercise/' + exercise.id } lines="full">
            <IonLabel>{ exercise.name }</IonLabel>
        </IonItem>
    );

    return (
        <IonPage>
            <HeaderComponent title="Exercises" />
            <IonContent fullscreen>
                <IonList>
                    { exercisesList }
                </IonList>
            </IonContent>
        </IonPage>
    );
};

export default ExercisesPage;
