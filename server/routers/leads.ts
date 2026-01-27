import { z } from "zod";
import { publicProcedure, router } from "../_core/trpc";
import { createLead, createAudit, getAllLeads, getAllAudits } from "../db-leads";
import { notifyOwner } from "../_core/notification";

const createLeadSchema = z.object({
  name: z.string().min(2, "Nome obrigatório"),
  email: z.string().email("Email inválido"),
  whatsapp: z.string().min(10, "WhatsApp inválido"),
  company: z.string().optional(),
  challenge: z.string().optional(),
  investment: z.number().optional(),
});

const createAuditSchema = z.object({
  name: z.string().min(2, "Nome obrigatório"),
  email: z.string().email("Email inválido"),
  whatsapp: z.string().min(10, "WhatsApp inválido"),
  company: z.string().min(2, "Empresa obrigatória"),
  website: z.string().url("URL inválida").optional(),
  currentSpend: z.number().optional(),
  mainChallenge: z.string().optional(),
});

export const leadsRouter = router({
  createLead: publicProcedure
    .input(createLeadSchema)
    .mutation(async ({ input }) => {
      try {
        const result = await createLead({
          name: input.name,
          email: input.email,
          whatsapp: input.whatsapp,
          company: input.company,
          challenge: input.challenge,
          investment: input.investment,
          source: "contact",
          status: "new",
        });

        // Notify owner via WhatsApp
        await notifyOwner({
          title: "Novo Lead Capturado",
          content: `${input.name} (${input.email}) entrou em contato. WhatsApp: ${input.whatsapp}${input.company ? ` | Empresa: ${input.company}` : ""}`,
        });

        return {
          success: true,
          message: "Lead capturado com sucesso! Entraremos em contato em breve.",
        };
      } catch (error) {
        console.error("Error creating lead:", error);
        throw new Error("Erro ao capturar lead. Tente novamente.");
      }
    }),

  createAudit: publicProcedure
    .input(createAuditSchema)
    .mutation(async ({ input }) => {
      try {
        const result = await createAudit({
          name: input.name,
          email: input.email,
          whatsapp: input.whatsapp,
          company: input.company,
          website: input.website,
          currentSpend: input.currentSpend,
          mainChallenge: input.mainChallenge,
          status: "pending",
        });

        // Notify owner via WhatsApp
        await notifyOwner({
          title: "Nova Auditoria Solicitada",
          content: `${input.name} (${input.email}) solicitou auditoria. Empresa: ${input.company} | WhatsApp: ${input.whatsapp}${input.website ? ` | Site: ${input.website}` : ""}`,
        });

        return {
          success: true,
          message: "Auditoria solicitada com sucesso! Enviaremos o relatório em breve.",
        };
      } catch (error) {
        console.error("Error creating audit:", error);
        throw new Error("Erro ao solicitar auditoria. Tente novamente.");
      }
    }),

  getLeads: publicProcedure.query(async () => {
    try {
      return await getAllLeads();
    } catch (error) {
      console.error("Error fetching leads:", error);
      throw new Error("Erro ao buscar leads");
    }
  }),

  getAudits: publicProcedure.query(async () => {
    try {
      return await getAllAudits();
    } catch (error) {
      console.error("Error fetching audits:", error);
      throw new Error("Erro ao buscar auditorias");
    }
  }),
});
