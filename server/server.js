const express = require('express'); // טעינת ספריית Express לבניית שרת web
const cors = require('cors');       // טעינת ספריית cors לטיפול בגישה בין מקורות שונים

// טעינת כל הנתיבים (routers) של האפליקציה
const loginRouter = require('./routes/loginRouter');       // נתיב לכניסה למערכת
const usersRouter = require('./routes/usersRouter');       // נתיב למשתמשים
const todosRouter = require('./routes/todosRouter');       // נתיב למשימות
const postsRouter = require('./routes/postsRouter');       // נתיב לפוסטים
const commentsRouter = require('./routes/commentsRouter'); // נתיב לתגובות

const app = express();   // יצירת אפליקציית Express
const PORT = 3001;       // הפורט שעליו השרת יאזין

app.use(cors());         // middleware שמאפשר לקליינט (פורט 5173) לפנות לשרת (פורט 3001)
app.use(express.json()); // middleware שמאפשר לקרוא JSON מגוף הבקשה (req.body)

// חיבור הנתיבים לאפליקציה - כל URL מחובר ל-router המתאים
app.use('/login', loginRouter);       // POST /login
app.use('/users', usersRouter);       // GET/POST /users, GET /users/:id
app.use('/todos', todosRouter);       // GET/POST /todos, PUT/DELETE /todos/:id
app.use('/posts', postsRouter);       // GET/POST /posts, PUT/DELETE /posts/:id
app.use('/comments', commentsRouter); // GET/POST /comments, PUT/DELETE /comments/:id

// הפעלת השרת - מתחיל להאזין לבקשות על הפורט שהוגדר
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`); // הדפסת אישור שהשרת עלה בהצלחה
});
