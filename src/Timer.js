import { useEffect } from "react";

function Timer({ dispatch, secondRemaining }) {
  useEffect(
    function () {
      const id = setInterval(function () {
        dispatch({ type: "tick" });
      }, 1000);
      //cleanup function
      return () => clearInterval(id);
    },
    [dispatch]
  );
  return <div className="timer">{secondRemaining}</div>;
}

export default Timer;
