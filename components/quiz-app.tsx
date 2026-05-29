"use client"

import { useState } from "react"
import { QUESTIONS, computeScores, getWinner } from "@/lib/quiz-data"
import { IntroScreen } from "@/components/intro-screen"
import { QuestionScreen } from "@/components/question-screen"
import { ResultScreen } from "@/components/result-screen"

type Stage = "intro" | "quiz" | "result"

export function QuizApp() {
  const [stage, setStage] = useState<Stage>("intro")
  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState<number[]>(() => new Array(QUESTIONS.length).fill(-1))

  function handleSelect(optionIndex: number) {
    setAnswers((prev) => {
      const next = [...prev]
      next[current] = optionIndex
      return next
    })
  }

  function handleNext() {
    if (answers[current] < 0) return
    if (current === QUESTIONS.length - 1) {
      setStage("result")
      window.scrollTo({ top: 0 })
      return
    }
    setCurrent((c) => c + 1)
    window.scrollTo({ top: 0 })
  }

  function handleBack() {
    if (current === 0) return
    setCurrent((c) => c - 1)
    window.scrollTo({ top: 0 })
  }

  function handleStart() {
    setStage("quiz")
    setCurrent(0)
  }

  function handleRestart() {
    setAnswers(new Array(QUESTIONS.length).fill(-1))
    setCurrent(0)
    setStage("intro")
  }

  if (stage === "intro") {
    return <IntroScreen onStart={handleStart} />
  }

  if (stage === "result") {
    const scores = computeScores(answers)
    const winnerKey = getWinner(scores)
    return <ResultScreen scores={scores} winnerKey={winnerKey} onRestart={handleRestart} />
  }

  return (
    <QuestionScreen
      key={current}
      index={current}
      selected={answers[current]}
      onSelect={handleSelect}
      onNext={handleNext}
      onBack={handleBack}
    />
  )
}
