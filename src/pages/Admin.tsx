import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { toast } from 'react-hot-toast';
import useStore from '../store/useStore';
import OrdersManagement from '../components/OrdersManagement';

export default function Admin() {
  const navigate = useNavigate();
  const products = useStore((state) => state.products);
  const addProduct = useStore((state) => state.addProduct);
  const updateProduct = useStore((state) => state.updateProduct);
  const deleteProduct = useStore((state) => state.deleteProduct);

  const [isAddingProduct, setIsAddingProduct] = React.useState(false);
  const [editingProduct, setEditingProduct] = React.useState<any>(null);
  const [productForm, setProductForm] = React.useState({
    name: '',
    description: '',
    price: '',
    category: '',
    condition: 'new',
    images: ['', '']
  });

  React.useEffect(() => {
    const isAdmin = localStorage.getItem('isAdmin');
    if (!isAdmin) {
      navigate('/login');
    }
  }, [navigate]);

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const newProduct = {
      id: Date.now().toString(),
      ...productForm,
      price: Number(productForm.price)
    };
    addProduct(newProduct);
    setIsAddingProduct(false);
    setProductForm({
      name: '',
      description: '',
      price: '',
      category: '',
      condition: 'new',
      images: ['', '']
    });
    toast.success('تم إضافة المنتج بنجاح');
  };

  const handleUpdateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedProduct = {
      id: editingProduct.id,
      ...productForm,
      price: Number(productForm.price)
    };
    updateProduct(updatedProduct);
    setEditingProduct(null);
    setProductForm({
      name: '',
      description: '',
      price: '',
      category: '',
      condition: 'new',
      images: ['', '']
    });
    toast.success('تم تحديث المنتج بنجاح');
  };

  const handleDeleteProduct = (id: string) => {
    if (window.confirm('هل أنت متأكد من حذف هذا المنتج؟')) {
      deleteProduct(id);
      toast.success('تم حذف المنتج بنجاح');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <button
          onClick={() => {
            localStorage.removeItem('isAdmin');
            navigate('/login');
          }}
          className="text-red-600 hover:text-red-700"
        >
          تسجيل خروج
        </button>
        <h1 className="text-3xl font-bold">لوحة التحكم</h1>
      </div>

      {/* Products Management */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={() => setIsAddingProduct(true)}
            className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            <Plus className="h-5 w-5" />
            <span>إضافة منتج</span>
          </button>
          <h2 className="text-2xl font-bold">إدارة المنتجات</h2>
        </div>

        {(isAddingProduct || editingProduct) && (
          <form onSubmit={editingProduct ? handleUpdateProduct : handleAddProduct} className="mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-right mb-2">اسم المنتج</label>
                <input
                  type="text"
                  required
                  className="w-full border rounded p-2 text-right"
                  value={productForm.name}
                  onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-right mb-2">السعر</label>
                <input
                  type="number"
                  required
                  className="w-full border rounded p-2 text-right"
                  value={productForm.price}
                  onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-right mb-2">القسم</label>
                <select
                  required
                  className="w-full border rounded p-2 text-right"
                  value={productForm.category}
                  onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                >
                  <option value="">اختر القسم</option>
                  <option value="phones">هواتف</option>
                  <option value="accessories">اكسسوارات</option>
                </select>
              </div>
              <div>
                <label className="block text-right mb-2">الحالة</label>
                <select
                  required
                  className="w-full border rounded p-2 text-right"
                  value={productForm.condition}
                  onChange={(e) => setProductForm({ ...productForm, condition: e.target.value })}
                >
                  <option value="new">جديد</option>
                  <option value="used">مستعمل</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-right mb-2">الوصف</label>
                <textarea
                  required
                  rows={3}
                  className="w-full border rounded p-2 text-right"
                  value={productForm.description}
                  onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-right mb-2">رابط الصورة 1</label>
                <input
                  type="url"
                  required
                  className="w-full border rounded p-2 text-right"
                  value={productForm.images[0]}
                  onChange={(e) => setProductForm({
                    ...productForm,
                    images: [e.target.value, productForm.images[1]]
                  })}
                />
              </div>
              <div>
                <label className="block text-right mb-2">رابط الصورة 2</label>
                <input
                  type="url"
                  required
                  className="w-full border rounded p-2 text-right"
                  value={productForm.images[1]}
                  onChange={(e) => setProductForm({
                    ...productForm,
                    images: [productForm.images[0], e.target.value]
                  })}
                />
              </div>
            </div>
            <div className="flex justify-end gap-4 mt-4">
              <button
                type="button"
                onClick={() => {
                  setIsAddingProduct(false);
                  setEditingProduct(null);
                  setProductForm({
                    name: '',
                    description: '',
                    price: '',
                    category: '',
                    condition: 'new',
                    images: ['', '']
                  });
                }}
                className="px-4 py-2 border rounded hover:bg-gray-50"
              >
                إلغاء
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                {editingProduct ? 'تحديث' : 'إضافة'}
              </button>
            </div>
          </form>
        )}

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="p-4 text-right">المنتج</th>
                <th className="p-4 text-right">السعر</th>
                <th className="p-4 text-right">القسم</th>
                <th className="p-4 text-right">الحالة</th>
                <th className="p-4"></th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-t">
                  <td className="p-4">
                    <div className="flex items-center gap-4">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                      <div>
                        <h3 className="font-semibold">{product.name}</h3>
                        <p className="text-sm text-gray-600">{product.description}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">{product.price} جنيه</td>
                  <td className="p-4">
                    {product.category === 'phones' ? 'هواتف' : 'اكسسوارات'}
                  </td>
                  <td className="p-4">
                    {product.condition === 'new' ? 'جديد' : 'مستعمل'}
                  </td>
                  <td className="p-4">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => {
                          setEditingProduct(product);
                          setProductForm({
                            name: product.name,
                            description: product.description,
                            price: product.price.toString(),
                            category: product.category,
                            condition: product.condition,
                            images: product.images
                          });
                        }}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                      >
                        <Pencil className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(product.id)}
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

      {/* Orders Management Component */}
      <OrdersManagement />
    </div>
  );
}