import React, { useState, useEffect } from "react";
import { X, Upload, Loader2 } from "lucide-react";
import type { Project, CreateProjectData } from "../../types/project";

interface ProjectFormProps {
  project?: Project;
  onSubmit: (data: CreateProjectData, image?: File) => Promise<any>;
  onCancel: () => void;
}

const ProjectForm: React.FC<ProjectFormProps> = ({
  project,
  onSubmit,
  onCancel,
}) => {
  const [formData, setFormData] = useState({
    id: project?.id || "",
    title: project?.title || "",
    type: project?.type || "",
    status: project?.status || "Active",
    description: project?.description || "",
    tech: project?.tech?.join(", ") || "",
    icon: project?.icon || "Database",
    liveUrl: project?.liveUrl || "",
    githubUrl: project?.githubUrl || "",
    featured: project?.featured || false,
    order: project?.order || 0,
  });

  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (project?.imageUrl) {
      setPreview(
        `${import.meta.env.VITE_API_URL?.replace("/api", "")}${project.imageUrl}`,
      );
    }
  }, [project]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setLoading(true);

    const data: CreateProjectData = {
      ...formData,
      tech: formData.tech
        .split(",")
        .map((t) => t.trim())
        .filter((t) => t),
    };

    const result = await onSubmit(data, image || undefined);

    if (!result.success) {
      if (result.validationErrors) {
        const newErrors: Record<string, string> = {};
        result.validationErrors.forEach((err: any) => {
          newErrors[err.param] = err.msg;
        });
        setErrors(newErrors);
      } else {
        setErrors({ general: result.error || "An error occurred" });
      }
    }

    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-neutral-900 border border-white/10 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-neutral-900 border-b border-white/10 p-6 flex justify-between items-center">
          <h2 className="text-xl font-bold text-white">
            {project ? "UPDATE PROJECT FILE" : "CREATE NEW OPERATION"}
          </h2>
          <button
            onClick={onCancel}
            className="text-neutral-400 hover:text-white"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {errors.general && (
            <div className="p-4 bg-red-950/30 border border-red-500/20">
              <p className="text-red-400 text-sm">{errors.general}</p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-mono text-neutral-500 mb-2">
                PROJECT_ID *
              </label>
              <input
                type="text"
                value={formData.id}
                onChange={(e) =>
                  setFormData({ ...formData, id: e.target.value })
                }
                className="w-full bg-neutral-950 border border-white/10 px-4 py-2 text-white font-mono text-sm"
                placeholder="OP-001"
                required
                disabled={!!project}
              />
              {errors.id && (
                <p className="text-red-400 text-xs mt-1">{errors.id}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-mono text-neutral-500 mb-2">
                TITLE *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="w-full bg-neutral-950 border border-white/10 px-4 py-2 text-white font-mono text-sm"
                placeholder="Project Title"
                required
              />
              {errors.title && (
                <p className="text-red-400 text-xs mt-1">{errors.title}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-xs font-mono text-neutral-500 mb-2">
                TYPE *
              </label>
              <select
                value={formData.type}
                onChange={(e) =>
                  setFormData({ ...formData, type: e.target.value })
                }
                className="w-full bg-neutral-950 border border-white/10 px-4 py-2 text-white font-mono text-sm"
                required
              >
                <option value="">Select Type</option>
                <option value="Full Stack">Full Stack</option>
                <option value="Frontend">Frontend</option>
                <option value="Backend">Backend</option>
                <option value="Mobile">Mobile</option>
                <option value="Desktop">Desktop</option>
              </select>
              {errors.type && (
                <p className="text-red-400 text-xs mt-1">{errors.type}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-mono text-neutral-500 mb-2">
                STATUS
              </label>
              <select
                value={formData.status}
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.value as any })
                }
                className="w-full bg-neutral-950 border border-white/10 px-4 py-2 text-white font-mono text-sm"
              >
                <option value="Active">Active</option>
                <option value="Completed">Completed</option>
                <option value="Archived">Archived</option>
                <option value="Declassified">Declassified</option>
                <option value="Restricted">Restricted</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono text-neutral-500 mb-2">
                ICON
              </label>
              <select
                value={formData.icon}
                onChange={(e) =>
                  setFormData({ ...formData, icon: e.target.value })
                }
                className="w-full bg-neutral-950 border border-white/10 px-4 py-2 text-white font-mono text-sm"
              >
                <option value="Database">Database</option>
                <option value="Layout">Layout</option>
                <option value="Terminal">Terminal</option>
                <option value="Code">Code</option>
                <option value="Server">Server</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-neutral-500 mb-2">
              DESCRIPTION *
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full bg-neutral-950 border border-white/10 px-4 py-2 text-white font-mono text-sm h-32"
              placeholder="Project description..."
              required
            />
            {errors.description && (
              <p className="text-red-400 text-xs mt-1">{errors.description}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-mono text-neutral-500 mb-2">
              TECH STACK (comma separated) *
            </label>
            <input
              type="text"
              value={formData.tech}
              onChange={(e) =>
                setFormData({ ...formData, tech: e.target.value })
              }
              className="w-full bg-neutral-950 border border-white/10 px-4 py-2 text-white font-mono text-sm"
              placeholder="React, Node.js, MongoDB"
              required
            />
            {errors.tech && (
              <p className="text-red-400 text-xs mt-1">{errors.tech}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-mono text-neutral-500 mb-2">
                LIVE URL
              </label>
              <input
                type="url"
                value={formData.liveUrl}
                onChange={(e) =>
                  setFormData({ ...formData, liveUrl: e.target.value })
                }
                className="w-full bg-neutral-950 border border-white/10 px-4 py-2 text-white font-mono text-sm"
                placeholder="https://project.com"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-neutral-500 mb-2">
                GITHUB URL
              </label>
              <input
                type="url"
                value={formData.githubUrl}
                onChange={(e) =>
                  setFormData({ ...formData, githubUrl: e.target.value })
                }
                className="w-full bg-neutral-950 border border-white/10 px-4 py-2 text-white font-mono text-sm"
                placeholder="https://github.com/user/project"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-xs font-mono text-neutral-500 mb-2">
                ORDER
              </label>
              <input
                type="number"
                value={formData.order}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    order: parseInt(e.target.value) || 0,
                  })
                }
                className="w-full bg-neutral-950 border border-white/10 px-4 py-2 text-white font-mono text-sm"
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="featured"
                checked={formData.featured}
                onChange={(e) =>
                  setFormData({ ...formData, featured: e.target.checked })
                }
                className="w-4 h-4"
              />
              <label
                htmlFor="featured"
                className="text-xs font-mono text-neutral-500"
              >
                FEATURED PROJECT
              </label>
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-neutral-500 mb-2">
              PROJECT IMAGE
            </label>
            <div className="border-2 border-dashed border-white/10 p-6 text-center">
              {preview ? (
                <div className="relative">
                  <img
                    src={preview}
                    alt="Preview"
                    className="max-h-48 mx-auto mb-4"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setPreview("");
                      setImage(null);
                    }}
                    className="absolute top-2 right-2 bg-red-600 text-white p-1"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="py-8">
                  <Upload className="w-12 h-12 text-neutral-500 mx-auto mb-4" />
                  <p className="text-neutral-400 text-sm mb-2">
                    Drag & drop or click to upload
                  </p>
                  <p className="text-neutral-500 text-xs">
                    PNG, JPG, GIF up to 5MB
                  </p>
                </div>
              )}
              <input
                type="file"
                onChange={handleImageChange}
                accept="image/*"
                className="hidden"
                id="image-upload"
              />
              <label
                htmlFor="image-upload"
                className="inline-block px-4 py-2 bg-white/5 hover:bg-white/10 text-white font-mono text-sm cursor-pointer transition-colors"
              >
                SELECT IMAGE
              </label>
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-6 border-t border-white/10">
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-2 border border-white/10 text-white font-mono text-sm hover:border-red-500 hover:text-red-500 transition-colors"
              disabled={loading}
            >
              CANCEL
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white font-mono text-sm flex items-center gap-2 transition-colors"
              disabled={loading}
            >
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              {project ? "UPDATE FILE" : "CREATE OPERATION"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectForm;
