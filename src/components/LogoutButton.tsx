"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function LogoutButton() {
  const router = useRouter();

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout successful");
      router.replace("/login");
      router.refresh();
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Unable to logout";
      toast.error(message);
    }
  };

  return (
    <button
      className="btn btn-primary btn-outline"
      type="button"
      onClick={logout}
    >
      Logout
    </button>
  );
}
