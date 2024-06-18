import ConnectionFooter from "../components/connection/ConnectionFooter";
import MenuBar from "../components/menuBar/MenuBar";
import TitleBar from "../components/titleBar/TitleBar";
import UploadData from "../components/uploadData/UploadData";

function Upload() {
  return (
    <>
      <TitleBar />
      <MenuBar />
      <UploadData />
      <ConnectionFooter />
    </>
  );
}

export default Upload;
