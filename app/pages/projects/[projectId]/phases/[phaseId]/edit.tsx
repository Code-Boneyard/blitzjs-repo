import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useMutation, useParam, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getPhase from "app/phases/queries/getPhase"
import updatePhase from "app/phases/mutations/updatePhase"
import { PhaseForm, FORM_ERROR } from "app/phases/components/PhaseForm"

export const EditPhase = () => {
  const router = useRouter()
  const phaseId = useParam("phaseId", "number")
  const projectId = useParam("projectId", "number")
  const [phase, { setQueryData }] = useQuery(
    getPhase,
    { id: phaseId },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  )
  const [updatePhaseMutation] = useMutation(updatePhase)

  return (
    <>
      <Head>
        <title>Edit Phase {phase.id}</title>
      </Head>

      <div>
        <h1>Edit Phase {phase.id}</h1>
        <pre>{JSON.stringify(phase, null, 2)}</pre>

        <PhaseForm
          submitText="Update Phase"
          // TODO use a zod schema for form validation
          //  - Tip: extract mutation's schema into a shared `validations.ts` file and
          //         then import and use it here
          // schema={UpdatePhase}
          initialValues={phase}
          onSubmit={async (values) => {
            try {
              const updated = await updatePhaseMutation({
                id: phase.id,
                ...values,
              })
              await setQueryData(updated)
              router.push(Routes.ShowPhasePage({ projectId: projectId!, phaseId: updated.id }))
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

const EditPhasePage: BlitzPage = () => {
  const projectId = useParam("projectId", "number")

  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditPhase />
      </Suspense>

      <p>
        <Link href={Routes.PhasesPage({ projectId: projectId! })}>
          <a>Phases</a>
        </Link>
      </p>
    </div>
  )
}

EditPhasePage.authenticate = true
EditPhasePage.getLayout = (page) => <Layout>{page}</Layout>

export default EditPhasePage
