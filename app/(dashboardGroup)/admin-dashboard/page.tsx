// import { Badge } from "@/components/ui/badge";
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { getAdminDashboardData } from "@/service/getAdminDashboardData";
// import {
//   Boxes,
//   ClipboardList,
//   ShieldCheck,
//   Users,
// } from "lucide-react";

// export default async function AdminDashboardPage() {
//   const { users, gear, rentals } =
//     await getAdminDashboardData();

//   const stats = [
//     {
//       title: "Total Users",
//       value: users.length.toString(),
//       description: "Registered customers, providers, and admins",
//       icon: Users,
//     },
//     {
//       title: "Total Gear",
//       value: gear.length.toString(),
//       description: "Equipment listed across the platform",
//       icon: Boxes,
//     },
//     {
//       title: "Total Rentals",
//       value: rentals.length.toString(),
//       description: "Rental orders across the platform",
//       icon: ClipboardList,
//     },
//   ];

//   return (
//     <div className="space-y-8">
//       <section className="relative overflow-hidden rounded-3xl border border-primary/15 bg-gradient-to-br from-violet-100 via-blue-50 to-emerald-100 px-6 py-8 shadow-sm dark:from-violet-950/30 dark:via-blue-950/20 dark:to-emerald-950/30 sm:px-8">
//         <div className="absolute -right-16 -top-20 size-56 rounded-full bg-primary/10 blur-3xl" />
//         <div className="absolute -bottom-20 left-1/3 size-48 rounded-full bg-emerald-400/10 blur-3xl" />

//         <div className="relative">
//           <Badge className="bg-primary text-primary-foreground">
//             <ShieldCheck className="size-3.5" />
//             Admin Control Center
//           </Badge>

//           <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
//             Admin Dashboard
//           </h1>

//           <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
//             Monitor users, equipment listings, rental activity, and platform
//             operations from one dashboard.
//           </p>
//         </div>
//       </section>

//       <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
//         {stats.map((item) => {
//           const Icon = item.icon;

//           return (
//             <Card
//               key={item.title}
//               className="overflow-hidden border-primary/15 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
//             >
//               <CardHeader className="flex flex-row items-center justify-between space-y-0">
//                 <CardTitle className="text-base font-semibold">
//                   {item.title}
//                 </CardTitle>

//                 <div className="flex size-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
//                   <Icon className="size-5" />
//                 </div>
//               </CardHeader>

//               <CardContent>
//                 <p className="text-3xl font-bold">
//                   {item.value}
//                 </p>

//                 <p className="mt-2 text-sm text-muted-foreground">
//                   {item.description}
//                 </p>
//               </CardContent>
//             </Card>
//           );
//         })}
//       </section>
//     </div>
//   );
// }


import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { getAdminDashboardData } from "@/service/getAdminDashboardData";
import {
  Boxes,
  CheckCircle2,
  ClipboardList,
  DollarSign,
  ShieldCheck,
  UserCheck,
  Users,
} from "lucide-react";

function formatCurrency(value: number) {
  return value.toLocaleString("en-BD");
}

export default async function AdminDashboardPage() {
  const { users, gear, rentals } =
    await getAdminDashboardData();

  const activeUsers = users.filter(
    (user) => user.isActive,
  ).length;

  const availableGear = gear.filter(
    (item) =>
      item.isAvailable &&
      item.stock > 0,
  ).length;

  const completedRentals = rentals.filter(
    (rental) =>
      rental.status === "RETURNED",
  ).length;

  const revenue = rentals
    .filter(
      (rental) =>
        rental.payment?.status ===
        "COMPLETED",
    )
    .reduce(
      (total, rental) =>
        total +
        Number(
          rental.payment?.amount || 0,
        ),
      0,
    );

  const stats = [
    {
      title: "Total Users",
      value: users.length,
      description:
        "Customers, providers and admins",
      icon: Users,
    },
    {
      title: "Active Users",
      value: activeUsers,
      description:
        "Currently active accounts",
      icon: UserCheck,
    },
    {
      title: "Total Gear",
      value: gear.length,
      description:
        "Listed equipment items",
      icon: Boxes,
    },
    {
      title: "Available Gear",
      value: availableGear,
      description:
        "Ready for rental",
      icon: CheckCircle2,
    },
    {
      title: "Total Rentals",
      value: rentals.length,
      description:
        "All rental orders",
      icon: ClipboardList,
    },
    {
      title: "Revenue",
      value: `৳${formatCurrency(revenue)}`,
      description:
        "Completed payments",
      icon: DollarSign,
    },
  ];

  return (
    <div className="space-y-8">

      <section className="rounded-3xl border bg-card px-6 py-8 shadow-sm sm:px-8">
        <Badge variant="secondary">
          <ShieldCheck className="size-3.5" />
          Admin Control Center
        </Badge>

        <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
          Admin Dashboard
        </h1>

        <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
          Monitor users, equipment,
          rental activities and overall
          platform performance.
        </p>
      </section>


      <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">

        {stats.map((item) => {

          const Icon = item.icon;

          return (
            <Card
              key={item.title}
              className="border-border/70 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
            >

              <CardContent className="flex items-center gap-5 p-6">

                <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Icon className="size-6"/>
                </div>


                <div>
                  <p className="text-sm text-muted-foreground">
                    {item.title}
                  </p>

                  <p className="mt-1 text-3xl font-bold">
                    {item.value}
                  </p>

                  <p className="mt-1 text-xs text-muted-foreground">
                    {item.description}
                  </p>
                </div>

              </CardContent>

            </Card>
          );

        })}

      </section>


      <section className="grid gap-5 lg:grid-cols-2">

        <Card>
          <CardContent className="p-6">

            <h2 className="font-semibold">
              Platform Summary
            </h2>

            <div className="mt-5 space-y-4 text-sm">

              <div className="flex justify-between">
                <span className="text-muted-foreground">
                  Providers
                </span>

                <span className="font-semibold">
                  {
                    users.filter(
                      (u)=>
                      u.role==="PROVIDER"
                    ).length
                  }
                </span>
              </div>


              <div className="flex justify-between">
                <span className="text-muted-foreground">
                  Customers
                </span>

                <span className="font-semibold">
                  {
                    users.filter(
                      (u)=>
                      u.role==="CUSTOMER"
                    ).length
                  }
                </span>
              </div>


              <div className="flex justify-between">
                <span className="text-muted-foreground">
                  Returned Rentals
                </span>

                <span className="font-semibold">
                  {completedRentals}
                </span>
              </div>

            </div>

          </CardContent>
        </Card>


        <Card>
          <CardContent className="p-6">

            <h2 className="font-semibold">
              Platform Health
            </h2>

            <div className="mt-5 space-y-4">

              <div>
                <div className="flex justify-between text-sm">
                  <span>
                    Gear Availability
                  </span>

                  <span>
                    {availableGear}/{gear.length}
                  </span>
                </div>

                <div className="mt-2 h-2 rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-primary"
                    style={{
                      width:`${
                        gear.length
                        ?
                        (availableGear /
                        gear.length)*100
                        :
                        0
                      }%`,
                    }}
                  />
                </div>

              </div>


              <div>
                <div className="flex justify-between text-sm">
                  <span>
                    Active Users
                  </span>

                  <span>
                    {activeUsers}/{users.length}
                  </span>
                </div>

                <div className="mt-2 h-2 rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-primary"
                    style={{
                      width:`${
                        users.length
                        ?
                        (activeUsers /
                        users.length)*100
                        :
                        0
                      }%`,
                    }}
                  />
                </div>

              </div>

            </div>

          </CardContent>
        </Card>

      </section>

    </div>
  );
}