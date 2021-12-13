import { Suspense } from "react"
import { Head, Link, usePaginatedQuery, useRouter, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getTypes from "app/types/queries/getTypes"

const ITEMS_PER_PAGE = 100

export const TypesList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ types, hasMore }] = usePaginatedQuery(getTypes, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div>
      <ul>
        {types.map((type) => (
          <li key={type.id}>
            <Link href={Routes.ShowTypePage({ typeId: type.id })}>
              <a>{type.name}</a>
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

const TypesPage: BlitzPage = () => {
  return (
    <>
      <Head>
        <title>Types</title>
      </Head>

      <div>
        <p>
          <Link href={Routes.NewTypePage()}>
            <a>Create Type</a>
          </Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <TypesList />
        </Suspense>
      </div>
    </>
  )
}

TypesPage.authenticate = true
TypesPage.getLayout = (page) => <Layout>{page}</Layout>

export default TypesPage
