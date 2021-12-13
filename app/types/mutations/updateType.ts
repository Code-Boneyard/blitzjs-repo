import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const UpdateType = z.object({
  id: z.number(),
  name: z.string(),
})

export default resolver.pipe(
  resolver.zod(UpdateType),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const type = await db.type.update({ where: { id }, data })

    return type
  }
)
