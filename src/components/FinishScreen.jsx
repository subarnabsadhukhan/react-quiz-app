import { useQuiz } from "../custom-hooks/useQuizContext";

function FinishScreen() {
  const { maxPossiblePoints, points, highScore } = useQuiz();

  const percentage = (points / maxPossiblePoints) * 100;

  let emoji;
  if (percentage === 100) emoji = "🎖️";
  else if (percentage >= 80) emoji = "🥳";
  else if (percentage >= 60) emoji = "🤩";
  else if (percentage >= 40) emoji = "🙃";
  else if (percentage >= 20) emoji = "😔";
  else emoji = "😕";
  return (
    <>
      <p className="result">
        <span>{emoji}</span> You scored <strong>{points}</strong> out of{" "}
        {maxPossiblePoints} ({Math.ceil(percentage)}%)
      </p>
      <p className="highscore">(Highscore: {highScore} points)</p>
    </>
  );
}

export default FinishScreen;
