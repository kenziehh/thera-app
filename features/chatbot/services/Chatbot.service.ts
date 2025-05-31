import { api } from "@/libs/axios";
import { Channel, Message } from "@/types";

export class ChatBotService {
    static async postChat(content: string, channelId?: string) {
        try {
            const response = await api.post("/chat-bots/channels/messages", {
                content: content,
                channel_id: channelId
            });
            console.log("success",response)
            return response.data.payload as {
                message: Message;
                channel: Channel;
            }
        } catch (error: any) {
            console.log("error",error.response.data)
            throw error.response.data.payload.error
        }
    }
}