import React, { useState } from 'react';
import { Trash2, Send, Copy, Check, Edit2 } from 'lucide-react';
import { Instruction } from '../types';
import { ConfirmDialog } from './ConfirmDialog';
import { Modal } from './Modal';
import { InstructionEditForm } from './InstructionEditForm';

interface InstructionListProps {
  projectId: string;
  instructions: Instruction[];
  onAddInstruction: (projectId: string, content: string) => void;
  onDeleteInstruction: (projectId: string, instructionId: string) => void;
  onUpdateInstruction: (projectId: string, instructionId: string, content: string) => void;
}

export function InstructionList({
  projectId,
  instructions,
  onAddInstruction,
  onDeleteInstruction,
  onUpdateInstruction,
}: InstructionListProps) {
  const [newInstruction, setNewInstruction] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [instructionToDelete, setInstructionToDelete] = useState<Instruction | null>(null);
  const [instructionToEdit, setInstructionToEdit] = useState<Instruction | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newInstruction.trim()) {
      onAddInstruction(projectId, newInstruction);
      setNewInstruction('');
    }
  };

  const handleCopy = async (content: string, id: string) => {
    try {
      await navigator.clipboard.writeText(content);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={newInstruction}
          onChange={(e) => setNewInstruction(e.target.value)}
          className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white p-2"
          placeholder="Add new instruction..."
        />
        <button
          type="submit"
          className="inline-flex items-center px-3 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
        >
          <Send className="h-4 w-4" />
        </button>
      </form>

      <ul className="space-y-2">
        {instructions.map((instruction) => (
          <li
            key={instruction.id}
            className="flex items-center justify-between bg-white p-3 rounded-md shadow-sm"
          >
            <span className="text-sm text-gray-700 flex-grow mr-4">{instruction.content}</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleCopy(instruction.content, instruction.id)}
                className={`${
                  copiedId === instruction.id
                    ? 'text-green-600 hover:text-green-700'
                    : 'text-gray-600 hover:text-gray-700'
                } transition-colors duration-200`}
                title={copiedId === instruction.id ? 'Copied!' : 'Copy to clipboard'}
              >
                {copiedId === instruction.id ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </button>
              <button
                onClick={() => setInstructionToEdit(instruction)}
                className="text-gray-600 hover:text-gray-700"
                title="Edit instruction"
              >
                <Edit2 className="h-4 w-4" />
              </button>
              <button
                onClick={() => setInstructionToDelete(instruction)}
                className="text-red-600 hover:text-red-700"
                title="Delete instruction"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </li>
        ))}
      </ul>

      <ConfirmDialog
        isOpen={!!instructionToDelete}
        onClose={() => setInstructionToDelete(null)}
        onConfirm={() => {
          if (instructionToDelete) {
            onDeleteInstruction(projectId, instructionToDelete.id);
            setInstructionToDelete(null);
          }
        }}
        title="Delete Instruction"
        message="Are you sure you want to delete this instruction? This action cannot be undone."
      />

      <Modal
        isOpen={!!instructionToEdit}
        onClose={() => setInstructionToEdit(null)}
        title="Edit Instruction"
      >
        {instructionToEdit && (
          <InstructionEditForm
            instruction={instructionToEdit}
            onSubmit={(content) => {
              onUpdateInstruction(projectId, instructionToEdit.id, content);
              setInstructionToEdit(null);
            }}
            onClose={() => setInstructionToEdit(null)}
          />
        )}
      </Modal>
    </div>
  );
}