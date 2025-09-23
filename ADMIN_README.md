# Admin Dashboard Setup Guide

This guide will help you set up the admin dashboard for the Lesar Consults website.

## Prerequisites

- Supabase project with the provided database migrations applied
- Admin user account created in Supabase Auth

## Environment Variables

Make sure you have the following environment variables in your `.env` file:

```bash
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key

# Optional - for server-side operations (DO NOT expose to client)
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

## Database Setup

The following tables and functions have been created via migrations:

### Tables
- `profiles` - User profiles with admin flag
- `resources` - Resource content management
- `leads` - Contact form submissions and downloads

### Functions
- `handle_new_user()` - Automatically creates profiles for new users
- `is_admin(user_id)` - Checks if a user has admin privileges

### Storage
- `resources` bucket - For storing resource files and thumbnails

## Creating an Admin User

### Step 1: Create User in Supabase Auth UI

1. Go to your Supabase project dashboard
2. Navigate to Authentication > Users
3. Click "Invite a user"
4. Enter email: `admin@lesarconsults.com`
5. Set password: `password` (or your preferred password)
6. Confirm the user creation

### Step 2: Grant Admin Privileges

After the user is created, you need to grant admin privileges:

1. Go to SQL Editor in your Supabase dashboard
2. Run this query (replace `USER_UUID` with the actual UUID from auth.users):

```sql
UPDATE public.profiles 
SET is_admin = true 
WHERE email = 'admin@lesarconsults.com';
```

Or if you need to create the profile manually:

```sql
INSERT INTO public.profiles (id, email, full_name, is_admin)
VALUES (
  'USER_UUID_FROM_AUTH_USERS',
  'admin@lesarconsults.com',
  'Admin User',
  true
);
```

## Admin Routes

The following admin routes are available:

- `/admin` - Redirects to login or dashboard
- `/admin/login` - Admin login page
- `/admin/dashboard` - Main dashboard with stats
- `/admin/resources` - Resource management (CRUD operations)
- `/admin/resources/:id/edit` - Resource editor (in development)
- `/admin/leads` - View contact submissions and downloads

## Features

### Dashboard
- Overview statistics (total resources, leads, downloads)
- Quick action links
- Recent activity feed

### Resource Management
- List all resources with action buttons
- Toggle featured status
- Delete resources with confirmation
- View public resource pages
- Download count tracking

### Leads Management
- View all contact form submissions
- Filter by type (contact vs download)
- Search functionality
- Detailed lead information in modal
- Download tracking

### Security Features
- Protected routes requiring authentication
- Admin-only access with role checking
- Mobile device blocking (desktop-only)
- Secure Supabase RLS policies

## Testing

### Login Test
1. Navigate to `/admin/login`
2. Enter credentials:
   - Email: `admin@lesarconsults.com`
   - Password: `password`
3. Should redirect to `/admin/dashboard`

### Resource Management Test
1. Navigate to `/admin/resources`
2. View existing resources
3. Test toggle featured functionality
4. Test delete functionality (with confirmation)

### Leads Test
1. Submit a contact form from the public site
2. Download a gated resource from `/resources`
3. Check `/admin/leads` to see submissions
4. Test filtering and search functionality

## File Upload (In Development)

File upload functionality for resource management will use:
- Supabase Storage `resources` bucket
- Upload to `resources/files/` for documents
- Upload to `resources/thumbnails/` for images
- Public URLs for publicly accessible files
- Signed URLs for gated downloads

## Troubleshooting

### Login Issues
- Verify admin user exists in Supabase Auth
- Check if `is_admin` is set to `true` in profiles table
- Ensure Site URL and Redirect URLs are configured in Supabase Auth settings

### Permission Issues
- Check RLS policies are properly configured
- Verify admin function `is_admin()` returns true for admin user
- Check browser console for authentication errors

### Mobile Access
- Admin dashboard will show "Desktop Only" message on mobile devices
- Use desktop browser for admin functionality

## Next Steps

1. Implement WYSIWYG resource editor
2. Add file upload functionality
3. Implement email notifications for new leads
4. Add analytics and reporting features
5. Implement bulk operations for resources

## Support

For technical support or setup assistance, refer to the Supabase documentation or contact the development team.