import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const CreateProject = z.object({
  name: z.string(),
  previewUrl: z.string().optional(),
  status: z.string().optional(),
  category: z.string().optional()
})

export default resolver.pipe(resolver.zod(CreateProject), resolver.authorize(), async (input) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const project = await db.project.create({ data: input })

  return project
})
