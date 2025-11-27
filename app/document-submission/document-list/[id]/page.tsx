"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function DocumentDetail() {
  const params = useParams();
  const documentId = params?.id as string;

  const formatId = (id: string): string => {
    const idNumber = parseInt(id, 10);
    return String(idNumber).padStart(9, "0");
  };

  return (
    <div className="flex w-full items-center justify-center bg-background text-foreground">
      <div className="flex-1">
        <div className="max-w-4xl space-y-3">
          <Link href="/document-submission/document-list">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Document List
            </Button>
          </Link>
          <h1 className="text-3xl font-semibold text-foreground">
            Document Details
          </h1>
          <p className="text-base text-muted-foreground">
            Document ID: {formatId(documentId)}
          </p>
          {/* Add more document details here */}
        </div>
      </div>
    </div>
  );
}
