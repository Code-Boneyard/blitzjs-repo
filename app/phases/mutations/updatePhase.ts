import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const UpdatePhase = z.object({
  id: z.number(),
  name: z.string(),
})

export default resolver.pipe(
  resolver.zod(UpdatePhase),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const phase = await db.phase.update({ where: { id }, data })

    return phase
  }
)
