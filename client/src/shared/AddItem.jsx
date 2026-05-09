// רכיב גנרי להוספת פריט חדש - שדה קלט + כפתור הוספה
// משמש להוספת טודו, פוסט, תגובה
const AddItem = ({
  value,
  setValue,
  onAdd,
  placeholder = 'Add new item...',
  buttonText  = 'Add',
  multiline   = false  // textarea במקום input כאשר true
}) => (
  <div className="add-item-section">
    {multiline ? (
      <textarea value={value} onChange={(e) => setValue(e.target.value)} placeholder={placeholder} />
    ) : (
      // Enter מפעיל הוספה - UX נוח
      <input value={value} onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder} onKeyDown={(e) => e.key === 'Enter' && onAdd()} />
    )}
    <button onClick={onAdd}>{buttonText}</button>
  </div>
);

export default AddItem;
