import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useParam, BlitzPage, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getCommodity from "app/commodities/queries/getCommodity"
import deleteCommodity from "app/commodities/mutations/deleteCommodity"

export const Commodity = () => {
  const router = useRouter()
  const commodityId = useParam("commodityId", "number")
  const [deleteCommodityMutation] = useMutation(deleteCommodity)
  const [commodity] = useQuery(getCommodity, { id: commodityId })

  return (
    <>
      <Head>
        <title>Commodity {commodity.id}</title>
      </Head>

      <div>
        <h1>Commodity {commodity.id}</h1>
        <pre>{JSON.stringify(commodity, null, 2)}</pre>

        <Link href={Routes.EditCommodityPage({ commodityId: commodity.id })}>
          <a>Edit</a>
        </Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteCommodityMutation({ id: commodity.id })
              router.push(Routes.CommoditiesPage())
            }
          }}
          style={{ marginLeft: "0.5rem" }}
        >
          Delete
        </button>
      </div>
    </>
  )
}

const ShowCommodityPage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href={Routes.CommoditiesPage()}>
          <a>Commodities</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Commodity />
      </Suspense>
    </div>
  )
}

ShowCommodityPage.authenticate = true
ShowCommodityPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowCommodityPage
