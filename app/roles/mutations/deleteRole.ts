import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const DeleteRole = z.object({
  id: z.number(),
})

export default resolver.pipe(resolver.zod(DeleteRole), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const role = await db.role.deleteMany({ where: { id } })

  return role
})
