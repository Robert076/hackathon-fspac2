"use client";

import React, { useState } from "react";
import toast from "react-hot-toast";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/db/user/${email}`);
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error || "Something went wrong");
        return;
      }
      console.log("User data:", data);
      return data;
    } catch (error: any) {
      toast.error(error);
    }
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
        backgroundImage: "url('./bg.jpeg')",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          background: "rgba(0, 0, 0, 0.7)",
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
                fontSize: "11px",
                marginTop: "15px",
                color: "white",
                textShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                marginBottom: "2px",
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
                fontSize: "11px",
                marginTop: "15px",
                color: "white",
                textShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                marginBottom: "2px",
              }}
            >
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
          <div
            style={{
              width: "100%",
              textAlign: "center",
              marginTop: "20px",
            }}
          >
            <a
              href="#"
              style={{
                fontSize: "11px",
                color: "#539BF5",
              }}
              onClick={() => {
                toast.success("Try to remember it next time :)");
              }}
            >
              Forgot password?
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
