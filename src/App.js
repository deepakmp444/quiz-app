import { Routes, Route } from "react-router-dom";
import CreateQuiz from "./pages/CreateQuiz/CreateQuiz";
import Home from "./pages/Home/Home";
import PageNotFound from "./pages/PageNotFound";
import Quiz from "./pages/Quiz/Quiz";
import QuizById from "./pages/Quiz/QuizById";
import CreateQuizContextProvider from "./context/CreateQuizContext";
import QuizLink from "./pages/CreateQuiz/QuizLink";
import { LinkQuizContextProvider } from "./context/LinkQuizContext";
import Result from "./pages/Quiz/Result";
import ResultByID from "./pages/Quiz/ResultByID";
function App() {
  return (
    <div>
      <LinkQuizContextProvider>
        <CreateQuizContextProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="create-quiz" element={<CreateQuiz />} />
            <Route path="quiz" element={<Quiz />}>
              <Route path=":id" element={<QuizById />} />
            </Route>
            <Route path="link" element={<QuizLink />} />
            <Route path="result" element={<Result />}>
              <Route path=":id" element={<ResultByID />} />
            </Route>
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </CreateQuizContextProvider>
      </LinkQuizContextProvider>
    </div>
  );
}

export default App;
