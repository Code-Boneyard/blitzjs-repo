import { paginate, resolver } from "blitz"
import db, { Prisma } from "db"

interface GetTypesInput
  extends Pick<Prisma.TypeFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetTypesInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const {
      items: types,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.type.count({ where }),
      query: (paginateArgs) => db.type.findMany({ ...paginateArgs, where, orderBy }),
    })

    return {
      types,
      nextPage,
      hasMore,
      count,
    }
  }
)
