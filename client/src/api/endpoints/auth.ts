import {
  AuthResponse,
  ChangePasswordFormData,
  ChangePasswordResponse,
} from "@/utils/types";
import apiClient from "../client";
import { LoginSchema, RegisterSchema } from "@/utils/validationSchema";

export const authApi = {
  registerUser: async (form: RegisterSchema) => {
    const response = await apiClient.post<AuthResponse>(
      `/api/auth/register`,
      form,
      {
        withCredentials: true,
      }
    );
    return response.data;
  },

  loginUser: async (form: LoginSchema) => {
    const response = await apiClient.post<AuthResponse>(
      `/api/auth/login`,
      form,
      {
        withCredentials: true,
      }
    );
    return response.data;
  },

  logoutUser: async () => {
    const response = await apiClient.post(
      `/api/auth/logout`,
      {},
      {
        withCredentials: true,
      }
    );
    return response.data;
  },

  refreshToken: async () => {
    const response = await apiClient.post(`/api/auth/refresh-token`);
    return response.data;
  },

  checkAuthStatus: async () => {
    const response = await apiClient.get(`/api/auth/me`, {
      withCredentials: true,

      // validateStatus: (status) => {
      //   // Accept both 200 (authenticated) and 401 (not authenticated) as valid responses
      //   return status === 200 || status === 401;
      // },
    });

    return response.data;
  },

  changePassword: async (form: ChangePasswordFormData) => {
    const response = await apiClient.patch<ChangePasswordResponse>(
      `/api/auth/change-password`,
      form,
      {
        withCredentials: true,
      }
    );
    return response.data;
  },
};
