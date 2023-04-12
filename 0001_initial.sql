CREATE TABLE IF NOT EXISTS user_account (
  user_account_id UUID NOT NULL PRIMARY KEY,
  username VARCHAR(50) NOT NULL,
  password VARCHAR(60) NOT NULL,
  email VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS expense (
  expense_id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS expense_group (
  expense_group_id SERIAL PRIMARY KEY,
  user_account_id UUID NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  total_budget INT NOT NULL,
  CONSTRAINT user_account_id
    FOREIGN KEY(user_account_id)
    REFERENCES user_account(user_account_id)
);

CREATE TABLE IF NOT EXISTS expense_group_expense (
  expense_id INT REFERENCES expense(expense_id),
  expense_group_id INT REFERENCES expense_group(expense_group_id),
  balance DECIMAL NOT NULL,
  due_date DATE NOT NULL,
  is_paid BOOLEAN NOT NULL,
  note VARCHAR(200),
  PRIMARY KEY (expense_id, expense_group_id)
);	

INSERT INTO user_account (user_account_id, username, password, email)
VALUES ('973ad0cc-8709-4913-b6ad-43db8645e521', 'alaneicker', 'rEK1ecacw.7.c', 'alaneicker@gmail.com');

INSERT INTO expense (name)
VALUES ('Mortgage'),
       ('Day Care'),
       ('Jeep Payment'),
       ('Ford Payment'),
       ('ComEd'),
       ('Nicor'),
       ('Water Bill'),
       ('T-Mobile'),
       ('Xfinity'),
       ('College Funds'),
       ('Groceries'),
       ('Gas'),
       ('Gym');

INSERT INTO expense_group (user_account_id, start_date, end_date, total_budget)
VALUES ('973ad0cc-8709-4913-b6ad-43db8645e521', '2023-04-01', '2023-04-15', 5200);

INSERT INTO expense_group_expense (expense_id, expense_group_id, balance, due_date, is_paid)
VALUES (1, 1, 150.45, '2023-5-22', false)