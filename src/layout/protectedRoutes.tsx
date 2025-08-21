import LoadingBar from "../components/LoadingBar";
import * as React from "react"
 import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

interface Props {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: Props) {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkSession = async () => {
      const publicPaths = ["/login"];
      if (publicPaths.includes(location.pathname)) {
        setLoading(false);
        return;
      }

      const token = localStorage.getItem("cms_token");
      if (!token) {
        navigate("/login", { replace: true });
        return;
      }

      try {
        const res = await fetch(`/api/check-session`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json"
            }
          }
        );

        if (res.status === 401) {
          console.warn("Session expired or invalid");
          localStorage.removeItem("cms_token");
          navigate("/login", { replace: true });
          return;
        }

        if (!res.ok) {
          console.error(`Server error: ${res.status}`);
          localStorage.removeItem("token");
          navigate("/login", { replace: true });
          return;
        }

        setLoading(false);
      } catch (err) {
        console.error("Network error:", err);
        localStorage.removeItem("token");
        navigate("/login", { replace: true });
      }
    };

    checkSession();
  }, [navigate, location.pathname]);

  if (loading) {
    return <LoadingBar isLoading={loading}/> 
  }

  return <>{children}</>;
}
