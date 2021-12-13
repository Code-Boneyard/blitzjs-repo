import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const UpdateSubtype = z.object({
  id: z.number(),
  name: z.string(),
})

export default resolver.pipe(
  resolver.zod(UpdateSubtype),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const subtype = await db.subtype.update({ where: { id }, data })

    return subtype
  }
)
