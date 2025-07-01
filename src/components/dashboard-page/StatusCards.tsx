import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getUserFromCookie } from "@/lib/auth";
import { getUserStats } from "@/lib/reports";
import { BarChart3, AlertTriangle, TrendingUp } from "lucide-react";

export default async function StatsCards() {
  const user = await getUserFromCookie();
  const stats = await getUserStats(user?.id || "");

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <Card className="animate-fade-in">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Reports</CardTitle>
          <BarChart3 className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalReports}</div>
          <p className="text-xs text-muted-foreground">Lab reports uploaded</p>
        </CardContent>
      </Card>
      <Card className="animate-fade-in">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Abnormal Values</CardTitle>
          <AlertTriangle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-red-600">
            {stats.abnormalCount}
          </div>
          <p className="text-xs text-muted-foreground">Require attention</p>
        </CardContent>
      </Card>
      <Card className="animate-fade-in">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Total Parameters
          </CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalParameters}</div>
          <p className="text-xs text-muted-foreground">
            Health metrics tracked
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
