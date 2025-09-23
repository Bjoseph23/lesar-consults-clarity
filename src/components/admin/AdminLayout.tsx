import { useState } from 'react';
import { 
  LayoutDashboard, 
  FileText, 
  Users, 
  Settings, 
  LogOut, 
  Menu,
  X,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import MobileBlock from './MobileBlock';
import { toast } from 'sonner';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const navigation = [
    {
      name: 'Dashboard',
      href: '/admin/dashboard',
      icon: LayoutDashboard
    },
    {
      name: 'Resources',
      href: '/admin/resources',
      icon: FileText
    },
    {
      name: 'Leads',
      href: '/admin/leads',
      icon: Users
    }
  ];

  const handleLogout = async () => {
    try {
      await signOut();
      toast.success('Successfully signed out');
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Error signing out');
    }
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <MobileBlock />
      
      <div className="min-h-screen bg-background hidden lg:flex">
        {/* Sidebar */}
        <div className={cn(
          "bg-slate-800 border-r border-border transition-all duration-300 flex flex-col",
          collapsed ? "w-16" : "w-64"
        )}>
          {/* Header */}
          <div className="p-4 border-b border-slate-700 bg-white">
            <div className="flex items-center justify-between">
              {!collapsed && (
                <Link to="/admin/dashboard" className="flex items-center">
                  <img src="/lesar-logoo.png" alt="Lesar Consults" className="h-8" />
                </Link>
              )}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setCollapsed(!collapsed)}
                className="h-8 w-8 bg-slate-700 text-white hover:bg-red-600 hover:text-white"
              >
                {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4">
            <div className="space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors relative group",
                    collapsed ? "justify-center" : "",
                    isActive(item.href) 
                      ? "bg-slate-700 text-white" 
                      : "text-slate-300 hover:text-white hover:bg-slate-700"
                  )}
                  title={collapsed ? item.name : undefined}
                >
                  <item.icon className={cn(collapsed ? "h-6 w-6" : "h-4 w-4 mr-3")} />
                  {!collapsed && <span>{item.name}</span>}
                  
                  {/* Tooltip for collapsed state */}
                  {collapsed && (
                    <div className="absolute left-full ml-2 px-2 py-1 bg-slate-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50">
                      {item.name}
                    </div>
                  )}
                </Link>
              ))}
            </div>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-slate-700">
            <Button
              variant="ghost"
              onClick={handleLogout}
              className={cn(
                "w-full justify-start text-slate-300 hover:text-white hover:bg-slate-700 group relative",
                collapsed && "px-3 justify-center"
              )}
              title={collapsed ? "Logout" : undefined}
            >
              <LogOut className={cn("h-4 w-4", collapsed ? "" : "mr-3")} />
              {!collapsed && <span>Logout</span>}
              
              {/* Tooltip for collapsed state */}
              {collapsed && (
                <div className="absolute left-full ml-2 px-2 py-1 bg-slate-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50">
                  Logout
                </div>
              )}
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Top Bar */}
          <div className="bg-white border-b border-border px-6 py-4 lg:hidden">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-semibold text-foreground">Admin</h1>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileOpen(!mobileOpen)}
              >
                {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          {/* Content */}
          <main className="flex-1 overflow-auto p-6">
            {children}
          </main>
        </div>
      </div>
    </>
  );
};

export default AdminLayout;