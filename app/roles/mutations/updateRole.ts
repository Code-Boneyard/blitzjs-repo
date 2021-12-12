import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const UpdateRole = z.object({
  id: z.number(),
  name: z.string(),
})

export default resolver.pipe(
  resolver.zod(UpdateRole),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const role = await db.role.update({ where: { id }, data })

    return role
  }
)
