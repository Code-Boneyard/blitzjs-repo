import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useMutation, useParam, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getRole from "app/roles/queries/getRole"
import updateRole from "app/roles/mutations/updateRole"
import { RoleForm, FORM_ERROR } from "app/roles/components/RoleForm"

export const EditRole = () => {
  const router = useRouter()
  const roleId = useParam("roleId", "number")
  const [role, { setQueryData }] = useQuery(
    getRole,
    { id: roleId },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  )
  const [updateRoleMutation] = useMutation(updateRole)

  return (
    <>
      <Head>
        <title>Edit Role {role.id}</title>
      </Head>

      <div>
        <h1>Edit Role {role.id}</h1>
        <pre>{JSON.stringify(role, null, 2)}</pre>

        <RoleForm
          submitText="Update Role"
          // TODO use a zod schema for form validation
          //  - Tip: extract mutation's schema into a shared `validations.ts` file and
          //         then import and use it here
          // schema={UpdateRole}
          initialValues={role}
          onSubmit={async (values) => {
            try {
              const updated = await updateRoleMutation({
                id: role.id,
                ...values,
              })
              await setQueryData(updated)
              router.push(Routes.ShowRolePage({ roleId: updated.id }))
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

const EditRolePage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditRole />
      </Suspense>

      <p>
        <Link href={Routes.RolesPage()}>
          <a>Roles</a>
        </Link>
      </p>
    </div>
  )
}

EditRolePage.authenticate = true
EditRolePage.getLayout = (page) => <Layout>{page}</Layout>

export default EditRolePage
