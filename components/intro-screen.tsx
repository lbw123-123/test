"use client"

import { Button } from "@/components/ui/button"
import { TEST_TITLE, TEST_SUBTITLE, TEST_DESC, QUESTIONS } from "@/lib/quiz-data"
import { Leaf, Clock, Compass } from "lucide-react"

export function IntroScreen({ onStart }: { onStart: () => void }) {
  return (
    <div className="flex min-h-[100svh] items-center justify-center px-6 py-12">
      <div className="w-full max-w-xl text-center">
        <div className="mx-auto mb-8 flex size-16 items-center justify-center rounded-full bg-primary/10 ring-1 ring-primary/15">
          <Leaf className="size-8 text-primary" strokeWidth={1.5} />
        </div>

        <p className="mb-3 text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground">
          {TEST_SUBTITLE}
        </p>
        <h1 className="text-balance font-serif text-3xl font-semibold leading-tight text-foreground sm:text-4xl">
          {TEST_TITLE}
        </h1>

        <p className="mx-auto mt-6 max-w-md text-pretty text-sm leading-relaxed text-muted-foreground">
          {TEST_DESC}
        </p>

        <div className="mx-auto mt-8 flex max-w-md flex-col gap-3 rounded-2xl border border-border bg-card p-5 text-left sm:flex-row sm:items-center sm:justify-between">
          <InfoItem icon={<Compass className="size-4" />} label="题目数量" value={`${QUESTIONS.length} 道情境题`} />
          <div className="hidden h-8 w-px bg-border sm:block" />
          <InfoItem icon={<Leaf className="size-4" />} label="生态原型" value="10 种类型" />
          <div className="hidden h-8 w-px bg-border sm:block" />
          <InfoItem icon={<Clock className="size-4" />} label="预计用时" value="5 - 8 分钟" />
        </div>

        <Button size="lg" className="mt-8 w-full sm:w-auto sm:px-12" onClick={onStart}>
          开始评估
        </Button>

        <p className="mt-4 text-xs text-muted-foreground">凭第一直觉作答，没有对错之分。</p>
      </div>
    </div>
  )
}

function InfoItem({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3 sm:flex-col sm:items-center sm:gap-1.5 sm:text-center">
      <div className="flex size-9 items-center justify-center rounded-full bg-secondary text-primary sm:size-auto sm:bg-transparent">
        {icon}
      </div>
      <div>
        <p className="text-[11px] uppercase tracking-wider text-muted-foreground">{label}</p>
        <p className="text-sm font-medium text-foreground">{value}</p>
      </div>
    </div>
  )
}
