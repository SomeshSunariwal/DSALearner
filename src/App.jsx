import ThreePanelLayout from "./layout/ThreePanelLayout";
import EditorPanel from "./components/EditorPanel";
import ExecPanel from "./components/ExecPanel";
import ProblemList from "./components/ProblemList";
import ProblemStatement from "./components/ProblemStatement";

export default function App() {
  return (
    <ThreePanelLayout
      left={<ProblemList />}
      middle={<ProblemStatement />}
      rightTop={<EditorPanel />}
      rightBottom={<ExecPanel />}

    />
  );
}
