import { useEffect } from "react";
import Header from "./Header";
import MainLayout from "./MainLayout";
import { useReducer } from "react";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextButton from "./NextButton";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";
import RestartButton from "./RestartButton";
import Footer from "./Footer";
import Timer from "./Timer";
const SECONDS_REMAINING = 120;
const initialState = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highScore: 0,
  secondsRemaining: SECONDS_REMAINING,
};

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_SUCCESS":
      return { ...state, status: "ready", questions: action.payload };
    case "FETCH_ERROR":
      return { ...state, status: "error" };
    case "START":
      return { ...state, status: "active" };
    case "NEW_ANSWER": {
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          question.correctOption === action.payload
            ? state.points + question.points
            : state.points,
      };
    }
    case "NEXT_QUESTION":
      return {
        ...state,
        index: state.index + 1,
        answer: null,
        status:
          state.questions.length - 1 === state.index ? "finished" : "active",
        highScore:
          state.questions.length - 1 === state.index
            ? state.points > state.highScore
              ? state.points
              : state.highScore
            : state.highScore,
        secondsRemaining: SECONDS_REMAINING,
      };
    case "RESTART":
      return {
        ...state,
        status: "ready",
        index: 0,
        points: 0,
        secondsRemaining: SECONDS_REMAINING,
      };

    case "SET_TIMER": {
      const isTimeLeft = state.secondsRemaining > 1;
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: isTimeLeft ? "active" : "finished",
        highScore: isTimeLeft
          ? state.points > state.highScore
            ? state.points
            : state.highScore
          : state.highScore,
      };
    }

    default:
      throw new Error(`Unhandled action`);
  }
}
export default function App() {
  const [
    { questions, status, index, answer, points, highScore, secondsRemaining },
    dispatch,
  ] = useReducer(reducer, initialState);
  const numQuestions = questions.length;
  const maxPossiblePoints = questions.reduce(
    (preValue, currValue) => preValue + currValue.points,
    0
  );
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`http://localhost:5000/questions`);
        const data = await response.json();
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (error) {
        dispatch({ type: "FETCH_ERROR" });
      }
    }

    fetchData();
  }, []);
  return (
    <div className="app">
      <Header />
      <MainLayout>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Progress
              index={index}
              numQuestions={numQuestions}
              points={points}
              maxPossiblePoints={maxPossiblePoints}
              answer={answer}
            />
            <Question
              question={questions.at(index)}
              dispatch={dispatch}
              answer={answer}
            />
            <Footer>
              <Timer
                secondsRemaining={secondsRemaining}
                dispatch={dispatch}
                answer={answer}
              />
              <NextButton
                dispatch={dispatch}
                answer={answer}
                numQuestions={numQuestions}
                index={index}
              />
            </Footer>
          </>
        )}
        {status === "finished" && (
          <>
            <FinishScreen
              points={points}
              maxPossiblePoints={maxPossiblePoints}
              highScore={highScore}
            />
            <RestartButton dispatch={dispatch} />
          </>
        )}
      </MainLayout>
    </div>
  );
}
