import {
  AuthResponse,
  AuthState,
  ChangePasswordFormData,
  ChangePasswordResponse,
  LoginFormData,
  RegisterFormData,
} from "@/utils/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { AxiosError } from "axios";

const initialState: AuthState = {
  status: "idle",
  isAuthenticated: false,
  error: null,
  user: null,
  accessToken: null,
  refreshToken: null,
};

const handleApiError = (error: unknown): string => {
  if (error instanceof AxiosError) {
    return error.response?.data?.message || error.message;
  }
  if (error instanceof Error) {
    return error.message;
  }
  return "An unexpected error occurred";
};

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const registerUser = createAsyncThunk(
  "auth/register",
  async (formData: RegisterFormData, { rejectWithValue }) => {
    try {
      const response = await axios.post<AuthResponse>(
        `${apiUrl}/api/auth/register`,
        formData,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (formData: LoginFormData, { rejectWithValue }) => {
    try {
      const response = await axios.post<AuthResponse>(
        `${apiUrl}/api/auth/login`,
        formData,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${apiUrl}/api/auth/logout`,
        {},
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const refreshTokenThunk = createAsyncThunk(
  "auth/refreshToken",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${apiUrl}/api/auth/refresh-token`,
        {},
        {
          withCredentials: true,
        }
      );

      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data || "Failed to refresh token");
    }
  }
);

export const checkAuthStatus = createAsyncThunk(
  "auth/checkStatus",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${apiUrl}/api/auth/me`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const changePassword = createAsyncThunk(
  "auth/changePassword",
  async (formData: ChangePasswordFormData, { rejectWithValue }) => {
    try {
      const response = await axios.patch<ChangePasswordResponse>(
        `${apiUrl}/api/auth/change-password`,
        formData,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 400) {
          return rejectWithValue(
            error.response.data.message || "Invalid password"
          );
        }
        if (error.response?.status === 401) {
          return rejectWithValue("Session expired. Please login again");
        }
        return rejectWithValue(error.response?.data?.message || error.message);
      }
      return rejectWithValue("Network error. Please try again");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.status = "idle";
      state.isAuthenticated = false;
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      ////REGISTER USER
      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;
        state.isAuthenticated = action.payload.success;
        state.user = action.payload.success ? action.payload.user : null;
        // Store tokens if your backend sends them
        if (action.payload.accessToken) {
          state.accessToken = action.payload.accessToken;
        }
        if (action.payload.refreshToken) {
          state.refreshToken = action.payload.refreshToken;
        }
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "failed";
        state.user = null;
        state.isAuthenticated = false;
        state.error = action.payload as string;
      })
      /////LOGIN USER
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;
        state.isAuthenticated = action.payload.success;
        state.user = action.payload.success ? action.payload.user : null;
        // Store tokens if your backend sends them
        if (action.payload.accessToken) {
          state.accessToken = action.payload.accessToken;
        }
        if (action.payload.refreshToken) {
          state.refreshToken = action.payload.refreshToken;
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.user = null;
        state.isAuthenticated = false;
        state.error = action.payload as string;
      })
      ////LOGOUT USER
      .addCase(logoutUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.status = "succeeded";
        state.user = null;
        state.isAuthenticated = false;
        state.accessToken = null;
        state.refreshToken = null;
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })

      ///REFRESH TOKEN
      .addCase(refreshTokenThunk.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(refreshTokenThunk.fulfilled, (state, action) => {
        state.status = "succeeded";
        if (action.payload.accessToken) {
          state.accessToken = action.payload.accessToken;
        }
        if (action.payload.refreshToken) {
          state.refreshToken = action.payload.refreshToken;
        }
        // Update auth status if tokens are refreshed successfully
        state.isAuthenticated = true;
      })
      .addCase(refreshTokenThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
        // Clear auth state if refresh fails
        state.isAuthenticated = false;
        state.user = null;
        state.accessToken = null;
        state.refreshToken = null;
      })

      ///CHECK AUTH STATUS
      .addCase(checkAuthStatus.pending, (state) => {
        state.status = "loading";
      })
      .addCase(checkAuthStatus.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.isAuthenticated = true;
        state.user = action.payload.user;
        if (action.payload.accessToken) {
          state.accessToken = action.payload.accessToken;
        }
        if (action.payload.refreshToken) {
          state.refreshToken = action.payload.refreshToken;
        }
      })
      .addCase(checkAuthStatus.rejected, (state) => {
        state.status = "succeeded"; // Not failed - just not authenticated
        state.isAuthenticated = false;
        state.user = null;
        state.accessToken = null;
        state.refreshToken = null;
      })

      // CHANGE PASSWORD
      .addCase(changePassword.pending, (state: any) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(changePassword.fulfilled, (state: any, action: any) => {
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(changePassword.rejected, (state: any, action: any) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
