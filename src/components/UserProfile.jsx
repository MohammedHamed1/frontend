import React, { useState } from 'react';
// import { getUserProfile, updateUserProfile } from '../api'; // Uncomment when backend ready

const UserProfile = () => {
  const [user, setUser] = useState({ name: 'اسم المستخدم', email: 'user@email.com' });
  // useEffect(() => { getUserProfile().then(setUser); }, []);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState(user);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSave = () => {
    setUser(form);
    setEditing(false);
    // updateUserProfile(form);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-green-50 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="max-w-lg mx-auto bg-white rounded-2xl p-10 shadow-xl border border-green-100">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">الملف الشخصي</h2>
          {editing ? (
            <>
              <input name="name" value={form.name} onChange={handleChange} className="w-full px-4 py-3 border rounded-xl mb-4" />
              <input name="email" value={form.email} onChange={handleChange} className="w-full px-4 py-3 border rounded-xl mb-4" />
              <button className="bg-primary px-6 py-3 rounded-xl text-white font-bold mr-2" onClick={handleSave}>حفظ</button>
              <button className="bg-gray-200 px-6 py-3 rounded-xl text-gray-700 font-bold" onClick={() => setEditing(false)}>إلغاء</button>
            </>
          ) : (
            <>
              <div className="mb-4 text-lg font-bold text-primary">{user.name}</div>
              <div className="mb-4 text-gray-700">{user.email}</div>
              <button className="bg-primary px-6 py-3 rounded-xl text-white font-bold" onClick={() => setEditing(true)}>تعديل</button>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default UserProfile; 