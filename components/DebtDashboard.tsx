'use client';

import React from 'react';
import { Debt } from '@/components/DebtManager/types';

interface Props {
    debts: Debt[];
}

export default function DebtDashboard({ debts }: Props) {
    const totalDebt = debts.reduce((sum, debt) => sum + debt.balance, 0);

    return (
        <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Debt Overview</h2>
            <div className="grid gap-4">
                <div>
                    <p className="text-gray-600">Total Debt</p>
                    <p className="text-2xl font-bold">
                        ${totalDebt.toLocaleString()}
                    </p>
                </div>
                {/* Add more dashboard components */}
            </div>
        </div>
    );
}