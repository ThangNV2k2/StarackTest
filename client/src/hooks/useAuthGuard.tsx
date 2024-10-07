import { useCallback, useContext, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLazyGetUserInfoQuery } from '../redux/user-api';
import { AuthContext } from '../AuthContext';

export const useAuthGuard = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [getUserInfo, { data, isSuccess, isError }] = useLazyGetUserInfoQuery();
    const { userInfo, changeUserInfo } = useContext(AuthContext);

    const token = localStorage.getItem('token');

    useEffect(() => {
        if (token) {
            getUserInfo();
        }
    }, [token, getUserInfo]);

    useEffect(() => {
        if (isSuccess && data?.result && token) {
            changeUserInfo(data.result);
            if (location.pathname === '/login') {
                navigate('/admin/user_management', { replace: true });
            }
        } 
        else {
            if (location.pathname !== '/login' && location.pathname !== '/register') {
                navigate('/login', { replace: true });
            }
        }
    }, [isSuccess, isError]);
};
