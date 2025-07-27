
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

export interface ActivityItem {
  id: string;
  type: 'payment' | 'expense' | 'group' | 'friend';
  title: string;
  description: string;
  amount?: string;
  date: string;
}

const ActivityIcon = ({ type }: { type: ActivityItem['type'] }) => {
  const iconMap = {
    payment: "bg-splitease-soft-green text-green-500",
    expense: "bg-splitease-soft-orange text-orange-500",
    group: "bg-splitease-soft-purple text-purple-500",
    friend: "bg-splitease-soft-blue text-blue-500",
  };

  return (
    <div className={`rounded-full p-2 ${iconMap[type]}`}>
      <div className="h-2 w-2" />
    </div>
  );
};

interface RecentActivityProps {
  activities: ActivityItem[];
}

const RecentActivity: React.FC<RecentActivityProps> = ({ activities }) => {
  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px]">
          <div className="space-y-4">
            {activities.length > 0 ? (
              activities.map((activity) => (
                <div key={activity.id} className="flex items-start gap-4">
                  <ActivityIcon type={activity.type} />
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium leading-none">{activity.title}</p>
                      {activity.amount && (
                        <p className="text-sm font-medium">{activity.amount}</p>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{activity.description}</p>
                    <p className="text-xs text-muted-foreground">{activity.date}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-muted-foreground py-10">No recent activity</p>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default RecentActivity;
