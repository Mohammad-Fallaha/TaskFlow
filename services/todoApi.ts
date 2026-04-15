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

export const addTodo = async (newTodo: string) => {
  const response = await axios.post(`${BASE_URL}/todos/add`, {
    todo: newTodo,
    completed: false,
    userId: 1,
  });

  return response.data;
};