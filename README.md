# BS Education Platform

A comprehensive education platform built with Next.js for finding universities, comparing programs, scholarships, and more. Now with **full backend integration**, **admin dashboard**, and **database management**.

## 🚀 New Features

- ✅ **Complete Backend** - Supabase integration with PostgreSQL
- ✅ **Admin Dashboard** - Full content management system
- ✅ **Authentication** - Secure login with NextAuth.js
- ✅ **Database Schema** - Complete with RLS policies
- ✅ **API Routes** - RESTful API for all entities
- ✅ **CRUD Operations** - Manage universities, scholarships, programs, and more
- ✅ **Role-Based Access** - Admin and super admin roles
- ✅ **Production Ready** - Secure, scalable architecture

## Project Structure

```
bs_edu/
├── client/          # Next.js frontend application
│   ├── app/         # App router pages
│   │   ├── admin/   # Admin dashboard & login
│   │   └── api/     # API routes
│   ├── components/  # React components
│   │   ├── admin/   # Admin-specific components
│   │   └── ui/      # Shared UI components
│   ├── lib/         # Utilities & configurations
│   │   ├── supabase/  # Supabase client & schema
│   │   └── auth/      # Authentication utilities
│   └── public/      # Static assets
└── resource/        # Additional resources
```

## Quick Start

### 1. Install Dependencies

```bash
cd client
npm install
```

### 2. Set Up Supabase

See [SETUP_GUIDE.md](./SETUP_GUIDE.md) for complete instructions.

Quick steps:
1. Create a Supabase project
2. Run the SQL schema from `client/lib/supabase/schema.sql`
3. Get your API keys

### 3. Configure Environment

```bash
cp client/.env.example client/.env.local
```

Edit `.env.local` with your Supabase credentials and admin details.

### 4. Run Development Server

```bash
cd client
npm run dev
```

Open:
- **Public Site**: [http://localhost:3000](http://localhost:3000)
- **Admin Login**: [http://localhost:3000/admin/login](http://localhost:3000/admin/login)
- **Admin Dashboard**: [http://localhost:3000/admin/dashboard](http://localhost:3000/admin/dashboard)

## Features

- **Find Universities** - Search and discover universities worldwide
- **Compare Programs** - Compare different educational programs side by side
- **Scholarships** - Browse available scholarships
- **Study Destinations** - Explore study destinations around the world
- **QS Rankings** - View university rankings
- **Application Process** - Guide through the application process
- **Visa Guide** - Information about visa requirements
- **Documentation** - Educational resources and documentation
- **Support** - Get help and support

## Technology Stack

- **Framework**: Next.js 16.1.1 (App Router)
- **React**: 19.2.3
- **TypeScript**: 5.x
- **Database**: Supabase (PostgreSQL)
- **Authentication**: NextAuth.js
- **Styling**: Tailwind CSS 4
- **UI Components**: Radix UI, shadcn/ui
- **Form Handling**: React Hook Form with Zod validation
- **Animations**: Motion (Framer Motion)
- **Icons**: Lucide React
- **Tables**: TanStack React Table
- **Date Handling**: date-fns

## Admin Dashboard

The admin dashboard provides complete content management:

### Available Sections
- 📊 **Dashboard** - Overview & statistics
- 🎓 **Universities** - Manage university listings
- 📚 **Programs** - Academic programs management
- 💰 **Scholarships** - Scholarship listings
- 📈 **QS Rankings** - University rankings
- 🌍 **Destinations** - Study destinations
- ✈️ **Visa Guides** - Country visa information
- 📖 **Resources** - Educational resources
- ❓ **FAQs** - Frequently asked questions
- 📧 **Contact** - User submissions
- 👥 **Users** - User management
- ⚙️ **Settings** - System settings

### Access
- **URL**: `/admin/login`
- **Default**: Set up admin user in Supabase
- **Role**: Admin or Super Admin required

## API Documentation

### Public Endpoints
```
GET  /api/universities       # List all universities
GET  /api/universities/:id   # Get single university
GET  /api/scholarships       # List active scholarships
GET  /api/programs           # List all programs
GET  /api/qs-rankings        # List rankings
GET  /api/visa-guides        # List visa guides
GET  /api/resources          # List resources
GET  /api/faqs               # List FAQs
```

### Admin Endpoints (Authentication Required)
```
POST   /api/universities     # Create university
PUT    /api/universities/:id # Update university
DELETE /api/universities/:id # Delete university
# Similar CRUD for other entities
```

## Database Schema

Complete schema with:
- ✅ 13 core tables (universities, scholarships, programs, etc.)
- ✅ Row Level Security (RLS) policies
- ✅ Automatic timestamp triggers
- ✅ Proper indexes for performance
- ✅ Foreign key relationships
- ✅ Data validation constraints

See `client/lib/supabase/schema.sql` for full schema.

## Available Scripts

```bash
npm run dev    # Start development server
npm run build  # Build for production
npm run start  # Start production server
npm run lint   # Run ESLint
```

## Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables from `.env.local`
4. Deploy!

### Environment Variables for Production

```env
NEXT_PUBLIC_SUPABASE_URL=your_production_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_production_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_production_service_key
NEXTAUTH_URL=https://yourdomain.com
NEXTAUTH_SECRET=generate_new_secret_for_production
```

## Security

- ✅ Row Level Security on all tables
- ✅ JWT-based authentication
- ✅ Role-based access control
- ✅ Secure API routes
- ✅ Environment variable protection
- ✅ HTTPS required in production

## Development Workflow

1. **Frontend Changes**: Edit components in `client/app` or `client/components`
2. **Backend Changes**: Modify API routes in `client/app/api`
3. **Database Changes**: Update schema in Supabase SQL Editor
4. **Admin Features**: Add/modify admin components in `client/components/admin`

## Documentation

- **Setup Guide**: [SETUP_GUIDE.md](./SETUP_GUIDE.md) - Complete setup instructions
- **API Docs**: See API section above
- **Database**: Check schema.sql for structure

## Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## Support & Issues

For setup help or bug reports:
1. Check [SETUP_GUIDE.md](./SETUP_GUIDE.md)
2. Review Supabase docs: https://supabase.com/docs
3. Check Next.js docs: https://nextjs.org/docs

## License

Private project - All rights reserved

---

## Summary

The BS Education platform now includes:

✅ **Full Backend** - Supabase with PostgreSQL database  
✅ **Admin Dashboard** - Complete content management system  
✅ **Authentication** - Secure login with role-based access  
✅ **API Layer** - RESTful endpoints for all entities  
✅ **Database Security** - Row-level security policies  
✅ **Modern UI** - Responsive design with Tailwind CSS  
✅ **Type Safety** - Full TypeScript implementation  
✅ **Production Ready** - Deployable to Vercel or any Node.js host  

The system is fully functional and ready for content management!

