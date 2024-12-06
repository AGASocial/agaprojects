import React from 'react';
import { Upload, Download, Plus } from 'lucide-react';
import { ImportButton } from './ImportButton';
import { BoltProject } from '../types';

interface ProjectActionsProps {
  projects: BoltProject[];
  onImport: (result: { success: boolean; message: string }) => void;
  onAddClick: () => void;
}

export function ProjectActions({ projects, onImport, onAddClick }: ProjectActionsProps) {
  const handleDownload = () => {
    const dataStr = JSON.stringify(projects, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'bolt-projects.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex gap-2">
      <div className="group relative">
        <ImportButton onImport={onImport} />
        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          Upload Projects
        </div>
      </div>
      <div className="group relative">
        <button
          onClick={handleDownload}
          className="p-2 rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          title="Export Projects"
        >
          <Download className="h-5 w-5" />
        </button>
        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          Download Projects
        </div>
      </div>
      <div className="group relative">
        <button
          onClick={onAddClick}
          className="p-2 rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          title="Add Project"
        >
          <Plus className="h-5 w-5" />
        </button>
        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          Add Project
        </div>
      </div>
    </div>
  );
}