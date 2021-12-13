import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useParam, BlitzPage, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getSubtype from "app/subtypes/queries/getSubtype"
import deleteSubtype from "app/subtypes/mutations/deleteSubtype"

export const Subtype = () => {
  const router = useRouter()
  const subtypeId = useParam("subtypeId", "number")
  const typeId = useParam("typeId", "number")
  const [deleteSubtypeMutation] = useMutation(deleteSubtype)
  const [subtype] = useQuery(getSubtype, { id: subtypeId })

  return (
    <>
      <Head>
        <title>Subtype {subtype.id}</title>
      </Head>

      <div>
        <h1>Subtype {subtype.id}</h1>
        <pre>{JSON.stringify(subtype, null, 2)}</pre>

        <Link href={Routes.EditSubtypePage({ typeId: typeId!, subtypeId: subtype.id })}>
          <a>Edit</a>
        </Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteSubtypeMutation({ id: subtype.id })
              router.push(Routes.SubtypesPage({ typeId: typeId! }))
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

const ShowSubtypePage: BlitzPage = () => {
  const typeId = useParam("typeId", "number")

  return (
    <div>
      <p>
        <Link href={Routes.SubtypesPage({ typeId: typeId! })}>
          <a>Subtypes</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Subtype />
      </Suspense>
    </div>
  )
}

ShowSubtypePage.authenticate = true
ShowSubtypePage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowSubtypePage
