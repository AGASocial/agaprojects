import React, { useState } from 'react';
import { Plus } from 'lucide-react';

interface ProjectFormProps {
  onSubmit: (url: string, netlifyUrl: string, name: string, description: string) => void;
  onClose?: () => void;
}

export function ProjectForm({ onSubmit, onClose }: ProjectFormProps) {
  const [url, setUrl] = useState('');
  const [netlifyUrl, setNetlifyUrl] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url && name) {
      onSubmit(url, netlifyUrl, name, description);
      setUrl('');
      setNetlifyUrl('');
      setName('');
      setDescription('');
      onClose?.();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Project Name
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white p-3 text-base"
          placeholder="My Bolt Project"
          required
        />
      </div>
      <div>
        <label htmlFor="url" className="block text-sm font-medium text-gray-700">
          Bolt.new URL
        </label>
        <input
          type="url"
          id="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white p-3 text-base"
          placeholder="https://bolt.new/..."
          required
        />
      </div>
      <div>
        <label htmlFor="netlifyUrl" className="block text-sm font-medium text-gray-700">
          Netlify URL
        </label>
        <input
          type="url"
          id="netlifyUrl"
          value={netlifyUrl}
          onChange={(e) => setNetlifyUrl(e.target.value)}
          className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white p-3 text-base"
          placeholder="https://your-site.netlify.app"
        />
      </div>
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <p className="mt-1 text-sm text-gray-500">
          Provide a detailed description of your project and its purpose.
        </p>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white p-3 text-base"
          placeholder="Project description..."
          rows={6}
        />
      </div>
      <div className="flex justify-end pt-6">
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="mr-3 px-4 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          className="inline-flex items-center px-4 py-2.5 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Project
        </button>
      </div>
    </form>
  );
}