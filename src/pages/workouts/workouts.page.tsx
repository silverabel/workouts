import { IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonNote, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { add, addOutline, addSharp } from 'ionicons/icons';
import { useState } from 'react';
import HeaderComponent from '../../components/header.component';
import { IWorkout } from '../../models/workout';
import WorkoutService from '../../services/workout.service';
import './workouts.css';

const WorkoutsPage: React.FC = () => {

    const sortWorkouts = (a: IWorkout, b: IWorkout): any => {
        return a.date > b.date ? -1 : 1;
    }

    const [workouts, setWorkouts]: [IWorkout[], any] = useState(WorkoutService.getWorkouts().sort(sortWorkouts));

    const workoutsList = workouts.map(workout => 
        <IonItem key={ 'workout' + workout.id } routerLink={ 'workout/' + workout.id } lines="full">
            <IonLabel slot="">
                <span>#{ workout.id }</span>
            </IonLabel>
            <IonNote slot="end">
                <span>{ workout.date }</span>
            </IonNote>
        </IonItem>
    );

    return (
        <IonPage>
            <HeaderComponent title="Workouts" />
            <IonContent fullscreen>
                <IonList>
                    { workoutsList }
                </IonList>
                <IonFab vertical="bottom" horizontal="end" slot="fixed">
                    <IonFabButton color="dark" routerLink="workout/add">
                        <IonIcon icon={ add } />
                    </IonFabButton>
                </IonFab>
            </IonContent>
        </IonPage>
    );
};

export default WorkoutsPage;
