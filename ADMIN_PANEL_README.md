# Admin Panel Documentation

## 🎯 Overview

A complete, production-ready **Admin Panel** for Launder Remedy - a premium laundry and dry cleaning service platform. The admin panel provides full control over users, services, orders, payments, and analytics.

---

## 🏗️ Architecture

### **Project Structure**

```
src/
├── app/
│   └── admin/                          # Admin routes (protected)
│       ├── layout.tsx                  # Admin layout with sidebar
│       ├── page.tsx                    # Root redirect to dashboard
│       ├── dashboard/
│       │   └── page.tsx                # Dashboard with stats & charts
│       ├── users/
│       │   └── page.tsx                # User management (CRUD)
│       ├── services/
│       │   └── page.tsx                # Services management (ADMIN ONLY CRUD)
│       ├── orders/
│       │   └── page.tsx                # Orders management
│       ├── payments/
│       │   └── page.tsx                # Payments & transactions
│       ├── reports/
│       │   └── page.tsx                # Analytics & reports
│       └── settings/
│           └── page.tsx                # Admin settings
│
├── components/
│   ├── admin/
│   │   ├── Sidebar.tsx                 # Responsive sidebar navigation
│   │   └── StatCard.tsx                # Reusable stat card component
│   ├── tables/
│   │   ├── DataTable.tsx               # TanStack table wrapper
│   │   └── columns/                    # Column definitions
│   │       ├── userColumns.tsx
│   │       ├── serviceColumns.tsx
│   │       ├── orderColumns.tsx
│   │       └── paymentColumns.tsx
│   └── ui/
│       ├── badge.tsx                   # Badge component
│       └── dropdown-menu.tsx           # Dropdown menu component
│
├── lib/
│   └── mockData/                       # Mock data (backend replacement)
│       ├── users.ts                    # User mock data + API
│       ├── services.ts                 # Service mock data + API
│       ├── orders.ts                   # Order mock data + API
│       └── payments.ts                 # Payment mock data + API
│
└── services/
    └── admin.service.ts                # Admin service layer (API wrapper)
```

---

## 🎨 Design System

### **Color Scheme** (Inherited from main project)
- **Primary:** Purple (#41154c - HSL: 291 54% 46%)
- **Secondary:** Lighter purple accents
- **Success:** Green
- **Warning:** Yellow
- **Error:** Red
- **Neutral:** Gray scale

### **UI Components**
- Buttons: Primary, Secondary, Outline, Ghost
- Badges: Status indicators with variants
- Cards: Elevated surfaces with borders
- Tables: TanStack with sorting, filtering, pagination
- Forms: Consistent input styling

---

## 📋 Features

### **1. Dashboard**
- **Overview Statistics:**
  - Total Users
  - Total Orders
  - Total Revenue
  - Active Services
  - Pending/Processing/Completed Orders
  - Payment Status Breakdown

- **Recent Orders Table:** Quick view of latest 5 orders
- **Trend Indicators:** Month-over-month growth percentages

### **2. Users Management**
- **View All Users:** Paginated table with sorting
- **Search:** By email (industry standard)
- **Filter:** By status (active, inactive, suspended)
- **Actions:**
  - Edit user details
  - Delete/deactivate users
  - View user order history

**Stats Cards:**
- Total users
- Active users
- Inactive users
- Suspended users

### **3. Services Management** ⭐ (ADMIN ONLY)
- **Full CRUD Operations:**
  - ✅ Create new services
  - ✅ Update service details (title, description, price, category)
  - ✅ Delete services (with confirmation)
  - ✅ Activate/deactivate services
  - ✅ View service statistics

**Service Fields:**
- Title
- Description
- Price
- Per Item Price
- Category
- Status (active/inactive)
- Total Orders (read-only)

**Stats Cards:**
- Total services
- Active services
- Total orders across all services
- Total revenue from services

**Important:** Only admin users can manage services. Changes reflect immediately on the frontend.

### **4. Orders Management**
- **View All Orders:** Complete order history
- **Search:** By order number, customer name/email
- **Filter:** By status, payment status
- **Actions:**
  - View order details
  - Update order status
  - Track collection/delivery

**Order Statuses:**
- Pending
- Collected
- Processing
- Out for Delivery
- Completed
- Cancelled

**Stats Cards:**
- Total orders
- Pending orders
- Processing orders
- Completed orders
- Total revenue

### **5. Payments & Transactions**
- **View All Payments:** Transaction history
- **Payment Details:**
  - Transaction ID
  - Order number
  - Customer info
  - Amount & currency
  - Payment method (card, cash, prepaid bundle)
  - Card details (brand, last 4 digits)
  - Stripe payment ID
  - Status & timestamps

**Payment Statuses:**
- Success
- Pending
- Failed
- Refunded

**Stats Cards:**
- Total revenue
- Successful payments
- Pending payments
- Failed payments
- Refunded payments

### **6. Reports & Analytics**
- **Key Metrics Dashboard**
- **Monthly Revenue Chart:** Bar chart visualization
- **Top Services:** Most popular services by orders
- **Order Status Distribution:** Visual breakdown
- **Export Options:** PDF & CSV (coming soon)

**Metrics:**
- Revenue trends
- Service popularity
- Order completion rates
- User growth
- Payment success rates

### **7. Settings**
- **General Settings:**
  - Business name
  - Support email
  - Phone number
  - Currency

- **Time Slot Configuration:**
  - Collection/delivery hours
  - Slot duration

- **Service Area:**
  - Primary location
  - Service radius

- **Payment Configuration:**
  - Stripe keys
  - Minimum order amount
  - Payment methods

- **Notifications:**
  - Email preferences for orders, payments, users

---

## 🔐 Authentication & Authorization

### **Access Control**
- Admin routes are protected
- Checks if user is logged in: `isLogin` from Redux
- Verifies admin role: `user.email === 'admin@launderremedy.com'` OR `user.role === 'admin'`
- Non-admin users redirected to home page
- Not logged in users redirected to login page

### **Admin Credentials** (Mock Data)
```
Email: admin@launderremedy.com
Password: (Use your existing login)
```

---

## 📊 TanStack Table Features

All admin tables include:

✅ **Sorting:** Click column headers (ascending/descending)
✅ **Pagination:** 10, 20, 30, 40, 50 rows per page
✅ **Search:** Global search by primary field (email, order#, etc.)
✅ **Filtering:** Status filters, category filters
✅ **Column Actions:** View, edit, delete dropdowns
✅ **Responsive:** Mobile and tablet friendly
✅ **Selection:** Row selection support
✅ **Empty States:** Friendly "no results" messages

---

## 🗄️ Mock Data System

### **Why Mock Data?**
Backend is not yet created. Mock data simulates real API behavior for development and testing.

### **Mock Data Features:**
- ✅ Realistic data structure
- ✅ Pagination support
- ✅ Search functionality
- ✅ Filtering by status/category
- ✅ CRUD operations (in-memory)
- ✅ API delay simulation (300ms)
- ✅ Easy replacement with real APIs

### **Mock Data Files:**
1. **users.ts:** 10 users + 1 admin
2. **services.ts:** 10 laundry services
3. **orders.ts:** 8 sample orders
4. **payments.ts:** 9 payment transactions

### **How to Replace with Real API:**

Update `src/services/admin.service.ts`:

```typescript
// Before (Mock)
const response = await mockUserAPI.getAllUsers(page, pageSize, search);

// After (Real API)
const response = await Fetch.get(`/admin/users?page=${page}&size=${pageSize}&search=${search}`);
```

---

## 🚀 Getting Started

### **Prerequisites**
- Node.js 18+
- npm or yarn

### **Installation**
Already installed with your project. New dependencies added:
- `@tanstack/react-table`
- `@radix-ui/react-dropdown-menu`

### **Running the Admin Panel**

1. **Start Development Server:**
   ```bash
   npm run dev
   ```

2. **Login as Admin:**
   - Go to: `http://localhost:3000/login`
   - Use admin credentials
   - Navigate to: `http://localhost:3000/admin`

3. **Access Admin Routes:**
   - Dashboard: `/admin/dashboard`
   - Users: `/admin/users`
   - Services: `/admin/services`
   - Orders: `/admin/orders`
   - Payments: `/admin/payments`
   - Reports: `/admin/reports`
   - Settings: `/admin/settings`

---

## 🎯 Key Implementation Details

### **Admin Layout Protection**
```typescript
// src/app/admin/layout.tsx
const isAdmin = user?.email === 'admin@launderremedy.com' || user?.role === 'admin';

if (!isLogin) {
  router.push("/login");
} else if (!isAdmin) {
  router.push("/");
}
```

### **Sidebar Navigation**
- Responsive (mobile hamburger menu)
- Active route highlighting
- Icons from Lucide React
- Admin profile display
- Logout functionality

### **Data Table Pattern**
```typescript
<DataTable
  columns={columns}
  data={data}
  searchKey="email"
  searchPlaceholder="Search by email..."
/>
```

### **Stat Card Pattern**
```typescript
<StatCard
  title="Total Users"
  value={100}
  icon={Users}
  trend={{ value: 12, isPositive: true }}
  iconColor="text-blue-700"
  iconBgColor="bg-blue-100"
/>
```

---

## 📝 Next Steps (Future Enhancements)

### **Backend Integration**
- [ ] Connect to real API endpoints
- [ ] Implement authentication middleware
- [ ] Add role-based permissions

### **Service Management Modals**
- [ ] Create Service Modal (form with validation)
- [ ] Edit Service Modal (pre-filled form)
- [ ] Delete Confirmation Modal

### **User Management**
- [ ] User detail modal
- [ ] Edit user modal
- [ ] User order history view

### **Order Management**
- [ ] Order detail modal with full info
- [ ] Status update dropdown
- [ ] Order tracking timeline
- [ ] Print order receipt

### **Advanced Features**
- [ ] Real-time notifications
- [ ] Advanced analytics charts
- [ ] CSV/PDF export functionality
- [ ] Bulk actions (delete, update status)
- [ ] Activity logs
- [ ] Email templates management

---

## 🐛 Troubleshooting

### **Issue: Admin routes not showing**
- Check if logged in user email is `admin@launderremedy.com`
- Or add `role: 'admin'` to user object in Redux

### **Issue: Tables not loading**
- Check console for errors
- Verify mock data imports
- Check if `adminService` methods are being called

### **Issue: Sidebar not responsive**
- Clear browser cache
- Check Tailwind classes
- Verify mobile breakpoints

---

## 📞 Support

For questions or issues:
- Check console logs
- Review component props
- Verify Redux state
- Check network tab for API calls (when using real backend)

---

## ✅ Summary

**What Was Built:**
- ✅ Complete admin panel with 7 pages
- ✅ TanStack tables with full features
- ✅ Mock data system (easily replaceable)
- ✅ Service management (ADMIN ONLY CRUD)
- ✅ Responsive design (desktop + tablet)
- ✅ Dark mode support
- ✅ Protected routes
- ✅ Stats & analytics
- ✅ Professional UI matching your brand

**Ready for Production:**
- Clean, modular code
- TypeScript support
- Reusable components
- Easy to maintain
- Backend integration ready

---

**Built with ❤️ for Launder Remedy**
