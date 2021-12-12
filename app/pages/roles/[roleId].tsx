import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useParam, BlitzPage, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getRole from "app/roles/queries/getRole"
import deleteRole from "app/roles/mutations/deleteRole"

export const Role = () => {
  const router = useRouter()
  const roleId = useParam("roleId", "number")
  const [deleteRoleMutation] = useMutation(deleteRole)
  const [role] = useQuery(getRole, { id: roleId })

  return (
    <>
      <Head>
        <title>Role {role.id}</title>
      </Head>

      <div>
        <h1>Role {role.id}</h1>
        <pre>{JSON.stringify(role, null, 2)}</pre>

        <Link href={Routes.EditRolePage({ roleId: role.id })}>
          <a>Edit</a>
        </Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteRoleMutation({ id: role.id })
              router.push(Routes.RolesPage())
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

const ShowRolePage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href={Routes.RolesPage()}>
          <a>Roles</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Role />
      </Suspense>
    </div>
  )
}

ShowRolePage.authenticate = true
ShowRolePage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowRolePage
