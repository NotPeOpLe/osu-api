import { z } from "zod"

export const dateUTC = z
  .string()
  .transform((date) => date + "Z")
  .pipe(z.coerce.date())
