import { Link, useRouter, useMutation, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import createIndex from "app/indices/mutations/createIndex"
import { IndexForm, FORM_ERROR } from "app/indices/components/IndexForm"

const NewIndexPage: BlitzPage = () => {
  const router = useRouter()
  const [createIndexMutation] = useMutation(createIndex)

  return (
    <div>
      <h1>Create New Index</h1>

      <IndexForm
        submitText="Create Index"
        // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        // schema={CreateIndex}
        // initialValues={{}}
        onSubmit={async (values) => {
          try {
            const index = await createIndexMutation(values)
            router.push(Routes.ShowIndexPage({ indexId: index.id }))
          } catch (error: any) {
            console.error(error)
            return {
              [FORM_ERROR]: error.toString(),
            }
          }
        }}
      />

      <p>
        <Link href={Routes.IndicesPage()}>
          <a>Indices</a>
        </Link>
      </p>
    </div>
  )
}

NewIndexPage.authenticate = true
NewIndexPage.getLayout = (page) => <Layout title={"Create New Index"}>{page}</Layout>

export default NewIndexPage
