import { z } from "zod";
import { publicProcedure, router } from "../_core/trpc";
import { subscribeToNewsletter, unsubscribeFromNewsletter, getSubscribers, getSubscriberCount } from "../db-newsletter";
import { TRPCError } from "@trpc/server";

export const newsletterRouter = router({
  subscribe: publicProcedure
    .input(
      z.object({
        email: z.string().email("Email inválido"),
        name: z.string().optional(),
        source: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        await subscribeToNewsletter({
          email: input.email,
          name: input.name,
          source: input.source || "blog",
        });

        return {
          success: true,
          message: "Inscrição realizada com sucesso!",
        };
      } catch (error) {
        if (error instanceof Error && error.message.includes("Duplicate entry")) {
          return {
            success: true,
            message: "Você já está inscrito em nossa newsletter!",
          };
        }
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Erro ao inscrever na newsletter",
        });
      }
    }),

  unsubscribe: publicProcedure
    .input(z.object({ email: z.string().email() }))
    .mutation(async ({ input }) => {
      try {
        await unsubscribeFromNewsletter(input.email);
        return {
          success: true,
          message: "Você foi desinscrito com sucesso",
        };
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Erro ao desinscrever da newsletter",
        });
      }
    }),

  getStats: publicProcedure.query(async () => {
    try {
      const count = await getSubscriberCount();
      return {
        totalSubscribers: count,
      };
    } catch (error) {
      return {
        totalSubscribers: 0,
      };
    }
  }),

  listSubscribers: publicProcedure
    .input(z.object({ status: z.enum(["subscribed", "unsubscribed", "bounced"]).optional() }))
    .query(async ({ input }) => {
      try {
        const subs = await getSubscribers(input.status || "subscribed");
        return subs;
      } catch (error) {
        return [];
      }
    }),
});
