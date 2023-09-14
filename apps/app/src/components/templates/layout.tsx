import Providers from '@/providers'
import { Outlet } from 'react-router-dom'

const Layout = () => {

  return (
    <Providers>
      {/* <Nav /> */}
      <main className="flex flex-col ">
        <Outlet />
      </main>
    </Providers>
  )
}

export default Layout