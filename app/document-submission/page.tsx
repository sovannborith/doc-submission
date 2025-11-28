import DocumentDashboard from "./_components/document-dashboard";

export default function DocumentSubmission() {
  return (
    <div className="flex w-full p-4 items-start justify-center bg-background text-foreground overflow-auto">
      <div className="flex-1 w-full max-w-7xl mx-auto">
        <div className="space-y-3 mb-6">
          <h1 className="text-2xl sm:text-3xl font-semibold text-foreground">
            Digital Document Submission
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Upload documents, keep approvals flowing, and keep every request
            centralized in one secure dashboard.
          </p>
        </div>
        <DocumentDashboard />
      </div>
    </div>
  );
}
