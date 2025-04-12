export interface Debt {
    id: string;
    type: 'mortgage' | 'personal' | 'student' | 'credit_card';
    balance: number;
    interestRate: number;
    minimumPayment: number;
    dueDate: Date;
}

export interface DebtCalculation {
    monthlyPayment: number;
    totalInterest: number;
    totalPayment: number;
    payoffDate: Date;
}

export interface Strategy {
    name: 'avalanche' | 'snowball';
    debts: Debt[];
    totalTime: number;
    totalInterest: number;
}