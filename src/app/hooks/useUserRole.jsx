import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import useAxiosPublic from './UseAxiosPublic';
import { AuthContext } from '../provider/Provider';

const useUserRole = () => {
    const {user} = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();


    const { data: userRole = [], refetch, isLoading } = useQuery({
        queryKey: ['role'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/user/${user.number}`);
            return res.data;
        }
    })


    return [userRole, refetch, isLoading];
};

export default useUserRole;