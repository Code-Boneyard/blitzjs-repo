import { BlitzPage } from "blitz"
import Layout from "app/core/layouts/Layout"

const ProfilePage: BlitzPage = () => {
  return (
    <div>
      <Layout>
        <h1>My Profile</h1>
        <p>
          Here's some additional text to go with the profile page. It's starting to look pretty
          good.
        </p>
      </Layout>
    </div>
  )
}

export default ProfilePage
