import { Head, BlitzLayout } from "blitz"
import Navbar from "./../components/Navbar"

const PageLayout: BlitzLayout<{ title?: string }> = ({ title, children }) => {
  return (
    <>
      <Head>
        <title>{title || "Systems Cost Repository"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="max-w-8xl mx-auto mt-9 px-2 sm:px-6 lg:px-20">{children}</div>
    </>
  )
}

export default PageLayout
