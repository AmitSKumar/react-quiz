function StartScreen({ numQuestion, dispach }) {
  return (
    <div className="start">
      <h2>Welcome to React Quiz!</h2>
      <h3>{numQuestion} questions to test your React mastery </h3>
      <button className="btn btn-ui" onClick={() => dispach({ type: "start" })}>
        Let's Start
      </button>
    </div>
  );
}
export default StartScreen;
