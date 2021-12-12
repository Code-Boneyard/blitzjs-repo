import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const UpdateCommodity = z.object({
  id: z.number(),
  name: z.string(),
})

export default resolver.pipe(
  resolver.zod(UpdateCommodity),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const commodity = await db.commodity.update({ where: { id }, data })

    return commodity
  }
)
