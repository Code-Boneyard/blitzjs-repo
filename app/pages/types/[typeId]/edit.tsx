import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useMutation, useParam, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getType from "app/types/queries/getType"
import updateType from "app/types/mutations/updateType"
import { TypeForm, FORM_ERROR } from "app/types/components/TypeForm"

export const EditType = () => {
  const router = useRouter()
  const typeId = useParam("typeId", "number")
  const [type, { setQueryData }] = useQuery(
    getType,
    { id: typeId },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  )
  const [updateTypeMutation] = useMutation(updateType)

  return (
    <>
      <Head>
        <title>Edit Type {type.id}</title>
      </Head>

      <div>
        <h1>Edit Type {type.id}</h1>
        <pre>{JSON.stringify(type, null, 2)}</pre>

        <TypeForm
          submitText="Update Type"
          // TODO use a zod schema for form validation
          //  - Tip: extract mutation's schema into a shared `validations.ts` file and
          //         then import and use it here
          // schema={UpdateType}
          initialValues={type}
          onSubmit={async (values) => {
            try {
              const updated = await updateTypeMutation({
                id: type.id,
                ...values,
              })
              await setQueryData(updated)
              router.push(Routes.ShowTypePage({ typeId: updated.id }))
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

const EditTypePage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditType />
      </Suspense>

      <p>
        <Link href={Routes.TypesPage()}>
          <a>Types</a>
        </Link>
      </p>
    </div>
  )
}

EditTypePage.authenticate = true
EditTypePage.getLayout = (page) => <Layout>{page}</Layout>

export default EditTypePage
