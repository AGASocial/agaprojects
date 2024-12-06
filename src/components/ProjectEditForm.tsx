import React, { useState } from 'react';
import { BoltProject } from '../types';

interface ProjectEditFormProps {
  project: BoltProject;
  onSubmit: (updates: { name: string; url: string; netlifyUrl: string; description: string }) => void;
  onClose: () => void;
}

export function ProjectEditForm({ project, onSubmit, onClose }: ProjectEditFormProps) {
  const [name, setName] = useState(project.name);
  const [url, setUrl] = useState(project.url);
  const [netlifyUrl, setNetlifyUrl] = useState(project.netlifyUrl || '');
  const [description, setDescription] = useState(project.description || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && url) {
      onSubmit({ name, url, netlifyUrl, description });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="edit-name" className="block text-sm font-medium text-gray-700">
          Project Name
        </label>
        <input
          type="text"
          id="edit-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white p-3 text-base"
          required
        />
      </div>
      <div>
        <label htmlFor="edit-url" className="block text-sm font-medium text-gray-700">
          Bolt.new URL
        </label>
        <input
          type="url"
          id="edit-url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white p-3 text-base"
          required
        />
      </div>
      <div>
        <label htmlFor="edit-netlify-url" className="block text-sm font-medium text-gray-700">
          Netlify URL
        </label>
        <input
          type="url"
          id="edit-netlify-url"
          value={netlifyUrl}
          onChange={(e) => setNetlifyUrl(e.target.value)}
          className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white p-3 text-base"
          placeholder="https://your-site.netlify.app"
        />
      </div>
      <div>
        <label htmlFor="edit-description" className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <p className="mt-1 text-sm text-gray-500">
          Provide a detailed description of your project and its purpose.
        </p>
        <textarea
          id="edit-description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white p-3 text-base"
          rows={6}
          placeholder="Project description..."
        />
      </div>
      <div className="flex justify-end pt-6">
        <button
          type="button"
          onClick={onClose}
          className="mr-3 px-4 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2.5 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Save Changes
        </button>
      </div>
    </form>
  );
}