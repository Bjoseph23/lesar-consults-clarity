-- Create resources table
CREATE TABLE public.resources (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  summary TEXT,
  content_html TEXT,
  categories TEXT[] DEFAULT '{}',
  tags TEXT[] DEFAULT '{}',
  type TEXT NOT NULL CHECK (type IN ('article', 'case_study', 'report', 'tool', 'download')),
  thumbnail_url TEXT,
  file_url TEXT,
  author TEXT,
  author_id TEXT,
  published_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  year INTEGER,
  featured BOOLEAN DEFAULT false,
  seo JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create leads table for gated downloads and contact leads
CREATE TABLE public.leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  organization TEXT,
  interested_in TEXT,
  resource_id TEXT,
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- RLS policies for resources (public read access)
CREATE POLICY "Resources are publicly readable" 
ON public.resources 
FOR SELECT 
USING (true);

-- RLS policies for leads (allow inserts for public lead capture)
CREATE POLICY "Anyone can create leads" 
ON public.leads 
FOR INSERT 
WITH CHECK (true);

-- Create indexes for better performance
CREATE INDEX idx_resources_slug ON public.resources(slug);
CREATE INDEX idx_resources_type ON public.resources(type);
CREATE INDEX idx_resources_categories ON public.resources USING GIN(categories);
CREATE INDEX idx_resources_tags ON public.resources USING GIN(tags);
CREATE INDEX idx_resources_published_at ON public.resources(published_at);
CREATE INDEX idx_resources_featured ON public.resources(featured);
CREATE INDEX idx_leads_created_at ON public.leads(created_at);
CREATE INDEX idx_leads_resource_id ON public.leads(resource_id);

-- Create storage bucket for resources
INSERT INTO storage.buckets (id, name, public) VALUES ('resources', 'resources', true);

-- Create storage policies
CREATE POLICY "Resources are publicly accessible" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'resources');

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
NEW.updated_at = now();
RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_resources_updated_at
BEFORE UPDATE ON public.resources
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();