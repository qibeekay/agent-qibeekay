import axios from "axios";
import type {
  Project,
  CreateProjectData,
  UpdateProjectData,
  LoginCredentials,
  AuthResponse,
  ApiError,
} from "../types/project";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle responses and errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear token on unauthorized
      localStorage.removeItem("authToken");
      // Redirect to login if not on login page
      if (!window.location.pathname.includes("/login")) {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  },
);

export const projectApi = {
  // Public endpoints
  getAllProjects: async (): Promise<Project[]> => {
    const response = await api.get<Project[]>("/projects");
    return response.data;
  },

  getProjectById: async (id: string): Promise<Project> => {
    const response = await api.get<Project>(`/projects/${id}`);
    return response.data;
  },

  // Admin endpoints
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>(
      "/projects/admin/login",
      credentials,
    );
    if (response.data.token) {
      localStorage.setItem("authToken", response.data.token);
    }
    return response.data;
  },

  logout: () => {
    localStorage.removeItem("authToken");
  },

  // Protected endpoints
  createProject: async (
    data: CreateProjectData,
    image?: File,
  ): Promise<{ message: string; project: Project }> => {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined) {
        if (key === "tech" && Array.isArray(value)) {
          formData.append(key, JSON.stringify(value));
        } else {
          formData.append(key, value.toString());
        }
      }
    });

    if (image) {
      formData.append("image", image);
    }

    const response = await api.post<{ message: string; project: Project }>(
      "/projects",
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      },
    );

    return response.data;
  },

  updateProject: async (
    id: string,
    data: UpdateProjectData,
    image?: File,
  ): Promise<{ message: string; project: Project }> => {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined) {
        if (key === "tech" && Array.isArray(value)) {
          formData.append(key, JSON.stringify(value));
        } else {
          formData.append(key, value.toString());
        }
      }
    });

    if (image) {
      formData.append("image", image);
    }

    const response = await api.put<{ message: string; project: Project }>(
      `/projects/${id}`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      },
    );

    return response.data;
  },

  deleteProject: async (id: string): Promise<{ message: string }> => {
    const response = await api.delete<{ message: string }>(`/projects/${id}`);
    return response.data;
  },

  // Health check
  healthCheck: async (): Promise<{ status: string; timestamp: string }> => {
    const response = await api.get("/health");
    return response.data;
  },
};

// Check if user is authenticated
export const isAuthenticated = (): boolean => {
  return !!localStorage.getItem("authToken");
};

export default api;
