USE jsonplaceholder;

INSERT INTO users (name, username, email, phone, address_street, address_city, company_name) VALUES
('Alice Cohen', 'alice', 'alice@example.com', '050-1234567', 'King George 1', 'Jerusalem', 'Alice Corp'),
('Bob Levi', 'bob', 'bob@example.com', '052-2345678', 'Dizengoff 5', 'Tel Aviv', 'Bob Ltd'),
('Carol Mizrahi', 'carol', 'carol@example.com', '054-3456789', 'Ben Gurion 10', 'Haifa', 'Carol Inc');

INSERT INTO passwords (userId, password) VALUES
(1, 'alice123'),
(2, 'bob456'),
(3, 'carol789');

INSERT INTO todos (userId, title, completed) VALUES
(1, 'Learn React', TRUE),
(1, 'Learn Node.js', TRUE),
(1, 'Learn MySQL', FALSE),
(1, 'Build the project', FALSE),
(2, 'Set up the server', TRUE),
(2, 'Connect to database', FALSE),
(2, 'Test the API with Postman', FALSE),
(3, 'Design the UI', TRUE),
(3, 'Write unit tests', FALSE),
(3, 'Deploy to production', FALSE);

INSERT INTO posts (userId, title, body) VALUES
(1, 'Introduction to React', 'React is a JavaScript library for building user interfaces.'),
(1, 'Node.js Basics', 'Node.js allows you to run JavaScript on the server side.'),
(1, 'MySQL for Beginners', 'MySQL is a popular relational database management system.'),
(2, 'Express.js Guide', 'Express is a minimal and flexible Node.js web application framework.'),
(2, 'REST API Design', 'REST APIs use HTTP methods to perform operations on resources.'),
(2, 'JavaScript Async/Await', 'Async/await is a modern way to handle asynchronous operations.'),
(3, 'CSS Flexbox Tutorial', 'Flexbox is a CSS layout method for arranging items in rows or columns.'),
(3, 'Git Version Control', 'Git is a distributed version control system for tracking code changes.'),
(3, 'React Hooks Deep Dive', 'Hooks are functions that let you use state in functional components.');

INSERT INTO comments (postId, email, body) VALUES
(1, 'bob@example.com', 'Great post! Very helpful for beginners.'),
(1, 'carol@example.com', 'I learned a lot from this. Thanks!'),
(2, 'alice@example.com', 'Node.js changed the way I write backend code.'),
(2, 'carol@example.com', 'Very clear explanation!'),
(3, 'bob@example.com', 'MySQL is really powerful once you know JOINs.'),
(4, 'alice@example.com', 'Express makes building servers so much easier.'),
(4, 'carol@example.com', 'Thank you for this guide!'),
(5, 'alice@example.com', 'REST is the standard for modern APIs.'),
(6, 'bob@example.com', 'Async/await saved me from callback hell!'),
(7, 'alice@example.com', 'Flexbox is a game changer for layouts.'),
(8, 'bob@example.com', 'Git saved my project more than once!'),
(9, 'alice@example.com', 'useEffect and useState are essential!');