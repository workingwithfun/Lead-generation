import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

interface User {
  name: string;
  email: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (data: any) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(
  null
);

export const AuthProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [user, setUser] = useState<User | null>(
    JSON.parse(localStorage.getItem("user") || "null")
  );

  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );

  const login = (data: any) => {
    setUser(data.user);
    setToken(data.token);

    localStorage.setItem(
      "user",
      JSON.stringify(data.user)
    );

    localStorage.setItem("token", data.token);
  };

  const logout = () => {
    setUser(null);
    setToken(null);

    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("AuthContext missing");
  }

  return context;
};