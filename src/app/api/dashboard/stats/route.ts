import { NextRequest, NextResponse } from 'next/server';
import { getUserFromRequest } from '@/lib/auth';
import { getUserStats, getLatestUserParameters } from '@/lib/reports';

export async function GET(request: NextRequest) {
  try {
    const user = await getUserFromRequest(request);
    if (!user) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const [stats, latestParameters] = await Promise.all([
      getUserStats(user.id),
      getLatestUserParameters(user.id)
    ]);

    return NextResponse.json({
      stats,
      latestParameters
    });

  } catch (error) {
    console.error('Dashboard stats error:', error);
    return NextResponse.json(
      { message: 'Failed to fetch dashboard data' },
      { status: 500 }
    );
  }
}