import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useMutation, useParam, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getSystem from "app/systems/queries/getSystem"
import updateSystem from "app/systems/mutations/updateSystem"
import { SystemForm, FORM_ERROR } from "app/systems/components/SystemForm"

export const EditSystem = () => {
  const router = useRouter()
  const systemId = useParam("systemId", "number")
  const [system, { setQueryData }] = useQuery(
    getSystem,
    { id: systemId },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  )
  const [updateSystemMutation] = useMutation(updateSystem)

  return (
    <>
      <Head>
        <title>Edit System {system.id}</title>
      </Head>

      <div>
        <h1>Edit System {system.id}</h1>
        <pre>{JSON.stringify(system, null, 2)}</pre>

        <SystemForm
          submitText="Update System"
          // TODO use a zod schema for form validation
          //  - Tip: extract mutation's schema into a shared `validations.ts` file and
          //         then import and use it here
          // schema={UpdateSystem}
          initialValues={system}
          onSubmit={async (values) => {
            try {
              const updated = await updateSystemMutation({
                id: system.id,
                ...values,
              })
              await setQueryData(updated)
              router.push(Routes.ShowSystemPage({ systemId: updated.id }))
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

const EditSystemPage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditSystem />
      </Suspense>

      <p>
        <Link href={Routes.SystemsPage()}>
          <a>Systems</a>
        </Link>
      </p>
    </div>
  )
}

EditSystemPage.authenticate = true
EditSystemPage.getLayout = (page) => <Layout>{page}</Layout>

export default EditSystemPage
