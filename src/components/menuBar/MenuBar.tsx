import { useNavigate } from "react-router-dom";
import "./MenuBar.css";

interface MenuBarOptionProps {
  url: string;
  text: string;
}

interface MenuDropdownProps {
  urls: string[];
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

function MenuDropdown({ urls, text }: Readonly<MenuDropdownProps>) {
  const navigate = useNavigate();

  return (
    <div className="dropdown">
      <h2 className="menubar-title">{text}</h2>
      <div className="dropdown-options">
        {urls.map((url) => {
          return (
            <h2 key={url} className="menubar-option" onClick={() => navigate("/"+url.toLowerCase())}>{url}</h2>
          );
        })}
      </div>
    </div>
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
