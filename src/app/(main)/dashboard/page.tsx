import EmptyState from "@/components/dashboard-page/EmptyState";
import StatsCards from "@/components/dashboard-page/StatusCards";
import TrendCharts from "@/components/dashboard-page/TrendCharts";
import { getUserFromCookie } from "@/lib/auth";
import {
  getLatestUserParameters,
  getUserParameterHistory,
} from "@/lib/reports";
import { TrendData } from "@/types/health-parameter";
import { generateGeneralHealthInsight } from "@/lib/openai";

export default async function Dashboard() {
  const user = await getUserFromCookie();
  if (!user) return null;

  const latestParameters = await getLatestUserParameters(user.id);

  // Generate general AI insight
  let generalInsight: string | null = null;
  // if (latestParameters.length > 0) {
  //   generalInsight = await generateGeneralHealthInsight(latestParameters);
  // }

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
      <main className="flex-grow max-w-9xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.name}!
          </h1>
          <p className="text-gray-600">
            Here's an overview of your health data and recent lab reports.
          </p>
        </div>
        {generalInsight && (
          <div className="mb-6 p-4 bg-blue-50 border-l-4 border-blue-400 rounded animate-fade-in">
            <h2 className="text-lg font-semibold text-blue-900 mb-1">
              General AI Health Insight
            </h2>
            <p className="text-blue-800 text-sm">{generalInsight}</p>
          </div>
        )}
        <StatsCards />
        <TrendCharts trendData={trendData} />
        {trendData.length === 0 && <EmptyState />}
      </main>
    </div>
  );
}
