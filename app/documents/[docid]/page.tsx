import Editor from "./editor";
import Toolbar from "./Toolbar";

async function Home() {
  return (
    <div className="min-h-screen bg-[#FAFBFD]">
      <Toolbar />
      <Editor />
    </div>
  );
}

export default Home;
