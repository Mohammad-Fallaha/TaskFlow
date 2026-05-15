let memory: any = {
  user: [],
};

export const db = {
  execSync: () => {},

  runSync: (query: string, params: any[]) => {
    if (query.includes('user')) {
      memory.user = [
        {
          id: 1,
          name: params[0],
          email: params[1],
        },
      ];
    }
  },

  getAllSync: (query: string) => {
    if (query.includes('user')) {
      return memory.user;
    }
    return [];
  },
};