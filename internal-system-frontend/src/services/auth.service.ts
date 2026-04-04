import { apiCall } from "@/lib/api-client";

export interface IUserData {
  id: string;
  name: string;
  email: string;
  phone: string;
}

export interface IAuthResponse {
  message: string;
  user?: IUserData;
}

export interface ISignInRequest {
  email: string;
  password: string;
}

export interface ISignUpRequest {
  name: string;
  email: string;
  password: string;
  phone: string;
}

export interface IUpdateProfileRequest {
  name?: string;
  email?: string;
  phone?: string;
}

export interface IUpdateProfileResponse {
  message: string;
  user: IUserData;
}

export const authService = {
  async signIn(data: ISignInRequest): Promise<IAuthResponse> {
    const res = await fetch("/api/auth/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await res.json();
    
    if (!res.ok) {
      throw result;
    }
    
    return result as IAuthResponse;
  },

  async signUp(data: ISignUpRequest): Promise<{ message: string }> {
    return apiCall<{ message: string }>("/auth/signup", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  async getProfile(): Promise<IUserData> {
    return apiCall<IUserData>("/auth/profile", {
      method: "GET",
    });
  },

  async updateProfile(data: IUpdateProfileRequest): Promise<IUpdateProfileResponse> {
    return apiCall<IUpdateProfileResponse>("/auth/profile", {
      method: "PUT",
      body: JSON.stringify(data),
    });
  },

  async logout(): Promise<{ message: string }> {
    return apiCall<{ message: string }>("/auth/logout", {
      method: "POST",
    });
  }
};
