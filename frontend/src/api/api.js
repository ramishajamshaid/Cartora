import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000/api/v1",
    withCredentials: true,
});

let isRefreshing = false;
let refreshPromise = null;

api.interceptors.response.use(
    (response)=>{
        return response;
    },
    async (error)=>{
        const originalRequest = error.config;
        if(error.response?.status === 401 && 
            !originalRequest._retry &&
            !originalRequest.url.includes("/users/login") &&
            !originalRequest.url.includes("/users/refresh-token")){
            originalRequest._retry = true;
            try {
                if (!isRefreshing) {
                    isRefreshing = true;

                    console.log("Access Token Expired");

                    refreshPromise = api
                        .post("/users/refresh-token")
                        .finally(() => {
                            isRefreshing = false;
                            refreshPromise = null;
                        });
                }

                await refreshPromise;

                return api(originalRequest);

            } catch (refreshError) {
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
)

export default api;