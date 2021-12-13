import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useParam, BlitzPage, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getType from "app/types/queries/getType"
import deleteType from "app/types/mutations/deleteType"

export const Type = () => {
  const router = useRouter()
  const typeId = useParam("typeId", "number")
  const [deleteTypeMutation] = useMutation(deleteType)
  const [type] = useQuery(getType, { id: typeId })

  return (
    <>
      <Head>
        <title>Type {type.id}</title>
      </Head>

      <div>
        <h1>Type {type.id}</h1>
        <pre>{JSON.stringify(type, null, 2)}</pre>

        <Link href={Routes.EditTypePage({ typeId: type.id })}>
          <a>Edit</a>
        </Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteTypeMutation({ id: type.id })
              router.push(Routes.TypesPage())
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

const ShowTypePage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href={Routes.TypesPage()}>
          <a>Types</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Type />
      </Suspense>
    </div>
  )
}

ShowTypePage.authenticate = true
ShowTypePage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowTypePage
