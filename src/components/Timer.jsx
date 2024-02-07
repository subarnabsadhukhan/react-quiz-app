import { useEffect } from "react";

function Timer({ dispatch, secondsRemaining, answer }) {
  const minutes = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;
  useEffect(() => {
    const timer = setInterval(() => {
      dispatch({ type: "SET_TIMER" });
    }, 1000);
    if (answer !== null) {
      clearInterval(timer);
      console.log(`ififi`);
    }
    return () => clearInterval(timer);
  }, [answer, dispatch]);

  return (
    <div className="timer">
      {minutes < 10 ? `0${minutes}` : minutes}:
      {seconds < 10 ? `0${seconds}` : seconds}
    </div>
  );
}

export default Timer;
