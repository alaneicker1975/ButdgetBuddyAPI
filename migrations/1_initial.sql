CREATE TABLE
  IF NOT EXISTS user_account (
    user_account_id UUID PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(60) NOT NULL,
    email VARCHAR(100) NOT NULL
  );


CREATE TABLE
  IF NOT EXISTS expense (
    expense_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(50) NOT NULL
  );


CREATE TABLE
  IF NOT EXISTS expense_group (
    expense_group_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    user_account_id UUID NOT NULL REFERENCES user_account(user_account_id) ON DELETE CASCADE,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    total_budget INT NOT NULL
  );


CREATE TABLE
  IF NOT EXISTS expense_group_expense (
    expense_id INT REFERENCES expense(expense_id),
    expense_group_id INT NOT NULL REFERENCES expense_group(expense_group_id) ON DELETE CASCADE,
    balance DECIMAL NOT NULL,
    due_date DATE NOT NULL,
    is_paid BOOLEAN NOT NULL,
    note VARCHAR(200),
    PRIMARY KEY (expense_id, expense_group_id)
  );


CREATE EXTENSION IF NOT EXISTS "uuid-ossp";


INSERT INTO
  user_account (user_account_id, username, password, email)
VALUES
  (
    '973ad0cc-8709-4913-b6ad-43db8645e521',
    'alaneicker',
    '$2b$10$aNmICXxq2jzANlX/WrIhNudRR8v43EvxKmBxoFT1UkQmSUHw5cLP.',
    'alaneicker@gmail.com'
  ),
  (
    '973ad0cc-8709-4913-b6ad-43db8645e522',
    'root',
    '$2b$10$aNmICXxq2jzANlX/WrIhNudRR8v43EvxKmBxoFT1UkQmSUHw5cLP.',
    'root@gmail.com'
  );


INSERT INTO
  expense (name)
VALUES
  ('Mortgage'),
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


INSERT INTO
  expense_group (user_account_id, start_date, end_date, total_budget)
VALUES
  (
    '973ad0cc-8709-4913-b6ad-43db8645e521',
    '2023-04-01',
    '2023-04-15',
    5800
  ),
  (
    '973ad0cc-8709-4913-b6ad-43db8645e522',
    '2023-05-01',
    '2023-05-15',
    6000
  );


INSERT INTO
  expense_group_expense (
    expense_id,
    expense_group_id,
    balance,
    due_date,
    is_paid,
    note
  )
VALUES
  (1, 1, 150.45, '2023-5-22', false, null),
  (2, 1, 1104.00, '2023-06-01', false, null),
  (3, 1, 359.27, '2023-06-17', false, null),
  (6, 2, 1104.00, '2023-06-01', false, 'this is a note'),
  (7, 2, 359.27, '2023-06-17', false, 'this is a note');