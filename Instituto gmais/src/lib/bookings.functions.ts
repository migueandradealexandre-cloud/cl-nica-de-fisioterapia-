import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";

const bookingSchema = z.object({
  fullName: z.string().min(2, "O nome deve ter pelo menos 2 caracteres"),
  email: z.string().email("E-mail inválido"),
  phone: z.string().optional(),
  service: z.string().min(1, "Selecione um serviço"),
  date: z.string().optional(),
  message: z.string().optional(),
});

export const createBooking = createServerFn({ method: "POST" })
  .inputValidator((data) => bookingSchema.parse(data))
  .handler(async ({ data }) => {
    const { error } = await supabase
      .from("bookings")
      .insert([
        {
          full_name: data.fullName,
          email: data.email,
          phone: data.phone ?? null,
          service: data.service,
          preferred_date: data.date ?? null,
          message: data.message ?? null,
        },
      ]);

    if (error) {
      console.error("Erro ao criar agendamento:", error);
      throw new Error("Falha ao processar o agendamento");
    }

    return { success: true };
  });
