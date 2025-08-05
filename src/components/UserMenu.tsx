import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { RoleBadge } from './RoleBadge';
import { User, Settings, LogOut, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const UserMenu = () => {
  const { user, userRole, signOut, isAdmin, isManager, isStaff } = useAuth();
  const navigate = useNavigate();

  if (!user) return null;

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const handleAdminDashboard = () => {
    navigate('/admin');
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2">
          <User className="w-4 h-4" />
          {user.email}
          {userRole && <RoleBadge role={userRole} />}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <div className="p-2">
          <p className="text-sm font-medium">{user.email}</p>
          {userRole && (
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs text-muted-foreground">Role:</span>
              <RoleBadge role={userRole} />
            </div>
          )}
        </div>
        <DropdownMenuSeparator />
        
        {(isAdmin || isManager || isStaff) && (
          <>
            <DropdownMenuItem onClick={handleAdminDashboard}>
              <Shield className="w-4 h-4 mr-2" />
              Admin Dashboard
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </>
        )}
        
        <DropdownMenuItem>
          <Settings className="w-4 h-4 mr-2" />
          Settings
        </DropdownMenuItem>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem onClick={handleSignOut}>
          <LogOut className="w-4 h-4 mr-2" />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};