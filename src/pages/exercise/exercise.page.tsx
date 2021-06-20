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
import { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import HeaderComponent from '../../components/header.component';
import { IExercise } from '../../models/exercise';
import ExerciseService from '../../services/exercise.service';
import { createOutline } from 'ionicons/icons';
import './exercise.page.css';

interface ExercisePageProps extends RouteComponentProps<{id: string}> {};

const ExercisePage: React.FC<ExercisePageProps> = ({ match }) => {

    const [exercise, setExercise]: [IExercise | null, any] = useState({
        id: 0,
        name: 'Exercise',
        parameters: [],
    });
    const [exerciseParameters, setExerciseParameters]: [any, any] = useState();
    const [editing, setEditing]: [boolean, any] = useState(false);
    const [originalExercise, setOriginalExercise]: [IExercise | null, any] = useState(null);

    useEffect(() => {
        const exerciseId = match.url.substr(match.url.length - 1, 1);
        if (!exerciseId) return;

        setEditing(false);
        setExercise(ExerciseService.getExercise(Number(exerciseId)));
    }, [match]);

    useEffect(() => {
        if (!exercise) return;

        setExerciseParameters(exercise.parameters.map(parameter => 
            editing 
                ?
                    <IonItemGroup key={ parameter.id }>
                        <IonItem key={ 'name' + parameter.id } lines="inset">
                            <IonLabel position="stacked">Name:</IonLabel>
                            <IonInput required value={ parameter.name } onIonChange={(e) => editExercise(parameter.id, 'name', e)} />
                        </IonItem>
                        <IonItem key={ 'unit' + parameter.id } lines="inset">
                            <IonLabel position="stacked">Unit:</IonLabel>
                            <IonInput value={ parameter.unit } onIonChange={(e) => editExercise(parameter.id, 'unit', e)} />
                        </IonItem>
                        <IonItem key={ 'display' + parameter.id } lines="full">
                            <IonLabel position="stacked">Display:</IonLabel>
                            <IonInput value={ parameter.display } onIonChange={(e) => editExercise(parameter.id, 'display', e)} />
                        </IonItem>
                    </IonItemGroup>
                :
                    <IonItem key={ 'parameter' + parameter.id } lines="none">
                        <IonLabel>
                            <span className="name">{ parameter.name }</span>
                            {
                                parameter.unit && 
                                <span>{ 'Unit: ' + parameter.unit }</span>
                            }
                            {
                                parameter.display &&
                                <span>{ 'Display: ' + parameter.display }</span>
                            }
                            {
                                parameter.scale && 
                                <span>{ `Scale: ${parameter.scale.min} - ${parameter.scale.max}` }</span>
                            }
                        </IonLabel>
                    </IonItem>
        ));
    }, [exercise, editing]);

    const editExercise = (parameterId: number, parameterField: string, e: any): void => {
        if (!exercise) return;

        let changedExercise = exercise;
        changedExercise.parameters[parameterId - 1][parameterField] = e.detail.value;
        setExercise(changedExercise);
    }

    const onEditButtonClick = (): void => {
        setEditing(true);
        setOriginalExercise(JSON.parse(JSON.stringify(exercise)));
    }

    const onSaveExerciseButtonClick = (): void => {
        if (!exercise) return;

        ExerciseService.saveExercise(exercise);

        setEditing(false);
        setOriginalExercise(null);
    }

    const onCancelButtonClick = (): void => {
        setExercise(originalExercise);
        setEditing(false);
    }

    return (
        <IonPage>
            <HeaderComponent title={ exercise && exercise.name || 'Exercise' } />
            <IonContent fullscreen>
                <IonList>
                    <IonListHeader lines="full">
                        <IonLabel>Parameters</IonLabel>
                    </IonListHeader>
                    { exerciseParameters }
                    
                </IonList>
                { 
                    editing && 
                    <div className="ion-padding">
                        <IonButton color="dark" expand="block" onClick={onSaveExerciseButtonClick}>Save</IonButton>
                        <IonButton color="dark" expand="block" onClick={onCancelButtonClick}>Cancel</IonButton>
                    </div>    
                }
                <IonFab vertical="bottom" horizontal="end" slot="fixed">
                    <IonFabButton color="dark" onClick={onEditButtonClick} disabled={editing}>
                        Edit
                    </IonFabButton>
                </IonFab>
            </IonContent>
        </IonPage>
    );
};

export default ExercisePage;
