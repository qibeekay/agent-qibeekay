import React, { useState } from "react";
import { motion } from "motion/react";
import {
  Plus,
  LogOut,
  Edit2,
  Trash2,
  Eye,
  Shield,
  Database,
  RefreshCw,
  AlertTriangle,
  Loader2,
} from "lucide-react";
import { useProjects, useAuth } from "../../hooks/useProjects";
import ProjectForm from "./ProjectForm";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const {
    projects,
    loading,
    error,
    deleteProject,
    createProject,
    updateProject,
    fetchProjects,
  } = useProjects();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState<any>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleCreate = async (data: any, image?: File) => {
    const result = await createProject(data, image);
    if (result.success) {
      setShowForm(false);
    }
    return result;
  };

  const handleUpdate = async (data: any, image?: File) => {
    if (!editingProject)
      return { success: false, error: "No project selected" };

    const result = await updateProject(editingProject._id, data, image);
    if (result.success) {
      setEditingProject(null);
    }
    return result;
  };

  const handleDelete = async (id: string) => {
    const result = await deleteProject(id);
    if (result.success) {
      setDeletingId(null);
    }
  };

  if (loading && !projects.length) {
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center">
        <div className="flex items-center gap-3 text-neutral-400">
          <Loader2 className="w-6 h-6 animate-spin" />
          <span className="font-mono">LOADING CONTROL PANEL...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-200">
      {/* Header */}
      <header className="bg-neutral-900/50 border-b border-white/10 p-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-red-600">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">
                OPERATIVE CONTROL
              </h1>
              <p className="text-xs text-neutral-500 font-mono">
                CLEARANCE: LEVEL OMEGA
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => fetchProjects()}
              className="flex items-center gap-2 px-4 py-2 border border-white/10 text-white font-mono text-sm hover:border-red-500 hover:text-red-500 transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              SYNC
            </button>
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-2 px-4 py-2 border border-white/10 text-white font-mono text-sm hover:border-red-500 hover:text-red-500 transition-colors"
            >
              <Eye className="w-4 h-4" />
              VIEW PORTFOLIO
            </button>
            <button
              onClick={logout}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-mono text-sm transition-colors"
            >
              <LogOut className="w-4 h-4" />
              LOGOUT
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-neutral-900/50 border border-white/10 p-6">
            <p className="text-neutral-500 text-sm font-mono mb-2">
              TOTAL OPERATIONS
            </p>
            <p className="text-3xl font-bold text-white">{projects.length}</p>
          </div>
          <div className="bg-neutral-900/50 border border-white/10 p-6">
            <p className="text-neutral-500 text-sm font-mono mb-2">
              ACTIVE STATUS
            </p>
            <p className="text-3xl font-bold text-green-500">
              {projects.filter((p) => p.status === "Active").length}
            </p>
          </div>
          <div className="bg-neutral-900/50 border border-white/10 p-6">
            <p className="text-neutral-500 text-sm font-mono mb-2">FEATURED</p>
            <p className="text-3xl font-bold text-yellow-500">
              {projects.filter((p) => p.featured).length}
            </p>
          </div>
          <div className="bg-neutral-900/50 border border-white/10 p-6">
            <p className="text-neutral-500 text-sm font-mono mb-2">
              LAST UPDATE
            </p>
            <p className="text-lg font-bold text-white font-mono">
              {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Projects Table */}
        <div className="bg-neutral-900/30 border border-white/10">
          <div className="p-6 border-b border-white/10 flex justify-between items-center">
            <h2 className="text-xl font-bold text-white">PROJECT DATABASE</h2>
            <button
              onClick={() => setShowForm(true)}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-mono text-sm transition-colors"
            >
              <Plus className="w-4 h-4" />
              NEW OPERATION
            </button>
          </div>

          {error ? (
            <div className="p-8 text-center">
              <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <p className="text-red-400 font-mono mb-4">{error}</p>
              <button
                onClick={() => fetchProjects()}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-mono text-sm"
              >
                RETRY
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left p-4 font-mono text-xs text-neutral-500">
                      ID
                    </th>
                    <th className="text-left p-4 font-mono text-xs text-neutral-500">
                      TITLE
                    </th>
                    <th className="text-left p-4 font-mono text-xs text-neutral-500">
                      TYPE
                    </th>
                    <th className="text-left p-4 font-mono text-xs text-neutral-500">
                      STATUS
                    </th>
                    <th className="text-left p-4 font-mono text-xs text-neutral-500">
                      TECH
                    </th>
                    <th className="text-left p-4 font-mono text-xs text-neutral-500">
                      ACTIONS
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {projects.map((project) => (
                    <tr
                      key={project._id}
                      className="border-b border-white/5 hover:bg-white/5"
                    >
                      <td className="p-4 font-mono text-sm">{project.id}</td>
                      <td className="p-4">
                        <div>
                          <p className="font-bold text-white">
                            {project.title}
                          </p>
                          <p className="text-xs text-neutral-500 truncate max-w-xs">
                            {project.description}
                          </p>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="text-xs font-mono text-neutral-400">
                          {project.type}
                        </span>
                      </td>
                      <td className="p-4">
                        <span
                          className={`text-xs font-mono px-2 py-1 ${
                            project.status === "Active"
                              ? "text-green-500 bg-green-500/10"
                              : project.status === "Completed"
                                ? "text-blue-500 bg-blue-500/10"
                                : "text-neutral-500 bg-neutral-500/10"
                          }`}
                        >
                          {project.status}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex flex-wrap gap-1">
                          {project.tech.slice(0, 3).map((tech) => (
                            <span
                              key={tech}
                              className="text-xs font-mono text-neutral-500 bg-white/5 px-2 py-1"
                            >
                              {tech}
                            </span>
                          ))}
                          {project.tech.length > 3 && (
                            <span className="text-xs font-mono text-neutral-500">
                              +{project.tech.length - 3}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setEditingProject(project)}
                            className="p-2 border border-white/10 hover:border-blue-500 hover:text-blue-500 transition-colors"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setDeletingId(project._id)}
                            className="p-2 border border-white/10 hover:border-red-500 hover:text-red-500 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      {/* Modals */}
      {showForm && (
        <ProjectForm
          onSubmit={handleCreate}
          onCancel={() => setShowForm(false)}
        />
      )}

      {editingProject && (
        <ProjectForm
          project={editingProject}
          onSubmit={handleUpdate}
          onCancel={() => setEditingProject(null)}
        />
      )}

      {/* Delete Confirmation Modal */}
      {deletingId && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-neutral-900 border border-white/10 p-6 max-w-md w-full">
            <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white text-center mb-2">
              CONFIRM DELETION
            </h3>
            <p className="text-neutral-400 text-center mb-6">
              This operation cannot be undone. The project file will be
              permanently erased.
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setDeletingId(null)}
                className="px-6 py-2 border border-white/10 text-white font-mono text-sm hover:border-neutral-500 hover:text-neutral-500 transition-colors"
              >
                ABORT
              </button>
              <button
                onClick={() => handleDelete(deletingId)}
                className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white font-mono text-sm transition-colors"
                disabled={loading}
              >
                {loading ? "DELETING..." : "CONFIRM ERASURE"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
