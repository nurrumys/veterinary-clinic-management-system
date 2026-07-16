import Card from "../ui/Card";

function PetLoading() {
  return (
    <Card>
      <div className="animate-pulse">

        <div className="border-b border-slate-200 pb-4">
          <div className="h-5 w-40 rounded bg-slate-200" />
        </div>

        <div className="divide-y divide-slate-200">

          {[1, 2, 3, 4, 5].map((item) => (
            <div
              key={item}
              className="flex items-center justify-between py-5"
            >
              <div className="flex items-center gap-4">

                <div className="h-10 w-10 rounded-full bg-slate-200" />

                <div className="space-y-2">
                  <div className="h-4 w-36 rounded bg-slate-200" />
                  <div className="h-3 w-20 rounded bg-slate-100" />
                </div>

              </div>

              <div className="hidden h-4 w-24 rounded bg-slate-200 md:block" />
              <div className="hidden h-4 w-28 rounded bg-slate-200 lg:block" />
              <div className="hidden h-4 w-20 rounded bg-slate-200 lg:block" />

              <div className="h-8 w-20 rounded-xl bg-slate-200" />
            </div>
          ))}

        </div>

      </div>
    </Card>
  );
}

export default PetLoading;