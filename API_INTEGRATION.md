# API Integration Mapping

This document maps frontend components/actions to backend API endpoints used by the GearUp frontend.

> Env: `BACKEND_API_URL` must point to your backend (e.g. `https://api.example.com`).

---

## Authentication

- POST /api/auth/register
  - Purpose: Create a new user (role selected at registration).
  - Request body: { name, email, password, role }
  - Used by: Registration form — [app/(authGroup)/\_components/RegisterForm.tsx](<app/(authGroup)/_components/RegisterForm.tsx#L1-L40>)
  - Action: [app/(authGroup)/\_actions/registerUser.ts](<app/(authGroup)/_actions/registerUser.ts#L1-L40>)
  - Auth: Public

- POST /api/auth/login
  - Purpose: Authenticate user; issues `accessToken` and `refreshToken` cookies.
  - Request body: { email, password }
  - Used by: Login form — [app/(authGroup)/\_components/LoginForm.tsx](<app/(authGroup)/_components/LoginForm.tsx#L1-L20>)
  - Action: [app/(authGroup)/\_actions/loginUser.ts](<app/(authGroup)/_actions/loginUser.ts#L1-L40>)
  - Auth: Public

- GET /api/auth/me
  - Purpose: Retrieve authenticated user's profile (used for route protection and rendering dashboards).
  - Used by: Server layout protection — [app/(dashboardGroup)/layout.tsx](<app/(dashboardGroup)/layout.tsx#L1-L40>)
  - Service wrapper: [service/getMe.ts](service/getMe.ts#L1-L60)
  - Auth: Requires `accessToken` cookie

- POST /api/auth/refresh-token
  - Purpose: Exchange refresh token for a new access token.
  - Used by: [service/refreshToken.ts](service/refreshToken.ts#L1-L50)
  - Auth: Requires `refreshToken` cookie

---

## Public / Gear

- GET /api/gear
  - Purpose: List gears with query params (page, limit, searchTerm, category, brand, minPrice, maxPrice, sortBy, sortOrder).
  - Used by: Gear listing page — [app/(publicGroup)/gear/page.tsx](<app/(publicGroup)/gear/page.tsx#L1-L40>)
  - Service wrapper: [service/getGears.ts](service/getGears.ts#L1-L60)
  - Auth: Public

- GET /api/gear/:id
  - Purpose: Fetch gear details for gear page.
  - Used by: Gear details page — [app/(publicGroup)/gear/[id]/page.tsx](<app/(publicGroup)/gear/[id]/page.tsx#L1-L40>)
  - Service wrapper: [service/getSingleGear.ts](service/getSingleGear.ts#L1-L40)
  - Auth: Public

---

## Categories

- GET /api/categories
  - Purpose: Fetch categories for filters and admin/category management UI.
  - Used by: Gear filters, admin pages — [app/(publicGroup)/\_components/GearFilters.tsx](<app/(publicGroup)/_components/GearFilters.tsx#L1-L20>)
  - Service wrapper: [service/getCategories.ts](service/getCategories.ts#L1-L40)
  - Auth: Public (GET)

- POST /api/categories
  - Purpose: Create a category (admin)
  - Used by: Admin category form — [app/(dashboardGroup)/admin-dashboard/categories/\_components/CategoryForm.tsx](<app/(dashboardGroup)/admin-dashboard/categories/_components/CategoryForm.tsx#L1-L40>)
  - Action: [app/(dashboardGroup)/admin-dashboard/categories/\_actions/createCategory.ts](<app/(dashboardGroup)/admin-dashboard/categories/_actions/createCategory.ts#L1-L40>)
  - Auth: Requires `accessToken` (admin)

- DELETE /api/categories/:id
  - Purpose: Delete a category (admin)
  - Used by: Admin category manager — [app/(dashboardGroup)/admin-dashboard/categories/\_components/DeleteCategoryButton.tsx](<app/(dashboardGroup)/admin-dashboard/categories/_components/DeleteCategoryButton.tsx#L1-L40>)
  - Action: [app/(dashboardGroup)/admin-dashboard/categories/\_actions/deleteCategory.ts](<app/(dashboardGroup)/admin-dashboard/categories/_actions/deleteCategory.ts#L1-L40>)
  - Auth: Requires `accessToken` (admin)

---

## Provider APIs (provider dashboard)

- GET /api/provider/gear
  - Purpose: List provider's gears
  - Used by: Provider dashboard gear list — [app/(dashboardGroup)/provider-dashboard/gear/page.tsx](<app/(dashboardGroup)/provider-dashboard/gear/page.tsx#L1-L40>)
  - Service wrapper: [service/getProviderGears.ts](service/getProviderGears.ts#L1-L40)
  - Auth: Requires `accessToken`

- POST /api/provider/gear
  - Purpose: Create a new gear (provider)
  - Used by: Create gear form — [app/(dashboardGroup)/provider-dashboard/gear/\_components/CreateGearForm.tsx](<app/(dashboardGroup)/provider-dashboard/gear/_components/CreateGearForm.tsx#L1-L40>)
  - Action: [app/(dashboardGroup)/provider-dashboard/gear/\_actions/createGear.ts](<app/(dashboardGroup)/provider-dashboard/gear/_actions/createGear.ts#L1-L40>)
  - Auth: Requires `accessToken`

- PUT /api/provider/gear/:id
  - Purpose: Update gear (provider)
  - Used by: Edit gear form — [app/(dashboardGroup)/provider-dashboard/gear/[id]/edit/page.tsx](<app/(dashboardGroup)/provider-dashboard/gear/[id]/edit/page.tsx#L1-L40>)
  - Action: [app/(dashboardGroup)/provider-dashboard/gear/\_actions/updateGear.ts](<app/(dashboardGroup)/provider-dashboard/gear/_actions/updateGear.ts#L1-L40>)
  - Auth: Requires `accessToken`

- DELETE /api/provider/gear/:id
  - Purpose: Delete gear (provider)
  - Used by: Delete button — [app/(dashboardGroup)/provider-dashboard/gear/\_components/DeleteGearButton.tsx](<app/(dashboardGroup)/provider-dashboard/gear/_components/DeleteGearButton.tsx#L1-L40>)
  - Action: [app/(dashboardGroup)/provider-dashboard/gear/\_actions/deleteGear.ts](<app/(dashboardGroup)/provider-dashboard/gear/_actions/deleteGear.ts#L1-L40>)
  - Auth: Requires `accessToken`

- GET /api/provider/orders
  - Purpose: Provider order list
  - Used by: Provider orders page — [app/(dashboardGroup)/provider-dashboard/orders/page.tsx](<app/(dashboardGroup)/provider-dashboard/orders/page.tsx#L1-L40>)
  - Service wrapper: [service/getProviderOrders.ts](service/getProviderOrders.ts#L1-L40)
  - Auth: Requires `accessToken`

- PATCH /api/provider/orders/:id
  - Purpose: Update order status (Confirm, Mark Picked Up, Mark Returned)
  - Used by: Order status update — [app/(dashboardGroup)/provider-dashboard/orders/\_actions/updateOrderStatus.ts](<app/(dashboardGroup)/provider-dashboard/orders/_actions/updateOrderStatus.ts#L1-L40>)
  - Auth: Requires `accessToken`

---

## Customer / Rentals & Payments

- POST /api/rentals
  - Purpose: Create rental order
  - Used by: Rental creation form — [app/(dashboardGroup)/customer-dashboard/rentals/\_components/CreateRentalForm.tsx](<app/(dashboardGroup)/customer-dashboard/rentals/_components/CreateRentalForm.tsx#L1-L20>)
  - Action: [app/(dashboardGroup)/customer-dashboard/rentals/\_actions/createRental.ts](<app/(dashboardGroup)/customer-dashboard/rentals/_actions/createRental.ts#L1-L40>)
  - Auth: Requires `accessToken`

- GET /api/rentals
  - Purpose: Customer rental list
  - Used by: Customer dashboard rentals — [app/(dashboardGroup)/customer-dashboard/rentals/page.tsx](<app/(dashboardGroup)/customer-dashboard/rentals/page.tsx#L1-L40>)
  - Service wrapper: [service/getMyRentals.ts](service/getMyRentals.ts#L1-L40)
  - Auth: Requires `accessToken`

- POST /api/payments/create
  - Purpose: Create a payment/checkout session (Stripe Checkout) and return a redirect `paymentUrl`.
  - Used by: Payment initiation action — [app/(dashboardGroup)/customer-dashboard/rentals/\_actions/createCheckoutSession.ts](<app/(dashboardGroup)/customer-dashboard/rentals/_actions/createCheckoutSession.ts#L1-L40>)
  - Client: `PayNowButton` — [app/(dashboardGroup)/customer-dashboard/rentals/\_components/PayNowButton.tsx](<app/(dashboardGroup)/customer-dashboard/rentals/_components/PayNowButton.tsx#L1-L40>)
  - Redirect pages: [app/(publicGroup)/payment/page.tsx](<app/(publicGroup)/payment/page.tsx#L1-L40>)
  - Auth: Requires `accessToken`

---

## Reviews

- GET /api/reviews
  - Purpose: Fetch current user's reviews
  - Used by: My reviews page — [app/(dashboardGroup)/customer-dashboard/reviews/page.tsx](<app/(dashboardGroup)/customer-dashboard/reviews/page.tsx#L1-L40>)
  - Service wrapper: [service/getMyReviews.ts](service/getMyReviews.ts#L1-L40)
  - Auth: Requires `accessToken`

- POST /api/reviews
  - Purpose: Submit a review for a gear item
  - Used by: Review action — [app/(dashboardGroup)/customer-dashboard/rentals/\_actions/createReview.ts](<app/(dashboardGroup)/customer-dashboard/rentals/_actions/createReview.ts#L1-L40>)
  - Auth: Requires `accessToken`

---

## Admin

- GET /api/admin/users
  - Purpose: Admin users list
  - Used by: Admin dashboard users page — [app/(dashboardGroup)/admin-dashboard/users/page.tsx](<app/(dashboardGroup)/admin-dashboard/users/page.tsx#L1-L40>)
  - Aggregated in: [service/getAdminDashboardData.ts](service/getAdminDashboardData.ts#L1-L40)
  - Auth: Requires `accessToken` (admin)

- PATCH /api/admin/users/:id
  - Purpose: Update user status (suspend/activate)
  - Used by: Admin user actions — [app/(dashboardGroup)/admin-dashboard/users/\_actions/updateUserStatus.ts](<app/(dashboardGroup)/admin-dashboard/users/_actions/updateUserStatus.ts#L1-L40>)
  - Auth: Requires `accessToken` (admin)

- GET /api/admin/gear
- GET /api/admin/rentals
  - Purpose: Admin aggregated data
  - Used by: Admin dashboard data — [service/getAdminDashboardData.ts](service/getAdminDashboardData.ts#L1-L160)
  - Auth: Requires `accessToken` (admin)

