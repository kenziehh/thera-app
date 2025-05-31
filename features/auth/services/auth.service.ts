import { api } from "@/libs/axios";
import { Doctor } from "@/types";
import AsyncStorage from "@react-native-async-storage/async-storage";

export class AuthService {
    static async getSession() {
        const response = await api.get('/doctors/sessions');
        console.log(response.data)
        return response.data.payload.doctor as Doctor;
    }

    static async getToken() {   
        const token = await AsyncStorage.getItem("token")
        return token
    }
    static async setUser(user: any) {
        AsyncStorage.setItem('user', JSON.stringify(user));
    }

    static async clearUser() {
        AsyncStorage.removeItem('user');
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
           
            return response.data.payload.access_token as string;
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