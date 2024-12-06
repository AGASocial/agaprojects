import React, { useRef } from 'react';
import { Upload } from 'lucide-react';

interface ImportButtonProps {
  onImport: (result: { success: boolean; message: string }) => void;
}

export function ImportButton({ onImport }: ImportButtonProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      try {
        const result = JSON.parse(content);
        const jsonString = JSON.stringify(result);
        const importResult = window.importProjects(jsonString);
        onImport(importResult);
      } catch (error) {
        onImport({ 
          success: false, 
          message: 'Invalid JSON file' 
        });
      }
    };
    reader.readAsText(file);

    // Reset the input so the same file can be selected again
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        accept=".json"
        onChange={handleFileChange}
        className="hidden"
      />
      <button
        onClick={() => fileInputRef.current?.click()}
        className="p-2 rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        title="Import Projects"
      >
        <Upload className="h-5 w-5" />
      </button>
    </>
  );
}