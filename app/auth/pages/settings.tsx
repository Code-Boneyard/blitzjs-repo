import { BlitzPage } from "blitz"
import Layout from "./../../core/layouts/Layout"

const SettingsPage: BlitzPage = () => {
  return (
    <div>
      <Layout>
        <h1 className="text-4xl text-gray-700">SETTINGS</h1>
        <p>
          Here's some additional text to go with the settings page. It's starting to look pretty
          good.
        </p>
      </Layout>
    </div>
  )
}

export default SettingsPage
