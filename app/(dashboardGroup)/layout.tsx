import { DashboardHeader } from "@/app/(dashboardGroup)/_components/DashboardHeader";
import { DashboardSidebar } from "@/app/(dashboardGroup)/_components/DashboardSidebar";


import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
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
    <TooltipProvider delayDuration={0}>
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
    </TooltipProvider>
  );
}