import { paginate, resolver } from "blitz"
import db, { Prisma } from "db"

interface GetRolesInput
  extends Pick<Prisma.RoleFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetRolesInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const {
      items: roles,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.role.count({ where }),
      query: (paginateArgs) => db.role.findMany({ ...paginateArgs, where, orderBy }),
    })

    return {
      roles,
      nextPage,
      hasMore,
      count,
    }
  }
)
