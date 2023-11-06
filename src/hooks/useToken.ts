import { useContext } from 'react';
import { AuthContext } from '@/components/Contexts';

const useToken = () => {
    const { authToken, setAuthToken } = useContext(AuthContext);

    return { authToken, setAuthToken };
};

export default useToken;
