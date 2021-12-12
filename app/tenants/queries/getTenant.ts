import { resolver, NotFoundError } from "blitz"
import db from "db"
import { z } from "zod"

const GetTenant = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.number().optional().refine(Boolean, "Required"),
})

export default resolver.pipe(resolver.zod(GetTenant), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const tenant = await db.tenant.findFirst({ where: { id } })

  if (!tenant) throw new NotFoundError()

  return tenant
})
