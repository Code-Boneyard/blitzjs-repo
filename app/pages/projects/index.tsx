import { Suspense } from "react"
import { Head, Link, usePaginatedQuery, useRouter, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getProjects from "app/projects/queries/getProjects"
import { Image } from "next/image"

const ITEMS_PER_PAGE = 100

export const ProjectsList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ projects, hasMore }] = usePaginatedQuery(getProjects, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div>
      <div className="flex flex-wrap -mx-px overflow-hidden sm:-mx-1 md:-mx-2 lg:-mx-2 xl:-mx-2">
        {projects.map((project) => (
          <div
            key={project.id}
            className="my-px px-px w-1/3 overflow-hidden sm:my-1 sm:px-1 sm:w-1/2 md:my-2 md:px-2 md:w-1/2 lg:my-2 lg:px-2 lg:w-1/2 xl:my-2 xl:px-2 xl:w-1/3"
          >
            <Link href={Routes.ShowProjectPage({ projectId: project.id })}>
              <div>
                <img src={project.previewUrl} alt={project.name} />

                <a>{project.name}</a>
              </div>
            </Link>
          </div>
        ))}
      </div>
      <button
        className="h-8 px-4 m-3 text-sm text-indigo-100 transition-colors duration-150 bg-black rounded-lg focus:shadow-outline hover:bg-indigo-800"
        disabled={page === 0}
        onClick={goToPreviousPage}
      >
        Previous
      </button>
      <button
        className="h-8 px-4 m-3 text-sm text-indigo-100 transition-colors duration-150 bg-black rounded-lg focus:shadow-outline hover:bg-indigo-800"
        disabled={!hasMore}
        onClick={goToNextPage}
      >
        Next
      </button>
    </div>
  )
}

const ProjectsPage: BlitzPage = () => {
  return (
    <>
      <Head>
        <title>Projects | Systems Cost Repository</title>
      </Head>
      <div className="container">
        <h1 className="text-4xl text-gray-700">PROJECTS</h1>
      </div>
      <Link href={Routes.NewProjectPage()}>
        <button className="h-8 px-4 m-3 text-sm text-indigo-100 transition-colors duration-150 bg-black rounded-lg focus:shadow-outline hover:bg-indigo-800">
          Create Project
        </button>
      </Link>

      <div>
        <Suspense fallback={<div>Loading...</div>}>
          <ProjectsList />
        </Suspense>
      </div>
    </>
  )
}

ProjectsPage.authenticate = true
ProjectsPage.getLayout = (page) => <Layout>{page}</Layout>

export default ProjectsPage
