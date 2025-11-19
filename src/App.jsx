import ThreePanelLayout from "./layout/ThreePanelLayout";
import EditorPanel from "./components/EditorPanel";
import ExecPanel from "./components/ExecPanel";

export default function App() {
  return (
    <ThreePanelLayout
      left={<div>Problem List</div>}
      middle={<div>Problem Statement</div>}
      rightTop={<EditorPanel />}
      rightBottom={<ExecPanel />}

    />
  );
}
