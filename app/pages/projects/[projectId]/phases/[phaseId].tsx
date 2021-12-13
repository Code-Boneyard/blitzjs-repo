import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useParam, BlitzPage, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getPhase from "app/phases/queries/getPhase"
import deletePhase from "app/phases/mutations/deletePhase"

export const Phase = () => {
  const router = useRouter()
  const phaseId = useParam("phaseId", "number")
  const projectId = useParam("projectId", "number")
  const [deletePhaseMutation] = useMutation(deletePhase)
  const [phase] = useQuery(getPhase, { id: phaseId })

  return (
    <>
      <Head>
        <title>Phase {phase.id}</title>
      </Head>

      <div>
        <h1>Phase {phase.id}</h1>
        <pre>{JSON.stringify(phase, null, 2)}</pre>

        <Link href={Routes.EditPhasePage({ projectId: projectId!, phaseId: phase.id })}>
          <a>Edit</a>
        </Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deletePhaseMutation({ id: phase.id })
              router.push(Routes.PhasesPage({ projectId: projectId! }))
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

const ShowPhasePage: BlitzPage = () => {
  const projectId = useParam("projectId", "number")

  return (
    <div>
      <p>
        <Link href={Routes.PhasesPage({ projectId: projectId! })}>
          <a>Phases</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Phase />
      </Suspense>
    </div>
  )
}

ShowPhasePage.authenticate = true
ShowPhasePage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowPhasePage
