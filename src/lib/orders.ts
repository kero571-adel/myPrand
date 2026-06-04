import {
  collection,
  addDoc,
  query,
  where,
  orderBy,
  doc,
  updateDoc,
  arrayUnion,
  onSnapshot,
  type Unsubscribe,
} from "firebase/firestore";
import { getDb } from "./firebase";

// ─── Types ───────────────────────────────────────────────────────────────────

export type OrderStatus =
  | "ORDER_PLACED"
  | "SHIPPED"
  | "DELIVERED"
  | "CANCELLED";

export interface OrderItem {
  id: string;
  name: string;
  size: string;
  quantity: number;
  price: number;
  image: string;
}

export interface Order {
  firestoreId?: string;
  orderId: string;
  userId: string;
  placedAt: string;
  status: OrderStatus;
  statusHistory: { status: OrderStatus; timestamp: string; note?: string }[];
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

// ─── Helpers ─────────────────────────────────────────────────────────────────

export function generateOrderId(): string {
  const d = new Date();
  const date = `${d.getFullYear()}${String(d.getMonth() + 1).padStart(
    2,
    "0"
  )}${String(d.getDate()).padStart(2, "0")}`;
  const rand = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `STYL-${date}-${rand}`;
}

// ─── Firestore CRUD ───────────────────────────────────────────────────────────

export async function addOrder(
  order: Omit<Order, "firestoreId">
): Promise<string> {
  const db = await getDb();
  const ref = await addDoc(collection(db, "orders"), order);
  return ref.id;
}

export function subscribeToUserOrders(
  userId: string,
  callback: (orders: Order[]) => void
): () => void {
  let unsub: Unsubscribe | undefined;
  let cancelled = false;

  (async () => {
    const db = await getDb();
    if (cancelled) return;
    const q = query(
      collection(db, "orders"),
      where("userId", "==", userId),
      orderBy("placedAt", "desc")
    );
    unsub = onSnapshot(q, (snap) => {
      const orders: Order[] = snap.docs.map((d) => ({
        ...(d.data() as Omit<Order, "firestoreId">),
        firestoreId: d.id,
      }));
      callback(orders);
    });
  })();

  return () => {
    cancelled = true;
    unsub?.();
  };
}

export async function updateOrderStatus(
  firestoreId: string,
  status: OrderStatus,
  note?: string
): Promise<void> {
  const db = await getDb();
  await updateDoc(doc(db, "orders", firestoreId), {
    status,
    statusHistory: arrayUnion({
      status,
      timestamp: new Date().toISOString(),
      ...(note ? { note } : {}),
    }),
  });
}

// ─── Status display meta ─────────────────────────────────────────────────────

export const STATUS_META: Record<
  OrderStatus,
  { label: string; color: string; bg: string; border: string; icon: string }
> = {
  ORDER_PLACED: {
    label: "Order Placed",
    color: "#febc2e",
    bg: "rgba(254,188,46,0.08)",
    border: "rgba(254,188,46,0.3)",
    icon: "⏳",
  },
  SHIPPED: {
    label: "Shipped",
    color: "#00aaff",
    bg: "rgba(0,170,255,0.08)",
    border: "rgba(0,170,255,0.3)",
    icon: "🚚",
  },
  DELIVERED: {
    label: "Delivered",
    color: "#00FF00",
    bg: "rgba(0,255,0,0.08)",
    border: "rgba(0,255,0,0.3)",
    icon: "✓",
  },
  CANCELLED: {
    label: "Cancelled",
    color: "#ff5f57",
    bg: "rgba(255,95,87,0.08)",
    border: "rgba(255,95,87,0.3)",
    icon: "✕",
  },
};
