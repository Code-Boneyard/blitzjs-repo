import { Suspense } from "react"
import { Head, Link, usePaginatedQuery, useRouter, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getIndices from "app/indices/queries/getIndices"

const ITEMS_PER_PAGE = 100

export const IndicesList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ indices, hasMore }] = usePaginatedQuery(getIndices, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div>
      <ul>
        {indices.map((index) => (
          <li key={index.id}>
            <Link href={Routes.ShowIndexPage({ indexId: index.id })}>
              <a>{index.name}</a>
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

const IndicesPage: BlitzPage = () => {
  return (
    <>
      <Head>
        <title>Indices</title>
      </Head>

      <div>
        <p>
          <Link href={Routes.NewIndexPage()}>
            <a>Create Index</a>
          </Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <IndicesList />
        </Suspense>
      </div>
    </>
  )
}

IndicesPage.authenticate = true
IndicesPage.getLayout = (page) => <Layout>{page}</Layout>

export default IndicesPage
