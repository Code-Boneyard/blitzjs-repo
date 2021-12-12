import { Link, useRouter, useMutation, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import createCommodity from "app/commodities/mutations/createCommodity"
import { CommodityForm, FORM_ERROR } from "app/commodities/components/CommodityForm"

const NewCommodityPage: BlitzPage = () => {
  const router = useRouter()
  const [createCommodityMutation] = useMutation(createCommodity)

  return (
    <div>
      <h1>Create New Commodity</h1>

      <CommodityForm
        submitText="Create Commodity"
        // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        // schema={CreateCommodity}
        // initialValues={{}}
        onSubmit={async (values) => {
          try {
            const commodity = await createCommodityMutation(values)
            router.push(Routes.ShowCommodityPage({ commodityId: commodity.id }))
          } catch (error: any) {
            console.error(error)
            return {
              [FORM_ERROR]: error.toString(),
            }
          }
        }}
      />

      <p>
        <Link href={Routes.CommoditiesPage()}>
          <a>Commodities</a>
        </Link>
      </p>
    </div>
  )
}

NewCommodityPage.authenticate = true
NewCommodityPage.getLayout = (page) => <Layout title={"Create New Commodity"}>{page}</Layout>

export default NewCommodityPage
