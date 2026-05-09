// רכיב מעטפת - כל עמוד פנימי עטוף בו כדי לקבל Header, ניווט ומודל Info
import { useState } from 'react';
import Header     from './Header';
import Navigation from './Navigation';
import UserInfo   from './UserInfo';

const Layout = ({ children }) => {
  // שליטה על פתיחת מודל פרטי המשתמש
  const [showInfo, setShowInfo] = useState(false);

  return (
    <div className="layout-container">
      <Header />
      {/* Navigation מקבל callback לפתיחת המודל בלחיצה על "Info" */}
      <Navigation onInfoClick={() => setShowInfo(true)} />
      <div className="main-content">{children}</div>
      {/* מודל פרטי משתמש - נפתח רק כאשר showInfo=true */}
      <UserInfo isOpen={showInfo} onClose={() => setShowInfo(false)} />
    </div>
  );
};

export default Layout;
