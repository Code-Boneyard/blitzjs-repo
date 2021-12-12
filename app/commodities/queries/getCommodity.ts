import { resolver, NotFoundError } from "blitz"
import db from "db"
import { z } from "zod"

const GetCommodity = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.number().optional().refine(Boolean, "Required"),
})

export default resolver.pipe(resolver.zod(GetCommodity), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const commodity = await db.commodity.findFirst({ where: { id } })

  if (!commodity) throw new NotFoundError()

  return commodity
})
