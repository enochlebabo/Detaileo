import { Badge } from '@/components/ui/badge';
import { UserRole } from '@/hooks/useAuth';

interface RoleBadgeProps {
  role: UserRole;
  className?: string;
}

export const RoleBadge = ({ role, className }: RoleBadgeProps) => {
  const getVariant = (role: UserRole) => {
    switch (role) {
      case 'admin':
        return 'destructive';
      case 'manager':
        return 'default';
      case 'staff':
        return 'secondary';
      case 'customer':
        return 'outline';
      default:
        return 'outline';
    }
  };

  const getRoleLabel = (role: UserRole) => {
    return role.charAt(0).toUpperCase() + role.slice(1);
  };

  return (
    <Badge variant={getVariant(role)} className={className}>
      {getRoleLabel(role)}
    </Badge>
  );
};