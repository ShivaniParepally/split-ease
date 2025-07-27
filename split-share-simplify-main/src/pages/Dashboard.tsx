
import React, { useState, useEffect } from 'react';
import { ArrowDownIcon, ArrowUpIcon, CreditCard, DollarSign, Wallet } from 'lucide-react';
import { Card } from '@/components/ui/card';
import StatCard from '@/components/dashboard/StatCard';
import RecentActivity, { ActivityItem } from '@/components/dashboard/RecentActivity';
import { useAuth } from '@/context/AuthContext';
import api from '@/services/api';
import { toast } from 'sonner';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [totalOwed, setTotalOwed] = useState<number>(0);
  const [totalOwe, setTotalOwe] = useState<number>(0);
  const [totalSpent, setTotalSpent] = useState<number>(0);
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUserSummary = async () => {
      if (user?._id || user?.id) {
        try {
          setIsLoading(true);
          const userId = user._id || user.id;
          const response = await api.expenses.getUserSummary(userId as string);
          
          // Update financial summary
          setTotalOwed(response.data.totalOwed);
          setTotalOwe(response.data.totalOwe);
          setTotalSpent(response.data.totalSpent);
          
          // Here you could also fetch recent activity data
          // const activityResponse = await api.activities.getRecent(userId);
          // setActivities(activityResponse.data);
          
        } catch (error) {
          console.error('Error fetching user summary:', error);
          toast.error('Failed to load financial summary');
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchUserSummary();
  }, [user]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Track your expenses, debts, and credits.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <StatCard
          title="Total you are owed"
          value={totalOwed ? `$${totalOwed.toFixed(2)}` : '$0.00'}
          description="Amount friends owe you"
          icon={ArrowDownIcon}
          className="bg-gradient-to-br from-splitease-soft-green to-white"
          iconClassName="bg-green-100 text-green-500"
          isLoading={isLoading}
        />
        <StatCard
          title="Total you owe"
          value={totalOwe ? `$${totalOwe.toFixed(2)}` : '$0.00'}
          description="Amount you owe friends"
          icon={ArrowUpIcon}
          className="bg-gradient-to-br from-splitease-soft-orange to-white"
          iconClassName="bg-orange-100 text-orange-500"
          isLoading={isLoading}
        />
        <StatCard
          title="Total spent"
          value={totalSpent ? `$${totalSpent.toFixed(2)}` : '$0.00'}
          description="Your total expenses"
          icon={Wallet}
          className="bg-gradient-to-br from-splitease-soft-purple to-white"
          iconClassName="bg-purple-100 text-purple-500"
          isLoading={isLoading}
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <RecentActivity activities={activities} />
        
        <Card className="col-span-1 lg:col-span-2 p-6">
          <h2 className="text-xl font-semibold mb-4">Add your first expense</h2>
          <p className="text-muted-foreground mb-6">
            Start by adding friends and creating a group to track your shared expenses.
          </p>
          <div className="grid gap-2 sm:grid-cols-2">
            <div className="flex items-center gap-2 rounded-lg border p-4">
              <div className="rounded-full bg-splitease-soft-purple p-2">
                <DollarSign className="h-4 w-4 text-splitease-primary" />
              </div>
              <div>
                <h3 className="font-medium">Add Expenses</h3>
                <p className="text-sm text-muted-foreground">Record who paid and how to split</p>
              </div>
            </div>
            <div className="flex items-center gap-2 rounded-lg border p-4">
              <div className="rounded-full bg-splitease-soft-green p-2">
                <CreditCard className="h-4 w-4 text-green-500" />
              </div>
              <div>
                <h3 className="font-medium">Track Payments</h3>
                <p className="text-sm text-muted-foreground">Record when someone pays you back</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
