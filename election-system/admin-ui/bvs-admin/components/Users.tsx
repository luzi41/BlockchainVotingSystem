"use client"
import { useEffect, useState } from "react";
//import { NextResponse } from "next/server";
//import { prisma } from "@/lib/prisma";

export default function Content () {
    const [users, setUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    /*
    useEffect(() => {
        async function fetchUsers() {
            try {
                const _users = await prisma.users.findMany({
                    
                });
                setUsers(_users);
                setLoading(false);                
            } catch (error) {
                console.error("Konnte Benutzer nicht laden.", error);
            }
        }
        fetchUsers();
    }, []);
    */
    return (
        <div id="content">
            <h2>Users</h2>
            <div>
                {loading ? (
                    <div>Loading...</div>
                ) : (
                    <ul>
                        {users.map((user) => (
                            <li key={user.id}>{JSON.stringify(user)}</li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}