import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useMutation, useParam, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getIndex from "app/indices/queries/getIndex"
import updateIndex from "app/indices/mutations/updateIndex"
import { IndexForm, FORM_ERROR } from "app/indices/components/IndexForm"

export const EditIndex = () => {
  const router = useRouter()
  const indexId = useParam("indexId", "number")
  const [index, { setQueryData }] = useQuery(
    getIndex,
    { id: indexId },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  )
  const [updateIndexMutation] = useMutation(updateIndex)

  return (
    <>
      <Head>
        <title>Edit Index {index.id}</title>
      </Head>

      <div>
        <h1>Edit Index {index.id}</h1>
        <pre>{JSON.stringify(index, null, 2)}</pre>

        <IndexForm
          submitText="Update Index"
          // TODO use a zod schema for form validation
          //  - Tip: extract mutation's schema into a shared `validations.ts` file and
          //         then import and use it here
          // schema={UpdateIndex}
          initialValues={index}
          onSubmit={async (values) => {
            try {
              const updated = await updateIndexMutation({
                id: index.id,
                ...values,
              })
              await setQueryData(updated)
              router.push(Routes.ShowIndexPage({ indexId: updated.id }))
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

const EditIndexPage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditIndex />
      </Suspense>

      <p>
        <Link href={Routes.IndicesPage()}>
          <a>Indices</a>
        </Link>
      </p>
    </div>
  )
}

EditIndexPage.authenticate = true
EditIndexPage.getLayout = (page) => <Layout>{page}</Layout>

export default EditIndexPage
