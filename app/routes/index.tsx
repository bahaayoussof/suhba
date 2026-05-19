import { useEffect } from "react";
import { useNavigate } from "react-router";

/**
 * Root index route.
 * - If authenticated (token in localStorage or sessionStorage) → redirect to dashboard
 * - Otherwise → redirect to /login
 */
export default function RootIndex() {
  const navigate = useNavigate();

  useEffect(() => {
    const token =
      localStorage.getItem("token") ?? sessionStorage.getItem("token");
    if (token) {
      navigate("/dashboard/sessions", { replace: true });
    } else {
      navigate("/login", { replace: true });
    }
  }, [navigate]);

  return null;
}
