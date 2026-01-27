import { eq } from "drizzle-orm";
import { leads, audits } from "../drizzle/schema";
import { getDb } from "./db";

export async function updateLeadStatus(id: number, status: "new" | "contacted" | "qualified" | "converted" | "lost") {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  try {
    await db.update(leads).set({ status }).where(eq(leads.id, id));
    return { success: true };
  } catch (error) {
    console.error("[Database] Failed to update lead status:", error);
    throw error;
  }
}

export async function updateAuditStatus(id: number, status: "pending" | "in_progress" | "completed" | "cancelled") {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  try {
    await db.update(audits).set({ status }).where(eq(audits.id, id));
    return { success: true };
  } catch (error) {
    console.error("[Database] Failed to update audit status:", error);
    throw error;
  }
}

export async function deleteLead(id: number) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  try {
    await db.delete(leads).where(eq(leads.id, id));
    return { success: true };
  } catch (error) {
    console.error("[Database] Failed to delete lead:", error);
    throw error;
  }
}

export async function deleteAudit(id: number) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  try {
    await db.delete(audits).where(eq(audits.id, id));
    return { success: true };
  } catch (error) {
    console.error("[Database] Failed to delete audit:", error);
    throw error;
  }
}

export async function getLeadStats() {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  try {
    const allLeads = await db.select().from(leads);
    const stats = {
      total: allLeads.length,
      new: allLeads.filter(l => l.status === "new").length,
      contacted: allLeads.filter(l => l.status === "contacted").length,
      qualified: allLeads.filter(l => l.status === "qualified").length,
      converted: allLeads.filter(l => l.status === "converted").length,
      lost: allLeads.filter(l => l.status === "lost").length,
      conversionRate: allLeads.length > 0 ? Math.round((allLeads.filter(l => l.status === "converted").length / allLeads.length) * 100) : 0,
    };
    return stats;
  } catch (error) {
    console.error("[Database] Failed to get lead stats:", error);
    throw error;
  }
}

export async function getAuditStats() {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  try {
    const allAudits = await db.select().from(audits);
    const stats = {
      total: allAudits.length,
      pending: allAudits.filter(a => a.status === "pending").length,
      inProgress: allAudits.filter(a => a.status === "in_progress").length,
      completed: allAudits.filter(a => a.status === "completed").length,
      cancelled: allAudits.filter(a => a.status === "cancelled").length,
      completionRate: allAudits.length > 0 ? Math.round((allAudits.filter(a => a.status === "completed").length / allAudits.length) * 100) : 0,
    };
    return stats;
  } catch (error) {
    console.error("[Database] Failed to get audit stats:", error);
    throw error;
  }
}
