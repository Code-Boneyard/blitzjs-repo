import { Link, useRouter, useMutation, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import createRole from "app/roles/mutations/createRole"
import { RoleForm, FORM_ERROR } from "app/roles/components/RoleForm"

const NewRolePage: BlitzPage = () => {
  const router = useRouter()
  const [createRoleMutation] = useMutation(createRole)

  return (
    <div>
      <h1>Create New Role</h1>

      <RoleForm
        submitText="Create Role"
        // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        // schema={CreateRole}
        // initialValues={{}}
        onSubmit={async (values) => {
          try {
            const role = await createRoleMutation(values)
            router.push(Routes.ShowRolePage({ roleId: role.id }))
          } catch (error: any) {
            console.error(error)
            return {
              [FORM_ERROR]: error.toString(),
            }
          }
        }}
      />

      <p>
        <Link href={Routes.RolesPage()}>
          <a>Roles</a>
        </Link>
      </p>
    </div>
  )
}

NewRolePage.authenticate = true
NewRolePage.getLayout = (page) => <Layout title={"Create New Role"}>{page}</Layout>

export default NewRolePage
