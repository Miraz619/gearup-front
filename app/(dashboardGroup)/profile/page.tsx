import { ProfileForm } from "@/app/(dashboardGroup)/_components/ProfileForm";
import { Badge } from "@/components/ui/badge";
import { getMe } from "@/service/getMe";
import { UserRound } from "lucide-react";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const result = await getMe();

  if (
    !result.success ||
    !result.data
  ) {
    redirect("/login");
  }

  const user = result.data;

  return (
    <div>
      {/* Page heading */}
      <div className="mb-8">
        <Badge variant="secondary">
          <UserRound className="mr-1 size-3.5" />
          Profile
        </Badge>

        <h2 className="mt-4 text-3xl font-bold tracking-tight">
          My Profile
        </h2>

        <p className="mt-2 text-muted-foreground">
          View and update your personal
          account information.
        </p>
      </div>

      <ProfileForm user={user} />
    </div>
  );
}