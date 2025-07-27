
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Check, Plus, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Friend, FriendStatus } from '@/components/friends/FriendCard';
import { toast } from 'sonner';

interface AddGroupDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddGroup: (name: string, description: string, members: string[]) => void;
  friends: Friend[];
}

const AddGroupDialog: React.FC<AddGroupDialogProps> = ({
  open,
  onOpenChange,
  onAddGroup,
  friends,
}) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Filter only active friends
  const activeFriends = friends.filter(friend => friend.status === FriendStatus.ACTIVE);

  const handleToggleMember = (friendId: string) => {
    setSelectedMembers(prev => 
      prev.includes(friendId)
        ? prev.filter(id => id !== friendId)
        : [...prev, friendId]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name) {
      toast.error('Please enter a group name');
      return;
    }

    if (selectedMembers.length === 0) {
      toast.error('Please select at least one member');
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      onAddGroup(name, description, selectedMembers);
      setName('');
      setDescription('');
      setSelectedMembers([]);
      setIsLoading(false);
      onOpenChange(false);
      toast.success('Group created successfully');
    }, 1000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create a new group</DialogTitle>
          <DialogDescription>
            Create a new group to track expenses with your friends.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Group name</Label>
              <Input
                id="name"
                placeholder="Trip to Paris"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description (optional)</Label>
              <Textarea
                id="description"
                placeholder="Summer vacation with friends"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full resize-none"
                rows={3}
              />
            </div>
            
            <div className="grid gap-2">
              <Label>Select members</Label>
              {activeFriends.length > 0 ? (
                <div className="max-h-[200px] overflow-y-auto border rounded-md p-2">
                  {activeFriends.map((friend) => (
                    <div 
                      key={friend.id} 
                      className={`flex items-center justify-between p-2 rounded-md cursor-pointer hover:bg-muted ${
                        selectedMembers.includes(friend.id) ? 'bg-splitease-soft-purple' : ''
                      }`}
                      onClick={() => handleToggleMember(friend.id)}
                    >
                      <span>{friend.name || friend.email}</span>
                      {selectedMembers.includes(friend.id) ? (
                        <Check className="h-4 w-4 text-splitease-primary" />
                      ) : (
                        <Plus className="h-4 w-4 text-muted-foreground" />
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="border rounded-md p-4 text-center text-muted-foreground">
                  You need to add friends before creating a group
                </div>
              )}
              
              {selectedMembers.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {selectedMembers.map(id => {
                    const friend = friends.find(f => f.id === id);
                    if (!friend) return null;
                    
                    return (
                      <Badge key={id} variant="secondary" className="gap-1">
                        {friend.name || friend.email}
                        <X 
                          className="h-3 w-3 cursor-pointer" 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleToggleMember(id);
                          }} 
                        />
                      </Badge>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={isLoading || activeFriends.length === 0 || selectedMembers.length === 0}
            >
              {isLoading ? 'Creating...' : 'Create Group'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddGroupDialog;
