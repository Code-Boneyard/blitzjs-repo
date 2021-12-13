import { Link, useRouter, useMutation, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import createType from "app/types/mutations/createType"
import { TypeForm, FORM_ERROR } from "app/types/components/TypeForm"

const NewTypePage: BlitzPage = () => {
  const router = useRouter()
  const [createTypeMutation] = useMutation(createType)

  return (
    <div>
      <h1>Create New Type</h1>

      <TypeForm
        submitText="Create Type"
        // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        // schema={CreateType}
        // initialValues={{}}
        onSubmit={async (values) => {
          try {
            const type = await createTypeMutation(values)
            router.push(Routes.ShowTypePage({ typeId: type.id }))
          } catch (error: any) {
            console.error(error)
            return {
              [FORM_ERROR]: error.toString(),
            }
          }
        }}
      />

      <p>
        <Link href={Routes.TypesPage()}>
          <a>Types</a>
        </Link>
      </p>
    </div>
  )
}

NewTypePage.authenticate = true
NewTypePage.getLayout = (page) => <Layout title={"Create New Type"}>{page}</Layout>

export default NewTypePage
