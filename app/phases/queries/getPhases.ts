import { paginate, resolver } from "blitz"
import db, { Prisma } from "db"

interface GetPhasesInput
  extends Pick<Prisma.PhaseFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetPhasesInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const {
      items: phases,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.phase.count({ where }),
      query: (paginateArgs) => db.phase.findMany({ ...paginateArgs, where, orderBy }),
    })

    return {
      phases,
      nextPage,
      hasMore,
      count,
    }
  }
)
