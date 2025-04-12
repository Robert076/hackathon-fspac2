"use client";

import React, { useState } from "react";
import DebtManager from "@/components/DebtManager";
import { AuthProvider, useAuth } from "@/lib/auth";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, name);
  };

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        background: "#eaeaea",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          background: "#c0c0c0",
          padding: "50px 25px",
          borderRadius: "5px",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h2 style={{ textShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", color: "white" }}>
          Welcome back!
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-start",
              flexDirection: "column",
            }}
          >
            <label
              style={{
                fontSize: "12px",
                marginTop: "15px",
                color: "white",
                textShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
              }}
            >
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Type here..."
              style={{
                padding: "5px 10px",
                boxSizing: "border-box",
                width: "100%",
                borderRadius: "5px",
                border: "1px solid rgba(0, 0, 0, 0.2)",
              }}
              required
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-start",
              flexDirection: "column",
            }}
          >
            <label
              style={{
                fontSize: "12px",
                marginTop: "15px",
                color: "white",
                textShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
              }}
            >
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{
                padding: "5px 10px",
                boxSizing: "border-box",
                width: "100%",
                borderRadius: "5px",
                border: "1px solid rgba(0, 0, 0, 0.2)",
              }}
              placeholder="Type here..."
              required
            />
          </div>
          <button
            type="submit"
            style={{
              width: "100%",
              marginTop: "25px",
              padding: "10px 20px",
              border: "none",
              borderRadius: "5px",
              background: "#539BF5",
              color: "white",
              fontWeight: "500",
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
            }}
          >
            LOGIN
          </button>
        </form>
      </div>
    </div>
  );
}

function AppContent() {
  const { user } = useAuth();

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      {!user ? <LoginForm /> : <DebtManager />}
    </main>
  );
}

export default function Home() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
