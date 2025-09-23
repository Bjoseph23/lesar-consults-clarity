import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import AdminLayout from "@/components/admin/AdminLayout";
import { ResourceEditor } from "@/components/admin/ResourceEditor";
import ProtectedRoute from "@/components/admin/ProtectedRoute";

const AdminResourceEdit = () => {
  const { slug } = useParams<{ slug: string }>();

  if (!slug) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Invalid Resource</h2>
            <p className="text-muted-foreground">No resource slug provided</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <ProtectedRoute requireAdmin>
      <Helmet>
        <title>Edit Resource | Admin - Lesar Consults</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <AdminLayout>
        <ResourceEditor resourceId={slug} />
      </AdminLayout>
    </ProtectedRoute>
  );
};

export default AdminResourceEdit;