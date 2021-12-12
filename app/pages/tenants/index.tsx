import { Suspense } from "react"
import { Head, Link, usePaginatedQuery, useRouter, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getTenants from "app/tenants/queries/getTenants"

const ITEMS_PER_PAGE = 100

export const TenantsList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ tenants, hasMore }] = usePaginatedQuery(getTenants, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div>
      <ul>
        {tenants.map((tenant) => (
          <li key={tenant.id}>
            <Link href={Routes.ShowTenantPage({ tenantId: tenant.id })}>
              <a>{tenant.name}</a>
            </Link>
          </li>
        ))}
      </ul>

      <button disabled={page === 0} onClick={goToPreviousPage}>
        Previous
      </button>
      <button disabled={!hasMore} onClick={goToNextPage}>
        Next
      </button>
    </div>
  )
}

const TenantsPage: BlitzPage = () => {
  return (
    <>
      <Head>
        <title>Tenants</title>
      </Head>

      <div>
        <p>
          <Link href={Routes.NewTenantPage()}>
            <a>Create Tenant</a>
          </Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <TenantsList />
        </Suspense>
      </div>
    </>
  )
}

TenantsPage.authenticate = true
TenantsPage.getLayout = (page) => <Layout>{page}</Layout>

export default TenantsPage
