import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'admin123'
};

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = React.useState({
    username: '',
    password: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (
      formData.username === ADMIN_CREDENTIALS.username &&
      formData.password === ADMIN_CREDENTIALS.password
    ) {
      localStorage.setItem('isAdmin', 'true');
      navigate('/admin');
    } else {
      toast.error('بيانات الدخول غير صحيحة');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-right">تسجيل الدخول</h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-right mb-2">اسم المستخدم</label>
            <input
              type="text"
              id="username"
              required
              className="w-full border border-gray-300 rounded-lg p-3 text-right"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-right mb-2">كلمة المرور</label>
            <input
              type="password"
              id="password"
              required
              className="w-full border border-gray-300 rounded-lg p-3 text-right"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition"
          >
            دخول
          </button>
        </form>
      </div>
    </div>
  );
}