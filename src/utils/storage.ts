import { BoltProject, Instruction } from '../types';

const STORAGE_KEY = 'bolt_projects';

export const getProjects = (): BoltProject[] => {
  const projects = localStorage.getItem(STORAGE_KEY);
  return projects ? JSON.parse(projects) : [];
};

export const saveProjects = (projects: BoltProject[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
};

export const addProject = (url: string, netlifyUrl: string, name: string, description: string) => {
  const projects = getProjects();
  const newProject: BoltProject = {
    id: crypto.randomUUID(),
    url,
    netlifyUrl,
    name,
    description,
    instructions: [],
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };
  projects.push(newProject);
  saveProjects(projects);
  return newProject;
};

export const updateProject = (projectId: string, updates: Partial<BoltProject>) => {
  const projects = getProjects();
  const index = projects.findIndex((p) => p.id === projectId);
  if (index !== -1) {
    projects[index] = {
      ...projects[index],
      ...updates,
      updatedAt: Date.now(),
    };
    saveProjects(projects);
    return projects[index];
  }
  return null;
};

export const deleteProject = (projectId: string) => {
  const projects = getProjects();
  const filteredProjects = projects.filter((p) => p.id !== projectId);
  saveProjects(filteredProjects);
};

export const addInstruction = (projectId: string, content: string) => {
  const projects = getProjects();
  const project = projects.find((p) => p.id === projectId);
  if (project) {
    const newInstruction: Instruction = {
      id: crypto.randomUUID(),
      content,
      timestamp: Date.now(),
    };
    project.instructions.push(newInstruction);
    project.updatedAt = Date.now();
    saveProjects(projects);
    return newInstruction;
  }
  return null;
};

export const updateInstruction = (projectId: string, instructionId: string, content: string) => {
  const projects = getProjects();
  const project = projects.find((p) => p.id === projectId);
  if (project) {
    const instruction = project.instructions.find((i) => i.id === instructionId);
    if (instruction) {
      instruction.content = content;
      instruction.timestamp = Date.now();
      project.updatedAt = Date.now();
      saveProjects(projects);
      return instruction;
    }
  }
  return null;
};

export const deleteInstruction = (projectId: string, instructionId: string) => {
  const projects = getProjects();
  const project = projects.find((p) => p.id === projectId);
  if (project) {
    project.instructions = project.instructions.filter((i) => i.id !== instructionId);
    project.updatedAt = Date.now();
    saveProjects(projects);
  }
};

export const importProjects = (jsonData: string): { success: boolean; message: string } => {
  try {
    const data = JSON.parse(jsonData);
    
    if (!Array.isArray(data)) {
      throw new Error('Invalid JSON format: Expected an array of projects');
    }

    const validProjects = data.every((project) => {
      return (
        project.url &&
        project.name &&
        Array.isArray(project.instructions)
      );
    });

    if (!validProjects) {
      throw new Error('Invalid project format: Each project must have url, name, and instructions array');
    }

    const projects = data.map((project) => ({
      ...project,
      id: project.id || crypto.randomUUID(),
      netlifyUrl: project.netlifyUrl || '',
      description: project.description || '',
      createdAt: project.createdAt || Date.now(),
      updatedAt: project.updatedAt || Date.now(),
      instructions: project.instructions.map((instruction: any) => ({
        ...instruction,
        id: instruction.id || crypto.randomUUID(),
        timestamp: instruction.timestamp || Date.now(),
      })),
    }));

    saveProjects(projects);
    return { success: true, message: 'Projects imported successfully' };
  } catch (error) {
    return { 
      success: false, 
      message: error instanceof Error ? error.message : 'Failed to import projects' 
    };
  }
};