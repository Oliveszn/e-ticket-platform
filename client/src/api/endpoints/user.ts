import { AuthResponse, User, UserResponse } from "@/utils/types";
import apiClient from "../client";
//api/users /profile /edit /delete

export const userApi = {
  getUserProfile: async () => {
    const { data } = await apiClient.get<UserResponse>(`/api/users/profile`);
    return data.data;
  },

  editUserProfile: async (payload: User) => {
    const response = await apiClient.put<AuthResponse>(
      `/api/users/edit`,
      payload
    );
    return response.data;
  },

  deleteUserProfile: async () => {
    const response = await apiClient.delete(`api/users/delete`);
    return response.data;
  },
};
