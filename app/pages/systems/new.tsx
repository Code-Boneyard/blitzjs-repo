import { Link, useRouter, useMutation, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import createSystem from "app/systems/mutations/createSystem"
import { SystemForm, FORM_ERROR } from "app/systems/components/SystemForm"

const NewSystemPage: BlitzPage = () => {
  const router = useRouter()
  const [createSystemMutation] = useMutation(createSystem)

  return (
    <div>
      <h1>Create New System</h1>

      <SystemForm
        submitText="Create System"
        // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        // schema={CreateSystem}
        // initialValues={{}}
        onSubmit={async (values) => {
          try {
            const system = await createSystemMutation(values)
            router.push(Routes.ShowSystemPage({ systemId: system.id }))
          } catch (error: any) {
            console.error(error)
            return {
              [FORM_ERROR]: error.toString(),
            }
          }
        }}
      />

      <p>
        <Link href={Routes.SystemsPage()}>
          <a>Systems</a>
        </Link>
      </p>
    </div>
  )
}

NewSystemPage.authenticate = true
NewSystemPage.getLayout = (page) => <Layout title={"Create New System"}>{page}</Layout>

export default NewSystemPage
