import { Helmet } from "react-helmet-async";
import AdminLayout from "@/components/admin/AdminLayout";

const AdminResourceEdit = () => {
  return (
    <>
      <Helmet>
        <title>Edit Resource | Admin - Lesar Consults</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <AdminLayout>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Edit Resource</h1>
            <p className="text-muted-foreground">
              Resource editor is in development
            </p>
          </div>
          
          <div className="bg-muted/30 border border-border rounded-lg p-8 text-center">
            <p className="text-muted-foreground">
              The resource editor with WYSIWYG functionality will be implemented here.
            </p>
          </div>
        </div>
      </AdminLayout>
    </>
  );
};

export default AdminResourceEdit;