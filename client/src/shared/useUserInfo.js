// hook לניהול מודל פרטי המשתמש - עריכת פרופיל ועדכון credentials
import { useState } from 'react';
import { useAuth }    from '../auth/AuthContext';
import useResource    from '../hooks/useResource';

const useUserInfo = () => {
  const { user, updateUserData } = useAuth();

  // save מ-useResource('/users') - משמש לשני סוגי עדכון
  const { save } = useResource('/users');

  // מצב המודל: האם בתצוגה, עריכה, או עדכון credentials
  const [isEditing,             setIsEditing]             = useState(false);
  const [isChangingCredentials, setIsChangingCredentials] = useState(false);
  const [loading,               setLoading]               = useState(false);
  const [error,                 setError]                 = useState('');

  // state לטופס עריכת פרופיל
  const [form,  setForm]  = useState({});

  // state לטופס עדכון credentials
  const [creds, setCreds] = useState({ oldPassword: '', newUsername: '', newPassword: '', confirmPassword: '' });

  // פונקציות עדכון שדות בטופס
  const setField     = (field, val) => setForm(p => ({ ...p, [field]: val }));
  const setAddrField = (field, val) => setForm(p => ({ ...p, address: { ...p.address, [field]: val } }));
  const setCompField = (field, val) => setForm(p => ({ ...p, company: { ...p.company, [field]: val } }));
  const setCredField = (field, val) => setCreds(p => ({ ...p, [field]: val }));

  // חזרה למצב תצוגה ואיפוס שגיאות
  const reset = () => { setIsEditing(false); setIsChangingCredentials(false); setError(''); };

  // פתיחת טופס עריכת פרופיל - ממלא את השדות בנתונים הנוכחיים
  const openEdit = () => {
    setForm({
      name:    user?.name    || '',
      email:   user?.email   || '',
      phone:   user?.phone   || '',
      address: { street: user?.address?.street || '', city: user?.address?.city || '' },
      company: { name: user?.company?.name || '' }
    });
    setError('');
    setIsEditing(true);
  };

  // פתיחת טופס עדכון credentials - מאפס שדות
  const openCredentials = () => {
    setCreds({ oldPassword: '', newUsername: '', newPassword: '', confirmPassword: '' });
    setError('');
    setIsChangingCredentials(true);
  };

  // שמירת פרופיל - PUT /users/:id
  const saveProfile = async () => {
    setLoading(true);
    const updated = await save(user.id, form); // save מ-useResource
    if (updated) { updateUserData(updated); reset(); } // עדכון ה-Context + localStorage
    else         { setError('Failed to update profile'); }
    setLoading(false);
  };

  // עדכון credentials - PUT /users/:id/credentials (עם suffix)
  const saveCredentials = async () => {
    if (!creds.oldPassword)                                               return setError('Current password is required');
    if (!creds.newUsername && !creds.newPassword)                        return setError('Enter a new username or password');
    if (creds.newPassword && creds.newPassword !== creds.confirmPassword) return setError('New passwords do not match');

    setLoading(true);
    const updated = await save(user.id, {
      oldPassword: creds.oldPassword,
      newUsername: creds.newUsername || undefined,
      newPassword: creds.newPassword || undefined
    }, null, '/credentials'); // suffix '/credentials' מוסיף לנתיב
    if (updated) { updateUserData(updated); reset(); }
    else         { setError('Incorrect current password'); }
    setLoading(false);
  };

  return {
    user, isEditing, isChangingCredentials, loading, error,
    form, setField, setAddrField, setCompField,
    creds, setCredField,
    reset, openEdit, openCredentials, saveProfile, saveCredentials
  };
};

export default useUserInfo;
