import { DashboardHeader } from "@/app/(dashboardGroup)/_components/DashboardHeader";
import { DashboardSidebar } from "@/app/(dashboardGroup)/_components/DashboardSidebar";
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { getMe } from "@/service/getMe";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const result = await getMe();

  if (!result.success || !result.data) {
    redirect("/login");
  }

  const user = result.data;

  return (
    <SidebarProvider>
      <DashboardSidebar user={user} />

      <SidebarInset>
        <DashboardHeader user={user} />

        <main className="flex-1 bg-muted/20 p-4 sm:p-6 lg:p-8">
          <div className="mx-auto w-full max-w-7xl">
            {children}
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}