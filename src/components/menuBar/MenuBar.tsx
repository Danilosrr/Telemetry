import { Link, useNavigate } from "react-router-dom";
import { handleWindow } from "../../utils/Utils";
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

function DataDropdown({ text }: Readonly<{text:string}>) {
  const navigate = useNavigate();

  return (
    <div className="dropdown">
      <h2 className="menubar-title">{text}</h2>
      <div className="dropdown-options">
        <h2 className="menubar-option" onClick={() => navigate("/graphs")}>Graphs</h2>
        <h2 className="menubar-option" onClick={() => handleWindow("payload")}>Payload</h2>
      </div>
    </div>
  );
}

function MenuBarLink({ url, text }: Readonly<MenuBarOptionProps>) {
  return (
    <Link className="menubar-option" to={url} target="_blank">
      {text}
    </Link>
  );
}

function MenuBar() {
  return (
    <div className="menubar">
      <MenuBarOption url="/connection" text="Connection" />
      <DataDropdown text="Data" />
      <MenuBarOption url="/options" text="Options" />
      <MenuBarLink url="https://github.com/Danilosrr" text="Help" />
    </div>
  );
}

export default MenuBar;
