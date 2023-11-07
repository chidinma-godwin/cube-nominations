import { useContext, useLayoutEffect } from 'react';
import { AuthContext } from '@/components/Contexts';

const useToken = () => {
    const { authToken, setAuthToken } = useContext(AuthContext);

    useLayoutEffect(() => {
        setAuthToken(localStorage.getItem('token'));
    }, [setAuthToken]);

    return { authToken, setAuthToken };
};

export default useToken;
