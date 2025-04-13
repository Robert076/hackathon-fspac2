"use client";

import React from "react";
import { Debt } from "@/types";
import { compareStrategies } from "@/helpers/helpers";

interface Props {
  debts: Debt[];
}

export default function DebtStrategy({ debts }: Props) {
  const strategies = compareStrategies(debts);

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Repayment Strategies</h2>
      <div className="grid md:grid-cols-2 gap-4">
        {/* Add strategy comparison components */}
      </div>
    </div>
  );
}
