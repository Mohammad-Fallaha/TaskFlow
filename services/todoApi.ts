import axios from "axios";

const BASE_URL = "https://dummyjson.com";

export type Todo = {
  id: number;
  todo: string;
  completed: boolean;
  userId: number;
};

// GET
export const getTodos = async (): Promise<Todo[]> => {
  const res = await axios.get(`${BASE_URL}/todos`);
  return res.data.todos;
};

// ADD (API فقط للتجربة، لكن رح نستخدم الكاش)
export const addTodoApi = async (text: string): Promise<Todo> => {
  const res = await axios.post(`${BASE_URL}/todos/add`, {
    todo: text,
    completed: false,
    userId: 1,
  });

  return res.data;
};