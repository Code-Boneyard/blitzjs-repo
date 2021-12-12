import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const DeleteCommodity = z.object({
  id: z.number(),
})

export default resolver.pipe(
  resolver.zod(DeleteCommodity),
  resolver.authorize(),
  async ({ id }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const commodity = await db.commodity.deleteMany({ where: { id } })

    return commodity
  }
)
