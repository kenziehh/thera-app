import { api } from "@/libs/axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export class AuthService {
    static async getSession() {
        const response = await api.get('/doctors/login');
        AsyncStorage.setItem('token', response.data.payload.doctor); 
        return null;
    }

    static async getToken(){
        const token = await AsyncStorage.getItem("token")
        return token
    }
    static async setUser(user: any) {
        localStorage.setItem('user', JSON.stringify(user));
    }

    static async clearUser() {
        localStorage.removeItem('user');
    }

    static async isAuthenticated() {
        const user = await this.getToken();
        return !!user;
    }

    static async login(email: string, password: string) {
        try {
            const response = await api.post('/doctors/login', {
                email,
                password
            });
            AsyncStorage.setItem('token', response.data.payload.access_token);

        } catch (error) {
            console.error('Login error:', error);
            throw new Error('Login failed');
        }
    }
    static async logout() {
        try {
            await AsyncStorage.removeItem('token');
            await this.clearUser();
        } catch (error) {
            console.error('Logout error:', error);
            throw new Error('Logout failed');
        }
    }
}