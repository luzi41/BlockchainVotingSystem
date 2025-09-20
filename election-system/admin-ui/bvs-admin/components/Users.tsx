// app/users/page.tsx
"use client";

import { useEffect, useState } from "react";

export default function UsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await fetch("/api/users");
        if (!res.ok) throw new Error("API request failed");
        const data = await res.json();
        setUsers(data);
      } catch (error) {
        console.error("Konnte Benutzer nicht laden:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchUsers();
  }, []);

  return (
    <div>
      <h2>Benutzer</h2>
      {loading ? (
        <div>Lade...</div>
      ) : (
        <ul>
          {users.map((u) => (
            <li key={u.id}>
              {u.username} ({u.email ?? "keine Email"})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
