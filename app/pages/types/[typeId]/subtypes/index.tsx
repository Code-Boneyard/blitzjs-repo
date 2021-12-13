import { Suspense } from "react"
import { Head, Link, usePaginatedQuery, useRouter, useParam, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getSubtypes from "app/subtypes/queries/getSubtypes"

const ITEMS_PER_PAGE = 100

export const SubtypesList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const typeId = useParam("typeId", "number")
  const [{ subtypes, hasMore }] = usePaginatedQuery(getSubtypes, {
    where: { type: { id: typeId! } },
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div>
      <ul>
        {subtypes.map((subtype) => (
          <li key={subtype.id}>
            <Link
              href={Routes.ShowSubtypePage({
                subtypeId: subtype.id,
                typeId: "",
              })}
            >
              <a>{subtype.name}</a>
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

const SubtypesPage: BlitzPage = () => {
  const typeId = useParam("typeId", "number")

  return (
    <>
      <Head>
        <title>Subtypes</title>
      </Head>

      <div>
        <p>
          <Link href={Routes.NewSubtypePage({ typeId: typeId! })}>
            <a>Create Subtype</a>
          </Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <SubtypesList />
        </Suspense>
      </div>
    </>
  )
}

SubtypesPage.authenticate = true
SubtypesPage.getLayout = (page) => <Layout>{page}</Layout>

export default SubtypesPage
