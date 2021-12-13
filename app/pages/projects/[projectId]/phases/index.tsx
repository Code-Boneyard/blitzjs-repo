import { Suspense } from "react"
import { Head, Link, usePaginatedQuery, useRouter, useParam, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getPhases from "app/phases/queries/getPhases"

const ITEMS_PER_PAGE = 100

export const PhasesList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const projectId = useParam("projectId", "number")
  const [{ phases, hasMore }] = usePaginatedQuery(getPhases, {
    where: { project: { id: projectId! } },
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div>
      <ul>
        {phases.map((phase) => (
          <li key={phase.id}>
            <Link
              href={Routes.ShowPhasePage({
                phaseId: phase.id,
                projectId: "",
              })}
            >
              <a>{phase.name}</a>
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

const PhasesPage: BlitzPage = () => {
  const projectId = useParam("projectId", "number")

  return (
    <>
      <Head>
        <title>Phases</title>
      </Head>

      <div>
        <p>
          <Link href={Routes.NewPhasePage({ projectId: projectId! })}>
            <a>Create Phase</a>
          </Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <PhasesList />
        </Suspense>
      </div>
    </>
  )
}

PhasesPage.authenticate = true
PhasesPage.getLayout = (page) => <Layout>{page}</Layout>

export default PhasesPage
