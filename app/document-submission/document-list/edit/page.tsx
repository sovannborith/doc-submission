"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import {
  CalendarIcon,
  PlusIcon,
  TrashIcon,
  CopyIcon,
  ChevronUpIcon,
  ChevronDownIcon,
} from "lucide-react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import {
  documentSchema,
  DocumentSchemaType,
} from "../../_zod-schema/document-schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

// Sample BU/FU options - replace with your actual data source
const buFuOptions = [
  { value: "bu-001", label: "Business Unit 001" },
  { value: "bu-002", label: "Business Unit 002" },
  { value: "bu-003", label: "Business Unit 003" },
  { value: "fu-001", label: "Functional Unit 001" },
  { value: "fu-002", label: "Functional Unit 002" },
  { value: "fu-003", label: "Functional Unit 003" },
  { value: "bu-004", label: "Business Unit 004" },
  { value: "fu-004", label: "Functional Unit 004" },
];

// Sample urgency options
const urgencyOptions = [
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
  { value: "urgent", label: "Urgent" },
];

// Sample document type options
const documentTypeOptions = [
  { value: "contract", label: "Contract" },
  { value: "invoice", label: "Invoice" },
  { value: "report", label: "Report" },
  { value: "proposal", label: "Proposal" },
  { value: "other", label: "Other" },
];

function EditDocumentContent() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  // Support both dynamic route [id] and query parameter ?id=
  const documentId = (params?.id as string) || searchParams?.get("id") || "";
  const [isLoading, setIsLoading] = useState(true);

  const form = useForm<DocumentSchemaType>({
    resolver: zodResolver(documentSchema),
    defaultValues: {
      requestorName: "",
      buFu: "",
      extension: "",
      documents: [
        {
          urgency: "",
          documentType: "",
          documentTitle: "",
          documentNumber: "",
        },
      ],
      submitDate: new Date(),
      approvalDate: undefined,
    },
  });

  const documents = form.watch("documents");

  // Fetch document data when component mounts
  useEffect(() => {
    const fetchDocument = async () => {
      if (!documentId) {
        setIsLoading(false);
        return;
      }

      try {
        // TODO: Replace with your actual API call to fetch document by ID
        // Example:
        // const response = await fetch(`/api/documents/${documentId}`);
        // const documentData = await response.json();

        // For now, using mock data structure
        // Once you have your API, replace this with actual data fetching
        const mockDocumentData: DocumentSchemaType = {
          requestorName: "",
          buFu: "",
          extension: "",
          documents: [
            {
              urgency: "",
              documentType: "",
              documentTitle: "",
              documentNumber: "",
            },
          ],
          submitDate: new Date(),
          approvalDate: undefined,
        };

        // Populate form with fetched data
        form.reset(mockDocumentData);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching document:", error);
        setIsLoading(false);
      }
    };

    fetchDocument();
  }, [documentId, form]);

  const onSubmit = (data: DocumentSchemaType) => {
    console.log("Form submitted for update:", data);
    // TODO: Replace with your actual API call to update document
    // Example:
    // await fetch(`/api/documents/${documentId}`, {
    //   method: "PUT",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(data),
    // });
    // router.push("/document-submission/document-list");
  };

  const addDocument = () => {
    const currentDocuments = form.getValues("documents");
    form.setValue("documents", [
      ...currentDocuments,
      {
        urgency: "",
        documentType: "",
        documentTitle: "",
        documentNumber: "",
      },
    ]);
  };

  const removeDocument = (index: number) => {
    const currentDocuments = form.getValues("documents");
    if (currentDocuments.length > 1) {
      form.setValue(
        "documents",
        currentDocuments.filter((_, i) => i !== index)
      );
    }
  };

  const duplicateDocument = (index: number) => {
    const currentDocuments = form.getValues("documents");
    const documentToDuplicate = currentDocuments[index];
    form.setValue("documents", [
      ...currentDocuments.slice(0, index + 1),
      { ...documentToDuplicate },
      ...currentDocuments.slice(index + 1),
    ]);
  };

  const moveDocumentUp = (index: number) => {
    if (index === 0) return;
    const currentDocuments = form.getValues("documents");
    const newDocuments = [...currentDocuments];
    [newDocuments[index - 1], newDocuments[index]] = [
      newDocuments[index],
      newDocuments[index - 1],
    ];
    form.setValue("documents", newDocuments);
  };

  const moveDocumentDown = (index: number) => {
    const currentDocuments = form.getValues("documents");
    if (index === currentDocuments.length - 1) return;
    const newDocuments = [...currentDocuments];
    [newDocuments[index], newDocuments[index + 1]] = [
      newDocuments[index + 1],
      newDocuments[index],
    ];
    form.setValue("documents", newDocuments);
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardContent className="py-8">
              <div className="text-center">Loading document...</div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl sm:text-3xl">
              Edit Document Submission
            </CardTitle>
            <CardDescription>
              Update the details below to modify your document submission
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                {/* Requestor Information Section */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">
                    Requestor Information
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="requestorName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Requestor Name *</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter requestor name"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="extension"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Extension *</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter extension" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="buFu"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>BU/FU *</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select BU/FU" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {buFuOptions.map((option) => (
                              <SelectItem
                                key={option.value}
                                value={option.value}
                              >
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Dates Section */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Dates</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="submitDate"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Submit Date</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant="outline"
                                  className={cn(
                                    "w-full pl-3 text-left font-normal",
                                    !field.value && "text-muted-foreground"
                                  )}
                                >
                                  {field.value ? (
                                    format(field.value, "PPP")
                                  ) : (
                                    <span>Pick a date</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent
                              className="w-auto p-0"
                              align="start"
                            >
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={(date) =>
                                  date > new Date() ||
                                  date < new Date("1900-01-01")
                                }
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="approvalDate"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Approval Date (Optional)</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant="outline"
                                  className={cn(
                                    "w-full pl-3 text-left font-normal",
                                    !field.value && "text-muted-foreground"
                                  )}
                                >
                                  {field.value ? (
                                    format(field.value, "PPP")
                                  ) : (
                                    <span>Pick a date</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent
                              className="w-auto p-0"
                              align="start"
                            >
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={(date) =>
                                  date > new Date() ||
                                  date < new Date("1900-01-01")
                                }
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* Documents Section */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Documents</h3>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={addDocument}
                      className="flex items-center gap-2"
                    >
                      <PlusIcon className="h-4 w-4" />
                      Add Document
                    </Button>
                  </div>

                  {documents.map((document, index) => (
                    <Card
                      key={index}
                      className="p-4 border-2 border-border hover:border-primary/50 transition-colors"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">Document {index + 1}</h4>
                          <span className="text-xs text-muted-foreground">
                            ({documents.length} total)
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => duplicateDocument(index)}
                            className="h-8 w-8"
                            title="Duplicate document"
                          >
                            <CopyIcon className="h-4 w-4" />
                          </Button>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => moveDocumentUp(index)}
                            disabled={index === 0}
                            className="h-8 w-8"
                            title="Move up"
                          >
                            <ChevronUpIcon className="h-4 w-4" />
                          </Button>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => moveDocumentDown(index)}
                            disabled={index === documents.length - 1}
                            className="h-8 w-8"
                            title="Move down"
                          >
                            <ChevronDownIcon className="h-4 w-4" />
                          </Button>
                          {documents.length > 1 && (
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              onClick={() => removeDocument(index)}
                              className="h-8 w-8 text-destructive hover:text-destructive"
                              title="Remove document"
                            >
                              <TrashIcon className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name={`documents.${index}.urgency`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Urgency *</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                value={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select urgency" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {urgencyOptions.map((option) => (
                                    <SelectItem
                                      key={option.value}
                                      value={option.value}
                                    >
                                      {option.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name={`documents.${index}.documentType`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Document Type *</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                value={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select document type" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {documentTypeOptions.map((option) => (
                                    <SelectItem
                                      key={option.value}
                                      value={option.value}
                                    >
                                      {option.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name={`documents.${index}.documentTitle`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Document Title *</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Enter document title"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name={`documents.${index}.documentNumber`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Document Number *</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Enter document number"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </Card>
                  ))}
                </div>

                {/* Form Actions */}
                <div className="flex flex-col sm:flex-row gap-4 justify-end pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.back()}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => form.reset()}
                  >
                    Reset
                  </Button>
                  <Button type="submit">Update Document</Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function EditDocument() {
  return (
    <Suspense
      fallback={
        <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <Card>
              <CardContent className="py-8">
                <div className="text-center">Loading document...</div>
              </CardContent>
            </Card>
          </div>
        </div>
      }
    >
      <EditDocumentContent />
    </Suspense>
  );
}
