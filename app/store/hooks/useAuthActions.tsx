import { useAppStore, Profile } from "..";
import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export const useAuthActions = () => {
  const { state, dispatch } = useAppStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const me = async () => {
    setLoading(true);
    try {
      //   const profile: Profile = {};
      //   dispatch({ type: "SET_USER", payload: profile });
      setError(null);
    } catch (e) {
      dispatch({ type: "SET_USER", payload: null });
      setError("Failed to get user");
    } finally {
      setLoading(false);
    }
  };

  const signup = async ({
    password,
    ...data
  }: Omit<Profile, "id" | "listOfSongs"> & { password: string }) => {
    setLoading(true);
    try {
      const {
        data: { user, session },
        error,
      } = await supabase.auth.signUp({
        email: data.email,
        password,
        options: {
          data,
        },
      });

      const profile = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user?.id)
        .single();

      dispatch({ type: "SET_USER", payload: profile as unknown as Profile });

      setError(null);
    } catch (e) {
      dispatch({ type: "SET_USER", payload: null });
      setError("Failed to sign up");
    } finally {
      setLoading(false);
    }
  };

  const login = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    setLoading(true);

    try {
      dispatch({ type: "SET_USER", payload: null });
      const {
        data: { user, session },
        error,
      } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      const profile = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user?.id)
        .single();

      dispatch({ type: "SET_USER", payload: profile as unknown as Profile });
      setError(null);
    } catch (e) {
      dispatch({ type: "SET_USER", payload: null });
      setError("Failed to log in");
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await supabase.auth.signOut();
      dispatch({ type: "SET_USER", payload: null });
      setError(null);
    } catch (e) {
      setError("Failed to log out");
    } finally {
      setLoading(false);
    }
  };

  const addSong = async (song: string) => {
    setLoading(true);
    try {
      dispatch({ type: "ADD_SONG", payload: song });
    } catch (e) {
      setError("Failed to add song");
    } finally {
      setLoading(false);
    }
  };

  const removeSong = async (song: string) => {
    setLoading(true);
    try {
      dispatch({ type: "REMOVE_SONG", payload: song });
    } catch (e) {
      setError("Failed to remove song");
    } finally {
      setLoading(false);
    }
  };

  return {
    profile: state.profile,
    signup,
    login,
    logout,
    me,
    loading,
    error,
  };
};
