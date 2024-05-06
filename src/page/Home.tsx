import Connection from "../components/connection/Connection";
import MenuBar from "../components/menuBar/MenuBar";
import TitleBar from "../components/titleBar/TitleBar";

function Home() {
  return (
    <>
      <TitleBar />
      <MenuBar />
      <Connection />
    </>
  );
}

export default Home;
