import { paginate, resolver } from "blitz"
import db, { Prisma } from "db"

interface GetSystemsInput
  extends Pick<Prisma.SystemFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetSystemsInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const {
      items: systems,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.system.count({ where }),
      query: (paginateArgs) => db.system.findMany({ ...paginateArgs, where, orderBy }),
    })

    return {
      systems,
      nextPage,
      hasMore,
      count,
    }
  }
)
