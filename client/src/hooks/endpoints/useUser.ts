"use client";
import { userApi } from "@/api/endpoints/user";
import { User } from "@/utils/types";
import {
  useMutation,
  useMutationState,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

///GET USER PROFILE
export const useProfile = () => {
  return useQuery({
    queryKey: ["getProfile"],
    queryFn: () => userApi.getUserProfile(),
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
    retry: 2,
  });
};

export const useDeleteProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => userApi.deleteUserProfile(),

    onSuccess: (data) => {
      // Remove from cache
      queryClient.removeQueries({
        queryKey: ["getProfile"],
      });
    },

    onError: (error: any) => {
      throw error;
    },
  });
};

export const useEditProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ payload }: { userId: string; payload: User }) =>
      userApi.editUserProfile(payload),

    onSuccess: (data, variables) => {
      // Invalidate the specific user's profile
      queryClient.invalidateQueries({
        queryKey: ["getProfile"],
      });

      // Or update the cache directly (optimistic update)
      queryClient.setQueryData(["getProfile"], data);
    },
    onError: (error) => {
      throw error;
    },
  });
};
