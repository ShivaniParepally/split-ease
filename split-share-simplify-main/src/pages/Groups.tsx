
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Group } from '@/components/groups/GroupCard';
import GroupCard from '@/components/groups/GroupCard';
import AddGroupDialog from '@/components/groups/AddGroupDialog';
import { Friend, FriendStatus } from '@/components/friends/FriendCard';
import { v4 as uuidv4 } from 'uuid';

const Groups: React.FC = () => {
  const [groups, setGroups] = useState<Group[]>([]);
  const [isAddGroupOpen, setIsAddGroupOpen] = useState(false);
  const [friends, setFriends] = useState<Friend[]>([
    // Some mock friends for demo purposes
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      status: FriendStatus.ACTIVE,
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      status: FriendStatus.ACTIVE,
    },
  ]);

  const handleAddGroup = (name: string, description: string, memberIds: string[]) => {
    // Find the selected friends
    const groupMembers = friends
      .filter(friend => memberIds.includes(friend.id))
      .map(friend => ({
        id: friend.id,
        name: friend.name || friend.email,
        email: friend.email,
      }));
    
    // Create a new group
    const newGroup: Group = {
      id: uuidv4(),
      name,
      description,
      members: [
        // Include the current user
        {
          id: 'current-user',
          name: 'You',
          email: 'you@example.com',
        },
        ...groupMembers,
      ],
      expenseCount: 0,
    };
    
    setGroups(prev => [...prev, newGroup]);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Groups</h1>
          <p className="text-muted-foreground">Manage your expense groups.</p>
        </div>
        <Button onClick={() => setIsAddGroupOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          New Group
        </Button>
      </div>

      {groups.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {groups.map(group => (
            <GroupCard key={group.id} group={group} />
          ))}
        </div>
      ) : (
        <div className="rounded-lg border border-dashed p-8 text-center">
          <h3 className="text-lg font-medium">No groups yet</h3>
          <p className="mt-2 text-muted-foreground">
            Create a group to start splitting expenses with your friends.
          </p>
          <Button className="mt-4" onClick={() => setIsAddGroupOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            New Group
          </Button>
        </div>
      )}

      <AddGroupDialog 
        open={isAddGroupOpen}
        onOpenChange={setIsAddGroupOpen}
        onAddGroup={handleAddGroup}
        friends={friends}
      />
    </div>
  );
};

export default Groups;
