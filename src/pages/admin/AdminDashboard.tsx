import { Helmet } from "react-helmet-async";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Users, FileText, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface DashboardStats {
  totalResources: number;
  totalLeads: number;
  featuredResources: number;
  downloadsThisMonth: number;
}

const AdminDashboard = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalResources: 0,
    totalLeads: 0,
    featuredResources: 0,
    downloadsThisMonth: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      // Fetch resources count
      const { count: resourcesCount } = await supabase
        .from('resources')
        .select('*', { count: 'exact', head: true });

      // Fetch featured resources count  
      const { count: featuredCount } = await supabase
        .from('resources')
        .select('*', { count: 'exact', head: true })
        .eq('featured', true);

      // Fetch leads count
      const { count: leadsCount } = await supabase
        .from('leads')
        .select('*', { count: 'exact', head: true });

      // Fetch downloads this month (leads with resource_id)
      const thisMonth = new Date();
      thisMonth.setDate(1);
      const { count: downloadsCount } = await supabase
        .from('leads')
        .select('*', { count: 'exact', head: true })
        .not('resource_id', 'is', null)
        .gte('created_at', thisMonth.toISOString());

      setStats({
        totalResources: resourcesCount || 0,
        totalLeads: leadsCount || 0,
        featuredResources: featuredCount || 0,
        downloadsThisMonth: downloadsCount || 0
      });
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: "Total Resources",
      value: stats.totalResources,
      description: "Published resources",
      icon: FileText,
      color: "text-blue-600"
    },
    {
      title: "Total Leads",
      value: stats.totalLeads,
      description: "Contact submissions",
      icon: Users,
      color: "text-green-600"
    },
    {
      title: "Featured Content",
      value: stats.featuredResources,
      description: "Featured resources",
      icon: Activity,
      color: "text-purple-600"
    },
    {
      title: "Downloads This Month",
      value: stats.downloadsThisMonth,
      description: "Resource downloads",
      icon: TrendingUp,
      color: "text-orange-600"
    }
  ];

  return (
    <>
      <Helmet>
        <title>Dashboard | Admin - Lesar Consults</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <AdminLayout>
        <div className="space-y-6">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome to the admin dashboard. Here's an overview of your content and leads.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {statCards.map((stat) => (
              <Card key={stat.title} className="bg-orange-50/80 border-orange-100/50">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-orange-50/60">
                  <CardTitle className="text-sm font-medium">
                    {stat.title}
                  </CardTitle>
                  <stat.icon className={`h-4 w-4 ${stat.color}`} />
                </CardHeader>
                <CardContent className="bg-orange-50/40">
                  <div className="text-2xl font-bold">
                    {loading ? "..." : stat.value}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {stat.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="bg-orange-50/80 border-orange-100/50">
              <CardHeader className="bg-orange-50/60">
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>
                  Latest updates to your resources and leads
                </CardDescription>
              </CardHeader>
              <CardContent className="bg-orange-50/40">
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-muted-foreground">
                      New lead submitted 2 hours ago
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-sm text-muted-foreground">
                      Resource "Mental Health Plan" downloaded 5 times today
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span className="text-sm text-muted-foreground">
                      3 featured resources currently published
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-orange-50/80 border-orange-100/50">
              <CardHeader className="bg-orange-50/60">
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>
                  Common tasks and shortcuts
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2 bg-orange-50/40">
                <a 
                  href="/admin/resources"
                  className="block w-full text-left p-2 rounded-md hover:bg-accent transition-colors text-sm"
                >
                  → Manage Resources
                </a>
                <a 
                  href="/admin/leads"
                  className="block w-full text-left p-2 rounded-md hover:bg-accent transition-colors text-sm"
                >
                  → View Leads
                </a>
                <a 
                  href="/admin/resources/new/edit"
                  className="block w-full text-left p-2 rounded-md hover:bg-accent transition-colors text-sm"
                >
                  → Create New Resource
                </a>
                <a 
                  href="/resources"
                  className="block w-full text-left p-2 rounded-md hover:bg-accent transition-colors text-sm"
                >
                  → View Public Site
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </AdminLayout>
    </>
  );
};

export default AdminDashboard;