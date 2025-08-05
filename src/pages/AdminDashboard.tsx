import { useAuth } from '@/hooks/useAuth';
import { RoleGuard } from '@/components/RoleGuard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, Settings, BarChart3, Shield } from 'lucide-react';

const AdminDashboard = () => {
  const { userRole, isAdmin, isManager } = useAuth();

  return (
    <RoleGuard allowedRoles={['admin', 'manager', 'staff']}>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Welcome to your management portal
          </p>
          {userRole && (
            <Badge variant="outline" className="mt-2">
              Logged in as: {userRole}
            </Badge>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isAdmin && (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  User Management
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Manage Users</div>
                <p className="text-xs text-muted-foreground">
                  Add, edit, and assign roles to users
                </p>
              </CardContent>
            </Card>
          )}

          {(isAdmin || isManager) && (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Store Management
                </CardTitle>
                <Settings className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Store Settings</div>
                <p className="text-xs text-muted-foreground">
                  Configure store and service settings
                </p>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Analytics
              </CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">View Reports</div>
              <p className="text-xs text-muted-foreground">
                Sales and performance analytics
              </p>
            </CardContent>
          </Card>

          {isAdmin && (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  System Security
                </CardTitle>
                <Shield className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Security Settings</div>
                <p className="text-xs text-muted-foreground">
                  System security and permissions
                </p>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Access Levels</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Badge variant="destructive">Admin</Badge>
                  <span className="text-sm">Full system access and user management</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="default">Manager</Badge>
                  <span className="text-sm">Store management and staff oversight</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">Staff</Badge>
                  <span className="text-sm">Basic operations and customer service</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">Customer</Badge>
                  <span className="text-sm">Standard user access</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </RoleGuard>
  );
};

export default AdminDashboard;