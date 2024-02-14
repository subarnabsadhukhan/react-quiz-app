import { useQuiz } from "../custom-hooks/useQuizContext";

function NextButton() {
  const { questions, index, answer, dispatch } = useQuiz();
  const numQuestions = questions.length;
  if (answer === null) return null;
  return (
    <button
      className="btn btn-ui"
      onClick={() => dispatch({ type: "NEXT_QUESTION" })}
    >
      {numQuestions - 1 === index ? "Finish" : "Next"}
    </button>
  );
}

export default NextButton;
