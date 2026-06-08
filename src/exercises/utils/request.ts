import axios, {
  type AxiosError,
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from "axios";

export interface ApiResponse<T = unknown> {
  code: number;
  msg?: string;
  data: T;
}

const service: AxiosInstance = axios.create({
  baseURL: "/api",
  timeout: 10000,
});

service.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  config.headers["Content-Type"] ??= "application/json"; // config.headers["Content-Type"] ? config.headers["Content-Type"] : "application/json"
  return config;
});

service.interceptors.response.use(
  (res: AxiosResponse<ApiResponse<unknown>>) => {
    const code = res.data.code ?? 200;

    if (code !== 200) {
      return Promise.reject(new Error(res.data.msg || "request error"));
    }

    return res;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

export async function request<T = unknown>(
  config: AxiosRequestConfig,
): Promise<ApiResponse<T>> {
  const res = await service<ApiResponse<T>>(config);
  return res.data;
}

export async function requestData<T = unknown>(
  config: AxiosRequestConfig,
): Promise<T> {
  const res = await service<ApiResponse<T>>(config);
  return res.data.data;
}
