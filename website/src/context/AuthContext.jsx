import { createContext, useContext, useEffect, useState } from "react";
import { useAuth as useClerkAuth, useUser } from "@clerk/clerk-react";
import api from "../services/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const { isLoaded, isSignedIn, getToken } = useClerkAuth();
  const { user } = useUser();

  const [profile, setProfile] = useState(null);
  const [loadingProfile, setLoadingProfile] = useState(true);

  const syncProfile = async () => {
    if (!isLoaded) return;

    if (!isSignedIn) {
      setProfile(null);
      setLoadingProfile(false);
      return;
    }

    try {
      setLoadingProfile(true);

      const token = await getToken();

      const res = await api.post(
        "/auth/sync-profile",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setProfile(res.data.profile);
    } catch (error) {
      console.error("SYNC PROFILE ERROR:", {
        message: error.response?.data?.message || error.message,
        status: error.response?.status,
        data: error.response?.data,
      });

      setProfile(null);
    } finally {
      setLoadingProfile(false);
    }
  };

  useEffect(() => {
    syncProfile();
  }, [isLoaded, isSignedIn]);

  const role = profile?.role || user?.publicMetadata?.role || "donor";

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        role,
        isLoaded,
        isSignedIn,
        loading: !isLoaded || loadingProfile,
        isAdmin: role === "admin",
        isDonor: role === "donor",
        getToken,
        refreshProfile: syncProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAppAuth() {
  return useContext(AuthContext);
}