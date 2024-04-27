import { users } from '../resolvers/user';

const resolvers = {
    Query: {
      user: () => users,
    },
  };


export { resolvers };