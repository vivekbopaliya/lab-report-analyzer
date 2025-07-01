import { getUserReports } from "@/lib/reports";
import Header from "@/components/upload-page/Header";
import { getUserFromCookie } from "@/lib/auth";
import ReportsWrapper from "@/components/report-page/ReportsWrapper";
import EmptyState from "@/components/report-page/EmptyState";

export default async function ReportsPage() {
  const user = await getUserFromCookie();
  const reports = await getUserReports(user?.id || "");

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <ReportsWrapper reports={reports} />
      {reports.length === 0 && <EmptyState />}
    </div>
  );
}
