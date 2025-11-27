"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download, CheckCircle2, XCircle } from "lucide-react";
import { documentList, DocumentListItem } from "../../../_data/document-list";
import { format } from "date-fns";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";

export default function DocumentListDetails() {
  const params = useParams();
  const router = useRouter();
  const documentId = params?.id as string | undefined;
  const [showApproveDialog, setShowApproveDialog] = useState(false);
  const [showRejectDialog, setShowRejectDialog] = useState(false);

  const formatId = (id: string | number | undefined): string => {
    if (!id) return "000000000";
    const idNumber = typeof id === "string" ? parseInt(id, 10) : id;
    if (isNaN(idNumber)) return "000000000";
    return String(idNumber).padStart(9, "0");
  };

  const formatDate = (date: Date | string | undefined): string => {
    if (!date) return "-";
    try {
      const dateObj = date instanceof Date ? date : new Date(date);
      if (isNaN(dateObj.getTime())) return "-";
      return format(dateObj, "yyyy-MM-dd");
    } catch {
      return "-";
    }
  };

  const handleApproveClick = () => {
    setShowApproveDialog(true);
  };

  const handleRejectClick = () => {
    setShowRejectDialog(true);
  };

  const handleApproveConfirm = () => {
    // TODO: Implement approve API call here
    console.log("Approving document:", documentId);
    
    toast.success("Document Approved", {
      description: `Document ${formatId(documentId)} has been approved successfully.`,
    });
    
    setShowApproveDialog(false);
    // Redirect back to the list after a short delay to show the toast
    setTimeout(() => {
      router.push("/document-submission/document-list");
    }, 500);
  };

  const handleRejectConfirm = () => {
    // TODO: Implement reject API call here
    console.log("Rejecting document:", documentId);
    
    toast.error("Document Rejected", {
      description: `Document ${formatId(documentId)} has been rejected.`,
    });
    
    setShowRejectDialog(false);
    // Redirect back to the list after a short delay to show the toast
    setTimeout(() => {
      router.push("/document-submission/document-list");
    }, 500);
  };

  // Find the document by ID
  if (!documentId) {
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
              Invalid Document ID
            </h1>
            <p className="text-base text-muted-foreground">
              Please provide a valid document ID.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const parsedId = parseInt(documentId, 10);
  if (isNaN(parsedId)) {
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
              Invalid Document ID
            </h1>
            <p className="text-base text-muted-foreground">
              The document ID &quot;{documentId}&quot; is not a valid number.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const document: DocumentListItem | undefined = documentList.find(
    (doc) => doc.id === parsedId
  );

  if (!document) {
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
              Document Not Found
            </h1>
            <p className="text-base text-muted-foreground">
              The document with ID {formatId(documentId)} could not be found.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex w-full items-center justify-center bg-background text-foreground">
      <div className="flex-1 p-4">
        <div className="w-full mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/document-submission/document-list">
                <Button variant="ghost" size="icon" className="cursor-pointer">
                  <ArrowLeft className="h-4 w-4 text-primary" />
                </Button>
              </Link>
              <h1 className="text-3xl font-semibold text-foreground">
                Document Details
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="default"
                onClick={handleApproveClick}
                className="cursor-pointer"
              >
                <CheckCircle2 className="h-4 w-4 mr-2" />
                Approve
              </Button>
              <Button
                variant="destructive"
                onClick={handleRejectClick}
                className="cursor-pointer"
              >
                <XCircle className="h-4 w-4 mr-2" />
                Reject
              </Button>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Document Information</CardTitle>
              <CardDescription>
                Complete details of the document
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Requestor Information and Date at the top */}
              <div className="border-b pb-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-muted-foreground">
                      Requestor Name
                    </Label>
                    <p className="text-sm">{document.requestorName}</p>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-muted-foreground">
                      BU/FU
                    </Label>
                    <p className="text-sm">{document.buFu}</p>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-muted-foreground">
                      Extension
                    </Label>
                    <p className="text-sm">{document.extension}</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-muted-foreground">
                      Submit Date
                    </Label>
                    <p className="text-sm">{formatDate(document.submitDate)}</p>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-muted-foreground">
                      Approval Date
                    </Label>
                    <p className="text-sm">
                      {formatDate(document.approvalDate)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Document ID */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-muted-foreground">
                    Document ID
                  </Label>
                  <p className="text-sm font-medium">{formatId(document.id)}</p>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-muted-foreground">
                    Document Number
                  </Label>
                  <p className="text-sm">{document.documentNumber || "-"}</p>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-muted-foreground">
                    Document Status
                  </Label>
                  <p className="text-sm">{document.documentStatus || "-"}</p>
                </div>
              </div>

              {/* Document Title and Description */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-muted-foreground">
                  Document Title
                </Label>
                <p className="text-sm">{document.documentTitle}</p>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-muted-foreground">
                  Document Description
                </Label>
                <p className="text-sm">{document.documentDescription || "-"}</p>
              </div>

              {/* Document Type and Urgency */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-muted-foreground">
                    Document Type
                  </Label>
                  <p className="text-sm">{document.documentType}</p>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-muted-foreground">
                    Urgency
                  </Label>
                  <p className="text-sm">{document.urgency}</p>
                </div>
              </div>

              {/* Document Stage */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-muted-foreground">
                  Document Stage
                </Label>
                <p className="text-sm">{document.documentStage || "-"}</p>
              </div>

              {/* Document URL */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-muted-foreground">
                  Document URL
                </Label>
                {document.documentUrl && document.documentUrl.trim() ? (
                  <div className="flex items-center gap-2 flex-wrap">
                    <a
                      href={document.documentUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline text-sm break-all flex-1 min-w-0"
                    >
                      {document.documentUrl}
                    </a>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        if (document.documentUrl) {
                          window.open(document.documentUrl, "_blank");
                        }
                      }}
                      className="shrink-0"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">-</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Approve Confirmation Dialog */}
        <AlertDialog open={showApproveDialog} onOpenChange={setShowApproveDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Approve Document</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to approve document {formatId(documentId)}? 
                This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleApproveConfirm}
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Approve
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* Reject Confirmation Dialog */}
        <AlertDialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Reject Document</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to reject document {formatId(documentId)}? 
                This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleRejectConfirm}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                Reject
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}

