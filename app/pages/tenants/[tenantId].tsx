import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useParam, BlitzPage, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getTenant from "app/tenants/queries/getTenant"
import deleteTenant from "app/tenants/mutations/deleteTenant"

export const Tenant = () => {
  const router = useRouter()
  const tenantId = useParam("tenantId", "number")
  const [deleteTenantMutation] = useMutation(deleteTenant)
  const [tenant] = useQuery(getTenant, { id: tenantId })

  return (
    <>
      <Head>
        <title>Tenant {tenant.id}</title>
      </Head>

      <div>
        <h1>Tenant {tenant.id}</h1>
        <pre>{JSON.stringify(tenant, null, 2)}</pre>

        <Link href={Routes.EditTenantPage({ tenantId: tenant.id })}>
          <a>Edit</a>
        </Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteTenantMutation({ id: tenant.id })
              router.push(Routes.TenantsPage())
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

const ShowTenantPage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href={Routes.TenantsPage()}>
          <a>Tenants</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Tenant />
      </Suspense>
    </div>
  )
}

ShowTenantPage.authenticate = true
ShowTenantPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowTenantPage
