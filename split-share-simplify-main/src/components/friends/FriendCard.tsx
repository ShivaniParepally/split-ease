
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Check, X } from 'lucide-react';

export enum FriendStatus {
  ACTIVE = 'active',
  PENDING = 'pending',
}

export interface Friend {
  id: string;
  name?: string;
  email: string;
  status: FriendStatus;
}

interface FriendCardProps {
  friend: Friend;
  onAccept?: (id: string) => void;
  onReject?: (id: string) => void;
}

const FriendCard: React.FC<FriendCardProps> = ({ friend, onAccept, onReject }) => {
  const isPending = friend.status === FriendStatus.PENDING;
  const displayName = friend.name || friend.email;
  
  // Create initials from name or email
  const getInitials = () => {
    if (friend.name) {
      return friend.name
        .split(' ')
        .map(n => n[0])
        .join('')
        .toUpperCase()
        .substring(0, 2);
    }
    
    return friend.email.substring(0, 2).toUpperCase();
  };

  return (
    <Card className={`overflow-hidden transition-all ${isPending ? 'border-amber-300' : ''}`}>
      <CardContent className="p-6">
        <div className="flex items-center space-x-4">
          <Avatar className="h-12 w-12 bg-splitease-primary text-primary-foreground">
            <AvatarFallback>{getInitials()}</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h3 className="font-semibold">{displayName}</h3>
            {friend.name && <p className="text-sm text-muted-foreground">{friend.email}</p>}
            {isPending && (
              <span className="inline-block rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-800">
                Pending
              </span>
            )}
          </div>
        </div>
      </CardContent>
      
      {isPending && onAccept && onReject && (
        <CardFooter className="flex justify-end gap-2 p-4 pt-0">
          <Button variant="ghost" size="icon" onClick={() => onReject(friend.id)}>
            <X className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => onAccept(friend.id)}>
            <Check className="h-4 w-4" />
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default FriendCard;
