import PendingApprovalTable from "./_components/pending-approval-table";

export default function DocumentList() {
  return (
    <div className="flex w-full h-full bg-background text-foreground overflow-hidden">
      <div className="flex p-4 flex-col w-full h-full overflow-hidden">
        <div className="shrink-0 space-y-3 mb-4">
          <h1 className="text-3xl font-semibold text-foreground">
            My Pending Approval Documents
          </h1>
        </div>
        <div className="flex-1 min-h-0 overflow-hidden">
          <PendingApprovalTable />
        </div>
      </div>
    </div>
  );
}
