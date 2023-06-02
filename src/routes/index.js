import expenses from './expenses';
import expenseGroups from './expenseGroups';
import users from './users';
import auth from './auth';

const secureRoutes = {
  expenses,
  expenseGroups,
  users,
};

const nonSecureRoutes = {
  auth,
};

export { secureRoutes, nonSecureRoutes };
