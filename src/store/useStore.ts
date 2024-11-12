import create from 'zustand';
import { persist } from 'zustand/middleware';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  condition: string;
  images: string[];
}

interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  name: string;
  phone: string;
  governorate: string;
  address: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  date: string;
}

interface Store {
  products: Product[];
  cart: CartItem[];
  orders: Order[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (productId: string) => void;
  addOrder: (order: Omit<Order, 'id' | 'status' | 'date'>) => void;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  deleteOrder: (orderId: string) => void;
}

const useStore = create<Store>()(
  persist(
    (set) => ({
      products: [
        {
          id: '1',
          name: 'iPhone 15 Pro Max',
          description: 'أحدث هواتف آيفون مع معالج A17 Pro وكاميرا متطورة وشاشة OLED مميزة',
          price: 45999,
          category: 'phones',
          condition: 'new',
          images: [
            'https://images.unsplash.com/photo-1695048133142-1a20484d2569',
            'https://images.unsplash.com/photo-1695048132772-4d85bff5c8fb'
          ]
        },
        {
          id: '2',
          name: 'Samsung Galaxy S24 Ultra',
          description: 'هاتف سامسونج الرائد مع قلم S Pen وكاميرا بدقة 200 ميجابكسل',
          price: 39999,
          category: 'phones',
          condition: 'new',
          images: [
            'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf',
            'https://images.unsplash.com/photo-1610945264803-c22b62d2a7b3'
          ]
        },
        {
          id: '3',
          name: 'iPhone 14 Pro',
          description: 'هاتف آيفون بحالة ممتازة مع كامل الملحقات والضمان',
          price: 32999,
          category: 'phones',
          condition: 'used',
          images: [
            'https://images.unsplash.com/photo-1663761879666-312880c27fc0',
            'https://images.unsplash.com/photo-1663761879921-497d41b24485'
          ]
        },
        {
          id: '4',
          name: 'حافظة سيليكون لآيفون',
          description: 'حافظة سيليكون عالية الجودة مع حماية للكاميرا',
          price: 299,
          category: 'accessories',
          condition: 'new',
          images: [
            'https://images.unsplash.com/photo-1603313011101-320f26a4f6f6',
            'https://images.unsplash.com/photo-1603313011024-aa33f4677e7c'
          ]
        },
        {
          id: '5',
          name: 'شاحن سريع 25W',
          description: 'شاحن سامسونج الأصلي بقوة 25 واط مع كابل USB-C',
          price: 449,
          category: 'accessories',
          condition: 'new',
          images: [
            'https://images.unsplash.com/photo-1583863788434-e58a36330cf0',
            'https://images.unsplash.com/photo-1583863788517-ba3a9f1295b1'
          ]
        }
      ],
      cart: [],
      orders: [],
      addToCart: (product) =>
        set((state) => {
          const existingItem = state.cart.find((item) => item.product.id === product.id);
          if (existingItem) {
            return {
              cart: state.cart.map((item) =>
                item.product.id === product.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            };
          }
          return { cart: [...state.cart, { product, quantity: 1 }] };
        }),
      removeFromCart: (productId) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.product.id !== productId),
        })),
      updateQuantity: (productId, quantity) =>
        set((state) => ({
          cart: state.cart.map((item) =>
            item.product.id === productId ? { ...item, quantity } : item
          ),
        })),
      clearCart: () => set({ cart: [] }),
      addProduct: (product) =>
        set((state) => ({ products: [...state.products, product] })),
      updateProduct: (product) =>
        set((state) => ({
          products: state.products.map((p) =>
            p.id === product.id ? product : p
          ),
        })),
      deleteProduct: (productId) =>
        set((state) => ({
          products: state.products.filter((p) => p.id !== productId),
        })),
      addOrder: (orderData) =>
        set((state) => ({
          orders: [...state.orders, {
            ...orderData,
            id: Date.now().toString(),
            status: 'pending',
            date: new Date().toISOString()
          }]
        })),
      updateOrderStatus: (orderId, status) =>
        set((state) => ({
          orders: state.orders.map((order) =>
            order.id === orderId ? { ...order, status } : order
          )
        })),
      deleteOrder: (orderId) =>
        set((state) => ({
          orders: state.orders.filter((order) => order.id !== orderId)
        })),
    }),
    {
      name: 'avenger-store',
    }
  )
);

export default useStore;