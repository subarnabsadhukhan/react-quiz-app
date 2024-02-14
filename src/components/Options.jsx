import { useQuiz } from "../custom-hooks/useQuizContext";

function Options({ question }) {
  const { answer, dispatch } = useQuiz();
  return (
    <div className="options">
      {question.options.map((option, index) => (
        <button
          className={`btn btn-option ${answer === index ? "answer" : ""} ${
            answer !== null &&
            (index === question.correctOption ? "correct" : "wrong")
          }`}
          key={option}
          onClick={() => dispatch({ type: "NEW_ANSWER", payload: index })}
          disabled={answer !== null}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default Options;
