// רכיב גנרי לחיפוש - dropdown לבחירת קריטריון + שדה חיפוש
// משמש בטודו (id/כותרת/סטטוס) ובפוסטים (id/כותרת)
const Search = ({
  search, setSearch,
  searchBy, setSearchBy,
  options = [
    { value: 'id',    label: 'Search by ID' },
    { value: 'title', label: 'Search by Title' }
  ],
  placeholder = 'Search...'
}) => (
  <div className="search-section">
    {/* בחירת קריטריון חיפוש */}
    <select value={searchBy} onChange={(e) => setSearchBy(e.target.value)}>
      {options.map(opt => (
        <option key={opt.value} value={opt.value}>{opt.label}</option>
      ))}
    </select>

    {/* שדה חיפוש */}
    <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder={placeholder} />

    {/* X לניקוי החיפוש - מוצג רק כשיש תוכן */}
    {search && <button onClick={() => setSearch('')}>×</button>}
  </div>
);

// פונקציית סינון סטטית - ניתן לקרוא ל-Search.filter(...) מכל מקום
Search.filter = (items, search, searchBy) => {
  if (!search.trim()) return items; // ריק - מחזיר הכל
  const term = search.toLowerCase();
  return items.filter(item => {
    if (searchBy === 'id')        return item.id.toString().includes(term);
    if (searchBy === 'title')     return item.title.toLowerCase().includes(term);
    if (searchBy === 'completed') {
      // חיפוש לפי סטטוס: "completed"/"true" או "pending"/"false"
      return ['completed', 'true'].includes(term) ? item.completed :
        ['pending', 'false'].includes(term) ? !item.completed : false;
    }
    return true;
  });
};

export default Search;
