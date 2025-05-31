import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthState {
    isAuthenticated: boolean;
    isLoading: boolean;
    checkAuth: () => Promise<void>;
    login: (token: string) => Promise<void>;
    logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
    isAuthenticated: false,
    isLoading: true,

    checkAuth: async () => {
        const token = await AsyncStorage.getItem('token');
        set({ isAuthenticated: !!token, isLoading: false });
    },

    login: async (token: string) => {
        await AsyncStorage.setItem('token', token);
        set({ isAuthenticated: true });
    },

    logout: async () => {
        await AsyncStorage.removeItem('token');
        set({ isAuthenticated: false });
    },
}));
