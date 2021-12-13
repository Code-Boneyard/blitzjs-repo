import { Suspense } from "react"
import { Head, Link, usePaginatedQuery, useRouter, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getSystems from "app/systems/queries/getSystems"

const ITEMS_PER_PAGE = 100

export const SystemsList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ systems, hasMore }] = usePaginatedQuery(getSystems, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div>
      <ul>
        {systems.map((system) => (
          <li key={system.id}>
            <Link href={Routes.ShowSystemPage({ systemId: system.id })}>
              <a>{system.name}</a>
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

const SystemsPage: BlitzPage = () => {
  return (
    <>
      <Head>
        <title>Systems</title>
      </Head>

      <div>
        <p>
          <Link href={Routes.NewSystemPage()}>
            <a>Create System</a>
          </Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <SystemsList />
        </Suspense>
      </div>
    </>
  )
}

SystemsPage.authenticate = true
SystemsPage.getLayout = (page) => <Layout>{page}</Layout>

export default SystemsPage
