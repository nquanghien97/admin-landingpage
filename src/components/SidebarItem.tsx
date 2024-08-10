import { Button } from "antd";
import { Link, useLocation } from "react-router-dom";

interface SidebarItemProps {
  title: string;
  path: string;
}

function SidebarItem(props: SidebarItemProps) {
  const location = useLocation();
  const { title, path } = props;
  const activePath = location.pathname === path ? 'normal' : 'info'
  return (
    <div className="w-[140px] ">
      <Link to={path}>
        <Button
          color={activePath}
          className="text-white py-6 text-sm drop-shadow-[1px_2px_rgba(0,0,0,0.4)] w-full"
          type="primary"
        >
          {title}
        </Button>
      </Link>
    </div>
  )
}

export default SidebarItem;