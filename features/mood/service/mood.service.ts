import { api } from "@/libs/axios";
import { Mood } from "@/types";
import AsyncStorage from "@react-native-async-storage/async-storage";

export class MoodService {
    static async postMoodThisDay(scale: number) {
        try {
            const response = await api.post('/moods',{
                scale: scale
            });
            return response.data;
        } catch (error) {
            console.error('Error posting mood for today:', error);
            throw new Error('Failed to post mood for today');
        }
    }

    static async getMoodThisDay() {

    }

    static async getMoodWeeklyHistory() {
        try {
            const response = await api.get('/moods/me/weekly');
            return response.data.payload.moods as Mood[];
        } catch (error) {
            console.error('Error fetching mood history:', error);
            throw new Error('Failed to fetch mood history');
        }
    }

    static async getMoodMonthlyHistory() {
        try {
            const response = await api.get('/moods/me/monthly');
            return response.data;
        } catch (error) {
            console.error('Error fetching mood history:', error);
            throw new Error('Failed to fetch mood history');
        }
    }
}