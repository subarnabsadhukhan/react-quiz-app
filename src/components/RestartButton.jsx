function RestartButton({ dispatch }) {
  return (
    <button
      className="btn btn-ui"
      onClick={() => dispatch({ type: "RESTART" })}
    >
      Restart Quiz
    </button>
  );
}

export default RestartButton;
