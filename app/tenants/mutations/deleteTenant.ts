import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const DeleteTenant = z.object({
  id: z.number(),
})

export default resolver.pipe(resolver.zod(DeleteTenant), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const tenant = await db.tenant.deleteMany({ where: { id } })

  return tenant
})
