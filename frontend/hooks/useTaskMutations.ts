import {
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

import {
  createTask,
  updateTask,
  deleteTask,
} from '@/services/taskApi';

export const useTaskMutations = () => {
  const queryClient = useQueryClient();

  const create = useMutation({
    mutationFn: createTask,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['tasks'],
      });
    },
  });

  const update = useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: any;
    }) => updateTask(id, data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['tasks'],
      });
    },
  });

  const remove = useMutation({
    mutationFn: deleteTask,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['tasks'],
      });
    },
  });

  return {
    create,
    update,
    remove,
  };
};