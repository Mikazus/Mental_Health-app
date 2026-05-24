import { prisma } from "@/lib/db";
import { SeverityLevel } from "@prisma/client";

const SEVERITY_MULTIPLIER: Record<SeverityLevel, number> = {
  NORMAL: 1,
  MILD: 2,
  MODERATE: 5,
  SEVERE: 10,
  CRITICAL: 50,
};

export async function calculatePriorityScore(waitingTimeMinutes: number, severity: SeverityLevel) {
  const baseScore = waitingTimeMinutes * 1;
  const multiplier = SEVERITY_MULTIPLIER[severity];
  return baseScore * multiplier;
}

export async function addToQueue(studentId: string, severity: SeverityLevel) {
  // First check if already in queue
  const existing = await prisma.queue.findFirst({
    where: { studentId, status: "WAITING" }
  });

  if (existing) return existing;

  return await prisma.queue.create({
    data: {
      studentId,
      status: "WAITING",
      priorityScore: await calculatePriorityScore(0, severity),
    }
  });
}

export async function processQueue() {
  // Fetch active counselors under capacity
  const counselors = await prisma.counselorProfile.findMany({
    where: { isActive: true },
    include: { _count: { select: { appointments: { where: { status: "SCHEDULED" } } } } }
  });

  const availableCounselors = counselors.filter(c => c._count.appointments < c.maxCapacity);
  
  if (availableCounselors.length === 0) return;

  // Fetch top queue entries
  const topQueue = await prisma.queue.findMany({
    where: { status: "WAITING" },
    orderBy: { priorityScore: 'desc' },
    take: availableCounselors.length
  });

  for (let i = 0; i < topQueue.length; i++) {
    const queueEntry = topQueue[i];
    // Distribute sequentially. For enterprise load-balancing, find counselor with lowest active load.
    const counselor = availableCounselors[i % availableCounselors.length]; 

    await prisma.$transaction([
      prisma.queue.update({
        where: { id: queueEntry.id },
        data: { status: "ASSIGNED", assignedTo: counselor.userId }
      }),
      // Automatically create a scheduled appointment or assign the counselor
      prisma.appointment.create({
        data: {
          studentId: queueEntry.studentId,
          counselorId: counselor.id,
          status: "SCHEDULED",
          scheduledAt: new Date(Date.now() + 24 * 60 * 60 * 1000) // Scheduled for next day
        }
      })
    ]);
  }
}
