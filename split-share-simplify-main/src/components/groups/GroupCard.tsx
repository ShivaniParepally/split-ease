
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Layers, Users } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useNavigate } from 'react-router-dom';

export interface Group {
  id: string;
  name: string;
  description?: string;
  members: Array<{
    id: string;
    name?: string;
    email: string;
  }>;
  expenseCount: number;
}

interface GroupCardProps {
  group: Group;
}

const GroupCard: React.FC<GroupCardProps> = ({ group }) => {
  const navigate = useNavigate();
  const memberCount = group.members.length;
  const maxVisibleMembers = 3;
  
  // Create initials from name or email
  const getInitials = (name?: string, email?: string) => {
    if (name) {
      return name
        .split(' ')
        .map(n => n[0])
        .join('')
        .toUpperCase()
        .substring(0, 2);
    }
    
    return (email || '').substring(0, 2).toUpperCase();
  };

  const handleClick = () => {
    navigate(`/groups/${group.id}`);
  };

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center">
          <Layers className="mr-2 h-5 w-5 text-splitease-primary" />
          {group.name}
        </CardTitle>
        {group.description && <CardDescription>{group.description}</CardDescription>}
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex items-center space-x-2">
          <Users className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">{memberCount} members</span>
          <Badge variant="outline" className="ml-auto">
            {group.expenseCount} expenses
          </Badge>
        </div>

        <div className="mt-4">
          <div className="text-sm font-medium text-muted-foreground mb-2">Members</div>
          <div className="flex -space-x-2">
            {group.members.slice(0, maxVisibleMembers).map((member) => (
              <Avatar key={member.id} className="h-8 w-8 border-2 border-background">
                <AvatarFallback className="bg-splitease-soft-purple text-splitease-primary text-xs">
                  {getInitials(member.name, member.email)}
                </AvatarFallback>
              </Avatar>
            ))}
            {memberCount > maxVisibleMembers && (
              <Avatar className="h-8 w-8 border-2 border-background">
                <AvatarFallback className="bg-muted text-muted-foreground text-xs">
                  +{memberCount - maxVisibleMembers}
                </AvatarFallback>
              </Avatar>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={handleClick}>View Group</Button>
      </CardFooter>
    </Card>
  );
};

export default GroupCard;
