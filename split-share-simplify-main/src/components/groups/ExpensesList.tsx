
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { formatDistanceToNow } from 'date-fns';

export interface Expense {
  id: string;
  title: string;
  amount: number;
  paidBy: {
    id: string;
    name: string;
  };
  date: Date;
  splitBetween: Array<{
    id: string;
    name: string;
    amount: number;
  }>;
}

interface ExpensesListProps {
  expenses: Expense[];
}

const ExpensesList: React.FC<ExpensesListProps> = ({ expenses }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Expenses</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          {expenses.length > 0 ? (
            <div className="space-y-4">
              {expenses.map((expense, index) => (
                <React.Fragment key={expense.id}>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">{expense.title}</h3>
                      <span className="font-bold text-green-600">${expense.amount.toFixed(2)}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>Paid by {expense.paidBy.name}</span>
                      <span>{formatDistanceToNow(expense.date, { addSuffix: true })}</span>
                    </div>
                    <div className="rounded-md bg-muted p-2">
                      <div className="text-xs font-medium text-muted-foreground mb-1">Split between:</div>
                      <div className="space-y-1">
                        {expense.splitBetween.map((person) => (
                          <div key={person.id} className="flex items-center justify-between text-xs">
                            <span>{person.name}</span>
                            <span>${person.amount.toFixed(2)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  {index < expenses.length - 1 && <Separator />}
                </React.Fragment>
              ))}
            </div>
          ) : (
            <div className="flex h-[300px] items-center justify-center">
              <p className="text-muted-foreground">No expenses yet</p>
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default ExpensesList;
