import { Link, useRouter, useMutation, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import createTenant from "app/tenants/mutations/createTenant"
import { TenantForm, FORM_ERROR } from "app/tenants/components/TenantForm"

const NewTenantPage: BlitzPage = () => {
  const router = useRouter()
  const [createTenantMutation] = useMutation(createTenant)

  return (
    <div>
      <h1>Create New Tenant</h1>

      <TenantForm
        submitText="Create Tenant"
        // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        // schema={CreateTenant}
        // initialValues={{}}
        onSubmit={async (values) => {
          try {
            const tenant = await createTenantMutation(values)
            router.push(Routes.ShowTenantPage({ tenantId: tenant.id }))
          } catch (error: any) {
            console.error(error)
            return {
              [FORM_ERROR]: error.toString(),
            }
          }
        }}
      />

      <p>
        <Link href={Routes.TenantsPage()}>
          <a>Tenants</a>
        </Link>
      </p>
    </div>
  )
}

NewTenantPage.authenticate = true
NewTenantPage.getLayout = (page) => <Layout title={"Create New Tenant"}>{page}</Layout>

export default NewTenantPage
