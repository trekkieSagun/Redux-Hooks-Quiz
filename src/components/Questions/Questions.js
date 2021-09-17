import React, { useState, useEffect } from "react";
import "./Questions.css";
import loading from "../loading.gif";
const Questions = (props) => {
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [clickViewResult, setClickViewResult] = useState(false);
  const [disabledBtn, setDisabledBtn] = useState(false);

  useEffect(() => {
    setClickViewResult(false);
    setDisabledBtn(false);
    setCorrectAnswers(0);
  }, [props.questions]);

  const viewResult = (e) => {
    window.scrollTo(0, 0);
    let results = [...props.questions];
    let resultsLength = 0;
    let correctAnswers = 0;
    results.map((data, index) => {
      if (data.chosenAnswer !== undefined) {
        resultsLength++;
      }
    });
    if (resultsLength !== results.length) {
      alert("Answer all questions first.");
      return;
    } else {
      results.forEach((data, index) => {
        if (data.chosenAnswer === data.correct_answer) {
          correctAnswers++;
          setCorrectAnswers(correctAnswers);
        }
      });
    }

    setClickViewResult(true);
    setDisabledBtn(true);
  };

  return (
    <div className="container">
      {props.isLoading && (
        <div className="loading">
          <img src={loading} className="loading" />
          <p>Your questions are loading</p>
        </div>
      )}
      {clickViewResult && !props.isLoading && (
        <div className="score m-3">
          <h1>Score : {correctAnswers}</h1>
        </div>
      )}

      {!props.isLoading && props.questions?.length > 0
        ? props.questions?.map((questionsData, qIdx) => {
            return (
              <div key={qIdx} className="question-box">
                <div className="question-heading">
                  <h1>{window.atob(questionsData.question)}</h1>
                </div>

                <div className="answer-buttons">
                  {questionsData.answers.map((ans, ansIdx) => {
                    return (
                      <button
                        disabled={disabledBtn}
                        key={ansIdx}
                        onClick={() =>
                          props.handleAnswerClick(ans, qIdx, ansIdx)
                        }
                        style={
                          clickViewResult &&
                          questionsData.correct_answer === ans
                            ? { backgroundColor: "green" }
                            : questionsData.correct_answer !==
                                questionsData.chosenAnswer &&
                              questionsData.chosenAnswer === ans &&
                              clickViewResult
                            ? { backgroundColor: "red" }
                            : questionsData.chosenAnswer === ans
                            ? { backgroundColor: "purple" }
                            : null
                        }
                      >
                        {window.atob(ans)}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })
        : null}
      {!props.isLoading && props.questions?.length === 0 ? (
        <p className="noQuestions">
          No Questions available. Please Choose any other category, questions
          type or number of questions{" "}
        </p>
      ) : null}

      {props.questions?.length > 0 && !props.isLoading && (
        <div className="results-btn">
          <button onClick={viewResult}>View Result</button>
        </div>
      )}
    </div>
  );
};

export default Questions;
