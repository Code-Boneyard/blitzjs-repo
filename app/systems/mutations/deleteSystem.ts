import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const DeleteSystem = z.object({
  id: z.number(),
})

export default resolver.pipe(resolver.zod(DeleteSystem), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const system = await db.system.deleteMany({ where: { id } })

  return system
})
