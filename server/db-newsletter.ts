import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertSubscriber, subscribers } from "../drizzle/schema";

let _db: ReturnType<typeof drizzle> | null = null;

async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function subscribeToNewsletter(subscriber: InsertSubscriber): Promise<void> {
  if (!subscriber.email) {
    throw new Error("Email is required for newsletter subscription");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot subscribe: database not available");
    return;
  }

  try {
    await db.insert(subscribers).values({
      email: subscriber.email,
      name: subscriber.name,
      source: subscriber.source || "blog",
      status: "subscribed",
    }).onDuplicateKeyUpdate({
      set: {
        status: "subscribed",
        updatedAt: new Date(),
      },
    });
  } catch (error) {
    console.error("[Database] Failed to subscribe:", error);
    throw error;
  }
}

export async function unsubscribeFromNewsletter(email: string): Promise<void> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot unsubscribe: database not available");
    return;
  }

  try {
    await db.update(subscribers)
      .set({ status: "unsubscribed" })
      .where(eq(subscribers.email, email));
  } catch (error) {
    console.error("[Database] Failed to unsubscribe:", error);
    throw error;
  }
}

export async function getSubscribers(status: "subscribed" | "unsubscribed" | "bounced" = "subscribed") {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get subscribers: database not available");
    return [];
  }

  try {
    return await db.select().from(subscribers).where(eq(subscribers.status, status));
  } catch (error) {
    console.error("[Database] Failed to get subscribers:", error);
    return [];
  }
}

export async function getSubscriberCount() {
  const db = await getDb();
  if (!db) return 0;

  try {
    const result = await db.select().from(subscribers).where(eq(subscribers.status, "subscribed"));
    return result.length;
  } catch (error) {
    console.error("[Database] Failed to get subscriber count:", error);
    return 0;
  }
}

export async function deleteSubscriber(email: string): Promise<void> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot delete subscriber: database not available");
    return;
  }

  try {
    await db.delete(subscribers).where(eq(subscribers.email, email));
  } catch (error) {
    console.error("[Database] Failed to delete subscriber:", error);
    throw error;
  }
}
