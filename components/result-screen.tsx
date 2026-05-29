"use client"

import { ARCHETYPES, TYPE_KEYS, TYPE_LABELS } from "@/lib/quiz-data"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Sparkles, ShieldCheck, AlertTriangle, Sprout, RotateCcw } from "lucide-react"

export function ResultScreen({
  scores,
  winnerKey,
  onRestart,
}: {
  scores: number[]
  winnerKey: string
  onRestart: () => void
}) {
  const archetype = ARCHETYPES[winnerKey]
  const total = scores.reduce((a, b) => a + b, 0) || 1
  const maxScore = Math.max(...scores)

  const ranked = TYPE_KEYS.map((key, i) => ({
    key,
    label: TYPE_LABELS[i],
    score: scores[i],
    pct: Math.round((scores[i] / total) * 100),
    isWinner: scores[i] === maxScore,
  })).sort((a, b) => b.score - a.score)

  return (
    <div className="flex min-h-[100svh] flex-col items-center px-6 py-12">
      <div className="w-full max-w-xl">
        {/* 头部 */}
        <div className="text-center">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground">
            你的心灵生态原型
          </p>
          <div className="mx-auto mb-5 flex size-16 items-center justify-center rounded-full bg-primary/10 ring-1 ring-primary/15">
            <Sprout className="size-8 text-primary" strokeWidth={1.5} />
          </div>
          <h1 className="text-balance font-serif text-3xl font-semibold text-foreground sm:text-4xl">
            {archetype.name}
          </h1>
          <p className="mt-1.5 text-sm uppercase tracking-wider text-muted-foreground">{archetype.en}</p>
          <p className="mt-3 inline-block rounded-full bg-secondary px-4 py-1.5 text-sm font-medium text-secondary-foreground">
            {archetype.keywords}
          </p>
        </div>

        {/* 画像 */}
        <p className="mt-8 text-pretty text-center text-[0.95rem] leading-relaxed text-foreground/85">
          {archetype.desc}
        </p>

        {/* 优势 / 风险 */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <ReportCard
            icon={<ShieldCheck className="size-4" />}
            title="生态优势"
            body={archetype.strengths}
            tone="positive"
          />
          <ReportCard
            icon={<AlertTriangle className="size-4" />}
            title="失衡风险"
            body={archetype.risks}
            tone="warning"
          />
        </div>

        {/* 行动建议 */}
        <div className="mt-4 rounded-2xl border border-primary/25 bg-primary/8 p-5">
          <div className="mb-2 flex items-center gap-2 text-primary">
            <Sparkles className="size-4" />
            <h3 className="text-sm font-semibold">可持续行动</h3>
          </div>
          <p className="text-pretty text-sm leading-relaxed text-foreground/85">{archetype.suggestion}</p>
        </div>

        {/* 能量分布 */}
        <div className="mt-8">
          <h3 className="mb-4 font-serif text-lg font-semibold text-foreground">十维生态能量分布</h3>
          <div className="flex flex-col gap-2.5">
            {ranked.map((item) => (
              <div key={item.key} className="flex items-center gap-3">
                <span
                  className={cn(
                    "w-10 shrink-0 text-sm",
                    item.isWinner ? "font-semibold text-foreground" : "text-muted-foreground",
                  )}
                >
                  {item.label}
                </span>
                <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-secondary">
                  <div
                    className={cn(
                      "h-full rounded-full transition-all duration-700 ease-out",
                      item.isWinner ? "bg-primary" : "bg-primary/35",
                    )}
                    style={{ width: `${Math.max(item.pct * 2.2, item.score > 0 ? 6 : 0)}%` }}
                  />
                </div>
                <span
                  className={cn(
                    "w-9 shrink-0 text-right text-xs tabular-nums",
                    item.isWinner ? "font-semibold text-primary" : "text-muted-foreground",
                  )}
                >
                  {item.pct}%
                </span>
              </div>
            ))}
          </div>
        </div>

        <p className="mt-10 text-center font-serif text-base text-muted-foreground">
          愿你的内在生态生生不息，动态平衡。
        </p>

        <div className="mt-6 flex justify-center">
          <Button variant="outline" onClick={onRestart} className="px-8 bg-transparent">
            <RotateCcw className="size-4" />
            重新测试
          </Button>
        </div>
      </div>
    </div>
  )
}

function ReportCard({
  icon,
  title,
  body,
  tone,
}: {
  icon: React.ReactNode
  title: string
  body: string
  tone: "positive" | "warning"
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <div
        className={cn(
          "mb-2 flex items-center gap-2",
          tone === "positive" ? "text-primary" : "text-destructive",
        )}
      >
        {icon}
        <h3 className="text-sm font-semibold">{title}</h3>
      </div>
      <p className="text-pretty text-sm leading-relaxed text-foreground/80">{body}</p>
    </div>
  )
}
