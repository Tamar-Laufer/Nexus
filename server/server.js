const express = require('express');
const cors = require('cors');

const { authenticateToken } = require('./middleware/auth');
const loginRouter    = require('./routes/loginRouter');
const usersRouter    = require('./routes/usersRouter');
const todosRouter    = require('./routes/todosRouter');
const postsRouter    = require('./routes/postsRouter');
const commentsRouter = require('./routes/commentsRouter');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.use('/login',    loginRouter);
app.use('/users',    usersRouter);
app.use('/todos',    authenticateToken, todosRouter);
app.use('/posts',    authenticateToken, postsRouter);
app.use('/comments', authenticateToken, commentsRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
