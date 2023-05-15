import expenses from './expenses';
import expensesGroups from './expensesGroups';
import users from './users';
import auth from './auth';

const secureRoutes = {
  expenses,
  expensesGroups,
  users,
};

const nonSecureRoutes = {
  auth,
};

export { secureRoutes, nonSecureRoutes };
