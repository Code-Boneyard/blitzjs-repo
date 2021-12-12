import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const DeleteIndex = z.object({
  id: z.number(),
})

export default resolver.pipe(resolver.zod(DeleteIndex), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const index = await db.index.deleteMany({ where: { id } })

  return index
})
