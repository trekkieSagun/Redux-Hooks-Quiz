import React, { useEffect, useState } from "react";
import "./Dashboard.css";

import Questions from "../Questions/Questions";
import { useSelector, useDispatch } from "react-redux";
import {
  LOADCATEGORIES,
  LOADQUESTIONS,
  SETQUESTIONS,
  RESETALL,
  CHANGESTATE,
} from "../../redux/store/action-creator";

function Dashboard() {
  const {
    categoryList,
    questions,
    isLoading,
    category,
    difficulty,
    questionType,
    noOfQuestions,
  } = useSelector((state) => state);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(LOADCATEGORIES());
  }, [dispatch]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    dispatch(CHANGESTATE({ name, value }));
  };

  const newStart = () => {
    dispatch(RESETALL());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(LOADQUESTIONS(category, questionType, noOfQuestions, difficulty));
  };

  const handleAnswerClick = (ans, qIdx, ansIdx) => {
    let newQuestions = [...questions];
    newQuestions[qIdx].chosenAnswer = ans;
    dispatch(SETQUESTIONS(newQuestions));
  };

  return (
    <div>
      <h1>Select questions for your application</h1>
      <div className="question-generator">
        <form
          className="row gy-2 gx-3 align-items-center"
          onSubmit={handleSubmit}
        >
          <div className="col-auto">
            <h4>Categories</h4>
            <select
              className="form-select"
              name="category"
              value={category}
              onChange={handleChange}
            >
              <option defaultValue>Choose category...</option>
              {categoryList?.map((cat, index) => {
                return (
                  <option key={index} value={cat.id}>
                    {cat.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="col-auto">
            <h4>Difficulty Level</h4>
            <select
              className="form-select"
              name="difficulty"
              value={difficulty}
              onChange={handleChange}
            >
              <option defaultValue>Choose...</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
          <div className="col-auto">
            <h4>Questions Type</h4>
            <select
              className="form-select"
              value={questionType}
              name="questionType"
              onChange={handleChange}
            >
              <option defaultValue>Choose...</option>
              <option value="multiple">Multiple Choice Question</option>
              <option value="boolean">True/False</option>
            </select>
          </div>
          <div className="col-auto">
            <h4>No. of Questions</h4>
            <input
              value={noOfQuestions}
              className="form-control"
              type="number"
              name="noOfQuestions"
              onChange={handleChange}
            />
          </div>
          <div className="row-auto row-button">
            {!questions?.length > 0 && (
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            )}
          </div>
        </form>
      </div>
      {questions?.length > 0 ? (
        <div>
          <div className="btn-reload">
            <button onClick={newStart}>Start new game</button>
          </div>
        </div>
      ) : null}
      <Questions
        questions={questions}
        handleAnswerClick={handleAnswerClick}
        isLoading={isLoading}
      />
    </div>
  );
}

export default Dashboard;
