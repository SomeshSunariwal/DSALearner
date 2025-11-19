import ThreePanelLayout from "./layout/ThreePanelLayout";
import EditorPanel from "./components/EditorPanel";

export default function App() {
  return (
    <ThreePanelLayout
      left={<div>Problem List</div>}
      middle={<div>Problem Statement</div>}
      right={<EditorPanel />}   // <---- Editor goes here
    />
  );
}
