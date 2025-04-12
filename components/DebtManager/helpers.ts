import { Debt, DebtCalculation, Strategy } from './types';

export const calculateMonthlyPayment = (
    principal: number,
    annualRate: number,
    years: number
): number => {
    const monthlyRate = annualRate / 12 / 100;
    const numberOfPayments = years * 12;
    
    return (
        principal *
        (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
        (Math.pow(1 + monthlyRate, numberOfPayments) - 1)
    );
};

export const calculateTotalInterest = (
    monthlyPayment: number,
    principal: number,
    years: number
): number => {
    return monthlyPayment * years * 12 - principal;
};

export const compareStrategies = (debts: Debt[]): { avalanche: Strategy; snowball: Strategy } => {
    return {
        avalanche: {
            name: 'avalanche',
            debts: [...debts].sort((a, b) => b.interestRate - a.interestRate),
            totalTime: 0, // To be calculated
            totalInterest: 0, // To be calculated
        },
        snowball: {
            name: 'snowball',
            debts: [...debts].sort((a, b) => a.balance - b.balance),
            totalTime: 0, // To be calculated
            totalInterest: 0, // To be calculated
        },
    };
};