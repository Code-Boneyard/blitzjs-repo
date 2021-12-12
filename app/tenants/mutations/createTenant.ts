import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const CreateTenant = z.object({
  name: z.string(),
})

export default resolver.pipe(resolver.zod(CreateTenant), resolver.authorize(), async (input) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const tenant = await db.tenant.create({ data: input })

  return tenant
})
