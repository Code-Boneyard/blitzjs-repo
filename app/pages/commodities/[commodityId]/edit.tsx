import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useMutation, useParam, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getCommodity from "app/commodities/queries/getCommodity"
import updateCommodity from "app/commodities/mutations/updateCommodity"
import { CommodityForm, FORM_ERROR } from "app/commodities/components/CommodityForm"

export const EditCommodity = () => {
  const router = useRouter()
  const commodityId = useParam("commodityId", "number")
  const [commodity, { setQueryData }] = useQuery(
    getCommodity,
    { id: commodityId },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  )
  const [updateCommodityMutation] = useMutation(updateCommodity)

  return (
    <>
      <Head>
        <title>Edit Commodity {commodity.id}</title>
      </Head>

      <div>
        <h1>Edit Commodity {commodity.id}</h1>
        <pre>{JSON.stringify(commodity, null, 2)}</pre>

        <CommodityForm
          submitText="Update Commodity"
          // TODO use a zod schema for form validation
          //  - Tip: extract mutation's schema into a shared `validations.ts` file and
          //         then import and use it here
          // schema={UpdateCommodity}
          initialValues={commodity}
          onSubmit={async (values) => {
            try {
              const updated = await updateCommodityMutation({
                id: commodity.id,
                ...values,
              })
              await setQueryData(updated)
              router.push(Routes.ShowCommodityPage({ commodityId: updated.id }))
            } catch (error: any) {
              console.error(error)
              return {
                [FORM_ERROR]: error.toString(),
              }
            }
          }}
        />
      </div>
    </>
  )
}

const EditCommodityPage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditCommodity />
      </Suspense>

      <p>
        <Link href={Routes.CommoditiesPage()}>
          <a>Commodities</a>
        </Link>
      </p>
    </div>
  )
}

EditCommodityPage.authenticate = true
EditCommodityPage.getLayout = (page) => <Layout>{page}</Layout>

export default EditCommodityPage
