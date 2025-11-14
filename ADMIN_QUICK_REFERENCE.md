# Collibet Admin Dashboard - Quick Reference Guide

## 🚀 Quick Start

### Access the Admin Dashboard
- **URL**: `http://localhost:5173/admin` (after running `npm run dev`)
- **Navigation**: All pages accessible via sidebar menu

### Admin Routes
```
/admin                 → Dashboard (Home)
/admin/orders         → Order Management
/admin/users          → User Management  
/admin/analytics      → Analytics & Reports
/admin/content        → Content Management
/admin/settings       → Business Settings
```

---

## 📋 Dashboard Overview

### 1. Dashboard (Home)
**Purpose**: Business metrics at a glance

**Key Metrics**:
- Total Orders: 1,245 ↑12.5%
- Active Users: 342 ↑8.2%
- Revenue: ₹85,234 ↑23.1%
- Pending Orders: 23 ↓5.4%

**Charts**:
- 6-month order trend (line chart)
- 6-month revenue trend (bar chart)
- Recent 5 orders table

---

### 2. Orders Management
**Purpose**: Track and manage customer orders

**Key Features**:
- ✅ Search orders by customer/ID
- ✅ Filter by status (6 statuses)
- ✅ View order details
- ✅ Edit order information
- ✅ Delete orders

**Order Statuses**:
- 🔴 Pending (Gray)
- 🔵 Measurement (Blue)
- 🟣 Stitching (Purple)
- 🟡 Processing (Yellow)
- 🟢 Delivered (Green)
- ⚫ Cancelled (Red)

**Sample Order**:
```
ID: ORD1001
Customer: Rajesh Kumar (+91-98765 43210)
Garment: Formal Shirt
Category: Men
Status: Delivered
Amount: ₹2,500
Date: 2024-11-10
```

---

### 3. Users Management
**Purpose**: Customer relationship management

**Key Features**:
- ✅ View all customers
- ✅ Search by name/email/phone
- ✅ Track customer lifetime value
- ✅ Monitor activity status
- ✅ View order history quick reference

**User Information Tracked**:
- Contact details (email, phone)
- Order count & total spent
- Last order date
- Account status (Active/Inactive)
- Member since date

**Statistics**:
- Total Users: Shows all registered customers
- Active Users: Currently active accounts
- Total Revenue: Lifetime customer value

---

### 4. Analytics & Reports
**Purpose**: Business intelligence and insights

**Key Metrics**:
- Monthly Growth: 24.5% ↑
- Conversion Rate: 8.4% ↑
- Avg Order Value: ₹2,840 ↑

**Visualizations**:
- 📈 Revenue Trend (6 months)
- 📊 Orders vs Customers
- 🥧 Category Distribution (Men/Women/Kids)
- 📊 Top Garments by Revenue

**Data Table**: Monthly performance with:
- Order counts
- Revenue figures
- Customer acquisition
- Growth percentages

---

### 5. Content Management
**Purpose**: Edit website content

**Features**:
- ✅ Create/Edit/Delete content
- ✅ Organize by section
- ✅ Publish/Draft toggle
- ✅ Track last updated date
- ✅ Support multiple content types

**Sections Available**:
- Hero Banner
- Services Section
- Pricing Information
- Testimonials/Social Proof
- FAQ Content
- Footer

**Content Types**:
- Text
- Images
- Videos
- Links

---

### 6. Settings & Configuration
**Purpose**: Business configuration hub

**Sections**:

#### Business Information
- Name, contact, address
- Business description

#### Service Settings
- Delivery time (currently: 24 hours)
- Base pricing
- Delivery charges
- Working days
- Opening/closing times

#### Communication
- Email notifications
- WhatsApp notifications
- SMS alerts
- WhatsApp business number

#### Security
- Change password form
- Current & new password confirmation

#### Theme & Appearance
- Light/Dark/Auto modes
- Primary color selection
- Theme persistence

---

## 🎨 Design Features

### Colors
- **Primary (Blue)**: `#0095ff` - Main brand color
- **Accent (Yellow)**: `#ffc100` - Highlights & CTAs
- **Status Colors**: 
  - Green: Success/Active
  - Blue: Info/Processing
  - Yellow: Warning/Pending
  - Red: Danger/Error
  - Purple: Secondary actions

### Components Used
- Cards: Elevated containers with hover effects
- Tables: Responsive, sortable, searchable
- Charts: Line, Bar, Pie charts (Recharts)
- Buttons: Primary (Gold), Outline, Ghost
- Forms: Inputs, Textareas, Selects
- Badges: Status indicators, tags

### Interactive Elements
- Hover effects on cards & rows
- Icon buttons for quick actions
- Color-coded status badges
- Responsive tables (scroll on mobile)
- Modal-like forms in cards

---

## 📊 Sample Data Structure

### Orders
```typescript
{
  id: "ORD1001",
  customer: "Rajesh Kumar",
  phone: "98765 43210",
  garment: "Formal Shirt",
  category: "Men",
  status: "delivered",
  amount: 2500,
  date: "2024-11-10"
}
```

### Users
```typescript
{
  id: "USR001",
  name: "Rajesh Kumar",
  email: "rajesh@example.com",
  phone: "98765 43210",
  orders: 5,
  totalSpent: 12500,
  lastOrder: "2024-11-10",
  status: "active",
  joinDate: "2024-08-15"
}
```

---

## 🔧 Customization Guide

### Adding a New Admin Page

1. **Create Page Component**:
```typescript
// src/admin/pages/AdminNewPage.tsx
export const AdminNewPage = () => {
  return (
    <div className="space-y-6">
      {/* Your content */}
    </div>
  );
};
```

2. **Add Route in App.tsx**:
```typescript
<Route path="/admin/new" element={<AdminLayout><AdminNewPage /></AdminLayout>} />
```

3. **Add Menu Item in AdminSidebar.tsx**:
```typescript
{ label: "New Page", path: "/admin/new", icon: IconComponent },
```

### Changing Colors
Edit `src/index.css` under `:root`:
```css
--primary: 200 95% 50%;      /* Change primary color */
--accent: 48 100% 55%;       /* Change accent color */
```

### Adding New Status Badge Color
Add to status colors object:
```typescript
const statusColors = {
  "new-status": "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
};
```

---

## 📱 Responsive Features

### Desktop (1024px+)
- Full sidebar always visible
- Multi-column layouts
- All features available
- Hover effects active

### Tablet (768px - 1024px)
- Sidebar toggle button visible
- 2-column grids
- Tables scrollable
- Touch-optimized buttons

### Mobile (< 768px)
- Hamburger menu
- Sidebar slides from left
- Single-column layouts
- Full-width cards
- Scrollable tables
- Larger touch targets

---

## 🔐 Security Notes

### Current State
⚠️ **Demo Mode**: All routes publicly accessible

### Before Production
- [ ] Implement authentication (JWT/OAuth)
- [ ] Add role-based access control
- [ ] Password protection for /admin
- [ ] Session management
- [ ] Audit logging
- [ ] HTTPS only
- [ ] Rate limiting on API

---

## 🐛 Troubleshooting

### Dashboard not loading?
1. Check if running `npm run dev`
2. Verify `/admin` route in App.tsx
3. Check browser console for errors

### Charts not displaying?
1. Verify Recharts is installed
2. Check data structure in props
3. Ensure ResponsiveContainer has parent width

### Sidebar not responsive?
1. Check breakpoint classes (md:, lg:)
2. Verify mobile menu toggle works
3. Test on actual mobile device

### Styling issues?
1. Clear cache: `rm -rf .next` or restart dev server
2. Check Tailwind CSS config
3. Verify color variables in index.css

---

## 📈 Performance Tips

1. **Pagination**: Add pagination for large datasets
   ```typescript
   const itemsPerPage = 10;
   const currentPage = 1;
   ```

2. **Lazy Loading**: Images and heavy components
   ```typescript
   import { lazy, Suspense } from 'react';
   ```

3. **Memoization**: Prevent unnecessary re-renders
   ```typescript
   const MemoComponent = memo(AdminOrders);
   ```

---

## 🎯 Next Steps

### To Make This Production-Ready:

1. **Database Integration**
   - Connect to backend API
   - Replace sample data with real data
   - Add error handling

2. **Authentication**
   - Add login page
   - Session management
   - Password reset flow

3. **Advanced Features**
   - Bulk operations
   - Export to CSV/PDF
   - Real-time notifications
   - Undo/Redo functionality

4. **Testing**
   - Unit tests for components
   - E2E tests for workflows
   - Performance testing

5. **Deployment**
   - Build optimization
   - CDN setup
   - Monitoring & logging

---

## 📞 Support Resources

- **Documentation**: `ADMIN_DASHBOARD_DESIGN.md`
- **Code Location**: `src/admin/`
- **Tailwind Docs**: https://tailwindcss.com
- **Recharts Docs**: https://recharts.org
- **Lucide Icons**: https://lucide.dev

---

**Version**: 1.0  
**Last Updated**: 2024-11-14  
**Status**: ✅ Complete & Ready for Development
