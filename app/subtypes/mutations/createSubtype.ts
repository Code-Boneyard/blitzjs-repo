import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const CreateSubtype = z.object({
  name: z.string(),
  typeId: z.number(),
})

export default resolver.pipe(resolver.zod(CreateSubtype), resolver.authorize(), async (input) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const subtype = await db.subtype.create({ data: input })

  return subtype
})
