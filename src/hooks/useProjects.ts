import { useState, useEffect, useCallback } from "react";
import type {
  CreateProjectData,
  LoginCredentials,
  Project,
  UpdateProjectData,
} from "../types/project";
import { projectApi } from "../api/api";

export const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProjects = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await projectApi.getAllProjects();
      setProjects(data);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to fetch projects");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const createProject = async (data: CreateProjectData, image?: File) => {
    try {
      setLoading(true);
      const response = await projectApi.createProject(data, image);
      await fetchProjects(); // Refresh the list
      return { success: true, data: response.project };
    } catch (err: any) {
      return {
        success: false,
        error: err.response?.data?.message || "Failed to create project",
        validationErrors: err.response?.data?.errors,
      };
    } finally {
      setLoading(false);
    }
  };

  const updateProject = async (
    id: string,
    data: UpdateProjectData,
    image?: File,
  ) => {
    try {
      setLoading(true);
      const response = await projectApi.updateProject(id, data, image);
      await fetchProjects(); // Refresh the list
      return { success: true, data: response.project };
    } catch (err: any) {
      return {
        success: false,
        error: err.response?.data?.message || "Failed to update project",
        validationErrors: err.response?.data?.errors,
      };
    } finally {
      setLoading(false);
    }
  };

  const deleteProject = async (id: string) => {
    try {
      setLoading(true);
      await projectApi.deleteProject(id);
      setProjects((prev) => prev.filter((project) => project._id !== id));
      return { success: true };
    } catch (err: any) {
      return {
        success: false,
        error: err.response?.data?.message || "Failed to delete project",
      };
    } finally {
      setLoading(false);
    }
  };

  return {
    projects,
    loading,
    error,
    fetchProjects,
    createProject,
    updateProject,
    deleteProject,
  };
};

export const useAuth = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setIsAuth(!!token);
    setLoading(false);
  }, []);

  const login = async (credentials: LoginCredentials) => {
    try {
      setLoading(true);
      const response = await projectApi.login(credentials);
      setIsAuth(true);
      return { success: true, data: response };
    } catch (err: any) {
      return {
        success: false,
        error: err.response?.data?.message || "Login failed",
      };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    projectApi.logout();
    setIsAuth(false);
    window.location.href = "/";
  };

  return {
    isAuthenticated: isAuth,
    loading,
    login,
    logout,
  };
};

export const useProject = (id: string) => {
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProject = useCallback(async () => {
    if (!id) return;

    try {
      setLoading(true);
      setError(null);
      const data = await projectApi.getProjectById(id);
      setProject(data);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to fetch project");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchProject();
  }, [fetchProject]);

  return {
    project,
    loading,
    error,
    refetch: fetchProject,
  };
};
