import { useEffect, useReducer } from "react";
import Header from "./Header";
import Loader from "./Loader";
import Main from "./Main";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextButton from "../NextButton";
import Progress from "./Progress";
const initialState = {
  questions: [],
  //'loading' ,'error','ready' ,'active','finished'
  status: "loading",
  //current question
  index: 0,
  answer: null,
  points: 0,
};
function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };
    case "dataFailed":
      return {
        ...state,
        status: "error",
      };
    case "start":
      return {
        ...state,
        status: "active",
      };
    case "newAnswer":
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case "nextQuestion":
      return {
        ...state,
        index: state.index + 1,
        answer: null,
      };
    default:
      throw new Error("action unknown");
  }
}
export default function App() {
  //const [state, dispatch] = useReducer(reducer, initialState);
  const [{ questions, status, index, answer, points }, dispatch] = useReducer(
    reducer,
    initialState
  );
  const numQuestion = questions.length;
  const maxPossiblePoints = questions.reduce(
    (prev, curr) => prev + curr.points,
    0
  );
  useEffect(function () {
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);
  return (
    <div className="app">
      <Header />
      <Main className="main">
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen numQuestion={numQuestion} dispach={dispatch} />
        )}
        {status === "active" && (
          <>
            <Progress
              index={index}
              numQuestion={numQuestion}
              points={points}
              maxPossiblePoints={maxPossiblePoints}
              answer={answer}
            />
            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <NextButton answer={answer} dispach={dispatch} />
          </>
        )}
      </Main>
    </div>
  );
}
