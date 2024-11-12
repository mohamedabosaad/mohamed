import React from 'react';
import { Download, Check, X, Trash2 } from 'lucide-react';
import { toast } from 'react-hot-toast';
import * as XLSX from 'xlsx';
import useStore from '../store/useStore';
import type { Order } from '../store/useStore';

export default function OrdersManagement() {
  const orders = useStore((state) => state.orders);
  const updateOrderStatus = useStore((state) => state.updateOrderStatus);
  const deleteOrder = useStore((state) => state.deleteOrder);

  const handleOrderStatus = (orderId: string, status: Order['status']) => {
    updateOrderStatus(orderId, status);
    toast.success(`تم ${status === 'confirmed' ? 'تأكيد' : 'إلغاء'} الطلب بنجاح`);
  };

  const handleDeleteOrder = (orderId: string) => {
    if (window.confirm('هل أنت متأكد من حذف هذا الطلب؟')) {
      deleteOrder(orderId);
      toast.success('تم حذف الطلب بنجاح');
    }
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(orders.map(order => ({
      'رقم الطلب': order.id,
      'اسم العميل': order.name,
      'رقم الهاتف': order.phone,
      'المحافظة': order.governorate,
      'العنوان': order.address,
      'المنتجات': order.items.map(item => `${item.product.name} (${item.quantity})`).join(', '),
      'الإجمالي': order.total,
      'الحالة': order.status === 'confirmed' ? 'مؤكد' : order.status === 'cancelled' ? 'ملغي' : 'قيد الانتظار',
      'التاريخ': new Date(order.date).toLocaleDateString('ar-EG')
    })));

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Orders');
    XLSX.writeFile(workbook, 'orders.xlsx');
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={exportToExcel}
          className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          <Download className="h-5 w-5" />
          <span>تصدير للإكسل</span>
        </button>
        <h2 className="text-2xl font-bold">إدارة الطلبات</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="p-4 text-right">العميل</th>
              <th className="p-4 text-right">المنتجات</th>
              <th className="p-4 text-right">الإجمالي</th>
              <th className="p-4 text-right">الحالة</th>
              <th className="p-4 text-right">التاريخ</th>
              <th className="p-4"></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-t">
                <td className="p-4">
                  <div>
                    <h3 className="font-semibold">{order.name}</h3>
                    <p className="text-sm text-gray-600">{order.phone}</p>
                    <p className="text-sm text-gray-600">
                      {order.governorate} - {order.address}
                    </p>
                  </div>
                </td>
                <td className="p-4">
                  {order.items.map((item) => (
                    <div key={item.product.id}>
                      {item.quantity} × {item.product.name}
                    </div>
                  ))}
                </td>
                <td className="p-4">{order.total} جنيه</td>
                <td className="p-4">
                  <span
                    className={`inline-block px-2 py-1 rounded-full text-sm ${
                      order.status === 'confirmed'
                        ? 'bg-green-100 text-green-800'
                        : order.status === 'cancelled'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {order.status === 'pending' && 'قيد الانتظار'}
                    {order.status === 'confirmed' && 'مؤكد'}
                    {order.status === 'cancelled' && 'ملغي'}
                  </span>
                </td>
                <td className="p-4">
                  {new Date(order.date).toLocaleDateString('ar-EG')}
                </td>
                <td className="p-4">
                  <div className="flex justify-end gap-2">
                    {order.status === 'pending' && (
                      <>
                        <button
                          onClick={() => handleOrderStatus(order.id, 'confirmed')}
                          className="p-2 text-green-600 hover:bg-green-50 rounded"
                        >
                          <Check className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleOrderStatus(order.id, 'cancelled')}
                          className="p-2 text-red-600 hover:bg-red-50 rounded"
                        >
                          <X className="h-5 w-5" />
                        </button>
                      </>
                    )}
                    <button
                      onClick={() => handleDeleteOrder(order.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}