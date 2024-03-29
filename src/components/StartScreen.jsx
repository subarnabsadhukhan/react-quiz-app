import { useQuiz } from "../custom-hooks/useQuizContext";

function StartScreen() {
  const { dispatch, numQuestions } = useQuiz();

  return (
    <div className="start">
      <h2>Welcome to The React Quiz!</h2>
      <h3>{numQuestions} questions to test your React Mastery</h3>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "START" })}
      >
        Let&apos;s Start
      </button>
    </div>
  );
}

export default StartScreen;
