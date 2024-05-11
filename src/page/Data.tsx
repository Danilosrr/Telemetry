import ConnectionFooter from "../components/connection/ConnectionFooter";
import Graphs from "../components/graphs/Graphs";
import MenuBar from "../components/menuBar/MenuBar";
import TitleBar from "../components/titleBar/TitleBar";

function Data() {
  return (
    <>
      <TitleBar />
      <MenuBar />
      <Graphs />
      <ConnectionFooter />
    </>
  );
}

export default Data;
