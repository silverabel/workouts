import { IonHeader, IonTitle, IonToolbar } from "@ionic/react";

interface ContainerProps {
    title: string;
}

const HeaderComponent: React.FC<ContainerProps> = ({ title }) => {
    return (
        <IonHeader>
            <IonToolbar color="primary">
                <IonTitle className="ion-text-center">{ title }</IonTitle>
            </IonToolbar>
        </IonHeader>
    );
};

export default HeaderComponent;
