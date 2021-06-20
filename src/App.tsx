import { Redirect, Route } from 'react-router-dom';
import {
    IonApp,
    IonIcon,
    IonLabel,
    IonRouterOutlet,
    IonTabBar,
    IonTabButton,
    IonTabs,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import WorkoutsPage from './pages/workouts/workouts.page';
import WorkoutPage from './pages/workout/workout.page';
import ExercisesPage from './pages/exercises/exercises.page';
import ExercisePage from './pages/exercise/exercise.page';
import { barbellSharp, body, bodyOutline, bodySharp } from 'ionicons/icons';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import AddWorkoutPage from './pages/workout/addWorkout.page';

const App: React.FC = () => (
    <IonApp>
        <IonReactRouter>
            <IonTabs>
                <IonRouterOutlet>
                    <Route exact path="/workouts"     component={WorkoutsPage}  />
                    <Route exact path="/workout/:id"  component={WorkoutPage}   />
                    <Route exact path="/exercises"    component={ExercisesPage} />
                    <Route exact path="/exercise/:id" component={ExercisePage}  />
                    <Route       path="/workout/add"  component={AddWorkoutPage}/>
                    <Redirect to="/workouts" />
                </IonRouterOutlet>
                <IonTabBar slot="bottom" color="primary">
                    <IonTabButton tab="workouts" href="/workouts" layout="icon-start">
                        <IonIcon icon={ body } />
                        <IonLabel>Workouts</IonLabel>
                    </IonTabButton>
                    <IonTabButton tab="exercises" href="/exercises" layout="icon-start">
                        <IonIcon icon={ barbellSharp } />
                        <IonLabel>Exercises</IonLabel>
                    </IonTabButton>
                </IonTabBar>
            </IonTabs>
        </IonReactRouter>
    </IonApp>
);

export default App;
