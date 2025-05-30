import axios, { AxiosError, CreateAxiosDefaults } from "axios";
import { BASE_URL } from "./env";
import AsyncStorage from "@react-native-async-storage/async-storage";

const createInstance = (config?: CreateAxiosDefaults) => {
    const instance = axios.create(config);

    instance.interceptors.request.use(
        async (config) => {
            let session;
            
            // if (typeof window !== "undefined") {
            //     // Client-side
            //     session = await getSession();
            // } else {
            //     // Server-side
            //     session = await getServerSession(authOptions);
            // }
            // config.headers["x-api-key"] = `Key ${process.env.NEXT_PUBLIC_API_KEY}`;
            const token = AsyncStorage.getItem("token");
            if (session) {
                config.headers[
                    "Authorization"
                ] = `Bearer ${token}`;
            }

            if (!config.headers["Content-Type"]) {
                if (config.data instanceof FormData) {
                    config.headers["Content-Type"] = "multipart/form-data";
                } else {
                    config.headers["Content-Type"] = "application/json";
                }
            }

            return config;
        },
        (error) => Promise.reject(error)
    );

    // instance.interceptors.response.use(
    //   (response) => response,
    //   (error: AxiosError) => {
    //     if (error.response?.status === 401) {
    //       // Redirect to logout route
    //       if (typeof window !== "undefined") {
    //         // Client-side redirect
    //         window.location.href = "/auth/logout";
    //       } else {
    //         // Server-side redirect
    //         return Promise.reject({
    //           redirect: "/auth/logout",
    //           message: "Unauthorized",
    //         });
    //       }
    //     }
    //     return Promise.reject(error);
    //   }
    // );

    return instance;
};

export const api = createInstance({ baseURL: BASE_URL });