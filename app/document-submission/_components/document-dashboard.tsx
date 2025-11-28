import React from "react";
import { documentSubmissionData } from "../_data/document-submission-data";

export default function DocumentDashboard() {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 w-full">
      {documentSubmissionData.map((fn) => (
        <div
          key={fn.id}
          className="flex flex-col gap-2 rounded-lg border border-border/60 bg-background p-4 shadow-sm min-w-0"
        >
          <div className="flex items-center justify-center gap-3">
            <fn.icon className="h-5 w-5 text-primary shrink-0" />
            <h2 className="text-sm font-semibold text-center truncate">
              {fn.title}
            </h2>
          </div>
          <p className="w-full text-center text-sm text-muted-foreground">
            {fn.total}
          </p>
        </div>
      ))}
    </section>
  );
}
