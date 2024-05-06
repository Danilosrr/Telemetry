import Connection from "../components/connection/Connection";
import ConnectionFooter from "../components/connection/ConnectionFooter";
import MenuBar from "../components/menuBar/MenuBar";
import TitleBar from "../components/titleBar/TitleBar";

function Home() {
  return (
    <>
      <TitleBar />
      <MenuBar />
      <Connection />
      <ConnectionFooter/>
    </>
  );
}

export default Home;
