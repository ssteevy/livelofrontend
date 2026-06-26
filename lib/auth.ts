import { apiRequest } from "@/lib/api";

export type UserRole = "buyer" | "seller" | "livreur" | "admin";

export interface UserProfile {
  id: string;
  email: string;
  prenom?: string | null;
  nom?: string | null;
  telephone?: string | null;
  date_naissance?: string | null;
  city_id?: string | null;
  role: UserRole;
  cgu_acceptees?: boolean;
  actif?: boolean;
  created_at?: string;
  cities?: {
    id: string;
    nom: string;
    departments?: {
      id?: string;
      nom: string;
    } | null;
  } | null;
}

export interface AuthTokens {
  access_token: string;
  refresh_token: string;
}

export interface AuthResponse extends AuthTokens {
  user: UserProfile;
}

export interface CompleteRegisterPayload {
  temp_token: string;
  password: string;
  confirme_password: string;
  prenom: string;
  nom: string;
  date_naissance: string;
  telephone: string;
  city_id?: string;
  cgu_acceptees: boolean;
}

export interface City {
  id: string;
  nom: string;
  department_id: string;
  departments?: {
    nom: string;
  } | null;
}

export interface Department {
  id: string;
  nom: string;
}

export const authApi = {
  checkEmail(email: string) {
    return apiRequest<{ exists: boolean }>("/auth/check-email", {
      method: "POST",
      body: { email },
    });
  },
  initiateRegister(email: string) {
    return apiRequest<{ message: string }>("/auth/initiate", {
      method: "POST",
      body: { email },
    });
  },
  verifyOtp(email: string, otp: string) {
    return apiRequest<{ temp_token: string }>("/auth/verify-otp", {
      method: "POST",
      body: { email, otp },
    });
  },
  completeRegister(payload: CompleteRegisterPayload) {
    return apiRequest<AuthResponse>("/auth/complete-register", {
      method: "POST",
      body: payload,
    });
  },
  login(email: string, password: string) {
    return apiRequest<AuthResponse>("/auth/login", {
      method: "POST",
      body: { email, password },
    });
  },
  refresh(refreshToken: string) {
    return apiRequest<AuthTokens>("/auth/refresh", {
      method: "POST",
      body: { refresh_token: refreshToken },
    });
  },
  logout(accessToken: string) {
    return apiRequest<{ message: string }>("/auth/logout", {
      method: "POST",
      token: accessToken,
    });
  },
  forgotPassword(email: string) {
    return apiRequest<{ message: string }>("/auth/forgot-password", {
      method: "POST",
      body: { email },
    });
  },
  resetPassword(email: string, otp: string, newPassword: string, confirmPassword: string) {
    return apiRequest<{ message: string }>("/auth/reset-password", {
      method: "POST",
      body: {
        email,
        otp,
        new_password: newPassword,
        confirme_password: confirmPassword,
      },
    });
  },
  me(accessToken: string) {
    return apiRequest<UserProfile>("/auth/me", {
      token: accessToken,
    });
  },
  updateCity(accessToken: string, cityId: string) {
    return apiRequest<UserProfile>("/auth/me/city", {
      method: "PUT",
      token: accessToken,
      body: { city_id: cityId },
    });
  },
};

export const geoApi = {
  departments() {
    return apiRequest<Department[]>("/geo/departments");
  },
  citiesByDepartment(departmentId: string) {
    return apiRequest<City[]>(`/geo/departments/${departmentId}/cities`);
  },
  cities() {
    return apiRequest<City[]>("/geo/cities");
  },
};
