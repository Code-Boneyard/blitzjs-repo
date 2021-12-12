import { paginate, resolver } from "blitz"
import db, { Prisma } from "db"

interface GetCommoditiesInput
  extends Pick<Prisma.CommodityFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetCommoditiesInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const {
      items: commodities,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.commodity.count({ where }),
      query: (paginateArgs) => db.commodity.findMany({ ...paginateArgs, where, orderBy }),
    })

    return {
      commodities,
      nextPage,
      hasMore,
      count,
    }
  }
)
