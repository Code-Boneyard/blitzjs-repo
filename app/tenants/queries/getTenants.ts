import { paginate, resolver } from "blitz"
import db, { Prisma } from "db"

interface GetTenantsInput
  extends Pick<Prisma.TenantFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetTenantsInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const {
      items: tenants,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.tenant.count({ where }),
      query: (paginateArgs) => db.tenant.findMany({ ...paginateArgs, where, orderBy }),
    })

    return {
      tenants,
      nextPage,
      hasMore,
      count,
    }
  }
)
