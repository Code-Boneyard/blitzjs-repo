import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const UpdateTenant = z.object({
  id: z.number(),
  name: z.string(),
})

export default resolver.pipe(
  resolver.zod(UpdateTenant),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const tenant = await db.tenant.update({ where: { id }, data })

    return tenant
  }
)
