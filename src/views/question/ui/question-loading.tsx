import { Skeleton } from "@/shared/ui/shadcn";

export function QuestionLoading() {
  return (
    <main className="mx-auto max-w-7xl lg:flex lg:gap-10 lg:px-6">
      {/* Mobile sidebar trigger */}
      <div className="mb-6 lg:hidden">
        <Skeleton className="h-9 w-28 rounded-md" />
      </div>

      {/* Question content */}
      <article className="min-w-0 flex-1 lg:max-w-4xl">
        {/* Header */}
        <header className="mb-10">
          <Skeleton className="mb-4 h-5 w-32 rounded-md" />

          <Skeleton className="h-8 w-full max-w-3xl rounded-md sm:h-9" />
          <Skeleton className="mt-2 h-8 w-4/5 max-w-2xl rounded-md sm:h-9" />
        </header>

        {/* Markdown content */}
        <div className="question-markdown space-y-6">
          {/* Paragraph */}
          <div className="space-y-3">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-11/12" />
          </div>

          {/* Heading */}
          <Skeleton className="h-7 w-48 rounded-md" />

          {/* Paragraph */}
          <div className="space-y-3">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-11/12" />
            <Skeleton className="h-4 w-4/5" />
          </div>

          {/* Code block */}
          <div className="rounded-lg border">
            <div className="bg-muted flex h-10 items-center justify-between rounded-t-lg border-b px-3">
              <Skeleton className="h-3 w-16 rounded-md" />
              <Skeleton className="size-7 rounded-md" />
            </div>

            <div className="space-y-3 p-4">
              <Skeleton className="h-4 w-4/5" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/5" />
              <Skeleton className="h-4 w-4/5" />
              <Skeleton className="h-4 w-2/5" />
            </div>
          </div>
        </div>
      </article>

      {/* Desktop sidebar */}
      <aside className="hidden w-72 shrink-0 lg:block">
        <div className="sticky top-20 space-y-6">
          {/* Question info */}
          <section className="rounded-xl border p-5">
            <Skeleton className="mb-5 h-4 w-24 rounded-md" />

            <div className="space-y-5">
              {/* Topic */}
              <div className="space-y-2">
                <Skeleton className="h-4 w-12 rounded-md" />
                <Skeleton className="h-4 w-20 rounded-md" />
              </div>

              {/* Difficulty */}
              <div className="space-y-2">
                <Skeleton className="h-4 w-20 rounded-md" />
                <Skeleton className="h-4 w-16 rounded-md" />
              </div>

              {/* Categories */}
              <div className="space-y-2">
                <Skeleton className="h-4 w-20 rounded-md" />

                <div className="flex flex-wrap gap-1.5">
                  <Skeleton className="h-6 w-20 rounded-md" />
                  <Skeleton className="h-6 w-24 rounded-md" />
                </div>
              </div>

              {/* Reading time */}
              <div className="space-y-2">
                <Skeleton className="h-4 w-24 rounded-md" />

                <div className="flex items-center gap-1.5">
                  <Skeleton className="size-3.5 rounded-full" />
                  <Skeleton className="h-4 w-20 rounded-md" />
                </div>
              </div>
            </div>
          </section>

          {/* Progress */}
          <div>
            <div className="mb-2 flex items-center justify-between">
              <Skeleton className="h-4 w-20 rounded-md" />
            </div>
            <Skeleton className="h-1.5 w-full rounded-full" />
          </div>

          {/* Actions */}
          <section className="rounded-xl border p-5">
            <Skeleton className="mb-4 h-4.25 w-16 rounded-md" />

            <div className="space-y-1.5">
              <Skeleton className="h-8 w-full rounded-md" />
              <Skeleton className="h-8 w-full rounded-md" />
              <Skeleton className="h-8 w-full rounded-md" />
            </div>
          </section>

          {/* Navigation */}
          <nav className="flex gap-2">
            <Skeleton className="h-8 flex-1 rounded-md" />
            <Skeleton className="h-8 flex-1 rounded-md" />
          </nav>
        </div>
      </aside>
    </main>
  );
}
