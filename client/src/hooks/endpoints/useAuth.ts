import { authApi } from "@/api/endpoints/auth";
import { clearAuth, setAuth } from "@/store/auth-slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { authTracker } from "@/utils/authTracker";
import { handleApiError } from "@/utils/helperFunction";
import { startSilentRefresh, stopSilentRefresh } from "@/utils/token-timer";
import { ChangePasswordFormData } from "@/utils/types";
import { LoginSchema, RegisterSchema } from "@/utils/validationSchema";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useRegister = () => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  const router = useRouter();

  return useMutation({
    mutationFn: (form: RegisterSchema) => authApi.registerUser(form),

    onSuccess: (data) => {
      toast.success(data.message);

      // Update Redux state with user data
      if (data.success && data.user) {
        dispatch(
          setAuth({
            user: data.user,
          })
        );

        queryClient.invalidateQueries({ queryKey: ["authstatus"] });

        router.push("/dashboard");
      }
    },

    onError: (error: unknown) => {
      const message = handleApiError(error);
      toast.error(message);
    },
  });
};

export const useLogin = () => {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (form: LoginSchema) => authApi.loginUser(form),

    onSuccess: (data) => {
      toast.success(data.message);

      // Update Redux state with user data
      if (data.success && data.user) {
        dispatch(
          setAuth({
            user: data.user,
          })
        );
        authTracker.setAuthenticated();
        startSilentRefresh();
        queryClient.invalidateQueries({ queryKey: ["authstatus"] });

        router.push("/dashboard");
      }
    },

    onError: (error: unknown) => {
      const message = handleApiError(error);
      toast.error(message);
    },
  });
};

export const useLogout = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => authApi.logoutUser(),
    onSuccess: (data) => {
      toast.success(data.message);

      dispatch(clearAuth());
      authTracker.clearAuthenticated();
      stopSilentRefresh();
      queryClient.clear();

      router.push("/login");
    },

    onError: (error: unknown) => {
      const message = handleApiError(error);
      toast.error(message);
    },
  });
};

export const useCheckAuth = () => {
  const dispatch = useAppDispatch();
  return useQuery({
    queryKey: ["authstatus"],
    queryFn: async () => {
      try {
        const data = await authApi.checkAuthStatus();

        if (data.user) {
          dispatch(
            setAuth({
              user: data.user,
            })
          );
          authTracker.setAuthenticated();
          startSilentRefresh();
        } else {
          dispatch(clearAuth());
          authTracker.clearAuthenticated();
        }

        return data;
      } catch (error: any) {
        dispatch(clearAuth());
        authTracker.clearAuthenticated();
        throw error;
      }
    },
    retry: false, // Don't retry if auth check fails
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
  });
};

export const useChangePassword = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (form: ChangePasswordFormData) => authApi.changePassword(form),
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["authstatus"] });
    },

    onError: (error: unknown) => {
      const message = handleApiError(error);
      toast.error(message);
    },
  });
};

// Custom hook to easily access auth state from Redux
export const useAuthState = () => {
  const auth = useAppSelector((state) => state.auth);

  return {
    isAuthenticated: auth.isAuthenticated,
    user: auth.user,
    error: auth.error,
    status: auth.status,
  };
};
