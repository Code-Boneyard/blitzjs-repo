import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const CreatePhase = z.object({
  name: z.string(),
  projectId: z.number(),
})

export default resolver.pipe(resolver.zod(CreatePhase), resolver.authorize(), async (input) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const phase = await db.phase.create({ data: input })

  return phase
})
