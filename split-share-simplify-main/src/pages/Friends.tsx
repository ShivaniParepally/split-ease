
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { UserPlus } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Friend, FriendStatus } from '@/components/friends/FriendCard';
import FriendCard from '@/components/friends/FriendCard';
import AddFriendDialog from '@/components/friends/AddFriendDialog';
import { toast } from 'sonner';
import { v4 as uuidv4 } from 'uuid';

const Friends: React.FC = () => {
  const [friends, setFriends] = useState<Friend[]>([]);
  const [isAddFriendOpen, setIsAddFriendOpen] = useState(false);

  const activeFriends = friends.filter(friend => friend.status === FriendStatus.ACTIVE);
  const pendingFriends = friends.filter(friend => friend.status === FriendStatus.PENDING);

  const handleAddFriend = (email: string) => {
    const newFriend: Friend = {
      id: uuidv4(),
      email,
      status: FriendStatus.PENDING,
    };
    
    setFriends(prev => [...prev, newFriend]);
  };

  const handleAcceptFriend = (id: string) => {
    // In a real app, this would trigger an API call
    // For now, we'll just update the local state

    setFriends(prev =>
      prev.map(friend =>
        friend.id === id
          ? { ...friend, status: FriendStatus.ACTIVE, name: friend.email.split('@')[0] }
          : friend
      )
    );
    
    toast.success('Friend request accepted');
  };

  const handleRejectFriend = (id: string) => {
    setFriends(prev => prev.filter(friend => friend.id !== id));
    toast.success('Friend request rejected');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Friends</h1>
          <p className="text-muted-foreground">Manage your friends and invitations.</p>
        </div>
        <Button onClick={() => setIsAddFriendOpen(true)}>
          <UserPlus className="mr-2 h-4 w-4" />
          Add Friend
        </Button>
      </div>

      <Tabs defaultValue="active" className="w-full">
        <TabsList>
          <TabsTrigger value="active">
            Active Friends
            {activeFriends.length > 0 && (
              <span className="ml-2 rounded-full bg-splitease-soft-purple px-2 py-0.5 text-xs font-medium">
                {activeFriends.length}
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger value="pending">
            Pending Invitations
            {pendingFriends.length > 0 && (
              <span className="ml-2 rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-800">
                {pendingFriends.length}
              </span>
            )}
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="active" className="mt-6">
          {activeFriends.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {activeFriends.map(friend => (
                <FriendCard key={friend.id} friend={friend} />
              ))}
            </div>
          ) : (
            <div className="rounded-lg border border-dashed p-8 text-center">
              <h3 className="text-lg font-medium">No friends yet</h3>
              <p className="mt-2 text-muted-foreground">
                Add friends to start splitting expenses with them.
              </p>
              <Button className="mt-4" onClick={() => setIsAddFriendOpen(true)}>
                <UserPlus className="mr-2 h-4 w-4" />
                Add Friend
              </Button>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="pending" className="mt-6">
          {pendingFriends.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {pendingFriends.map(friend => (
                <FriendCard 
                  key={friend.id} 
                  friend={friend} 
                  onAccept={handleAcceptFriend}
                  onReject={handleRejectFriend}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-lg border border-dashed p-8 text-center">
              <h3 className="text-lg font-medium">No pending invitations</h3>
              <p className="mt-2 text-muted-foreground">
                All invitations have been handled.
              </p>
            </div>
          )}
        </TabsContent>
      </Tabs>

      <AddFriendDialog 
        open={isAddFriendOpen}
        onOpenChange={setIsAddFriendOpen}
        onAddFriend={handleAddFriend}
      />
    </div>
  );
};

export default Friends;
