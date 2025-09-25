import { Helmet } from "react-helmet-async";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Search, Download, Calendar, User, Building, MessageSquare, Filter, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface Lead {
  id: string;
  name: string;
  email: string;
  organization: string | null;
  role: string | null;
  phone: string | null;
  country_code: string | null;
  interested_in: string | null;
  other_service: string | null;
  message: string | null;
  budget: string | null;
  timeframe: string | null;
  resource_id: string | null;
  file_path: string | null;
  consent: boolean;
  created_at: string;
}

const AdminLeads = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filteredLeads, setFilteredLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [deletingLead, setDeletingLead] = useState<string | null>(null);

  useEffect(() => {
    fetchLeads();
  }, []);

  useEffect(() => {
    filterLeads();
  }, [leads, searchQuery, filterType]);

  const fetchLeads = async () => {
    try {
      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setLeads(data || []);
    } catch (error) {
      console.error('Error fetching leads:', error);
      toast.error('Error loading leads');
    } finally {
      setLoading(false);
    }
  };

  const filterLeads = () => {
    let filtered = [...leads];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(lead =>
        lead.name.toLowerCase().includes(query) ||
        lead.email.toLowerCase().includes(query) ||
        lead.organization?.toLowerCase().includes(query) ||
        lead.interested_in?.toLowerCase().includes(query)
      );
    }

    // Type filter
    if (filterType === 'downloads') {
      filtered = filtered.filter(lead => lead.resource_id);
    } else if (filterType === 'contacts') {
      filtered = filtered.filter(lead => !lead.resource_id);
    }

    setFilteredLeads(filtered);
  };

  const getLeadType = (lead: Lead) => {
    return lead.resource_id ? 'Download' : 'Contact';
  };

  const getLeadTypeColor = (lead: Lead) => {
    return lead.resource_id ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleDeleteLead = async (leadId: string) => {
    setDeletingLead(leadId);
    try {
      const { error } = await supabase
        .from('leads')
        .delete()
        .eq('id', leadId);

      if (error) throw error;
      
      toast.success('Lead deleted successfully');
      fetchLeads(); // Refresh the list
    } catch (error) {
      console.error('Error deleting lead:', error);
      toast.error('Error deleting lead');
    } finally {
      setDeletingLead(null);
    }
  };

  return (
    <>
      <Helmet>
        <title>Leads | Admin - Lesar Consults</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <AdminLayout>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Leads</h1>
              <p className="text-muted-foreground">
                View and manage contact form submissions and resource downloads
              </p>
            </div>
          </div>

          {/* Filters */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Filters</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Search leads..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="w-full sm:w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Leads</SelectItem>
                    <SelectItem value="contacts">Contact Forms</SelectItem>
                    <SelectItem value="downloads">Downloads</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Stats */}
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Leads</CardTitle>
                <User className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{leads.length}</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Contact Forms</CardTitle>
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {leads.filter(lead => !lead.resource_id).length}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Downloads</CardTitle>
                <Download className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {leads.filter(lead => lead.resource_id).length}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Leads Table */}
          <Card>
            <CardHeader>
              <CardTitle>Lead List</CardTitle>
              <CardDescription>
                {filteredLeads.length} of {leads.length} leads
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
              ) : filteredLeads.length > 0 ? (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Organization</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Interest</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredLeads.map((lead) => (
                        <TableRow key={lead.id}>
                          <TableCell className="font-medium">{lead.name}</TableCell>
                          <TableCell>{lead.email}</TableCell>
                          <TableCell>{lead.organization || '-'}</TableCell>
                          <TableCell>
                            <Badge className={getLeadTypeColor(lead)}>
                              {getLeadType(lead)}
                            </Badge>
                          </TableCell>
                          <TableCell className="max-w-40 truncate">
                            {lead.interested_in || '-'}
                          </TableCell>
                          <TableCell>{formatDate(lead.created_at)}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center gap-2 justify-end">
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setSelectedLead(lead)}
                                  >
                                    View
                                  </Button>
                                </DialogTrigger>
                              <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                                <DialogHeader>
                                  <DialogTitle>Lead Details</DialogTitle>
                                  <DialogDescription>
                                    Complete information for {lead.name}
                                  </DialogDescription>
                                </DialogHeader>
                                
                                {selectedLead && (
                                  <div className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                      <div>
                                        <label className="text-sm font-medium text-muted-foreground">Name</label>
                                        <p className="font-medium">{selectedLead.name}</p>
                                      </div>
                                      <div>
                                        <label className="text-sm font-medium text-muted-foreground">Email</label>
                                        <p className="font-medium">{selectedLead.email}</p>
                                      </div>
                                      <div>
                                        <label className="text-sm font-medium text-muted-foreground">Phone</label>
                                        <p className="font-medium">
                                          {selectedLead.phone ? `${selectedLead.country_code || ''} ${selectedLead.phone}` : '-'}
                                        </p>
                                      </div>
                                      <div>
                                        <label className="text-sm font-medium text-muted-foreground">Organization</label>
                                        <p className="font-medium">{selectedLead.organization || '-'}</p>
                                      </div>
                                      <div>
                                        <label className="text-sm font-medium text-muted-foreground">Role</label>
                                        <p className="font-medium">{selectedLead.role || '-'}</p>
                                      </div>
                                      <div>
                                        <label className="text-sm font-medium text-muted-foreground">Lead Type</label>
                                        <Badge className={getLeadTypeColor(selectedLead)}>
                                          {getLeadType(selectedLead)}
                                        </Badge>
                                      </div>
                                      <div>
                                        <label className="text-sm font-medium text-muted-foreground">Interested In</label>
                                        <p className="font-medium">{selectedLead.interested_in || '-'}</p>
                                      </div>
                                      <div>
                                        <label className="text-sm font-medium text-muted-foreground">Budget</label>
                                        <p className="font-medium">{selectedLead.budget || '-'}</p>
                                      </div>
                                      <div>
                                        <label className="text-sm font-medium text-muted-foreground">Timeframe</label>
                                        <p className="font-medium">{selectedLead.timeframe || '-'}</p>
                                      </div>
                                      <div>
                                        <label className="text-sm font-medium text-muted-foreground">Submitted</label>
                                        <p className="font-medium">{formatDate(selectedLead.created_at)}</p>
                                      </div>
                                    </div>
                                    
                                    {selectedLead.message && (
                                      <div>
                                        <label className="text-sm font-medium text-muted-foreground">Message</label>
                                        <p className="mt-1 p-3 bg-muted rounded-md">{selectedLead.message}</p>
                                      </div>
                                    )}
                                    
                                    {selectedLead.file_path && (
                                      <div>
                                        <label className="text-sm font-medium text-muted-foreground">Attachment</label>
                                        <p className="mt-1 text-blue-600 hover:underline cursor-pointer">
                                          {selectedLead.file_path}
                                        </p>
                                      </div>
                                    )}
                                  </div>
                                )}
                              </DialogContent>
                            </Dialog>
                            
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-destructive hover:text-destructive"
                                >
                                  <Trash2 className="h-4 w-4 mr-1" />
                                  Delete
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Delete Lead</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Are you sure you want to delete this lead? This action cannot be undone.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => handleDeleteLead(lead.id)}
                                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                    disabled={deletingLead === lead.id}
                                  >
                                    {deletingLead === lead.id ? 'Deleting...' : 'Delete'}
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <div className="text-center py-8">
                  <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">No leads found</h3>
                  <p className="text-muted-foreground">
                    {searchQuery || filterType !== 'all' 
                      ? 'Try adjusting your search or filter criteria.'
                      : 'No leads have been submitted yet.'
                    }
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </AdminLayout>
    </>
  );
};

export default AdminLeads;