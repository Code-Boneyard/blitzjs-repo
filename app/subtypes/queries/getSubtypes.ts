import { paginate, resolver } from "blitz"
import db, { Prisma } from "db"

interface GetSubtypesInput
  extends Pick<Prisma.SubtypeFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetSubtypesInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const {
      items: subtypes,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.subtype.count({ where }),
      query: (paginateArgs) => db.subtype.findMany({ ...paginateArgs, where, orderBy }),
    })

    return {
      subtypes,
      nextPage,
      hasMore,
      count,
    }
  }
)
