import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { User } from "firebase/auth";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  loginWithGoogle: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // ✅ Firebase يتحمل lazy بعد الـ render
    let unsub: () => void;

    import("./firebase").then(({ auth }) => {
      import("firebase/auth").then(({ onAuthStateChanged }) => {
        unsub = onAuthStateChanged(auth, (u) => {
          setUser(u);
          setLoading(false);
        });
      });
    });

    return () => unsub?.();
  }, []);

  const login = async (e: string, p: string): Promise<void> => {
    const { auth } = await import("./firebase");
    const { signInWithEmailAndPassword } = await import("firebase/auth");
    await signInWithEmailAndPassword(auth, e, p);
  };

  const signup = async (e: string, p: string): Promise<void> => {
    const { auth } = await import("./firebase");
    const { createUserWithEmailAndPassword } = await import("firebase/auth");
    await createUserWithEmailAndPassword(auth, e, p);
  };

  const logout = async (): Promise<void> => {
    const { auth } = await import("./firebase");
    const { signOut } = await import("firebase/auth");
    await signOut(auth);
  };

  const loginWithGoogle = async (): Promise<void> => {
    const { auth } = await import("./firebase");
    const { GoogleAuthProvider, signInWithPopup } = await import("firebase/auth");
    await signInWithPopup(auth, new GoogleAuthProvider());
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, login, signup, logout, loginWithGoogle }}
    >
      {/* ✅ خلي children تظهر فوراً، loading يتعامل معاه في كل page لوحده */}
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be inside AuthProvider");
  return ctx;
}