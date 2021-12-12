import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useParam, BlitzPage, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getIndex from "app/indices/queries/getIndex"
import deleteIndex from "app/indices/mutations/deleteIndex"

export const Index = () => {
  const router = useRouter()
  const indexId = useParam("indexId", "number")
  const [deleteIndexMutation] = useMutation(deleteIndex)
  const [index] = useQuery(getIndex, { id: indexId })

  return (
    <>
      <Head>
        <title>Index {index.id}</title>
      </Head>

      <div>
        <h1>Index {index.id}</h1>
        <pre>{JSON.stringify(index, null, 2)}</pre>

        <Link href={Routes.EditIndexPage({ indexId: index.id })}>
          <a>Edit</a>
        </Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteIndexMutation({ id: index.id })
              router.push(Routes.IndicesPage())
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

const ShowIndexPage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href={Routes.IndicesPage()}>
          <a>Indices</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Index />
      </Suspense>
    </div>
  )
}

ShowIndexPage.authenticate = true
ShowIndexPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowIndexPage
