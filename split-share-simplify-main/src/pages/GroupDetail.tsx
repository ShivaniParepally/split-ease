
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ArrowLeft, Plus, Users } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Expense } from '@/components/groups/ExpensesList';
import ExpensesList from '@/components/groups/ExpensesList';
import AddExpenseDialog from '@/components/groups/AddExpenseDialog';
import { Friend } from '@/components/friends/FriendCard';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'sonner';

// Define Member interface to match Group's members
export interface Member {
  id: string;
  name: string;
  email: string;
}

interface Group {
  id: string;
  name: string;
  description?: string;
  members: Member[];
  expenseCount: number;
}

const GroupDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [group, setGroup] = useState<Group | null>(null);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [isAddExpenseOpen, setIsAddExpenseOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  const currentUser: Friend = {
    id: 'current-user',
    name: 'You',
    email: 'you@example.com',
    status: 'active' as any,
  };

  useEffect(() => {
    // Simulate fetching group data
    setTimeout(() => {
      if (id) {
        // In a real app, you would fetch the group from your API
        // For now, we'll create mock data
        const mockGroup: Group = {
          id,
          name: 'Trip to Paris',
          description: 'Summer vacation with friends',
          members: [
            {
              id: 'current-user',
              name: 'You',
              email: 'you@example.com',
            },
            {
              id: '1',
              name: 'John Doe',
              email: 'john@example.com',
            },
            {
              id: '2',
              name: 'Jane Smith',
              email: 'jane@example.com',
            },
          ],
          expenseCount: 2,
        };

        const mockExpenses: Expense[] = [
          {
            id: '1',
            title: 'Hotel Booking',
            amount: 450,
            paidBy: {
              id: 'current-user',
              name: 'You',
            },
            date: new Date(Date.now() - 86400000 * 2), // 2 days ago
            splitBetween: [
              {
                id: 'current-user',
                name: 'You',
                amount: 150,
              },
              {
                id: '1',
                name: 'John Doe',
                amount: 150,
              },
              {
                id: '2',
                name: 'Jane Smith',
                amount: 150,
              },
            ],
          },
          {
            id: '2',
            title: 'Dinner at Restaurant',
            amount: 120,
            paidBy: {
              id: '1',
              name: 'John Doe',
            },
            date: new Date(Date.now() - 86400000), // 1 day ago
            splitBetween: [
              {
                id: 'current-user',
                name: 'You',
                amount: 40,
              },
              {
                id: '1',
                name: 'John Doe',
                amount: 40,
              },
              {
                id: '2',
                name: 'Jane Smith',
                amount: 40,
              },
            ],
          },
        ];

        setGroup(mockGroup);
        setExpenses(mockExpenses);
      }
      setIsLoading(false);
    }, 1000);
  }, [id]);

  const handleAddExpense = (
    title: string,
    amount: number,
    paidById: string,
    splitMethod: 'equal' | 'custom',
    customSplit?: Record<string, number>
  ) => {
    if (!group) return;

    // Find the person who paid
    const paidByMember = group.members.find(member => member.id === paidById);
    if (!paidByMember) return;

    // Calculate split amounts
    let splitBetween: Array<{ id: string; name: string; amount: number }> = [];

    if (splitMethod === 'equal') {
      // Equal split
      const perPersonAmount = amount / group.members.length;
      
      splitBetween = group.members.map(member => ({
        id: member.id,
        name: member.name,
        amount: parseFloat(perPersonAmount.toFixed(2)),
      }));
    } else if (splitMethod === 'custom' && customSplit) {
      // Custom split
      splitBetween = Object.entries(customSplit).map(([memberId, memberAmount]) => {
        const member = group.members.find(m => m.id === memberId);
        return {
          id: memberId,
          name: member?.name || 'Unknown',
          amount: memberAmount,
        };
      });
    }

    // Create new expense
    const newExpense: Expense = {
      id: uuidv4(),
      title,
      amount,
      paidBy: {
        id: paidByMember.id,
        name: paidByMember.name,
      },
      date: new Date(),
      splitBetween,
    };

    // Update expenses list
    setExpenses(prev => [newExpense, ...prev]);

    // Update expense count in group
    setGroup(prev => 
      prev ? { ...prev, expenseCount: prev.expenseCount + 1 } : null
    );
  };

  // Get initials from name
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  if (isLoading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="text-center">
          <h2 className="text-lg font-medium">Loading group details...</h2>
          <p className="text-muted-foreground">Please wait</p>
        </div>
      </div>
    );
  }

  if (!group) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="text-center">
          <h2 className="text-lg font-medium">Group not found</h2>
          <p className="text-muted-foreground mb-4">The group you're looking for doesn't exist.</p>
          <Button onClick={() => navigate('/groups')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Groups
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <Button variant="ghost" onClick={() => navigate('/groups')} className="mr-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{group.name}</h1>
          {group.description && <p className="text-muted-foreground">{group.description}</p>}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="mr-2 h-5 w-5" />
                Members
              </CardTitle>
              <CardDescription>
                {group.members.length} people in this group
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {group.members.map((member) => (
                  <div key={member.id} className="flex items-center">
                    <Avatar className="h-10 w-10 mr-3">
                      <AvatarFallback className="bg-splitease-primary text-white">
                        {getInitials(member.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{member.name}</p>
                      <p className="text-xs text-muted-foreground">{member.email}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Group Balance</CardTitle>
              <CardDescription>
                What everyone owes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {group.members.map((member) => {
                  // For demo, we'll generate random balances
                  const amount = Math.random() > 0.5 ? 
                    Math.floor(Math.random() * 100) : 
                    -Math.floor(Math.random() * 100);

                  return (
                    <div key={member.id} className="flex justify-between items-center">
                      <div className="flex items-center">
                        <Avatar className="h-8 w-8 mr-2">
                          <AvatarFallback className="bg-splitease-soft-purple text-splitease-primary text-xs">
                            {getInitials(member.name)}
                          </AvatarFallback>
                        </Avatar>
                        <span>{member.name}</span>
                      </div>
                      <span className={amount > 0 ? 'text-green-600' : 'text-red-500'}>
                        {amount > 0 ? `gets $${amount}` : `owes $${Math.abs(amount)}`}
                      </span>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="md:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Expenses</h2>
            <Button onClick={() => setIsAddExpenseOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Expense
            </Button>
          </div>
          
          <ExpensesList expenses={expenses} />
        </div>
      </div>

      <AddExpenseDialog
        open={isAddExpenseOpen}
        onOpenChange={setIsAddExpenseOpen}
        onAddExpense={handleAddExpense}
        groupMembers={group.members}
        currentUser={currentUser}
      />
    </div>
  );
};

export default GroupDetail;
