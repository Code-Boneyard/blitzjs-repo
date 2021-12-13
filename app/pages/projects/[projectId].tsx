import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useParam, BlitzPage, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getProject from "app/projects/queries/getProject"
import deleteProject from "app/projects/mutations/deleteProject"
import Image from "next/image"

export const Project = () => {
  const router = useRouter()
  const projectId = useParam("projectId", "number")
  const [deleteProjectMutation] = useMutation(deleteProject)
  const [project] = useQuery(getProject, { id: projectId })

  return (
    <>
      <Head>
        <title>{project.name}</title>
      </Head>

      <div>
        <h1 className="text-4xl text-gray-800">{project.name}</h1>
        <pre>{JSON.stringify(project, null, 2)}</pre>

        <Link href={Routes.EditProjectPage({ projectId: project.id })}>
          <button className="h-8 px-4 m-3 text-sm text-indigo-100 transition-colors duration-150 bg-black rounded-lg focus:shadow-outline hover:bg-indigo-800">
            Edit Project
          </button>
        </Link>
        <Image src={photoUrl} alt={project.name} />

        <button
          className="h-8 px-4 m-3 text-sm text-indigo-100 transition-colors duration-150 bg-black rounded-lg focus:shadow-outline hover:bg-indigo-800"
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteProjectMutation({ id: project.id })
              router.push(Routes.ProjectsPage())
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

const ShowProjectPage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <Project />
      </Suspense>
    </div>
  )
}

ShowProjectPage.authenticate = true
ShowProjectPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowProjectPage
