"use client"

import { QUESTIONS } from "@/lib/quiz-data"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ArrowLeft, ArrowRight, Check } from "lucide-react"

const OPTION_LETTERS = ["A", "B", "C", "D", "E", "F"]

export function QuestionScreen({
  index,
  selected,
  onSelect,
  onNext,
  onBack,
}: {
  index: number
  selected: number
  onSelect: (optionIndex: number) => void
  onNext: () => void
  onBack: () => void
}) {
  const question = QUESTIONS[index]
  const total = QUESTIONS.length
  const progress = ((index + (selected >= 0 ? 1 : 0)) / total) * 100
  const isLast = index === total - 1

  return (
    <div className="flex min-h-[100svh] flex-col px-6 py-8">
      {/* 顶部进度 */}
      <div className="mx-auto w-full max-w-xl">
        <div className="mb-2 flex items-center justify-between text-xs font-medium text-muted-foreground">
          <span className="rounded-full bg-secondary px-2.5 py-1 text-secondary-foreground">{question.dim}维度</span>
          <span>
            {index + 1} / {total}
          </span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-secondary">
          <div
            className="h-full rounded-full bg-primary transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* 题目主体 */}
      <div className="mx-auto flex w-full max-w-xl flex-1 flex-col justify-center py-8">
        <h2 className="text-balance font-serif text-2xl font-semibold leading-snug text-foreground sm:text-[1.75rem]">
          {question.text}
        </h2>

        <div className="mt-7 flex flex-col gap-3">
          {question.options.map((opt, i) => {
            const isActive = selected === i
            return (
              <button
                key={i}
                type="button"
                onClick={() => onSelect(i)}
                className={cn(
                  "group flex w-full items-center gap-4 rounded-xl border p-4 text-left transition-all duration-200",
                  isActive
                    ? "border-primary bg-primary/8 shadow-sm"
                    : "border-border bg-card hover:border-primary/40 hover:bg-secondary/60",
                )}
              >
                <span
                  className={cn(
                    "flex size-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-muted-foreground group-hover:text-foreground",
                  )}
                >
                  {isActive ? <Check className="size-4" /> : OPTION_LETTERS[i]}
                </span>
                <span
                  className={cn(
                    "text-sm leading-relaxed sm:text-[0.95rem]",
                    isActive ? "font-medium text-foreground" : "text-foreground/85",
                  )}
                >
                  {opt.label}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* 底部导航 */}
      <div className="mx-auto flex w-full max-w-xl items-center justify-between gap-3">
        <Button
          variant="ghost"
          onClick={onBack}
          disabled={index === 0}
          className="text-muted-foreground disabled:opacity-40"
        >
          <ArrowLeft className="size-4" />
          上一页
        </Button>
        <Button onClick={onNext} disabled={selected < 0} className="px-6">
          {isLast ? "查看结果" : "下一页"}
          {!isLast && <ArrowRight className="size-4" />}
        </Button>
      </div>
    </div>
  )
}
