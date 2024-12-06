export interface Instruction {
  id: string;
  content: string;
  timestamp: number;
}

export interface BoltProject {
  id: string;
  url: string;
  netlifyUrl: string;
  name: string;
  description: string;
  instructions: Instruction[];
  createdAt: number;
  updatedAt: number;
}