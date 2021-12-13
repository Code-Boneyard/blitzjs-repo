import { Link, useRouter, useMutation, useParam, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import createSubtype from "app/subtypes/mutations/createSubtype"
import { SubtypeForm, FORM_ERROR } from "app/subtypes/components/SubtypeForm"

const NewSubtypePage: BlitzPage = () => {
  const router = useRouter()
  const typeId = useParam("typeId", "number")
  const [createSubtypeMutation] = useMutation(createSubtype)

  return (
    <div>
      <h1>Create New Subtype</h1>

      <SubtypeForm
        submitText="Create Subtype"
        // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        // schema={CreateSubtype}
        // initialValues={{}}
        onSubmit={async (values) => {
          try {
            const subtype = await createSubtypeMutation({ ...values, typeId: typeId! })
            router.push(Routes.ShowSubtypePage({ typeId: typeId!, subtypeId: subtype.id }))
          } catch (error: any) {
            console.error(error)
            return {
              [FORM_ERROR]: error.toString(),
            }
          }
        }}
      />

      <p>
        <Link href={Routes.SubtypesPage({ typeId: typeId! })}>
          <a>Subtypes</a>
        </Link>
      </p>
    </div>
  )
}

NewSubtypePage.authenticate = true
NewSubtypePage.getLayout = (page) => <Layout title={"Create New Subtype"}>{page}</Layout>

export default NewSubtypePage
