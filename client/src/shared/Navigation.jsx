// סרגל ניווט עליון - מכיל קישורים לכל עמודי האפליקציה
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import './Navigation.css';

const Navigation = ({ onInfoClick }) => {
  const navigate = useNavigate();
  const location = useLocation(); // הנתיב הנוכחי - לצביעת הכפתור הפעיל
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();              // מנקה את המשתמש מ-state ו-localStorage
    navigate('/login');    // מעביר לעמוד כניסה
  };

  // בודק אם הנתיב הנוכחי מכיל את המחרוזת - לצביעת הכפתור הפעיל
  const isActive = (path) => location.pathname.includes(path);

  return (
    <nav className="navigation">
      <div className="navigation-content">

        {/* Home - מסומן כפעיל רק בנתיב /home בדיוק */}
        <button onClick={() => navigate('/home')}
          className={`nav-button ${location.pathname === '/home' ? 'active' : 'normal'}`}>
          Home
        </button>

        {/* Info - פותח מודל עם פרטי המשתמש (ללא הסיסמה) */}
        <button onClick={onInfoClick} className="nav-button normal">
          Info
        </button>

        {/* Todos - URL אינפורמטיבי עם מזהה המשתמש */}
        <button onClick={() => navigate(`/users/${user.id}/todos`)}
          className={`nav-button ${isActive('/todos') ? 'active' : 'normal'}`}>
          Todos
        </button>

        {/* Posts - URL אינפורמטיבי עם מזהה המשתמש */}
        <button onClick={() => navigate(`/users/${user.id}/posts`)}
          className={`nav-button ${isActive('/posts') ? 'active' : 'normal'}`}>
          Posts
        </button>

        <button onClick={handleLogout} className="nav-button logout">
          Logout
        </button>

      </div>
    </nav>
  );
};

export default Navigation;
