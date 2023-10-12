function NextButton({ answer, dispach }) {
  if (answer === null) return null;
  return (
    <div>
      <button
        className="btn btn-ui"
        onClick={() => dispach({ type: "nextQuestion" })}
      >
        Next
      </button>
    </div>
  );
}

export default NextButton;
