import { useQuiz } from "../custom-hooks/useQuizContext";

function RestartButton() {
  const { dispatch } = useQuiz();
  return (
    <button
      className="btn btn-ui"
      onClick={() => dispatch({ type: "RESTART" })}
    >
      Restart Quiz
    </button>
  );
}

export default RestartButton;
