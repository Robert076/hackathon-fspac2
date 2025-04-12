'use client';

import React from 'react';
import { Debt } from '@/components/DebtManager/types';

interface Props {
    debts: Debt[];
}

export default function DebtDashboard({ debts }: Props) {
    const totalDebt = debts.reduce((sum, debt) => sum + debt.balance, 0);
    const averageInterestRate = debts.length > 0 
        ? debts.reduce((sum, debt) => sum + debt.interestRate, 0) / debts.length 
        : 0;
    
    const debtByType = debts.reduce((acc, debt) => {
        acc[debt.type] = (acc[debt.type] || 0) + debt.balance;
        return acc;
    }, {} as Record<string, number>);

    return (
        <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Debt Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-600 text-sm">Total Debt</p>
                    <p className="text-2xl font-bold text-gray-900">
                        ${totalDebt.toLocaleString()}
                    </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-600 text-sm">Average Interest Rate</p>
                    <p className="text-2xl font-bold text-gray-900">
                        {averageInterestRate.toFixed(2)}%
                    </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-600 text-sm">Number of Debts</p>
                    <p className="text-2xl font-bold text-gray-900">
                        {debts.length}
                    </p>
                </div>
            </div>

            {debts.length > 0 && (
                <div className="mt-6">
                    <h3 className="text-lg font-medium mb-3">Debt Breakdown by Type</h3>
                    <div className="space-y-2">
                        {Object.entries(debtByType).map(([type, amount]) => (
                            <div key={type} className="flex justify-between items-center">
                                <span className="capitalize">{type.replace('_', ' ')}</span>
                                <span className="font-medium">${amount.toLocaleString()}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {debts.length === 0 && (
                <div className="mt-6 text-center text-gray-500">
                    No debts added yet. Add your first debt to see the dashboard.
                </div>
            )}
        </div>
    );
}