import { resolver, NotFoundError } from "blitz"
import db from "db"
import { z } from "zod"

const GetIndex = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.number().optional().refine(Boolean, "Required"),
})

export default resolver.pipe(resolver.zod(GetIndex), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const index = await db.index.findFirst({ where: { id } })

  if (!index) throw new NotFoundError()

  return index
})
