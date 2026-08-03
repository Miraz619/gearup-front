# API Integration Mapping

## Authentication

| ID  | Endpoint                     | Purpose                                         | Used by / Component                           | Service / Action                          | Auth                |
| --- | ---------------------------- | ----------------------------------------------- | --------------------------------------------- | ----------------------------------------- | ------------------- |
| 1   | POST /api/auth/register      | Create user                                     | app/(authGroup)/\_components/RegisterForm.tsx | app/(authGroup)/\_actions/registerUser.ts | Public              |
| 2   | POST /api/auth/login         | Authenticate user (sets access/refresh cookies) | app/(authGroup)/\_components/LoginForm.tsx    | app/(authGroup)/\_actions/loginUser.ts    | Public              |
| 3   | GET /api/auth/me             | Get authenticated user profile                  | app/(dashboardGroup)/layout.tsx               | service/getMe.ts                          | accessToken cookie  |
| 4   | POST /api/auth/refresh-token | Exchange refresh token for access token         | service/refreshToken.ts                       | service/refreshToken.ts                   | refreshToken cookie |

## Public / Gear

| ID  | Endpoint          | Purpose                                 | Used by / Component                  | Service / Action         | Auth   |
| --- | ----------------- | --------------------------------------- | ------------------------------------ | ------------------------ | ------ |
| 5   | GET /api/gear     | List gears (page, limit, filters, sort) | app/(publicGroup)/gear/page.tsx      | service/getGears.ts      | Public |
| 6   | GET /api/gear/:id | Get gear details                        | app/(publicGroup)/gear/[id]/page.tsx | service/getSingleGear.ts | Public |

## Categories

| ID  | Endpoint                   | Purpose                                 | Used by / Component                                                                   | Service / Action                                                            | Auth                |
| --- | -------------------------- | --------------------------------------- | ------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- | ------------------- |
| 7   | GET /api/categories        | Fetch categories for filters & admin UI | app/(publicGroup)/\_components/GearFilters.tsx                                        | service/getCategories.ts                                                    | Public              |
| 8   | POST /api/categories       | Create category (admin)                 | app/(dashboardGroup)/admin-dashboard/categories/\_components/CategoryForm.tsx         | app/(dashboardGroup)/admin-dashboard/categories/\_actions/createCategory.ts | accessToken (admin) |
| 9   | DELETE /api/categories/:id | Delete category (admin)                 | app/(dashboardGroup)/admin-dashboard/categories/\_components/DeleteCategoryButton.tsx | app/(dashboardGroup)/admin-dashboard/categories/\_actions/deleteCategory.ts | accessToken (admin) |

## Provider APIs

| ID  | Endpoint                       | Purpose               | Used by / Component                                                            | Service / Action                                                              | Auth        |
| --- | ------------------------------ | --------------------- | ------------------------------------------------------------------------------ | ----------------------------------------------------------------------------- | ----------- |
| 10  | GET /api/provider/gear         | List provider's gears | app/(dashboardGroup)/provider-dashboard/gear/page.tsx                          | service/getProviderGears.ts                                                   | accessToken |
| 11  | POST /api/provider/gear        | Create provider gear  | app/(dashboardGroup)/provider-dashboard/gear/\_components/CreateGearForm.tsx   | app/(dashboardGroup)/provider-dashboard/gear/\_actions/createGear.ts          | accessToken |
| 12  | PUT /api/provider/gear/:id     | Update provider gear  | app/(dashboardGroup)/provider-dashboard/gear/[id]/edit/page.tsx                | app/(dashboardGroup)/provider-dashboard/gear/\_actions/updateGear.ts          | accessToken |
| 13  | DELETE /api/provider/gear/:id  | Delete provider gear  | app/(dashboardGroup)/provider-dashboard/gear/\_components/DeleteGearButton.tsx | app/(dashboardGroup)/provider-dashboard/gear/\_actions/deleteGear.ts          | accessToken |
| 14  | GET /api/provider/orders       | Provider order list   | app/(dashboardGroup)/provider-dashboard/orders/page.tsx                        | service/getProviderOrders.ts                                                  | accessToken |
| 15  | PATCH /api/provider/orders/:id | Update order status   | app/(dashboardGroup)/provider-dashboard/orders/\_actions/updateOrderStatus.ts  | app/(dashboardGroup)/provider-dashboard/orders/\_actions/updateOrderStatus.ts | accessToken |

## Customer / Rentals & Payments

| ID  | Endpoint                  | Purpose                                             | Used by / Component                                                                                        | Service / Action                                                                   | Auth        |
| --- | ------------------------- | --------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- | ----------- |
| 16  | POST /api/rentals         | Create rental order                                 | app/(dashboardGroup)/customer-dashboard/rentals/\_components/CreateRentalForm.tsx                          | app/(dashboardGroup)/customer-dashboard/rentals/\_actions/createRental.ts          | accessToken |
| 17  | GET /api/rentals          | Get customer's rentals                              | app/(dashboardGroup)/customer-dashboard/rentals/page.tsx                                                   | service/getMyRentals.ts                                                            | accessToken |
| 18  | POST /api/payments/create | Create Stripe checkout session (returns paymentUrl) | app/(dashboardGroup)/customer-dashboard/rentals/\_actions/createCheckoutSession.ts; PayNowButton component | app/(dashboardGroup)/customer-dashboard/rentals/\_actions/createCheckoutSession.ts | accessToken |

## Reviews

| ID  | Endpoint          | Purpose                | Used by / Component                                                       | Service / Action                                                          | Auth        |
| --- | ----------------- | ---------------------- | ------------------------------------------------------------------------- | ------------------------------------------------------------------------- | ----------- |
| 19  | GET /api/reviews  | Fetch user's reviews   | app/(dashboardGroup)/customer-dashboard/reviews/page.tsx                  | service/getMyReviews.ts                                                   | accessToken |
| 20  | POST /api/reviews | Submit review for gear | app/(dashboardGroup)/customer-dashboard/rentals/\_actions/createReview.ts | app/(dashboardGroup)/customer-dashboard/rentals/\_actions/createReview.ts | accessToken |

## Admin

| ID  | Endpoint                   | Purpose                               | Used by / Component                                                      | Service / Action                                                         | Auth                |
| --- | -------------------------- | ------------------------------------- | ------------------------------------------------------------------------ | ------------------------------------------------------------------------ | ------------------- |
| 21  | GET /api/admin/users       | Admin users list / aggregated data    | app/(dashboardGroup)/admin-dashboard/users/page.tsx                      | service/getAdminDashboardData.ts                                         | accessToken (admin) |
| 22  | PATCH /api/admin/users/:id | Update user status (suspend/activate) | app/(dashboardGroup)/admin-dashboard/users/\_actions/updateUserStatus.ts | app/(dashboardGroup)/admin-dashboard/users/\_actions/updateUserStatus.ts | accessToken (admin) |
| 23  | GET /api/admin/gear        | Admin gear aggregated data            | service/getAdminDashboardData.ts                                         | service/getAdminDashboardData.ts                                         | accessToken (admin) |
| 24  | GET /api/admin/rentals     | Admin rentals aggregated data         | service/getAdminDashboardData.ts                                         | service/getAdminDashboardData.ts                                         | accessToken (admin) |

\*\*\* End Patch
