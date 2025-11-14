# Collibet Admin Dashboard - Design Documentation

## 📋 Overview

The Collibet Admin Dashboard is a comprehensive control center designed to manage all aspects of the tailoring business. It follows the main site's design system with a professional, accessible interface using React, TypeScript, and Tailwind CSS.

## 🎨 Design System Integration

### Color Scheme
- **Primary**: Sky Blue (`#0095ff` - HSL: 200 95% 50%)
- **Secondary**: Bright Yellow (`#ffc100` - HSL: 48 100% 55%)
- **Accent**: Yellow (`#ffc100` - HSL: 48 100% 55%)
- **Background**: White/Gray-50 (Light mode), Gray-900 (Dark mode)
- **Text**: Gray-900/Gray-100 (Light/Dark)

### Typography
- **Heading Font**: Poppins (font-family)
- **Body Font**: Inter (font-family)
- **Font Sizes**: Consistent with Tailwind scale

### Layout
- **Sidebar**: 256px (w-64) fixed width, responsive collapse on mobile
- **Header**: 64px height with navigation controls
- **Main Content**: Flexible, scrollable area with consistent padding
- **Border Radius**: 1rem standard (rounded-lg)

## 📂 File Structure

```
src/admin/
├── components/
│   ├── AdminSidebar.tsx      # Navigation sidebar with menu items
│   ├── AdminHeader.tsx        # Top navigation with controls
│   └── index.ts              # Component exports
├── layouts/
│   └── AdminLayout.tsx       # Main layout wrapper
├── pages/
│   ├── AdminDashboard.tsx    # Home page with stats and charts
│   ├── AdminOrders.tsx       # Order management
│   ├── AdminUsers.tsx        # User/Customer management
│   ├── AdminAnalytics.tsx    # Analytics & reports
│   ├── AdminContent.tsx      # Content management
│   └── AdminSettings.tsx     # Settings & configuration
└── index.ts                  # Admin module exports
```

## 🖥️ Pages & Features

### 1. Admin Dashboard (Home)
**Route**: `/admin`

**Components**:
- **Stats Cards**: 4 metric cards showing:
  - Total Orders (1,245)
  - Active Users (342)
  - Revenue (₹85,234)
  - Pending Orders (23)
- **Orders Trend Chart**: Line chart showing order volume over time
- **Revenue Chart**: Bar chart showing monthly revenue
- **Recent Orders Table**: Quick view of latest 5 orders

**Key Metrics**:
- Monthly stats with trend indicators (↑↓)
- Color-coded status badges
- Quick action buttons for each order

---

### 2. Orders Management
**Route**: `/admin/orders`

**Features**:
- **Search & Filter**: Find orders by customer name or ID
- **Status Filter**: Filter by order status (pending, measurement, stitching, processing, delivered, cancelled)
- **Order Table**: Comprehensive order listing with:
  - Order ID (e.g., ORD1001)
  - Customer name & phone
  - Garment type
  - Category (Men/Women/Kids)
  - Current status (color-coded)
  - Amount in ₹
  - Order date
  - Action buttons (View, Edit, Delete)

**Status Colors**:
- Pending: Gray
- Measurement: Blue
- Stitching: Purple
- Processing: Yellow
- Delivered: Green
- Cancelled: Red

**Actions**:
- Create new order
- View order details
- Edit order information
- Delete orders
- Real-time status updates

---

### 3. Users Management
**Route**: `/admin/users`

**Features**:
- **User Stats**: 
  - Total users count
  - Active users indicator
  - Total revenue from all users
- **Search Functionality**: Search by name, email, or phone
- **User Table** with columns:
  - User name & ID
  - Email & Phone
  - Number of orders
  - Total spent (₹)
  - Last order date
  - Status (Active/Inactive)
  - Join date
  - Actions (View, Edit, Delete)

**User Information**:
- Lifetime customer value tracking
- Activity status
- Contact information
- Order history quick reference

---

### 4. Analytics & Reports
**Route**: `/admin/analytics`

**Charts & Visualizations**:
- **KPIs**:
  - Monthly Growth (24.5%)
  - Conversion Rate (8.4%)
  - Average Order Value (₹2,840)

- **Revenue Trend**: 6-month line chart
- **Orders vs Customers**: Dual-bar chart comparison
- **Category Distribution**: Pie chart (Men/Women/Kids split)
- **Top Garments**: Horizontal bar chart by revenue

**Data Table**:
- Monthly performance metrics
- Orders count per month
- Revenue figures
- New customers acquired
- Average order value calculations
- Month-over-month growth percentage

---

### 5. Content Management
**Route**: `/admin/content`

**Features**:
- **Content Grid View**: Visual cards for each content item
- **Status Indicators**: Published/Draft status badges
- **Edit Form**: Modal/inline form for creating/editing content
- **Fields**:
  - Title
  - Section (Hero, Services, Pricing, FAQ, Social Proof)
  - Content Type (Text, Image, Video, Link)
  - Content body (Rich text area)
  - Last updated timestamp

**Content Sections**:
- Hero Banner
- Services Section
- Pricing Information
- Testimonials
- FAQ Content
- Footer

**Actions**:
- Create new content
- Edit existing content
- Delete content items
- Section configuration
- Publish/Draft toggle

---

### 6. Settings & Configuration
**Route**: `/admin/settings`

**Sections**:

#### Business Information
- Business name
- Email & phone
- City & state
- Full address
- Business description

#### Service Settings
- Delivery time (hours)
- Base pricing
- Delivery charges
- Working days selection
- Opening/closing times

#### Communication
- Email notifications toggle
- WhatsApp notifications toggle
- SMS notifications toggle
- WhatsApp business number

#### Security
- Change password form
- Current password verification
- New password confirmation

#### Theme & Appearance
- Light/Dark/Auto mode selection
- Primary color picker (4 color options)
- Theme persistence

---

## 🧩 Component Architecture

### AdminLayout
**Props**:
- `children: React.ReactNode` - Page content

**Features**:
- Responsive sidebar (fixed on desktop, toggle on mobile)
- Mobile overlay when sidebar open
- Maintains layout across all admin pages

### AdminSidebar
**Props**:
- `onClose?: () => void` - Callback when item clicked on mobile

**Menu Items**:
- Dashboard (LayoutDashboard icon)
- Orders (ShoppingCart icon)
- Users (Users icon)
- Analytics (BarChart3 icon)
- Content (FileText icon)
- Settings (Settings icon)

**Features**:
- Active route highlighting (accent color)
- Smooth hover transitions
- Logout button at bottom

### AdminHeader
**Props**:
- `onMenuClick: () => void` - Toggle sidebar
- `isSidebarOpen: boolean` - Current sidebar state

**Components**:
- Menu toggle button (desktop hidden, mobile visible)
- Page title & description
- Notifications bell (with indicator dot)
- User profile button
- Settings button

---

## 📊 Data Models

### Order
```typescript
{
  id: string;          // "ORD1001"
  customer: string;    // Customer name
  phone: string;       // Contact number
  garment: string;     // Garment type
  category: string;    // "Men", "Women", "Kids"
  status: string;      // Enum: pending, measurement, stitching, processing, delivered, cancelled
  amount: number;      // Price in ₹
  date: string;        // YYYY-MM-DD format
}
```

### User
```typescript
{
  id: string;          // "USR001"
  name: string;        // Customer name
  email: string;       // Email address
  phone: string;       // Phone number
  orders: number;      // Total orders count
  totalSpent: number;  // Lifetime value in ₹
  lastOrder: string;   // Last order date
  status: string;      // "active" | "inactive"
  joinDate: string;    // Member since date
}
```

---

## 🎯 Key Features

### 1. Dashboard Analytics
- Real-time metrics display
- Trend indicators with % changes
- Multi-chart visualizations
- Performance comparison

### 2. Order Tracking
- Complete order lifecycle
- Status-based filtering
- Customer contact info
- Quick actions menu

### 3. Customer Insights
- User segmentation
- Lifetime value tracking
- Activity monitoring
- Contact management

### 4. Content Management
- Multi-section content control
- Status tracking
- Easy publish/draft toggle
- Bulk operations ready

### 5. Business Configuration
- Operating hours setup
- Service pricing
- Delivery settings
- Notification preferences

### 6. Security & Theme
- Password management
- Dark mode support
- Color customization
- Secure settings

---

## 🚀 Integration Points

### To be implemented:
1. **Authentication**: Add login/auth protection for `/admin` routes
2. **Database**: Connect to backend API for real data
3. **Real-time Updates**: WebSocket integration for live order updates
4. **File Uploads**: Image/document upload for content & orders
5. **Export Functions**: CSV/PDF export for reports
6. **Email Notifications**: Backend email service integration
7. **SMS Integration**: SMS notification system
8. **Payment Processing**: Order payment tracking

---

## 📱 Responsive Design

**Breakpoints**:
- Mobile (< 768px): Single column, collapsed sidebar, full-width cards
- Tablet (768px - 1024px): Grid layouts adjust, sidebar toggle visible
- Desktop (1024px+): Full sidebar, multi-column layouts, all features visible

**Mobile Optimizations**:
- Sidebar slides from left with overlay
- Tables become scrollable
- Cards stack vertically
- Touch-friendly button sizes (min 44x44px)

---

## 🔐 Security Considerations

### Current State (Demo):
- Routes are publicly accessible (no auth required)

### To Implement:
- JWT-based authentication
- Role-based access control (Admin, Manager, Accountant)
- Password hashing
- Session management
- Audit logging

---

## 🎨 Design Consistency

The admin dashboard maintains the Collibet brand identity:
- **Colors**: Sky blue primary, yellow accents
- **Typography**: Poppins headings, Inter body text
- **Spacing**: Consistent 1rem grid-based spacing
- **Icons**: Lucide React icons throughout
- **Components**: Uses shadcn/ui component library
- **Animations**: Smooth transitions and hover effects

---

## 📈 Performance Considerations

### Current:
- Sample data in component state
- Basic search filtering client-side

### To Optimize:
- Pagination for large datasets
- Virtual scrolling for tables
- API caching with React Query
- Image optimization
- Code splitting for admin module
- Lazy loading of routes

---

## 🔄 Future Enhancements

1. **Advanced Analytics**
   - Custom date range selection
   - Export reports to PDF/Excel
   - Predictive analytics

2. **Automation**
   - Automated email reminders
   - Bulk order operations
   - Scheduled backups

3. **Team Management**
   - Multiple admin accounts
   - Role-based permissions
   - Activity logs

4. **Customer Portal**
   - Order tracking for customers
   - Self-service updates
   - Direct messaging

5. **Inventory Management**
   - Fabric stock tracking
   - Supplier management
   - Low-stock alerts

---

## 🛠️ Development Notes

### Tech Stack
- **Framework**: React 18.3
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui + Radix UI
- **Charts**: Recharts
- **Icons**: Lucide React
- **Routing**: React Router v6
- **State**: React hooks (useState)

### CSS Classes Used
- `container mx-auto px-4` - Content wrapper
- `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3` - Responsive grids
- `bg-gradient-to-b from-primary to-primary/90` - Sidebar gradient
- `hover:shadow-lg transition-shadow` - Card hover effects
- `dark:bg-gray-800 dark:text-gray-100` - Dark mode support

### Browser Support
- Chrome/Edge: Latest
- Firefox: Latest
- Safari: Latest
- Mobile browsers: iOS 14+, Android 11+

---

## 📞 Support & Maintenance

- Admin pages are fully self-contained and modular
- Each page can be maintained independently
- Component reusability ensures consistency
- Follows React best practices and TypeScript strict mode
