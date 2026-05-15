import { useQuery } from "@tanstack/react-query";
import { getTasks } from "@/services/taskApi";

export const useTasks = () => {
  return useQuery({
    queryKey: ["tasks"],

    queryFn: getTasks,

    staleTime: 1000 * 60 * 2,
  });
};