import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const CreateType = z.object({
  name: z.string(),
})

export default resolver.pipe(resolver.zod(CreateType), resolver.authorize(), async (input) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const type = await db.type.create({ data: input })

  return type
})
