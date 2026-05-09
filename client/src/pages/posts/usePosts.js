// hook לניהול רשימת הפוסטים - פגינציה, הוספה, עריכה, מחיקה, וחיפוש
import { useState, useEffect } from 'react';
import { useAuth }     from '../../auth/AuthContext';
import useResource     from '../../hooks/useResource';
import useUsers        from '../../hooks/useUsers';
import useLocalStorage from '../../hooks/useLocalStorage';
import Search          from '../../shared/Search';

const LIMIT = 5; // מספר הפוסטים בכל עמוד

const usePosts = () => {
  const { user } = useAuth();

  // useResource מטפל ב-HTTP + ניהול מערך הפוסטים (items)
  const { items: posts, setItems: setPosts, add, save, del, get } = useResource('/posts');
  const { fetchUsers } = useUsers(); // לשליפת שמות המשתמשים

  // state לפגינציה
  const [users,   setUsers]   = useState([]);
  const [page,    setPage]    = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);

  // state שנשמר ב-localStorage
  const [newPost,  setNewPost]  = useLocalStorage('newPostInput', { title: '', body: '' });
  const [search,   setSearch]   = useLocalStorage('postsSearch', '');
  const [searchBy, setSearchBy] = useLocalStorage('postsSearchBy', 'title');

  // state לעריכה
  const [expanded,       setExpanded]       = useState({}); // { [postId]: bool } - פוסטים פתוחים
  const [editingPostId,  setEditingPostId]  = useState(null);
  const [editData,       setEditData]       = useState({});

  // טעינת עמוד ראשון + רשימת משתמשים בטעינה ראשונה
  useEffect(() => {
    Promise.all([get(`?_start=0&_limit=${LIMIT}`), fetchUsers()])
      .then(([loaded, loadedUsers]) => {
        setPosts(loaded || []);
        setUsers(loadedUsers || []);
        setHasMore((loaded?.length ?? 0) === LIMIT);
        setLoading(false);
      });
  }, []);

  // טעינת עמוד נוסף (Load More) - מוסיף לרשימה הקיימת
  const loadPage = async (pageNum) => {
    const loaded = await get(`?_start=${(pageNum - 1) * LIMIT}&_limit=${LIMIT}`);
    setPosts(prev => [...prev, ...(loaded || [])]);
    setHasMore((loaded?.length ?? 0) === LIMIT);
    setPage(pageNum);
    setLoading(false);
  };

  const loadMore = () => loadPage(page + 1);

  // חיפוש בצד הקליינט - מסנן מתוך הפוסטים שכבר נטענו
  const list          = posts || [];
  const filteredPosts = Search.filter(list, search, searchBy);

  // מחזיר שם משתמש לפי ID - לתצוגת "by [שם]" על כל פוסט
  const getUserName = (userId) => users.find(u => u.id == userId)?.name || 'Unknown';

  // פתיחה/סגירה של גוף הפוסט
  const toggleBody = (id) => setExpanded(prev => ({ ...prev, [id]: !prev[id] }));

  // הוספת פוסט חדש - POST /posts
  const addPost = () => {
    if (!newPost.title.trim() || !newPost.body.trim()) return;
    add({ ...newPost, userId: user.id }, () => setNewPost({ title: '', body: '' }));
  };

  // התחלת עריכת פוסט - שומר את הנתונים הנוכחיים לשדות העריכה
  const startEditPost  = (post)        => { setEditingPostId(post.id); setEditData({ title: post.title, body: post.body }); };
  const cancelEditPost = ()            => setEditingPostId(null);
  const changeEditPost = (field, val)  => setEditData(prev => ({ ...prev, [field]: val }));

  // שמירת עדכון פוסט - PUT /posts/:id
  const savePost   = (post)   => save(post.id, { ...post, ...editData }, () => setEditingPostId(null));

  // מחיקת פוסט - DELETE /posts/:id (שולח userId לאימות בעלות בשרת)
  const deletePost = (postId) => del(postId, { userId: user.id });

  return {
    user, loading, filteredPosts, hasMore, getUserName, loadMore,
    newPost, setNewPost, addPost,
    search, setSearch, searchBy, setSearchBy,
    expanded, toggleBody,
    editingPostId, editData, changeEditPost, startEditPost, cancelEditPost, savePost, deletePost
  };
};

export default usePosts;
