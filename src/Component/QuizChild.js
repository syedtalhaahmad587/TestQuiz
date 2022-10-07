import React, { useState, useEffect } from "react";
import ReactStars from "react-rating-stars-component";
import { RiH3, RiTimerLine } from "react-icons/ri";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

import Data from "./Data.json";
import "./index.css";

const style = {
  position: "absolute",
  top: "47%",
  left: "47%",
  transform: "translate(-50%, -50%)",
  width: 200,
  bgcolor: "background.paper",
  border: "2px solid #fff",
  boxShadow: 24,
  p: 4,
  borderRadius: 3,
};

const QuizChild = () => {
  const allQuestions = Data;
  const [showSuccess, SetSuccess] = useState();
  const [correct, setCorrect] = useState();
  const [isOptionsDisabled, setIsOptionsDisabled] = useState(false);
  const [currentOptionSelected, setCurrentOptionSelected] = useState(null);
  const [correctOption, setCorrectOption] = useState(null);
  const [showNextButton, setShowNextButton] = useState(false);
  const [timer, showTimer] = useState(45);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [countQuiz, setCountQuiz] = useState(currentQuestionIndex);
  const [percentage, setPercentage] = useState(null);
  const [score, setScore] = useState(0);
  const [quizEnd, setQuizEnd] = useState(false);
  const [open, setOpen] = useState(false);
  const [Item, setItem] = useState();
  const [category , setCategory] = useState();
  const handleOpen = () => setOpen(false);
  const handleClose = () => setOpen(false);
  const ratingChanged = (newRating) => {};
  const handleInput = (value) => {
    let correct_option = allQuestions[currentQuestionIndex]["correct_answer"];
    setCurrentOptionSelected(value);
    setCorrectOption(correct_option);
    setIsOptionsDisabled(true);
    if (value == correct_option) {
      // Set Score
      setScore(score + 1);
      setCorrect(score);
    }
    setPercentage((currentQuestionIndex + 1 / allQuestions.length) * 100);
    setShowNextButton(true);
  };

  const HandleQuestionNew = () => {
    if (currentQuestionIndex == allQuestions.length - 1) {
      setQuizEnd(true);
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setCurrentOptionSelected(null);
      setCorrectOption(null);
      setIsOptionsDisabled(false);
      setShowNextButton(false);
    }
    currentQuestionIndex(currentQuestionIndex + 1);

    // Timer();
  };
  let counter;
  let time = 45;

  useEffect(() => {
    if (currentQuestionIndex !== allQuestions.length) {
      startTimer();
    }
    return () => clearInterval(counter);
  }, [currentQuestionIndex]);

  function startTimer() {
    counter = setInterval(newTimer, 1000);
  }
  function newTimer() {
    if (time >= 0) {
      showTimer(time--);
    } else {
      time = 0;
      if (currentQuestionIndex === allQuestions.length - 1) {
        setShowNextButton(false);
      } else {
        // time = 10
        HandleQuestionNew();
      }
    }
  }
  const StartQuiz = () => {
    setQuizEnd(false);
    setCurrentQuestionIndex(0);
    setScore(0);

    setCurrentOptionSelected(null);
    setCorrectOption(null);
    setIsOptionsDisabled(false);
    setShowNextButton(false);
    
  

  }
  const quizHigh = allQuestions[currentQuestionIndex]?.difficulty

  return (
    <>
    {!quizEnd  ?  
      <div className="parentExcess">
        <p className="count"></p>
        <p
          className="countLine"
          style={{
            width: (currentQuestionIndex  / allQuestions.length) * 100 + "%",
          }}
        ></p>
        <p className="entertainment">
          {allQuestions[currentQuestionIndex]?.category}
        </p>
        <div className="parentExcess__question">
          <div className="Questions">
            <h2 style={{ color: "#000", marginRight: 2 }}>
              Question {currentQuestionIndex + 1}
            </h2>
            <h2 style={{ color: "#000" }}>of {allQuestions.length}</h2>
          </div>
          <div className="Timer">
            <p>
              <RiTimerLine />
            </p>
            <p> 00:{timer} </p>
          </div>
        </div>
        <div className="modalStar">
            <div className="star">
              {quizHigh == "easy" && (
                <>
                  <span className="starYellow">
                    <AiFillStar />
                  </span>
                  <span>
                    <AiOutlineStar />
                  </span>
                  <AiOutlineStar />
                </>
              )}
              {quizHigh == "medium" && (
                <>
                  <span className="starYellow">
                    <AiFillStar />
                  </span>
                  <span className="starYellow">
                    <AiFillStar />
                  </span>
                  <AiOutlineStar />
                </>
              )}
              {quizHigh == "hard" && (
                <>
                  <span className="starYellow">
                    <AiFillStar />
                  </span>
                  <span className="starYellow">
                    <AiFillStar />
                  </span>
                  <span className="starYellow">
                    <AiFillStar />
                  </span>
                </>
              )}
            </div>
        </div>

        <div className="category">
          <p className="text">{allQuestions[currentQuestionIndex]?.question}</p>
        </div>
        <div className="BtnQuestion">
          {allQuestions[currentQuestionIndex]?.incorrect_answers.map(
            (option) => {
              return (
                <>
                  <button
                    disabled={isOptionsDisabled}
                    className={`BtbQuiz ${
                      option == correctOption
                        ? "colorSuccess"
                        : option == currentOptionSelected
                        ? "colorError"
                        : "colorSecondary"
                    } `}
                    onClick={(e) => handleInput(e.target.value)}
                    value={option}
                  >
                    {option}
                  </button>
                </>
              );
            }
          )}
        </div>
        <div className="ans">
          {showNextButton ? ( 
            <>
          {currentOptionSelected == correctOption ? (
            <p>Correct</p>
          ) : (
            <p className="errorColor" >Sorry</p>
          )}
          </>
          ) : null }
          {showNextButton ? (
            <button onClick={() => HandleQuestionNew()}>Next Question</button>
          ) : null}
        </div>
        <div className="scoreText">
          <p>Score: {(score / allQuestions.length) * 100 }%</p>
          <p>Max: 100%</p>
        </div>
        <div className="ScoreView">
          <p className="scoreRate" width={score < allQuestions.length/20 * 100  } ></p>
          {score ? (
            <>
              <p
                className="countScore"
                style={{
                  width: (score / allQuestions.length) * 100 + "%"
                }}
              ></p>
              
            </>
          ) : null}
           {/* <p   */}
        </div>
      </div>
       : <div className="parentExcess parentChid " >
        <p className="congress" >Congratulations!</p>
        <div className="scoreEqually" >
        <p className={score > allQuestions.length/20 ? "colorSuccessAnswer" : "errorColor"   } >{score}/</p>
        <p>{allQuestions.length}</p>
        </div>
        <p className="percentageLength" >{(score / allQuestions.length) * 100 }%</p>
        <button className="QuizRestart" onClick={() => StartQuiz()} >ReStart Quiz</button>
       </div> }
    </>
  );
};

export default QuizChild;
