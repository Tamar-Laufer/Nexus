// קובץ הכניסה הראשי של האפליקציה - מגדיר את הנתיבים (routes) ואת ההגנה עליהם
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './auth/AuthContext'; // ספק הזדהות לכל האפליקציה
import Login    from './auth/Login';
import Register from './auth/Register';
import Home     from './pages/home/Home';
import Todos    from './pages/todos/Todos';
import Posts    from './pages/posts/Posts';
import './App.css';
import './styles/Components.css';
import './styles/ModernComponents.css';

// רכיב שמגן על נתיבים פנימיים - מעביר למסך כניסה אם המשתמש לא מחובר
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return <div className="loading-container">Loading...</div>;
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    // AuthProvider עוטף את כל האפליקציה כדי שכל רכיב יוכל לגשת לנתוני המשתמש
    <AuthProvider>
      <Router>
        <Routes>
          {/* נתיבים ציבוריים - פתוחים לכולם */}
          <Route path="/login"    element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* נתיבים מוגנים - דורשים כניסה למערכת */}
          <Route path="/home" element={
            <ProtectedRoute><Home /></ProtectedRoute>
          } />

          {/* URL אינפורמטיבי - כולל את מזהה המשתמש */}
          <Route path="/users/:id/todos" element={
            <ProtectedRoute><Todos /></ProtectedRoute>
          } />

          <Route path="/users/:id/posts" element={
            <ProtectedRoute><Posts /></ProtectedRoute>
          } />

          {/* כל נתיב לא מוכר → עמוד כניסה */}
          <Route path="/"  element={<Navigate to="/login" replace />} />
          <Route path="*"  element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
