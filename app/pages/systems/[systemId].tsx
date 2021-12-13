import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useParam, BlitzPage, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getSystem from "app/systems/queries/getSystem"
import deleteSystem from "app/systems/mutations/deleteSystem"

export const System = () => {
  const router = useRouter()
  const systemId = useParam("systemId", "number")
  const [deleteSystemMutation] = useMutation(deleteSystem)
  const [system] = useQuery(getSystem, { id: systemId })

  return (
    <>
      <Head>
        <title>System {system.id}</title>
      </Head>

      <div>
        <h1>System {system.id}</h1>
        <pre>{JSON.stringify(system, null, 2)}</pre>

        <Link href={Routes.EditSystemPage({ systemId: system.id })}>
          <a>Edit</a>
        </Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteSystemMutation({ id: system.id })
              router.push(Routes.SystemsPage())
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

const ShowSystemPage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href={Routes.SystemsPage()}>
          <a>Systems</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <System />
      </Suspense>
    </div>
  )
}

ShowSystemPage.authenticate = true
ShowSystemPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowSystemPage
