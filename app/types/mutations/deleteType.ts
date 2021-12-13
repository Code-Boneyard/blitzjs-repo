import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const DeleteType = z.object({
  id: z.number(),
})

export default resolver.pipe(resolver.zod(DeleteType), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const type = await db.type.deleteMany({ where: { id } })

  return type
})
