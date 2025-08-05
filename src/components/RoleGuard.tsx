import { useAuth, UserRole } from '@/hooks/useAuth';
import { Navigate } from 'react-router-dom';

interface RoleGuardProps {
  children: React.ReactNode;
  allowedRoles: UserRole[];
  fallbackPath?: string;
}

export const RoleGuard = ({ 
  children, 
  allowedRoles, 
  fallbackPath = '/auth' 
}: RoleGuardProps) => {
  const { user, userRole, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  if (!userRole || !allowedRoles.includes(userRole)) {
    return <Navigate to={fallbackPath} replace />;
  }

  return <>{children}</>;
};