import { Suspense } from "react"
import { Head, Link, usePaginatedQuery, useRouter, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getCommodities from "app/commodities/queries/getCommodities"

const ITEMS_PER_PAGE = 100

export const CommoditiesList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ commodities, hasMore }] = usePaginatedQuery(getCommodities, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div>
      <ul>
        {commodities.map((commodity) => (
          <li key={commodity.id}>
            <Link href={Routes.ShowCommodityPage({ commodityId: commodity.id })}>
              <a>{commodity.name}</a>
            </Link>
          </li>
        ))}
      </ul>

      <button disabled={page === 0} onClick={goToPreviousPage}>
        Previous
      </button>
      <button disabled={!hasMore} onClick={goToNextPage}>
        Next
      </button>
    </div>
  )
}

const CommoditiesPage: BlitzPage = () => {
  return (
    <>
      <Head>
        <title>Commodities</title>
      </Head>

      <div>
        <p>
          <Link href={Routes.NewCommodityPage()}>
            <a>Create Commodity</a>
          </Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <CommoditiesList />
        </Suspense>
      </div>
    </>
  )
}

CommoditiesPage.authenticate = true
CommoditiesPage.getLayout = (page) => <Layout>{page}</Layout>

export default CommoditiesPage
