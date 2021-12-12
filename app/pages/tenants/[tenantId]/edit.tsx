import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useMutation, useParam, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getTenant from "app/tenants/queries/getTenant"
import updateTenant from "app/tenants/mutations/updateTenant"
import { TenantForm, FORM_ERROR } from "app/tenants/components/TenantForm"

export const EditTenant = () => {
  const router = useRouter()
  const tenantId = useParam("tenantId", "number")
  const [tenant, { setQueryData }] = useQuery(
    getTenant,
    { id: tenantId },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  )
  const [updateTenantMutation] = useMutation(updateTenant)

  return (
    <>
      <Head>
        <title>Edit Tenant {tenant.id}</title>
      </Head>

      <div>
        <h1>Edit Tenant {tenant.id}</h1>
        <pre>{JSON.stringify(tenant, null, 2)}</pre>

        <TenantForm
          submitText="Update Tenant"
          // TODO use a zod schema for form validation
          //  - Tip: extract mutation's schema into a shared `validations.ts` file and
          //         then import and use it here
          // schema={UpdateTenant}
          initialValues={tenant}
          onSubmit={async (values) => {
            try {
              const updated = await updateTenantMutation({
                id: tenant.id,
                ...values,
              })
              await setQueryData(updated)
              router.push(Routes.ShowTenantPage({ tenantId: updated.id }))
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

const EditTenantPage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditTenant />
      </Suspense>

      <p>
        <Link href={Routes.TenantsPage()}>
          <a>Tenants</a>
        </Link>
      </p>
    </div>
  )
}

EditTenantPage.authenticate = true
EditTenantPage.getLayout = (page) => <Layout>{page}</Layout>

export default EditTenantPage
