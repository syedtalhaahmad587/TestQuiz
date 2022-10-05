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

  const [category, setCategory] = useState("Easy");
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
      time = 10;
      if (currentQuestionIndex === allQuestions.length - 1) {
        setShowNextButton(false);
      } else {
        // time = 10
        HandleQuestionNew();
      }
    }
  }
  const handleChange = (value) => {
    setCategory(value);
    setOpen(false);
    const Items = allQuestions.filter((current) => {
      return current.difficulty === value;
    });
    console.log(Items);
    setItem(Items);
  };

  return (
    <>
      <div className="parentExcess">
        <p className="count"></p>
        <p
          className="countLine"
          style={{
            width: (currentQuestionIndex + 1 / allQuestions.length) * 25,
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
          <button className="lg-cato" onClick={handleOpen}>
            <div className="star">
              {category == "Easy" && (
                <>
                  <span className="starYellow">
                    <AiFillStar />{" "}
                  </span>
                  <span>
                    <AiOutlineStar />
                  </span>{" "}
                  <AiOutlineStar />{" "}
                </>
              )}
              {category == "Medium" && (
                <>
                  <span className="starYellow">
                    <AiFillStar />{" "}
                  </span>
                  <span className="starYellow">
                    <AiFillStar />
                  </span>{" "}
                  <AiOutlineStar />{" "}
                </>
              )}
              {category == "Hard" && (
                <>
                  <span className="starYellow">
                    <AiFillStar />{" "}
                  </span>
                  <span className="starYellow">
                    <AiFillStar />
                  </span>
                  <span className="starYellow">
                    <AiFillStar />{" "}
                  </span>{" "}
                </>
              )}
            </div>
          </button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <div className="Modal">
                <h3>Difficulty</h3>
                <div>
                  <span className="starYellow">
                    {" "}
                    <AiFillStar />{" "}
                  </span>
                  <span>
                    <AiOutlineStar />
                  </span>{" "}
                  <AiOutlineStar />{" "}
                  <button value="Easy" onClick={() => handleChange("Easy")}>
                    Easy
                  </button>
                </div>
                <div>
                  <span className="starYellow">
                    <AiFillStar />{" "}
                  </span>{" "}
                  <span className="starYellow">
                    <AiFillStar />{" "}
                  </span>
                  <AiOutlineStar />
                  <button value="Medium" onClick={() => handleChange("Medium")}>
                    Medium
                  </button>
                </div>
                <div>
                  {" "}
                  <span className="starYellow">
                    <AiFillStar />{" "}
                  </span>
                  <span className="starYellow">
                    <AiFillStar />{" "}
                  </span>{" "}
                  <span className="starYellow">
                    <AiFillStar />{" "}
                  </span>
                  <button value="Hard" onClick={() => handleChange("Hard")}>
                    Hard
                  </button>
                </div>
              </div>
            </Box>
          </Modal>
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
          {currentOptionSelected == correctOption ? (
            <p>Correct</p>
          ) : (
            <p>Sorry</p>
          )}
          {showNextButton ? (
            <button onClick={() => HandleQuestionNew()}>Next Question</button>
          ) : null}
        </div>
        <div className="scoreText">
          <p>Score: {(score / allQuestions.length) * 75}%</p>
          <p>Max: 75%</p>
        </div>
        <div className="ScoreView">
          <p className="scoreRate"></p>
          {score ? (
            <>
              <p
                className="countScore"
                style={{
                  width: (currentQuestionIndex + 1 / allQuestions.length) * 25,
                }}
              ></p>
            </>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default QuizChild;
