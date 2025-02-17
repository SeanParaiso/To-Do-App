export type Priority = "low" | "medium" | "high";

export interface Todo {
  id: number;
  text: string;
  completed: boolean;
  priority: Priority;
  dueDate: string;
  createdAt: string;
  notes?: string;
}
