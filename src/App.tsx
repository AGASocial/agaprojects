import React, { useState, useEffect } from 'react';
import { ProjectForm } from './components/ProjectForm';
import { ProjectList } from './components/ProjectList';
import { ProjectActions } from './components/ProjectActions';
import { Notification } from './components/Notification';
import { Modal } from './components/Modal';
import { BoltProject } from './types';
import {
  getProjects,
  addProject,
  deleteProject,
  addInstruction,
  deleteInstruction,
  importProjects,
  updateProject,
  updateInstruction,
} from './utils/storage';
import { Zap } from 'lucide-react';

declare global {
  interface Window {
    importProjects: typeof importProjects;
  }
}
window.importProjects = importProjects;

function App() {
  const [projects, setProjects] = useState<BoltProject[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notification, setNotification] = useState<{
    message: string;
    type: 'success' | 'error';
  } | null>(null);

  useEffect(() => {
    setProjects(getProjects());
  }, []);

  const handleAddProject = (url: string, netlifyUrl: string, name: string, description: string) => {
    addProject(url, netlifyUrl, name, description);
    setProjects(getProjects());
    setNotification({
      message: 'Project added successfully',
      type: 'success'
    });
  };

  const handleDeleteProject = (id: string) => {
    deleteProject(id);
    setProjects(getProjects());
    setNotification({
      message: 'Project deleted successfully',
      type: 'success'
    });
  };

  const handleUpdateProject = (projectId: string, updates: { name: string; url: string; netlifyUrl: string; description: string }) => {
    updateProject(projectId, updates);
    setProjects(getProjects());
    setNotification({
      message: 'Project updated successfully',
      type: 'success'
    });
  };

  const handleAddInstruction = (projectId: string, content: string) => {
    addInstruction(projectId, content);
    setProjects(getProjects());
  };

  const handleUpdateInstruction = (projectId: string, instructionId: string, content: string) => {
    updateInstruction(projectId, instructionId, content);
    setProjects(getProjects());
    setNotification({
      message: 'Instruction updated successfully',
      type: 'success'
    });
  };

  const handleDeleteInstruction = (projectId: string, instructionId: string) => {
    deleteInstruction(projectId, instructionId);
    setProjects(getProjects());
  };

  const handleImport = (result: { success: boolean; message: string }) => {
    if (result.success) {
      setProjects(getProjects());
    }
    setNotification({
      message: result.message,
      type: result.success ? 'success' : 'error',
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto py-8 px-4">
        <div className="flex flex-col items-center mb-8">
          <div className="flex items-center mb-4">
            <Zap className="h-8 w-8 text-blue-600 mr-2" />
            <h1 className="text-3xl font-bold text-gray-900">AGA Projects</h1>
          </div>
          <div className="w-full flex justify-end">
            <ProjectActions
              projects={projects}
              onImport={handleImport}
              onAddClick={() => setIsModalOpen(true)}
            />
          </div>
        </div>
        
        {projects.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No projects yet. Add your first bolt.new project above!</p>
          </div>
        ) : (
          <ProjectList
            projects={projects}
            onDeleteProject={handleDeleteProject}
            onAddInstruction={handleAddInstruction}
            onDeleteInstruction={handleDeleteInstruction}
            onUpdateProject={handleUpdateProject}
            onUpdateInstruction={handleUpdateInstruction}
          />
        )}

        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Add New Project"
          size="lg"
        >
          <ProjectForm
            onSubmit={handleAddProject}
            onClose={() => setIsModalOpen(false)}
          />
        </Modal>

        {notification && (
          <Notification
            message={notification.message}
            type={notification.type}
            onClose={() => setNotification(null)}
          />
        )}
      </div>
    </div>
  );
}

export default App;