import { Button } from "antd"
import { logout } from "../services/auth"
import { MenuSidebar } from "../config/MenuSidebar"
import { Outlet } from "react-router-dom"
import SidebarItem from "../components/SidebarItem"

function Layout() {
  return (
    <>
      <div className="fixed top-0 left-0 right-0 h-[60px] bg-[#0071ba] z-[100]">
        <div className="relative top-0 h-full">
          <div className="flex items-center justify-end h-full gap-4 px-4">
            {/* <div className="px-2 py-1 rounded-md text-white">{user.name}</div> */}
            <Button className="px-4 py-4" onClick={() => logout()}>Đăng xuất</Button>
          </div>
        </div>
      </div>
      <div className="h-[calc(h-screen-160px)] w-[160px] z-[100]">
        <div className="bg-white w-[160px] opacity-85 fixed top-[60px] bottom-0 left-0 bg-no-repeat py-2">
          {MenuSidebar.map((menu) => (
            <div className="flex items-center justify-center p-2" key={menu.path}>
              <SidebarItem title={menu.title} path={menu.path} />
            </div>
          ))}
        </div>
        <div className="w-[calc(100vw-177px)] mt-[60px] ml-[160px] h-[calc(h-screen-160px)]">
          <Outlet />
        </div>
      </div>
    </>
  )
}

export default Layout