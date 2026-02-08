export default function Loading() {
  return (
    <main className="relative overflow-hidden bg-ink-900 text-ink-50">
      <section className="section-pad">
        <div className="container-shell space-y-6">
          <div className="h-3 w-32 rounded-full skeleton" />
          <div className="h-12 w-[70%] rounded-2xl skeleton" />
          <div className="h-4 w-[60%] rounded-full skeleton" />
          <div className="flex gap-3">
            <div className="h-10 w-32 rounded-full skeleton" />
            <div className="h-10 w-36 rounded-full skeleton" />
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-shell space-y-6">
          <div className="h-3 w-32 rounded-full skeleton" />
          <div className="h-8 w-[60%] rounded-2xl skeleton" />
          <div className="h-4 w-[75%] rounded-full skeleton" />
          <div className="grid gap-6 md:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-40 rounded-3xl skeleton" />
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-shell space-y-6">
          <div className="h-3 w-32 rounded-full skeleton" />
          <div className="h-8 w-[60%] rounded-2xl skeleton" />
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-56 rounded-3xl skeleton" />
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-shell space-y-6">
          <div className="h-3 w-32 rounded-full skeleton" />
          <div className="h-8 w-[60%] rounded-2xl skeleton" />
          <div className="space-y-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-32 rounded-3xl skeleton" />
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-shell space-y-6">
          <div className="h-3 w-32 rounded-full skeleton" />
          <div className="h-8 w-[60%] rounded-2xl skeleton" />
          <div className="space-y-6">
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="h-40 rounded-3xl skeleton" />
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-shell space-y-6">
          <div className="h-3 w-32 rounded-full skeleton" />
          <div className="h-10 w-[65%] rounded-2xl skeleton" />
          <div className="h-12 w-48 rounded-full skeleton" />
        </div>
      </section>
    </main>
  );
}
