import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const CreateSystem = z.object({
  name: z.string(),
})

export default resolver.pipe(resolver.zod(CreateSystem), resolver.authorize(), async (input) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const system = await db.system.create({ data: input })

  return system
})
