import { resolver, NotFoundError } from "blitz"
import db from "db"
import { z } from "zod"

const GetPhase = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.number().optional().refine(Boolean, "Required"),
})

export default resolver.pipe(resolver.zod(GetPhase), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const phase = await db.phase.findFirst({ where: { id } })

  if (!phase) throw new NotFoundError()

  return phase
})
