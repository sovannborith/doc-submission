import DocumentListTable from "./_components/document-list-table";

export default function DocumentList() {
  return (
    <div className="w-full min-h-0 bg-background text-foreground">
      <div className="flex p-4 flex-col w-full min-h-0 max-w-full">
        <div className="shrink-0 space-y-3 mb-4">
          <h1 className="text-2xl sm:text-3xl font-semibold text-foreground">
            All Documents
          </h1>
        </div>
        <div className="flex-1 min-h-0 w-full max-w-full">
          <DocumentListTable />
        </div>
      </div>
    </div>
  );
}
