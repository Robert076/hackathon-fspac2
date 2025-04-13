"use client";

import React, { useState, useEffect } from "react";
import DebtDashboard from "@/components/DebtDashboard";
import DebtCalculator from "@/components/DebtCalculator";
import DebtStrategy from "@/components/DebtStrategy";
import { Debt } from "@/types";
import { useAuth } from "@/lib/auth";
import { db } from "@/lib/models";

export default function DebtManager() {
  const { user } = useAuth();
  const [debts, setDebts] = useState<Debt[]>([]);

  useEffect(() => {
    if (user) {
      setDebts(user.debts);
    }
  }, [user]);

  const handleDebtAdd = async (debt: Debt) => {
    if (!user) return;

    const newDebts = [...debts, debt];
    setDebts(newDebts);
    await db.updateUserDebts(user.id, newDebts);
  };

  if (!user) {
    return (
      <div className="text-center py-8">
        <h2 className="text-xl font-semibold mb-4">Please log in to manage your debts</h2>
        <p className="text-gray-600">
          You need to be logged in to view and manage your debts.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Debt Management Calculator</h1>
        <div className="text-sm text-gray-600">Welcome, {user.name}</div>
      </div>
      <div className="grid gap-6">
        <DebtDashboard debts={debts} />
        <DebtCalculator onDebtAdd={handleDebtAdd} />
        <DebtStrategy debts={debts} />
      </div>
    </div>
  );
}
