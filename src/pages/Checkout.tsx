import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import useStore from '../store/useStore';

const egyptianGovernorates = [
  'القاهرة', 'الإسكندرية', 'الجيزة', 'القليوبية', 'الشرقية',
  'الدقهلية', 'البحيرة', 'المنيا', 'المنوفية', 'الغربية',
  'أسيوط', 'سوهاج', 'الفيوم', 'قنا', 'بني سويف',
  'كفر الشيخ', 'الإسماعيلية', 'السويس', 'بورسعيد', 'دمياط',
  'الأقصر', 'البحر الأحمر', 'الوادي الجديد', 'مطروح', 'شمال سيناء',
  'جنوب سيناء', 'أسوان'
];

export default function Checkout() {
  const navigate = useNavigate();
  const cart = useStore((state) => state.cart);
  const clearCart = useStore((state) => state.clearCart);
  const addOrder = useStore((state) => state.addOrder);
  const total = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const [formData, setFormData] = React.useState({
    name: '',
    phone: '',
    governorate: '',
    address: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    addOrder({
      ...formData,
      items: cart,
      total
    });
    
    clearCart();
    toast.success('تم تقديم طلبك بنجاح');
    navigate('/');
  };

  if (cart.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-right">إتمام الطلب</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-right mb-2">الاسم</label>
          <input
            type="text"
            id="name"
            required
            className="w-full border border-gray-300 rounded-lg p-3 text-right"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-right mb-2">رقم الهاتف</label>
          <input
            type="tel"
            id="phone"
            required
            className="w-full border border-gray-300 rounded-lg p-3 text-right"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />
        </div>

        <div>
          <label htmlFor="governorate" className="block text-right mb-2">المحافظة</label>
          <select
            id="governorate"
            required
            className="w-full border border-gray-300 rounded-lg p-3 text-right"
            value={formData.governorate}
            onChange={(e) => setFormData({ ...formData, governorate: e.target.value })}
          >
            <option value="">اختر المحافظة</option>
            {egyptianGovernorates.map((gov) => (
              <option key={gov} value={gov}>{gov}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="address" className="block text-right mb-2">العنوان بالتفصيل</label>
          <textarea
            id="address"
            required
            rows={4}
            className="w-full border border-gray-300 rounded-lg p-3 text-right"
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          />
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <h2 className="text-xl font-bold mb-4 text-right">ملخص الطلب</h2>
          {cart.map((item) => (
            <div key={item.product.id} className="flex justify-between mb-2">
              <span>{item.product.price * item.quantity} جنيه</span>
              <span>{item.quantity} × {item.product.name}</span>
            </div>
          ))}
          <div className="border-t pt-4 mt-4 flex justify-between font-bold">
            <span>{total} جنيه</span>
            <span>الإجمالي</span>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition"
        >
          تأكيد الطلب
        </button>
      </form>
    </div>
  );
}