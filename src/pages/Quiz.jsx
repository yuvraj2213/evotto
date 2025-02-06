import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useAuth } from "../store/auth";
import "../styles/Quiz.css";

const baseURL =
  process.env.REACT_APP_BASE_URL || "https://evotto-backend.vercel.app";

const Quiz = () => {
  const [userDetails, setUserDetails] = useState(null);
  const { authorizationToken, user } = useAuth();

  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(10);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [loading, setLoading] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);

  const [collegeName, setCollegeName] = useState("");
  const [feedback, setFeedback] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    if (user?.userData) {
      setUserDetails(user.userData);
    }
  }, [user]);

  const sportsQuestions = [
    {
      question: "Who won the FIFA World Cup in 2018?",
      options: ["Brazil", "Germany", "France", "Argentina"],
      answer: "France",
    },
    {
      question: "How many players are there in a basketball team?",
      options: ["5", "7", "11", "6"],
      answer: "5",
    },
    {
      question: "Which country hosts the Wimbledon tennis tournament?",
      options: ["USA", "France", "UK", "Australia"],
      answer: "UK",
    },
    {
      question: "What is the national sport of Canada?",
      options: ["Hockey", "Baseball", "Soccer", "Cricket"],
      answer: "Hockey",
    },
    {
      question: "Who has won the most Grand Slam titles in men's tennis?",
      options: [
        "Roger Federer",
        "Novak Djokovic",
        "Rafael Nadal",
        "Pete Sampras",
      ],
      answer: "Novak Djokovic",
    },
    {
      question: "How long is an Olympic swimming pool?",
      options: ["25m", "50m", "100m", "75m"],
      answer: "50m",
    },
    {
      question: "Which team won the first IPL tournament?",
      options: ["CSK", "MI", "RR", "RCB"],
      answer: "RR",
    },
    {
      question: "Who is known as the 'God of Cricket'?",
      options: ["Virat Kohli", "MS Dhoni", "Sachin Tendulkar", "Ricky Ponting"],
      answer: "Sachin Tendulkar",
    },
    {
      question: "Which country has won the most FIFA World Cups?",
      options: ["Germany", "Italy", "Brazil", "Argentina"],
      answer: "Brazil",
    },
    {
      question: "How many points is a touchdown worth in American football?",
      options: ["3", "5", "6", "7"],
      answer: "6",
    },
  ];

  useEffect(() => {
    if (quizStarted) {
      const shuffledQuestions = [...sportsQuestions]
        .sort(() => Math.random() - 0.5)
        .slice(0, 10);
      setQuestions(shuffledQuestions);
      setCurrentQuestion(0);
      setScore(0);
      setTimer(10);
      setQuizCompleted(false);
      setSelectedOption(null);
    }
  }, [quizStarted]);

  useEffect(() => {
    if (quizStarted && timer > 0 && !quizCompleted) {
      const countdown = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(countdown);
    } else if (quizStarted && timer === 0) {
      handleNextQuestion();
    }
  }, [timer, quizStarted, quizCompleted]);

  const handleAnswerSelection = (option) => {
    setSelectedOption(option);
    if (option === questions[currentQuestion].answer) {
      setScore((prevScore) => prevScore + 1);
    }
    setTimeout(() => handleNextQuestion(), 1000);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prevQuestion) => prevQuestion + 1);
      setTimer(10);
      setSelectedOption(null);
    } else {
      handleQuizCompletion();
    }
  };

  const generateCoupon = () => {
    if (score >= 8) return "GOLD50 - 50% OFF";
    if (score >= 5) return "SILVER30 - 30% OFF";
    return "BRONZE10 - 10% OFF";
  };

  const handleQuizCompletion = async () => {
    setQuizCompleted(true);
    if (!userDetails) return;

    const quizData = {
      name: userDetails.name,
      email: userDetails.email,
      phone: userDetails.phone,
      score,
      collegeName: collegeName || "",
      feedback,
    };

    setLoading(true);
    try {
      const response = await fetch(`${baseURL}/api/quiz/addResult`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(quizData),
      });
      await response.json();
    } catch (error) {
      console.error("Error saving quiz result:", error);
    }
    setLoading(false);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!feedback.trim()) return alert("Feedback is required!");
    setFormSubmitted(true);
  };

  return (
    <>
      <Navbar />
      <section className="quiz-container">
        {!formSubmitted ? (
          <form className="quiz-form" onSubmit={handleFormSubmit}>
            <h2>Fill Form & Start The Quiz</h2>
            <label>
              College Name:
              <input
                className="quiz-input"
                type="text"
                value={collegeName}
                onChange={(e) => setCollegeName(e.target.value)}
              />
            </label>
            <label>
              Feedback:
              <textarea
                className="quiz-input"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                required
              ></textarea>
            </label>
            <button className="start-quiz-btn" type="submit">
              Submit & Start Quiz
            </button>
          </form>
        ) : !quizStarted ? (
          <button
            className="start-quiz-btn"
            onClick={() => setQuizStarted(true)}
          >
            Start Quiz
          </button>
        ) : !quizCompleted ? (
          questions.length > 0 && (
            <div className="quiz-box">
              <h2>
                Question {currentQuestion + 1} / {questions.length}
              </h2>
              <h3>{questions[currentQuestion].question}</h3>
              <div className="options">
                {questions[currentQuestion].options.map((option, index) => (
                  <button
                    key={index}
                    className={`option-btn ${
                      selectedOption === option ? "selected" : ""
                    }`}
                    onClick={() => handleAnswerSelection(option)}
                    disabled={selectedOption !== null}
                  >
                    {option}
                  </button>
                ))}
              </div>
              <p>Time Left: {timer} seconds</p>
            </div>
          )
        ) : (
          <div className="quiz-results">
            <h2>Quiz Completed!</h2>
            <p>
              Your Score: {score} / {questions.length}
            </p>
            <h3>Coupon Code: {generateCoupon()}</h3>
          </div>
        )}
      </section>
    </>
  );
};

export default Quiz;
