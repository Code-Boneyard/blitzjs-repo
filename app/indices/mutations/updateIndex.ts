import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const UpdateIndex = z.object({
  id: z.number(),
  name: z.string(),
})

export default resolver.pipe(
  resolver.zod(UpdateIndex),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const index = await db.index.update({ where: { id }, data })

    return index
  }
)
