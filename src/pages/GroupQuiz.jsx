import React, { useState, useEffect } from "react";
import { AlertCircle, CheckCircle2, Users, Award, Brain } from "lucide-react";
import _ from "lodash";
import { defaultQuestions } from "../config/quizQuestions";

// UI Components
const Card = ({ children, className = "" }) => (
  <div className={`bg-white rounded-lg shadow p-6 ${className}`}>
    {children}
  </div>
);

const Button = ({
  children,
  onClick,
  disabled,
  variant = "default",
  className = "",
}) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`px-4 py-2 rounded-md transition-colors
      ${
        variant === "outline"
          ? "border border-gray-200 hover:bg-gray-50"
          : "bg-blue-500 text-white hover:bg-blue-600"
      } 
      disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
  >
    {children}
  </button>
);

const Input = ({ value, onChange, placeholder, maxLength, className = "" }) => (
  <input
    type="text"
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    maxLength={maxLength}
    className={`px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
  />
);

const Textarea = ({ value, onChange, className = "" }) => (
  <textarea
    value={value}
    onChange={onChange}
    className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
  />
);

const Timer = ({ seconds, isSubmitted }) => {
  const percentage = (seconds / 30) * 100;
  const color =
    percentage > 60
      ? "bg-green-500"
      : percentage > 30
      ? "bg-yellow-500"
      : "bg-red-500";

  return (
    <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
      <div
        className={`h-full rounded-full transition-all duration-1000 ${color}`}
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
};

// Quiz Components
const Rules = () => (
  <div className="space-y-6">
    <div className="text-center mb-8">
      <h2 className="text-2xl font-bold mb-2">Welcome to Group Quiz!</h2>
      <p className="text-gray-600">
        A competitive multiplayer quiz game with betting mechanics
      </p>
    </div>

    {[
      {
        icon: <Users className="w-6 h-6 text-blue-600 mt-1" />,
        title: "Getting Started",
        color: "blue",
        items: [
          "Need a host to guide the game",
          "Host reads questions and manages rounds",
          "Play with 2-10 players",
          "Random order in first round",
          "Player order follows scores in later rounds",
        ],
      },
      {
        icon: <Brain className="w-6 h-6 text-green-600 mt-1" />,
        title: "Gameplay",
        color: "green",
        items: [
          "Host reads multiple-choice questions",
          "Each player has 30 seconds to answer",
          "Tell your answer to the host",
          "Players at 0 or lowest score answer directly",
          "Others must bet points before answering",
        ],
      },
      {
        icon: <Award className="w-6 h-6 text-purple-600 mt-1" />,
        title: "Scoring",
        color: "purple",
        items: [
          "Lowest/0 score: Get 0-10 points based on answer",
          "Others: Win double your bet for correct answer",
          "Wrong answers lose your bet",
          "Scores add up each round",
          "Highest total score wins",
        ],
      },
    ].map(({ icon, title, color, items }) => (
      <div
        key={title}
        className={`flex items-start gap-3 p-4 bg-${color}-50 rounded-lg`}
      >
        {icon}
        <div>
          <h3 className="font-semibold text-lg mb-1">{title}</h3>
          <ul className="list-disc list-inside space-y-1 text-gray-600">
            {items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    ))}
  </div>
);

const QuestionDisplay = ({
  question,
  answers,
  showDetails,
  getPlayersWithOption,
}) => (
  <div className="text-center space-y-4">
    <p className="text-3xl font-bold text-gray-800 mb-6 px-4">
      {question.question}
    </p>
    {question.options.map((option, i) => {
      const players = getPlayersWithOption(i);
      const letter = String.fromCharCode(65 + i);

      return (
        <div key={i} className="bg-gray-50 p-4 rounded-lg text-left">
          <div className="flex justify-between items-start">
            <div>
              <span className="font-bold">Option {letter}:</span> {option.text}
            </div>
            {players.length > 0 && (
              <div className="flex items-center text-sm text-gray-600">
                <CheckCircle2 className="h-4 w-4 mr-1" />
                Chosen by: {players.join(", ")}
              </div>
            )}
          </div>
          {showDetails && (
            <p className="mt-2 text-gray-600">{option.explanation}</p>
          )}
        </div>
      );
    })}
  </div>
);


const PlayerAnswers = ({
  player,
  scores,
  roundScores,
  answers,
  options,
  handleAnswer,
  isSubmitted,
  bets,
  handleBet,
}) => {
  const [pendingBet, setPendingBet] = useState(null);
  const allScores = Object.values(scores);
  const minScore = Math.min(...allScores);
  const canChooseDirectly = scores[player] === minScore || scores[player] === 0;
  const hasAnswered = answers[player] !== undefined;
  const hasBet = bets[player] !== undefined;

  return (
    <Card className="p-4">
      <div className="flex justify-between mb-2">
        <span className="font-semibold">{player}</span>
        <span className="text-sm text-gray-600">
          {scores[player]} pts
          {isSubmitted && (
            <span
              className={
                roundScores[player] >= 0 ? "text-green-600" : "text-red-600"
              }
            >
              {" "}
              {roundScores[player] >= 0 ? "+" : ""}
              {roundScores[player]}
            </span>
          )}
        </span>
      </div>

      {!canChooseDirectly && !hasBet && !isSubmitted && (
        <div className="mb-4 space-y-2">
          <div className="flex gap-2">
            <Input
              type="number"
              placeholder="Enter your bet"
              min="0"
              max={scores[player]}
              onChange={(e) => {
                const value = parseInt(e.target.value);
                if (!isNaN(value)) {
                  const bet = Math.min(Math.max(0, value), scores[player]);
                  setPendingBet(bet);
                }
              }}
              className="flex-1"
            />
            <Button
              onClick={() => {
                if (pendingBet > 0 && pendingBet <= scores[player]) {
                  handleBet(player, pendingBet);
                  setPendingBet(null);
                }
              }}
              disabled={
                !pendingBet || pendingBet <= 0 || pendingBet > scores[player]
              }
            >
              Place Bet
            </Button>
          </div>
          <div className="text-sm text-gray-600">
            Bet must be between 1 and {scores[player]} points
          </div>
        </div>
      )}

      <div className="flex gap-2 justify-center">
        {options.map((_, i) => (
          <Button
            key={i}
            variant={answers[player] === i ? "default" : "outline"}
            onClick={() => handleAnswer(player, i)}
            disabled={isSubmitted || (!canChooseDirectly && !hasBet)}
            className="w-10 h-10"
          >
            {String.fromCharCode(65 + i)}
          </Button>
        ))}
      </div>

      {!canChooseDirectly && hasBet && !hasAnswered && (
        <div className="mt-2 text-center text-sm text-blue-600">
          Bet placed: {bets[player]} points
        </div>
      )}
    </Card>
  );
};

const PlayPhase = ({ state, handlers, getPlayersWithOption }) => {
  const [timeLeft, setTimeLeft] = useState(30);
  const question = state.questions[state.round - 1];

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      setTimeLeft(30);
    }
  }, [timeLeft, state.isSubmitted, handlers]);

  useEffect(() => {
    setTimeLeft(30);
  }, [state.round, state.answers]);

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-center">
        Question {state.round}/{state.questions.length}
      </h2>

      <Timer seconds={timeLeft} isSubmitted={state.isSubmitted} />

      <QuestionDisplay
        question={question}
        answers={state.answers}
        showDetails={state.showDetails}
        getPlayersWithOption={getPlayersWithOption}
      />

      <div className="grid grid-cols-1 gap-4">
        {state.playerOrder.map((player) => (
          <PlayerAnswers
            key={player}
            player={player}
            scores={state.scores}
            roundScores={state.roundScores}
            answers={state.answers}
            options={question.options}
            handleAnswer={handlers.handleAnswer}
            isSubmitted={state.isSubmitted}
            bets={state.bets}
            handleBet={handlers.handleBet}
          />
        ))}
      </div>

      <div className="flex gap-4">
        <Button
          onClick={handlers.evaluateRound}
          disabled={Object.keys(state.answers).length !== state.players.length}
          className="flex-1"
        >
          Submit Round
        </Button>
        <Button
          onClick={handlers.nextRound}
          disabled={!state.isSubmitted}
          className="flex-1"
        >
          Next Question
        </Button>
      </div>
      <div className="flex gap-4">
        <Button onClick={handlers.endGame} className="flex-1">
          End Game
        </Button>
      </div>
    </div>
  );
};

// Main Component
const GroupQuiz = () => {
  const initialState = {
    phase: "rules",
    players: [],
    playerOrder: [],
    scores: {},
    round: 1,
    questions: [],
    answers: {},
    roundScores: {},
    bets: {},
    isSubmitted: false,
    showDetails: false,
    inputs: {
      questions: JSON.stringify(defaultQuestions, null, 2),
      playerName: "",
      error: "",
    },
  };

  const [state, setState] = useState(initialState);
  const updateState = (updates) =>
    setState((prev) => ({ ...prev, ...updates }));

  const handlers = {
    handleQuestions: () => {
    try {
      const questions = JSON.parse(state.inputs.questions);
      if (!Array.isArray(questions) || !questions.every(q => 
        q.question && Array.isArray(q.options) && q.options.length >= 2 && 
        q.options.every(o => o.text && typeof o.points === "number" && o.explanation)
      )) throw new Error("Invalid format");
      
      // Shuffle options for each question
      const questionsWithShuffledOptions = questions.map(q => ({
        ...q,
        options: _.shuffle(q.options.map((opt, idx) => ({ ...opt, originalIndex: idx })))
      }));

      updateState({ 
        questions: questionsWithShuffledOptions, 
        phase: "players",
        inputs: { ...state.inputs, error: "" }
      });
    } catch (error) {
      updateState({ inputs: { ...state.inputs, error: error.message } });
    }
  },

    addPlayer: () => {
      const player = state.inputs.playerName.trim();
      if (player && state.players.length < 10) {
        updateState({
          players: [...state.players, player],
          scores: { ...state.scores, [player]: 0 },
          inputs: { ...state.inputs, playerName: "" },
        });
      }
    },

    handleBet: (player, amount) => {
      if (!state.isSubmitted) {
        updateState({
          bets: { ...state.bets, [player]: amount },
        });
      }
    },

    evaluateRound: () => {
      const question = state.questions[state.round - 1];
      const roundScores = {};
      const newScores = { ...state.scores };
      const allScores = Object.values(state.scores);
      const minScore = Math.min(...allScores);

      Object.entries(state.answers).forEach(([player, index]) => {
        const isCorrect = question.options[index].points === 10; // Assuming 10 points means correct answer
        const playerScore = state.scores[player];
        const canChooseDirectly = playerScore === minScore || playerScore === 0;

        if (canChooseDirectly) {
          // Players with lowest/zero points get normal points from questions
          const points = question.options[index].points;
          newScores[player] += points;
          roundScores[player] = points;
        } else {
          // Other players win or lose their bet
          const bet = state.bets[player] || 0;
          const points = isCorrect ? bet : -bet;
          newScores[player] += points;
          roundScores[player] = points;
        }
      });

      updateState({
        scores: newScores,
        roundScores,
        showDetails: true,
        isSubmitted: true,
      });
    },

    nextRound: () => {
      if (state.round < state.questions.length) {
        const playerOrder = [...state.players].sort((a, b) => {
          const diff = state.scores[a] - state.scores[b];
          return diff === 0 ? Math.random() - 0.5 : diff;
        });

        updateState({
          round: state.round + 1,
          playerOrder,
          answers: {},
          roundScores: {},
          bets: {},
          isSubmitted: false,
          showDetails: false,
        });
      } else {
        updateState({ phase: "end" });
      }
    },

    endGame: () => {
      updateState({
        round: state.questions.length,
        phase: "end",
      });
    },

    startGame: () => {
      if (state.players.length >= 2) {
        updateState({
          phase: "play",
          playerOrder: _.shuffle(state.players),
        });
      }
    },
    handleAnswer: (player, optionIndex) => {
      if (!state.isSubmitted) {
        updateState({ answers: { ...state.answers, [player]: optionIndex } });
      }
    },
  };

  const getPlayersWithOption = (optionIndex) =>
    Object.entries(state.answers)
      .filter(([_, i]) => i === optionIndex)
      .map(([player]) => player);

  const phases = {
    rules: () => (
      <div className="space-y-6">
        <Rules />
        <Button
          onClick={() => updateState({ phase: "setup" })}
          className="w-full"
        >
          Start Setup
        </Button>
      </div>
    ),

    setup: () => {
      const handleCopy = () => {
        const singleQuestion = JSON.stringify(
          [JSON.parse(state.inputs.questions)[0]],
          null,
          2
        );
        navigator.clipboard.writeText(
          "Create [number] questions with this format with theme in [yourtopic]\n" +
            "Format to follow:\n" +
            singleQuestion
        );
      };

      return (
        <div className="space-y-4">
          <h2 className="text-xl font-bold">Setup Questions</h2>
          <div className="bg-blue-50 p-4 rounded-lg text-sm text-blue-800">
            <div className="flex justify-between items-center mb-2">
              <p>
                You can create custom questions by copying this format and
                asking ChatGPT:
              </p>
              <Button
                onClick={handleCopy}
                variant="outline"
                className="text-xs px-2 py-1 h-8"
              >
                Copy Format
              </Button>
            </div>
            <p className="font-mono mt-2">
              "Create [number] questions with this format with theme in [your
              topic]"
            </p>
            <p className="mt-2 italic text-blue-600">
              Example: "Create 5 questions with this format with theme in World
              History"
            </p>
          </div>
          <Textarea
            value={state.inputs.questions}
            onChange={(e) =>
              updateState({
                inputs: { ...state.inputs, questions: e.target.value },
              })
            }
            className="h-64 font-mono text-sm"
          />
          {state.inputs.error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 text-red-700">
              <AlertCircle className="h-4 w-4" />
              {state.inputs.error}
            </div>
          )}
          <div className="flex gap-2">
            <Button
              onClick={() => updateState({ phase: "rules" })}
              variant="outline"
              className="flex-1"
            >
              Back to Rules
            </Button>
            <Button onClick={handlers.handleQuestions} className="flex-1">
              Set Questions
            </Button>
          </div>
        </div>
      );
    },

    players: () => (
      <div className="space-y-4">
        <div className="flex gap-2">
          <Input
            value={state.inputs.playerName}
            onChange={(e) =>
              updateState({
                inputs: { ...state.inputs, playerName: e.target.value },
              })
            }
            placeholder="Enter player name"
            maxLength={20}
            className="flex-1"
          />
          <Button
            onClick={handlers.addPlayer}
            disabled={state.players.length >= 10}
          >
            Add
          </Button>
        </div>
        {state.players.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {state.players.map((player) => (
              <div key={player} className="bg-blue-100 px-3 py-1 rounded-full">
                {player}
              </div>
            ))}
          </div>
        )}
        <div className="flex gap-2">
          <Button
            onClick={() => updateState({ phase: "setup" })}
            variant="outline"
            className="flex-1"
          >
            Back
          </Button>
          <Button
            onClick={handlers.startGame}
            disabled={state.players.length < 2}
            className="flex-1"
          >
            Start Quiz
          </Button>
        </div>
      </div>
    ),
    play: () => (
      <PlayPhase
        state={state}
        handlers={handlers}
        getPlayersWithOption={getPlayersWithOption}
      />
    ),

    end: () => {
      const sortedPlayers = Object.entries(state.scores).sort(
        ([, a], [, b]) => b - a
      );
      const [winner] = sortedPlayers[0];
      const winnerScore = sortedPlayers[0][1];

      return (
        <div className="space-y-8 text-center">
          <div className="animate-bounce">
            <Award className="w-24 h-24 mx-auto text-yellow-500" />
          </div>

          <div>
            <h2 className="text-4xl font-bold mb-2">Quiz Complete!</h2>
            <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white p-6 rounded-xl shadow-lg mb-8 animate-pulse">
              <p className="text-xl mb-1">🎉 Winner 🎉</p>
              <p className="text-3xl font-bold">{winner}</p>
              <p className="text-xl mt-2">{winnerScore} points</p>
            </div>
          </div>

          <div className="grid gap-3 max-w-md mx-auto">
            {sortedPlayers.slice(1).map(([player, score], index) => (
              <div
                key={player}
                className={`p-4 rounded-lg flex justify-between items-center ${
                  index === 0
                    ? "bg-gray-200"
                    : index === 1
                    ? "bg-gray-100"
                    : "bg-gray-50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl font-semibold">#{index + 2}</span>
                  <span className="font-medium">{player}</span>
                </div>
                <span className="text-lg">{score} points</span>
              </div>
            ))}
          </div>

          <div className="pt-8">
            <Button
              onClick={() => setState(initialState)}
              className="px-8 py-3 text-lg"
            >
              Play Again
            </Button>
          </div>
        </div>
      );
    },
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <Card>
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-center">Group Quiz</h2>
        </div>
        <div>{phases[state.phase]()}</div>
      </Card>
    </div>
  );
};

export default GroupQuiz;
