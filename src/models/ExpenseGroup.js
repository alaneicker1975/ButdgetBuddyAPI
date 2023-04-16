import Base from './Base';

class ExpenseGroup extends Base {
  constructor() {
    super('expense_group');
  }
  async getOne(id, cols) {
    // This method overrides the default method in Base
    // and will join the expense and expense_group tables
  }
}

export default ExpenseGroup;
