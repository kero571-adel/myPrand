import {
    createContext,
    useContext,
    useEffect,
    useState,
    type ReactNode,
  } from "react";
  import {
    onAuthStateChanged,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    GoogleAuthProvider,
    signInWithPopup,
    type User,
  } from "firebase/auth";
  import { auth } from "./firebase";
  
  interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<void>;
    signup: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    loginWithGoogle: () => Promise<void>;
  }
  
  const AuthContext = createContext<AuthContextType | null>(null);
  
  const googleProvider = new GoogleAuthProvider();
  
  export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const unsub = onAuthStateChanged(auth, (u) => {
        setUser(u);
        setLoading(false);
      });
      return unsub;
    }, []);
  
    const login = async (e: string, p: string): Promise<void> => {
      await signInWithEmailAndPassword(auth, e, p);
    };
  
    const signup = async (e: string, p: string): Promise<void> => {
      await createUserWithEmailAndPassword(auth, e, p);
    };
  
    const logout = async (): Promise<void> => {
      await signOut(auth);
    };
  
    const loginWithGoogle = async (): Promise<void> => {
      await signInWithPopup(auth, googleProvider);
    };
  
    return (
      <AuthContext.Provider
        value={{ user, loading, login, signup, logout, loginWithGoogle }}
      >
        {!loading && children}
      </AuthContext.Provider>
    );
  }
  
  export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be inside AuthProvider");
    return ctx;
  }