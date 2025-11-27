import { documentSubmissionData } from "./_data/document-submission-data";
export default function DocumentSubmission() {
  return (
    <div className="flex w-full p-4 items-center justify-center bg-background text-foreground">
      <div className="flex-1">
        <div className="max-w-4xl space-y-3">
          <h1 className="text-3xl font-semibold text-foreground">
            Digital Document Submission
          </h1>
          <p className="text-base text-muted-foreground">
            Upload documents, keep approvals flowing, and keep every request
            centralized in one secure dashboard.
          </p>
        </div>
        <section className="flex items-center justify-center gap-5 mt-10">
          {documentSubmissionData.map((fn) => (
            <div
              key={fn.id}
              className="flex flex-col w-full md:w-[300px] gap-2 rounded-lg border border-border/60 bg-background p-4 shadow-sm"
            >
              <div className="flex items-center justify-center gap-3">
                <fn.icon className="h-5 w-5 text-primary" />
                <h2 className="text-sm font-semibold">{fn.title}</h2>
              </div>
              <p className="w-full text-center text-sm text-muted-foreground">
                {fn.total}
              </p>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}
