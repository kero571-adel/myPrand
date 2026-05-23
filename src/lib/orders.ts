// ─── Types ───────────────────────────────────────────────────────────────────

export type OrderStatus =
  | 'ORDER_PLACED'       // order submitted by customer
  | 'SHIPPED'            // handed to courier
  | 'DELIVERED'          // successfully delivered
  | 'CANCELLED';         // cancelled

export interface OrderItem {
  id: string;
  name: string;
  size: string;
  quantity: number;
  price: number;
  image: string;
}

export interface Order {
  orderId: string;          // e.g. "STYL-20240523-A3F2"
  placedAt: string;         // ISO date string
  status: OrderStatus;
  statusHistory: {
    status: OrderStatus;
    timestamp: string;
    note?: string;
  }[];
  customer: {
    name: string;
    phone: string;
    email?: string;
    governorate: string;
    govLabel: string;
    city: string;
    address: string;
  };
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  grandTotal: number;
  deliveryDays: string;
}

// ─── Storage helpers ─────────────────────────────────────────────────────────

const ORDERS_LS_KEY = 'styl_orders';

export function getOrders(): Order[] {
  try {
    const raw = localStorage.getItem(ORDERS_LS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveOrders(orders: Order[]): void {
  try {
    localStorage.setItem(ORDERS_LS_KEY, JSON.stringify(orders));
  } catch {
    // storage full — fail silently
  }
}

export function addOrder(order: Order): void {
  const orders = getOrders();
  orders.unshift(order); // newest first
  saveOrders(orders);
}

export function updateOrderStatus(
  orderId: string,
  status: OrderStatus,
  note?: string
): void {
  const orders = getOrders();
  const idx = orders.findIndex((o) => o.orderId === orderId);
  if (idx === -1) return;
  orders[idx].status = status;
  orders[idx].statusHistory.push({
    status,
    timestamp: new Date().toISOString(),
    note,
  });
  saveOrders(orders);
}

// ─── ID generator ────────────────────────────────────────────────────────────

export function generateOrderId(): string {
  const date = new Date();
  const datePart = `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, '0')}${String(date.getDate()).padStart(2, '0')}`;
  const rand = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `STYL-${datePart}-${rand}`;
}

// ─── Status display helpers ───────────────────────────────────────────────────

export const STATUS_META: Record<
  OrderStatus,
  { label: string; color: string; bg: string; border: string; icon: string }
> = {
  ORDER_PLACED: {
    label: 'Order Placed',
    color: '#febc2e',
    bg: 'rgba(254,188,46,0.08)',
    border: 'rgba(254,188,46,0.3)',
    icon: '⏳',
  },
  SHIPPED: {
    label: 'Shipped',
    color: '#00aaff',
    bg: 'rgba(0,170,255,0.08)',
    border: 'rgba(0,170,255,0.3)',
    icon: '🚚',
  },
  DELIVERED: {
    label: 'Delivered',
    color: '#00FF00',
    bg: 'rgba(0,255,0,0.08)',
    border: 'rgba(0,255,0,0.3)',
    icon: '✓',
  },
  CANCELLED: {
    label: 'Cancelled',
    color: '#ff5f57',
    bg: 'rgba(255,95,87,0.08)',
    border: 'rgba(255,95,87,0.3)',
    icon: '✕',
  },
};