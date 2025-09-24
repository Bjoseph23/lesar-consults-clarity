import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash2, Eye, Calendar, User } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Resource {
  id: string;
  title: string;
  summary?: string;
  type: string;
  categories: string[];
  tags: string[];
  author: string;
  published_at?: string;
  created_at: string;
  updated_at: string;
}

interface AdminResourceCardProps {
  resource: Resource;
  onDelete: (id: string) => void;
}

export const AdminResourceCard = ({ resource, onDelete }: AdminResourceCardProps) => {
  const isPublished = !!resource.published_at;

  return (
    <Card className="bg-white/95 border-border/50 shadow-sm hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg leading-tight mb-2">{resource.title}</CardTitle>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
              <User className="w-4 h-4" />
              <span>{resource.author}</span>
              <Calendar className="w-4 h-4 ml-2" />
              <span>{new Date(resource.created_at).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant={isPublished ? "default" : "secondary"}>
                {isPublished ? "Published" : "Draft"}
              </Badge>
              <Badge variant="outline">{resource.type}</Badge>
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        {resource.summary && (
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
            {resource.summary}
          </p>
        )}
        
        {resource.categories.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {resource.categories.map((category) => (
              <Badge key={category} variant="outline" className="text-xs">
                {category}
              </Badge>
            ))}
          </div>
        )}
        
        <div className="flex items-center justify-between pt-4 border-t">
          <div className="flex items-center gap-2">
            <Button asChild variant="outline" size="sm">
              <Link to={`/resources/${resource.id}`}>
                <Eye className="w-4 h-4 mr-1" />
                View
              </Link>
            </Button>
            <Button asChild variant="outline" size="sm">
              <Link to={`/admin/resources/${resource.id}/edit`}>
                <Edit className="w-4 h-4 mr-1" />
                Edit
              </Link>
            </Button>
          </div>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => onDelete(resource.id)}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};