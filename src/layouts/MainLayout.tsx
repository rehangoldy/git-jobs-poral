import { Layout } from "antd"
import { Outlet } from "react-router-dom"
import NavbarComponent from "../components/NavbarComponent"

const {Content} = Layout;

const MainLayout = () => {
  return (
   <Layout>
    <NavbarComponent />
    <Content style={{ minHeight: 'calc(100vh - 64px)', padding: '24px' }}>
      <Outlet />
    </Content>
   </Layout>
  )
}

export default MainLayout
