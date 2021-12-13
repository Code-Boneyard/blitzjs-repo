import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useMutation, useParam, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getSubtype from "app/subtypes/queries/getSubtype"
import updateSubtype from "app/subtypes/mutations/updateSubtype"
import { SubtypeForm, FORM_ERROR } from "app/subtypes/components/SubtypeForm"

export const EditSubtype = () => {
  const router = useRouter()
  const subtypeId = useParam("subtypeId", "number")
  const typeId = useParam("typeId", "number")
  const [subtype, { setQueryData }] = useQuery(
    getSubtype,
    { id: subtypeId },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  )
  const [updateSubtypeMutation] = useMutation(updateSubtype)

  return (
    <>
      <Head>
        <title>Edit Subtype {subtype.id}</title>
      </Head>

      <div>
        <h1>Edit Subtype {subtype.id}</h1>
        <pre>{JSON.stringify(subtype, null, 2)}</pre>

        <SubtypeForm
          submitText="Update Subtype"
          // TODO use a zod schema for form validation
          //  - Tip: extract mutation's schema into a shared `validations.ts` file and
          //         then import and use it here
          // schema={UpdateSubtype}
          initialValues={subtype}
          onSubmit={async (values) => {
            try {
              const updated = await updateSubtypeMutation({
                id: subtype.id,
                ...values,
              })
              await setQueryData(updated)
              router.push(Routes.ShowSubtypePage({ typeId: typeId!, subtypeId: updated.id }))
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

const EditSubtypePage: BlitzPage = () => {
  const typeId = useParam("typeId", "number")

  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditSubtype />
      </Suspense>

      <p>
        <Link href={Routes.SubtypesPage({ typeId: typeId! })}>
          <a>Subtypes</a>
        </Link>
      </p>
    </div>
  )
}

EditSubtypePage.authenticate = true
EditSubtypePage.getLayout = (page) => <Layout>{page}</Layout>

export default EditSubtypePage
