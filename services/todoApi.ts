import axios from "axios";

const BASE_URL = "https://dummyjson.com";

export type Todo = {
  id: number;
  todo: string;
  completed: boolean;
  userId: number;
};

type TodosResponse = {
  todos: Todo[];
  total: number;
  skip: number;
  limit: number;
};

export const getTodos = async (): Promise<Todo[]> => {
  const response = await axios.get<TodosResponse>(`${BASE_URL}/todos`);
  return response.data.todos;
};

export const addTodo = async (newTodoText: string): Promise<Todo> => {
  const response = await axios.post(`${BASE_URL}/todos/add`, {
    todo: newTodoText,
    completed: false,
    userId: 1,
  });

  return response.data;
};

export const updateTodo = async (
  id: number,
  updates: Partial<Pick<Todo, "todo" | "completed">>
): Promise<Todo> => {
  const response = await axios.put(`${BASE_URL}/todos/${id}`, updates);
  return response.data;
};

export const deleteTodo = async (
  id: number
): Promise<{ id: number; isDeleted: boolean }> => {
  const response = await axios.delete(`${BASE_URL}/todos/${id}`);
  return response.data;
};