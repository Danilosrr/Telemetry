import { useNavigate } from "react-router-dom";
import "./MenuBar.css";

interface MenuBarOptionProps {
  url: string;
  text: string;
}

function MenuBarOption({ url, text }: Readonly<MenuBarOptionProps>) {
  const navigate = useNavigate();
  return (
    <h2 className="menubar-option" onClick={() => navigate(url)}>
      {text}
    </h2>
  );
}

function MenuBar() {
  return (
    <div className="menubar">
      <MenuBarOption url="/connection" text="Connection" />
      <MenuBarOption url="/data" text="Data" />
      <MenuBarOption url="/options" text="Options" />
      <MenuBarOption url="/help" text="Help" />
    </div>
  );
}

export default MenuBar;
