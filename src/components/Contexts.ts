import { Dispatch, SetStateAction, createContext } from 'react';

type ModalStateType = {
    isModalOpen: boolean;
    setIsModalOpen: Dispatch<SetStateAction<boolean>>;
    nextRouteFromModal: string | null;
    setNextRouteFromModal: Dispatch<SetStateAction<string | null>>;
};

const initialModalState: ModalStateType = {
    isModalOpen: false,
    setIsModalOpen: () => {},
    nextRouteFromModal: null,
    setNextRouteFromModal: () => {},
};

export const ModalContext = createContext(initialModalState);

type AuthStateType = {
    authToken: string | null;
    setAuthToken: (authToken: string | null) => void;
};

export const initialAuthToken: AuthStateType = {
    authToken: null,
    setAuthToken: () => {},
};

export const AuthContext = createContext(initialAuthToken);
