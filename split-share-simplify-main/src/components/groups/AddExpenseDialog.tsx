
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { Friend } from '@/components/friends/FriendCard';

interface Member {
  id: string;
  name: string;
}

interface AddExpenseDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddExpense: (title: string, amount: number, paidById: string, splitMethod: 'equal' | 'custom', customSplit?: Record<string, number>) => void;
  groupMembers: Member[];
  currentUser: Friend;
}

const splitOptions = [
  { value: 'equal', label: 'Split equally' },
  { value: 'custom', label: 'Custom amounts' },
];

const AddExpenseDialog: React.FC<AddExpenseDialogProps> = ({
  open,
  onOpenChange,
  onAddExpense,
  groupMembers,
  currentUser,
}) => {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [paidById, setPaidById] = useState(currentUser.id);
  const [splitMethod, setSplitMethod] = useState<'equal' | 'custom'>('equal');
  const [customSplit, setCustomSplit] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [totalSplit, setTotalSplit] = useState(0);

  // Initialize custom split amounts when members change or split method changes
  useEffect(() => {
    if (splitMethod === 'equal' || !open) return;
    
    const equalShare = amount ? parseFloat(amount) / groupMembers.length : 0;
    const newCustomSplit: Record<string, string> = {};
    
    groupMembers.forEach(member => {
      newCustomSplit[member.id] = equalShare.toFixed(2);
    });
    
    setCustomSplit(newCustomSplit);
  }, [groupMembers, splitMethod, amount, open]);

  // Calculate total split amount
  useEffect(() => {
    if (splitMethod !== 'custom') return;
    
    let total = 0;
    Object.values(customSplit).forEach(value => {
      total += parseFloat(value || '0');
    });
    
    setTotalSplit(total);
  }, [customSplit, splitMethod]);

  const handleCustomSplitChange = (memberId: string, value: string) => {
    setCustomSplit(prev => ({
      ...prev,
      [memberId]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title) {
      toast.error('Please enter an expense title');
      return;
    }

    if (!amount || isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }

    if (splitMethod === 'custom') {
      const targetAmount = parseFloat(amount);
      const difference = Math.abs(totalSplit - targetAmount);
      
      if (difference > 0.01) { // Allow small rounding errors
        toast.error(`The sum of splits (${totalSplit.toFixed(2)}) doesn't match the total amount (${targetAmount.toFixed(2)})`);
        return;
      }

      // Convert string values to numbers
      const processedSplit: Record<string, number> = {};
      Object.entries(customSplit).forEach(([key, value]) => {
        processedSplit[key] = parseFloat(value || '0');
      });

      setIsLoading(true);
      
      // Simulate API call
      setTimeout(() => {
        onAddExpense(title, parseFloat(amount), paidById, splitMethod, processedSplit);
        resetForm();
        setIsLoading(false);
        onOpenChange(false);
        toast.success('Expense added successfully');
      }, 1000);
      
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      onAddExpense(title, parseFloat(amount), paidById, 'equal');
      resetForm();
      setIsLoading(false);
      onOpenChange(false);
      toast.success('Expense added successfully');
    }, 1000);
  };

  const resetForm = () => {
    setTitle('');
    setAmount('');
    setPaidById(currentUser.id);
    setSplitMethod('equal');
    setCustomSplit({});
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add an expense</DialogTitle>
          <DialogDescription>
            Add a new expense to track who paid and how it's split.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Expense title</Label>
              <Input
                id="title"
                placeholder="Dinner at restaurant"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="amount">Amount ($)</Label>
              <Input
                id="amount"
                type="number"
                placeholder="0.00"
                min="0.01"
                step="0.01"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="paidBy">Paid by</Label>
              <Select value={paidById} onValueChange={setPaidById}>
                <SelectTrigger id="paidBy">
                  <SelectValue placeholder="Select who paid" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={currentUser.id}>
                    You ({currentUser.name || currentUser.email})
                  </SelectItem>
                  {groupMembers.filter(m => m.id !== currentUser.id).map((member) => (
                    <SelectItem key={member.id} value={member.id}>
                      {member.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="splitMethod">Split method</Label>
              <Select value={splitMethod} onValueChange={(value) => setSplitMethod(value as 'equal' | 'custom')}>
                <SelectTrigger id="splitMethod">
                  <SelectValue placeholder="How to split the expense" />
                </SelectTrigger>
                <SelectContent>
                  {splitOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {splitMethod === 'custom' && amount && (
              <div className="grid gap-2 border rounded-md p-3">
                <div className="flex justify-between text-sm font-medium">
                  <span>Member</span>
                  <span>Amount ($)</span>
                </div>
                {groupMembers.map((member) => (
                  <div key={member.id} className="flex justify-between items-center">
                    <span>{member.id === currentUser.id ? `You (${member.name})` : member.name}</span>
                    <Input
                      type="number"
                      min="0"
                      step="0.01"
                      value={customSplit[member.id] || ''}
                      onChange={(e) => handleCustomSplitChange(member.id, e.target.value)}
                      className="w-24"
                    />
                  </div>
                ))}
                <div className="flex justify-between items-center font-medium">
                  <span>Total</span>
                  <div className={`text-sm ${Math.abs(totalSplit - parseFloat(amount || '0')) > 0.01 ? 'text-red-500' : 'text-green-500'}`}>
                    ${totalSplit.toFixed(2)} / ${parseFloat(amount || '0').toFixed(2)}
                  </div>
                </div>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Adding...' : 'Add Expense'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddExpenseDialog;
