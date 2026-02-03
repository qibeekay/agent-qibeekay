export interface Project {
  _id: string;
  id: string;
  title: string;
  type: string;
  status: "Active" | "Completed" | "Archived" | "Declassified" | "Restricted";
  description: string;
  tech: string[];
  icon: string;
  imageUrl?: string;
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProjectData {
  id: string;
  title: string;
  type: string;
  status?: Project["status"];
  description: string;
  tech: string[] | string;
  icon?: string;
  image?: File;
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
  order?: number;
}

export interface UpdateProjectData extends Partial<CreateProjectData> {
  image?: File;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface AuthResponse {
  message: string;
  token: string;
  user: { username: string };
}

export interface ApiError {
  message: string;
  errors?: Array<{ msg: string; param: string }>;
  error?: string;
}
