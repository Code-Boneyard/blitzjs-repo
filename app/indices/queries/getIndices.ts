import { paginate, resolver } from "blitz"
import db, { Prisma } from "db"

interface GetIndicesInput
  extends Pick<Prisma.IndexFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetIndicesInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const {
      items: indices,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.index.count({ where }),
      query: (paginateArgs) => db.index.findMany({ ...paginateArgs, where, orderBy }),
    })

    return {
      indices,
      nextPage,
      hasMore,
      count,
    }
  }
)
