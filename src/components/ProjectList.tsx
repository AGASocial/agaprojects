import React, { useState } from 'react';
import { ExternalLink, Trash2, ChevronDown, ChevronRight, Edit2 } from 'lucide-react';
import { BoltProject } from '../types';
import { InstructionList } from './InstructionList';
import { ConfirmDialog } from './ConfirmDialog';
import { ProjectEditForm } from './ProjectEditForm';
import { Modal } from './Modal';

interface ProjectListProps {
  projects: BoltProject[];
  onDeleteProject: (id: string) => void;
  onAddInstruction: (projectId: string, content: string) => void;
  onDeleteInstruction: (projectId: string, instructionId: string) => void;
  onUpdateProject: (projectId: string, updates: { name: string; url: string; netlifyUrl: string; description: string }) => void;
  onUpdateInstruction: (projectId: string, instructionId: string, content: string) => void;
}

export function ProjectList({
  projects,
  onDeleteProject,
  onAddInstruction,
  onDeleteInstruction,
  onUpdateProject,
  onUpdateInstruction,
}: ProjectListProps) {
  const [expandedProject, setExpandedProject] = React.useState<string | null>(null);
  const [projectToDelete, setProjectToDelete] = useState<BoltProject | null>(null);
  const [projectToEdit, setProjectToEdit] = useState<BoltProject | null>(null);

  const handleProjectClick = (projectId: string) => {
    setExpandedProject(expandedProject === projectId ? null : projectId);
  };

  const openProject = (url: string) => {
    window.open(url, '_blank');
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const sortedProjects = [...projects].sort((a, b) => b.updatedAt - a.updatedAt);

  return (
    <div className="space-y-4">
      {sortedProjects.map((project) => (
        <div key={project.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => handleProjectClick(project.id)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  {expandedProject === project.id ? (
                    <ChevronDown className="h-5 w-5" />
                  ) : (
                    <ChevronRight className="h-5 w-5" />
                  )}
                </button>
                <div className="flex-grow">
                  <h3 className="text-lg font-medium text-gray-900">{project.name}</h3>
                  <div className="space-y-1">
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 hover:text-blue-800 hover:underline flex items-center gap-1"
                    >
                      {project.url}
                      <ExternalLink className="h-3 w-3 inline" />
                    </a>
                    {project.netlifyUrl && (
                      <a
                        href={project.netlifyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-green-600 hover:text-green-800 hover:underline flex items-center gap-1"
                      >
                        {project.netlifyUrl}
                        <ExternalLink className="h-3 w-3 inline" />
                      </a>
                    )}
                  </div>
                  {project.description && (
                    <p className="text-sm text-gray-600 mt-2">{project.description}</p>
                  )}
                  <p className="text-xs text-gray-500 mt-2">
                    Last updated: {formatDate(project.updatedAt)}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setProjectToEdit(project)}
                  className="text-gray-600 hover:text-gray-700"
                  title="Edit project"
                >
                  <Edit2 className="h-5 w-5" />
                </button>
                <button
                  onClick={() => openProject(project.url)}
                  className="text-blue-600 hover:text-blue-700"
                  title="Open project"
                >
                  <ExternalLink className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setProjectToDelete(project)}
                  className="text-red-600 hover:text-red-700"
                  title="Delete project"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
          {expandedProject === project.id && (
            <div className="border-t border-gray-200 p-4">
              <InstructionList
                projectId={project.id}
                instructions={project.instructions}
                onAddInstruction={onAddInstruction}
                onDeleteInstruction={onDeleteInstruction}
                onUpdateInstruction={onUpdateInstruction}
              />
            </div>
          )}
        </div>
      ))}

      <ConfirmDialog
        isOpen={!!projectToDelete}
        onClose={() => setProjectToDelete(null)}
        onConfirm={() => {
          if (projectToDelete) {
            onDeleteProject(projectToDelete.id);
            setProjectToDelete(null);
          }
        }}
        title="Delete Project"
        message={`Are you sure you want to delete "${projectToDelete?.name}"? This action cannot be undone.`}
      />

      <Modal
        isOpen={!!projectToEdit}
        onClose={() => setProjectToEdit(null)}
        title="Edit Project"
        size="lg"
      >
        {projectToEdit && (
          <ProjectEditForm
            project={projectToEdit}
            onSubmit={(updates) => {
              onUpdateProject(projectToEdit.id, updates);
              setProjectToEdit(null);
            }}
            onClose={() => setProjectToEdit(null)}
          />
        )}
      </Modal>
    </div>
  );
}