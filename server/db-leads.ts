import { eq } from "drizzle-orm";
import { leads, audits, InsertLead, InsertAudit } from "../drizzle/schema";
import { getDb } from "./db";

export async function createLead(leadData: InsertLead) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  try {
    const result = await db.insert(leads).values(leadData);
    return result;
  } catch (error) {
    console.error("[Database] Failed to create lead:", error);
    throw error;
  }
}

export async function createAudit(auditData: InsertAudit) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  try {
    const result = await db.insert(audits).values(auditData);
    return result;
  } catch (error) {
    console.error("[Database] Failed to create audit:", error);
    throw error;
  }
}

export async function getLeadById(id: number) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  try {
    const result = await db.select().from(leads).where(eq(leads.id, id)).limit(1);
    return result.length > 0 ? result[0] : null;
  } catch (error) {
    console.error("[Database] Failed to get lead:", error);
    throw error;
  }
}

export async function getAuditById(id: number) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  try {
    const result = await db.select().from(audits).where(eq(audits.id, id)).limit(1);
    return result.length > 0 ? result[0] : null;
  } catch (error) {
    console.error("[Database] Failed to get audit:", error);
    throw error;
  }
}

export async function getAllLeads() {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  try {
    return await db.select().from(leads);
  } catch (error) {
    console.error("[Database] Failed to get leads:", error);
    throw error;
  }
}

export async function getAllAudits() {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  try {
    return await db.select().from(audits);
  } catch (error) {
    console.error("[Database] Failed to get audits:", error);
    throw error;
  }
}
