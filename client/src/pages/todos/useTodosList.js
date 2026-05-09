// hook לניהול כל לוגיקת עמוד הטודו - state, handlers, וקריאות לשרת
import { useState, useEffect } from 'react';
import { useAuth }       from '../../auth/AuthContext';
import useResource       from '../../hooks/useResource';
import useLocalStorage   from '../../hooks/useLocalStorage';
import Search            from '../../shared/Search';

// פונקציית מיון לפי קריטריון - מחזירה עותק ממוין של הרשימה
const sortItems = (list, by) => [...list].sort((a, b) => {
  if (by === 'id')        return Number(a.id) - Number(b.id);
  if (by === 'title')     return a.title.localeCompare(b.title);
  if (by === 'completed') return Number(a.completed) - Number(b.completed);
  return 0;
});

const useTodosList = () => {
  const { user } = useAuth();

  // useResource מטפל ב-HTTP + ניהול מערך הטודו (items)
  const { items: todos, load, add, save, del } = useResource('/todos');

  // state שנשמר ב-localStorage - נשמר בין ריענונים
  const [newTodo,   setNewTodo]   = useLocalStorage('newTodoInput', '');
  const [search,    setSearch]    = useLocalStorage('todosSearch', '');
  const [searchBy,  setSearchBy]  = useLocalStorage('todosSearchBy', 'title');
  const [sortBy,    setSortBy]    = useLocalStorage('todosSortBy', 'id');

  // state זמני - מתאפס בכל ריענון
  const [editId,    setEditId]    = useState(null);  // מזהה הטודו הנערך כרגע
  const [editTitle, setEditTitle] = useState('');    // תוכן השדה בעת עריכה
  const [error,     setError]     = useState('');    // הודעת שגיאה לתצוגה

  // טעינת הטודו של המשתמש בטעינה ראשונה - GET /todos?userId=X
  useEffect(() => {
    if (user?.id) load(`?userId=${user.id}`)
      .catch(() => setError('Failed to load tasks'));
  }, [user?.id]);

  // חישוב הרשימה המסוננת והממוינת לתצוגה
  const list          = todos || [];
  const filteredTodos = Search.filter(list, search, searchBy); // סינון לפי חיפוש
  const sortedTodos   = sortItems(filteredTodos, sortBy);       // מיון לפי קריטריון

  // סטטיסטיקות לכותרת
  const completed = list.filter(t => t.completed).length;
  const stats = { completed, pending: list.length - completed, total: list.length, found: filteredTodos.length };

  // הוספת טודו חדש - POST /todos
  const addTodo = () => {
    if (!newTodo.trim()) return;
    add({ userId: user.id, title: newTodo, completed: false },
      () => { setNewTodo(''); setError(''); }); // ניקוי שדה לאחר הצלחה
  };

  // מחיקת טודו - DELETE /todos/:id
  const removeTodo = (id) => del(id, null, () => setError(''));

  // שינוי סטטוס ביצוע - PUT /todos/:id
  const toggleComplete = (todo) =>
    save(todo.id, { ...todo, completed: !todo.completed }, () => setError(''));

  // שמירת עריכת כותרת - PUT /todos/:id
  const saveEdit = async () => {
    if (!editTitle.trim()) return;
    const todo = list.find(t => t.id == editId);
    await save(editId, { ...todo, title: editTitle },
      () => { setEditId(null); setError(''); });
  };

  const startEdit  = (id, title) => { setEditId(id); setEditTitle(title); };
  const cancelEdit = ()          => setEditId(null);

  return {
    user,
    loading: todos === null, // null = טרם נטענו, כל ערך אחר = נטענו
    error,
    sortedTodos, stats,
    search, searchBy, setSearch, setSearchBy,
    sortBy, setSortBy,
    newTodo, setNewTodo,
    editId, editTitle, setEditTitle,
    addTodo, removeTodo, toggleComplete, saveEdit, startEdit, cancelEdit
  };
};

export default useTodosList;
