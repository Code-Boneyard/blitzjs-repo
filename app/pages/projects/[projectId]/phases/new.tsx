import { Link, useRouter, useMutation, useParam, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import createPhase from "app/phases/mutations/createPhase"
import { PhaseForm, FORM_ERROR } from "app/phases/components/PhaseForm"

const NewPhasePage: BlitzPage = () => {
  const router = useRouter()
  const projectId = useParam("projectId", "number")
  const [createPhaseMutation] = useMutation(createPhase)

  return (
    <div>
      <h1>Create New Phase</h1>

      <PhaseForm
        submitText="Create Phase"
        // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        // schema={CreatePhase}
        // initialValues={{}}
        onSubmit={async (values) => {
          try {
            const phase = await createPhaseMutation({ ...values, projectId: projectId! })
            router.push(Routes.ShowPhasePage({ projectId: projectId!, phaseId: phase.id }))
          } catch (error: any) {
            console.error(error)
            return {
              [FORM_ERROR]: error.toString(),
            }
          }
        }}
      />

      <p>
        <Link href={Routes.PhasesPage({ projectId: projectId! })}>
          <a>Phases</a>
        </Link>
      </p>
    </div>
  )
}

NewPhasePage.authenticate = true
NewPhasePage.getLayout = (page) => <Layout title={"Create New Phase"}>{page}</Layout>

export default NewPhasePage
