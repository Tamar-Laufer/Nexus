// רכיב גנרי למחיקה - מבקש אישור לפני ביצוע
// כך כל מחיקה באפליקציה דורשת אישור, בלי לשכפל את הלוגיקה
const DeleteItem = ({ onDelete, label = 'Delete' }) => {
  const handleClick = () => {
    if (window.confirm('Are you sure you want to delete?')) {
      onDelete(); // מבצע מחיקה רק לאחר אישור
    }
  };

  return (
    <button className="delete-btn" onClick={handleClick}>{label}</button>
  );
};

export default DeleteItem;
