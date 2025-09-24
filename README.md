# Lesar Consults Website

A modern, responsive website for Lesar Consults - a consultancy specializing in health systems strengthening, strategic planning, and capacity building in global health.

## 🏗️ Architecture Overview

This is a full-stack React application built with modern web technologies, featuring:

- **Frontend**: React 18, TypeScript, Tailwind CSS, shadcn/ui components
- **Backend**: Supabase (PostgreSQL database, authentication, file storage)
- **Rich Text Editing**: TipTap editor for content management
- **Deployment**: Lovable platform with live preview capabilities

## 📋 Key Features

- **Public Website**: Home, About, Services, Team, Projects, Resources, Contact
- **Admin Dashboard**: Content management system for resources and leads
- **Rich Text Editor**: Full-featured editor with image/file uploads
- **Authentication**: Admin-only access to dashboard features
- **Resource Management**: Create, edit, publish articles, case studies, reports, tools
- **Lead Management**: Contact form submissions and gated downloads
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **SEO Optimized**: Meta tags, semantic HTML, structured data

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account

### Environment Variables

Create a `.env` file in the root directory:

```bash
# Supabase Configuration
VITE_SUPABASE_URL=https://tfqwiwdjjflzezzrxqbn.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Server-side (for admin functions)
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

### Installation & Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run linting
npm run lint

# Run type checking
npm run typecheck
```

## 📁 Project Structure

```
/
├── src/
│   ├── components/           # Reusable UI components
│   │   ├── ui/              # shadcn/ui base components
│   │   ├── admin/           # Admin-specific components
│   │   │   ├── AdminLayout.tsx
│   │   │   ├── AdminResourceCard.tsx
│   │   │   ├── ProtectedRoute.tsx
│   │   │   └── ResourceEditor/
│   │   │       ├── index.tsx          # Main editor component
│   │   │       ├── EditorToolbar.tsx  # Rich text toolbar
│   │   │       ├── BlockMenu.tsx      # Content block menu
│   │   │       ├── ImageUpload.tsx    # Image upload widget
│   │   │       ├── FileUpload.tsx     # File upload widget
│   │   │       └── *ConfirmModal.tsx  # Various confirmation dialogs
│   │   ├── contact/         # Contact form components
│   │   ├── resources/       # Resource display components
│   │   ├── team/           # Team page components
│   │   ├── Navbar.tsx      # Main navigation
│   │   ├── Footer.tsx      # Site footer
│   │   └── ...other shared components
│   ├── pages/              # Route components
│   │   ├── Index.tsx       # Homepage
│   │   ├── About.tsx       # About page
│   │   ├── Contact.tsx     # Contact page
│   │   ├── Resources.tsx   # Resources listing
│   │   ├── ResourceDetail.tsx # Individual resource view
│   │   └── admin/          # Admin pages
│   │       ├── AdminDashboard.tsx
│   │       ├── AdminResources.tsx
│   │       ├── AdminResourceEdit.tsx
│   │       └── AdminLeads.tsx
│   ├── hooks/              # Custom React hooks
│   │   ├── use-toast.ts    # Toast notifications
│   │   ├── use-mobile.tsx  # Mobile detection
│   │   └── useScrollAnimation.tsx
│   ├── lib/                # Utility libraries
│   │   ├── utils.ts        # General utilities
│   │   ├── currency.ts     # Currency formatting
│   │   └── editor.ts       # TipTap editor configuration
│   ├── data/               # Static data and types
│   │   ├── team.json       # Team member data
│   │   ├── services.json   # Services data
│   │   ├── projects.json   # Projects data
│   │   └── contact-seed.ts # Contact form seed data
│   ├── contexts/           # React contexts
│   │   └── AuthContext.tsx # Authentication state
│   ├── integrations/       # External service integrations
│   │   └── supabase/      # Supabase client and types
│   ├── index.css          # Global styles & design tokens
│   ├── App.tsx            # Main app component & routing
│   └── main.tsx           # Application entry point
├── public/                 # Static assets
│   ├── images/            # Website images
│   ├── logos/             # Partner/client logos
│   └── ...
├── supabase/              # Supabase configuration
│   ├── config.toml        # Supabase project config
│   └── migrations/        # Database migrations
├── package.json           # Dependencies & scripts
├── tailwind.config.ts     # Tailwind CSS configuration
├── tsconfig.json          # TypeScript configuration
└── vite.config.ts         # Vite build configuration
```

## 🗄️ Database Schema

### Core Tables

- **`profiles`**: User profiles with admin flags
- **`resources`**: Content items (articles, case studies, reports, tools)
- **`leads`**: Contact form submissions and lead generation

### Storage Buckets

- **`resources`**: Images and files for resource content

### Key Relationships

```sql
-- Resources are owned by profiles (authors)
resources.author_id → profiles.id

-- Leads can reference resources (gated downloads)
leads.resource_id → resources.id
```

## 🔐 Authentication & Permissions

### User Roles

- **Public**: Can view published content, submit contact forms
- **Admin**: Full access to dashboard, can create/edit/publish content

### Row Level Security (RLS)

All tables implement RLS policies:

- **Resources**: Public read for published content, admin-only write
- **Leads**: Admin-only read, public insert for form submissions
- **Storage**: Admin-only upload, public read for published assets

### Admin Setup

1. Create your admin account through the contact form
2. Manually set `is_admin = true` in the profiles table via Supabase dashboard
3. Access the admin dashboard at `/admin`

## 📝 Content Management

### Resource Editor Features

- **Rich Text Editing**: TipTap editor with full formatting support
- **Media Upload**: Images and files with Supabase Storage integration
- **Content Types**: Articles, case studies, reports, tools, downloads
- **Publishing Workflow**: Draft → Review → Publish
- **SEO Optimization**: Meta titles, descriptions, canonical URLs
- **Categories & Tags**: Flexible content organization

### Editor Actions

- **Save Draft**: Saves content without publishing
- **Publish**: Makes content publicly visible
- **Cancel Edit**: Reverts to last saved version
- **Discard Changes**: Reloads content from database
- **Upload Media**: Secure file storage with admin-only access

## 🎨 Design System

### Color Palette

The design uses a sophisticated color system defined in `src/index.css`:

- **Primary**: Blue accent for CTAs and links
- **Secondary**: Complementary colors for variety
- **Neutral**: Gray scale for text and backgrounds
- **Semantic**: Success, warning, error, info states

### Typography

- **Headings**: Serif fonts for elegance (Playfair Display)
- **Body**: Sans-serif for readability (Inter)
- **Code**: Monospace for technical content (Fira Code)

### Components

Built on shadcn/ui with custom variants and theming:

- Form components with validation states
- Cards with hover effects and shadows
- Buttons with loading states and variants
- Modals and overlays with proper focus management

## 🔧 Development Guide

### Adding New Features

1. **Database Changes**: Use Supabase migrations
2. **Components**: Follow shadcn/ui patterns
3. **Pages**: Add to `src/pages/` and update routing in `App.tsx`
4. **Styles**: Use design tokens from `index.css`
5. **Types**: Define interfaces in component files or `src/types/`

### Code Quality

- **ESLint**: Enforces code quality standards
- **TypeScript**: Strict type checking
- **Prettier**: Automatic code formatting
- **Path Aliases**: Use `@/` for clean imports

### Testing Strategy

- **Manual QA**: Test all admin flows (create, edit, publish, delete)
- **Cross-browser**: Verify functionality in Chrome, Firefox, Safari
- **Mobile**: Test responsive design on various screen sizes
- **SEO**: Validate meta tags and structured data

## 🚀 Deployment

### Supabase Setup

1. Create a new Supabase project
2. Run the provided migrations to set up tables and RLS policies
3. Configure storage buckets for file uploads
4. Set up authentication providers if needed

### Environment Configuration

```bash
# Production environment variables
VITE_SUPABASE_URL=your_production_supabase_url
VITE_SUPABASE_ANON_KEY=your_production_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key  # Server-side only
```

### Build & Deploy

```bash
# Production build
npm run build

# Deploy to Lovable platform
# (handled automatically via git push)
```

## 📊 Performance Considerations

- **Image Optimization**: Automatic WebP conversion and lazy loading
- **Code Splitting**: Route-based code splitting with React.lazy
- **Bundle Size**: Tree-shaking and dependency optimization
- **Caching**: Service worker for offline functionality
- **CDN**: Static assets served via Supabase CDN

## 🐛 Troubleshooting

### Common Issues

1. **Storage Upload Errors**: Check RLS policies for `storage.objects`
2. **Authentication Issues**: Verify Supabase URL configuration
3. **Build Failures**: Run `npm run typecheck` to identify TypeScript errors
4. **Styling Issues**: Ensure Tailwind classes are properly configured

### Debug Tools

- Browser DevTools for client-side debugging
- Supabase Dashboard for database inspection
- Network tab for API request analysis
- React DevTools for component inspection

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Make your changes following the code style
4. Test your changes thoroughly
5. Submit a pull request with a clear description

### Pull Request Template

```markdown
## Changes Made
- Brief description of changes
- Any breaking changes
- Database migrations required

## Testing
- [ ] Tested locally
- [ ] Verified responsive design
- [ ] Checked admin functionality
- [ ] Validated SEO improvements

## Screenshots
[Include relevant screenshots]
```

## 📄 License

This project is proprietary to Lesar Consults. All rights reserved.

## 📞 Support

For technical support or questions:

- Email: support@lesarconsults.com
- Website: https://lesarconsults.com
- Admin Dashboard: https://lesarconsults.com/admin

---

*Built with ❤️ by the Lesar Consults team*