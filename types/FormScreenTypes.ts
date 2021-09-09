import { Dispatch, SetStateAction } from 'react';
import { Bet } from './BetTypes';

export type Ref = {
    animate: (name: string, timer: number) => void;
};

export type RootStackParamList = {
    Home: undefined;
    HomeTabs: undefined;
    Newbet: undefined;
    Cart: any;
};

export interface SStyles {
    opacity: number;
    elevation: number;
};

export interface ScreenProps {
    stateStyle: SStyles;
    setScreen: Dispatch<SetStateAction<string>>;
    navigation: any;
};

export interface SignUpProps {
    stateStyle: SStyles;
    visible: boolean;
    setVisible: Dispatch<SetStateAction<boolean>>;
    setScreen: Dispatch<SetStateAction<string>>;
    navigation: any;
};
