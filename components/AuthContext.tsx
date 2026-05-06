"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type User = {
  id: string;
  name: string;
  email: string;
};

type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => Promise<{ error: string | null }>;
  signup: (name: string, email: string, password: string) => Promise<{ error: string | null }>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => ({ error: null }),
  signup: async () => ({ error: null }),
  logout: async () => {},
});

async function fetchProfile(id: string): Promise<User | null> {
  const { data } = await supabase
    .from("profiles")
    .select("username, email")
    .eq("id", id)
    .single();
  if (!data) return null;
  return { id, name: data.username, email: data.email };
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (session?.user) {
        const profile = await fetchProfile(session.user.id);
        if (profile) setUser(profile);
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_OUT") {
        setUser(null);
        return;
      }
      if (session?.user) {
        const profile = await fetchProfile(session.user.id);
        if (profile) setUser(profile);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error: error?.message ?? null };
  };

  const signup = async (name: string, email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: name } },
    });
    if (error) return { error: error.message };
    // Profile row is created automatically by the on_auth_user_created trigger.
    // Set local state immediately so the UI doesn't wait for onAuthStateChange.
    if (data.user) {
      setUser({ id: data.user.id, name, email });
    }
    return { error: null };
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
