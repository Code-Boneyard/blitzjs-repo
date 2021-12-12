import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const CreateCommodity = z.object({
  name: z.string(),
})

export default resolver.pipe(resolver.zod(CreateCommodity), resolver.authorize(), async (input) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const commodity = await db.commodity.create({ data: input })

  return commodity
})
