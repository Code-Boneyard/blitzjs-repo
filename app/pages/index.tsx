import { Suspense } from "react"
import { Link, BlitzPage, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import logout from "app/auth/mutations/logout"
import { faCoffee } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const UserInfo = () => {
  const currentUser = useCurrentUser()
  const [logoutMutation] = useMutation(logout)

  if (currentUser) {
    return (
      <>
        <button
          className="button small"
          onClick={async () => {
            await logoutMutation()
          }}
        >
          Logout
        </button>
        <div>
          User id: <code>{currentUser.id}</code>
          <br />
          User role: <code>{currentUser.role}</code>
        </div>
      </>
    )
  } else {
    return (
      <>
        <br></br>
        <Link href={Routes.SignupPage()}>
          <a className="button small">
            <strong>Sign Up</strong>
          </a>
        </Link>
        <Link href={Routes.LoginPage()}>
          <a className="button small">
            <strong>Login</strong>
          </a>
        </Link>
      </>
    )
  }
}

const Home: BlitzPage = () => {
  return (
    <div>
      <div className="buttons" style={{ marginTop: "1rem", marginBottom: "1rem" }}>
        <Suspense fallback="Loading...">
          <UserInfo />
        </Suspense>
      </div>{" "}
      <FontAwesomeIcon icon={faCoffee} />
      <Link href="/projects">
        <button className="h-8 px-4 m-3 text-sm text-indigo-100 transition-colors duration-150 bg-black rounded-lg focus:shadow-outline hover:bg-indigo-800">
          Projects
        </button>
      </Link>
      <Link href="/tenants">
        <button className="h-8 px-4 m-3 text-sm text-indigo-100 transition-colors duration-150 bg-black rounded-lg focus:shadow-outline hover:bg-indigo-800">
          Tenants
        </button>
      </Link>
      <Link href="/roles">
        <button className="h-8 px-4 m-3 text-sm text-indigo-100 transition-colors duration-150 bg-black rounded-lg focus:shadow-outline hover:bg-indigo-800">
          Roles
        </button>
      </Link>
      <Link href="/users">
        <button className="h-8 px-4 m-3 text-sm text-indigo-100 transition-colors duration-150 bg-black rounded-lg focus:shadow-outline hover:bg-indigo-800">
          Users
        </button>
      </Link>
      <Link href="/types">
        <button className="h-8 px-4 m-3 text-sm text-indigo-100 transition-colors duration-150 bg-black rounded-lg focus:shadow-outline hover:bg-indigo-800">
          Project Types
        </button>
      </Link>
    </div>
  )
}

Home.suppressFirstRenderFlicker = true
Home.getLayout = (page) => <Layout title="Systems Cost Repository">{page}</Layout>

export default Home
