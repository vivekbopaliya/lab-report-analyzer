
import EmptyState from "@/components/dashboard-page/EmptyState";
import StatsCards from "@/components/dashboard-page/StatusCards";
import TrendCharts from "@/components/dashboard-page/TrendCharts";
import { getUserFromCookie } from "@/lib/auth";
import { getLatestUserParameters, getUserParameterHistory } from "@/lib/reports";
import { TrendData } from "@/types/health-parameter";

export default async function Dashboard() {
  const user = await getUserFromCookie();
  if (!user) return null;

  const latestParameters = await getLatestUserParameters(user.id);

  const trendData: TrendData[] = await Promise.all(
    latestParameters.map(async (param) => {
      const data = await getUserParameterHistory(user.id, param.parameter);
      return {
        parameter: param.parameter,
        unit: param.unit,
        normalRange: param.normalRange,
        data,
      };
    })
  );
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.name}!
          </h1>
          <p className="text-gray-600">
            Here's an overview of your health data and recent lab reports.
          </p>
        </div>{" "}
        <StatsCards />
        <TrendCharts trendData={trendData} />
        {trendData.length === 0 && <EmptyState />}
      </main>
    </div>
  );
}
