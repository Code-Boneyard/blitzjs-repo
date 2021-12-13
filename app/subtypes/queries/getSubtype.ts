import { resolver, NotFoundError } from "blitz"
import db from "db"
import { z } from "zod"

const GetSubtype = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.number().optional().refine(Boolean, "Required"),
})

export default resolver.pipe(resolver.zod(GetSubtype), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const subtype = await db.subtype.findFirst({ where: { id } })

  if (!subtype) throw new NotFoundError()

  return subtype
})
