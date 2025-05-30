import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function useAuth() {
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const checkLoginStatus = async () => {
            const token = await AsyncStorage.getItem('token');
            setIsAuthenticated(!!token);
            setIsLoading(false);
        };

        checkLoginStatus();
    }, []);

    return { isLoading, isAuthenticated };
}
