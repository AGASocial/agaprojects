import React, { useState } from 'react';
import { Instruction } from '../types';

interface InstructionEditFormProps {
  instruction: Instruction;
  onSubmit: (content: string) => void;
  onClose: () => void;
}

export function InstructionEditForm({
  instruction,
  onSubmit,
  onClose,
}: InstructionEditFormProps) {
  const [content, setContent] = useState(instruction.content);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim()) {
      onSubmit(content);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="instruction-content" className="block text-sm font-medium text-gray-700">
          Instruction Content
        </label>
        <textarea
          id="instruction-content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white p-2"
          rows={4}
        />
      </div>
      <div className="flex justify-end pt-4">
        <button
          type="button"
          onClick={onClose}
          className="mr-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Save Changes
        </button>
      </div>
    </form>
  );
}