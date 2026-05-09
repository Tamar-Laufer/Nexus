// hook לניהול תגובות - טוען תגובות לפוסט בלחיצה, מאפשר הוספה/עריכה/מחיקה
import { useState } from 'react';
import { useAuth } from '../../auth/AuthContext';
import useResource from '../../hooks/useResource';

const useComments = () => {
  const { user } = useAuth();

  // useResource מנהל את מערך התגובות (items) של הפוסט הנוכחי
  const { items: comments, load, add, save, del } = useResource('/comments');

  const [activePostId,    setActivePostId]    = useState(null); // איזה פוסט מוצגות תגובותיו
  const [editingComment,  setEditingComment]  = useState(null); // תגובה הנמצאת בעריכה
  const [newComment,      setNewComment]      = useState('');   // תוכן שדה תגובה חדשה

  // פתיחה/סגירה של תגובות לפוסט
  // אם לוחצים על אותו פוסט - סוגרים
  // אם לוחצים על פוסט אחר - טוענים תגובות חדשות (GET /comments?postId=X)
  const toggleComments = async (postId) => {
    if (activePostId == postId) { setActivePostId(null); return; }
    setActivePostId(postId);
    setNewComment('');       // איפוס שדה הכתיבה
    setEditingComment(null); // ביטול עריכה פתוחה
    await load(`?postId=${postId}`); // שליפת תגובות הפוסט
  };

  // הוספת תגובה חדשה - POST /comments
  const addComment = () => {
    if (!newComment.trim()) return;
    add({ postId: activePostId, name: user.name, email: user.email, body: newComment },
      () => setNewComment('')); // ניקוי שדה לאחר הצלחה
  };

  const startEditComment  = (comment) => setEditingComment({ ...comment });
  const cancelEditComment = ()        => setEditingComment(null);
  const changeEditComment = (val)     => setEditingComment(prev => ({ ...prev, body: val }));

  // שמירת עדכון תגובה - PUT /comments/:id
  const saveComment = () => save(editingComment.id, editingComment, () => setEditingComment(null));

  // מחיקת תגובה - DELETE /comments/:id (שולח email לאימות בעלות בשרת)
  const deleteComment = (comment) => del(comment.id, { email: user.email });

  return {
    comments: comments || [], // מערך התגובות של הפוסט הפעיל
    activePostId, toggleComments,
    newComment, setNewComment, addComment,
    editingComment, startEditComment, cancelEditComment, changeEditComment, saveComment, deleteComment
  };
};

export default useComments;
