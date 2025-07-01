import { HealthParameter } from '@/types/health-parameter';
import { prisma } from './prisma';

export interface LabReportData {
  id: string;
  fileName: string;
  fileType: string;
  fileSize: number;
  extractedText: string | null;
  uploadedAt: Date;
  parameters: HealthParameter[];
}

export async function createLabReport(
  userId: string,
  fileName: string,
  fileType: string,
  fileSize: number,
  extractedText: string,
  parameters: HealthParameter[]
) {
  return await prisma.labReport.create({
    data: {
      fileName,
      fileType,
      fileSize,
      extractedText,
      userId,
      parameters: {
        create: parameters.map(param => ({
          parameter: param.parameter,
          value: param.value,
          unit: param.unit,
          normalRange: param.normalRange,
          isAbnormal: param.isAbnormal || false,
          userId,
        }))
      }
    },
    include: {
      parameters: true,
    }
  });
}

export async function getUserReports(userId: string): Promise<LabReportData[]> {
  const reports = await prisma.labReport.findMany({
    where: { userId },
    include: {
      parameters: true,
    },
    orderBy: {
      uploadedAt: 'desc',
    }
  });

  return reports.map(report => ({
    id: report.id,
    fileName: report.fileName,
    fileType: report.fileType,
    fileSize: report.fileSize,
    extractedText: report.extractedText,
    uploadedAt: report.uploadedAt,
    parameters: report.parameters.map(param => ({
      parameter: param.parameter,
      value: param.value,
      unit: param.unit,
      normalRange: param.normalRange,
      isAbnormal: param.isAbnormal,
    }))
  }));
}

export async function getLatestUserParameters(userId: string): Promise<HealthParameter[]> {
  const latestReport = await prisma.labReport.findFirst({
    where: { userId },
    include: {
      parameters: true,
    },
    orderBy: {
      uploadedAt: 'desc',
    }
  });

  if (!latestReport) return [];

  return latestReport.parameters.map(param => ({
    parameter: param.parameter,
    value: param.value,
    unit: param.unit,
    normalRange: param.normalRange,
    isAbnormal: param.isAbnormal,
  }));
}

export async function getUserParameterHistory(userId: string, parameterName: string) {
  const parameters = await prisma.healthParameter.findMany({
    where: {
      userId,
      parameter: parameterName,
    },
    orderBy: {
      testDate: 'asc',
    },
    take: 12, // Last 12 entries
  });

  return parameters.map(param => ({
    date: param.testDate.toISOString(),
    value: parseFloat(param.value) || 0,
  }));
}

export async function getUserStats(userId: string) {
  const [totalReports, totalParameters, abnormalCount] = await Promise.all([
    prisma.labReport.count({ where: { userId } }),
    prisma.healthParameter.count({ where: { userId } }),
    prisma.healthParameter.count({ where: { userId, isAbnormal: true } }),
  ]);

  return {
    totalReports,
    totalParameters,
    abnormalCount,
  };
}