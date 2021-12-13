import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const DeletePhase = z.object({
  id: z.number(),
})

export default resolver.pipe(resolver.zod(DeletePhase), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const phase = await db.phase.deleteMany({ where: { id } })

  return phase
})
