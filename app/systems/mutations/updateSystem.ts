import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const UpdateSystem = z.object({
  id: z.number(),
  name: z.string(),
})

export default resolver.pipe(
  resolver.zod(UpdateSystem),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const system = await db.system.update({ where: { id }, data })

    return system
  }
)
