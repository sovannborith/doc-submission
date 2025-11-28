"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircleIcon, PlusIcon, TrashIcon, ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import {
  documentSchema,
  DocumentSchemaType,
} from "../../_zod-schema/document-schema";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";
// Sample BU/FU options - replace with your actual data source
const buFuOptions = [
  { value: "fbit", label: "FBIT" },
  { value: "fceg", label: "FCEG" },
  { value: "fhrf", label: "FHRF" },
  { value: "fsco", label: "FSCO" },
  { value: "TSS", label: "TSS" },
  { value: "chs", label: "CHS" },
  { value: "cps", label: "CPS" },
  { value: "sts", label: "STS" },
  { value: "dcc", label: "DCC" },
  { value: "fcfa", label: "FCFA" },
  { value: "fcmt", label: "FCMT" },
  { value: "fprm", label: "FPRM" },
  { value: "edc", label: "EDC" },
  { value: "fdcm", label: "FDCM" },
];

// Sample urgency options
const urgencyOptions = [
  { value: "non-urgent", label: "Non-Urgent" },
  { value: "urgent", label: "Urgent" },
  { value: "e-signature", label: "E-Signature" },
  { value: "revision(edc)", label: "Revision (EDC)" },
  { value: "revision(bufu)", label: "Revision (BU/FU)" },
];

// Sample document type options
const documentTypeOptions = [
  { value: "1", label: "Costing Calculation Sheet" },
  { value: "2", label: "Purchase Requisition Form General" },
  { value: "3", label: "Price Lis" },
  { value: "4", label: "Training Bond Agreement" },
  { value: "5", label: "Letter to Calmette" },
  { value: "6", label: "Quotation to Customer" },
  { value: "7", label: "Expenses Exception Request Form" },
  { value: "8", label: "Stock Adjustment" },
  { value: "9", label: "Others" },
];

export default function CreateDocument() {
  const router = useRouter();

  function initializeForm(): DocumentSchemaType {
    return {
      requestorName: "Sovannborith",
      buFu: "bu-001", // FIXED: Use a valid value from buFuOptions
      extension: "203",
      documents: [
        {
          urgency: "urgent", // FIXED: Changed from "Urgent" to "urgent"
          documentType: "contract", // FIXED: Changed from "MoC" to a valid documentType value
          documentTitle: "Test",
          documentNumber: "0000000",
          documentDescription: "",
          documentUrl: "",
        },
      ],
      submitDate: new Date(),
      approvalDate: undefined,
    };
  }

  const form = useForm<DocumentSchemaType>({
    resolver: zodResolver(documentSchema),
    defaultValues: initializeForm(),
  });

  const documents = form.watch("documents");

  const onSubmit = (values: DocumentSchemaType) => {
    console.log("Form submitted:", values);
    toast.success("Documents Submitted", {
      description: "Documents submitted successfully",
      icon: <CheckCircleIcon className="h-4 w-4 text-primary" />,
    });
    // Add a small delay to allow the toast to be visible before redirecting
    router.push("/document-submission/document-list");
    // Handle form submission here
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
        documentDescription: "",
        documentUrl: "",
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

  return (
    <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <Link href="/document-submission/document-list">
            <Button variant="ghost" size="icon" className="cursor-pointer">
              <ArrowLeft className="h-4 w-4 text-primary" />
            </Button>
          </Link>
          <h1 className="text-3xl font-semibold text-foreground">
            Document Submission Form
          </h1>
        </div>
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl sm:text-3xl sr-only">
              Document Submission Form
            </CardTitle>
            <CardDescription>
              <ul className="flex flex-col list-disc mt-4 p-5">
                <li>
                  Submitted prior to 3pm will be processed same day if document
                  submitted after 3pm will be processed the following day
                </li>
                <li>Complete with all supporting docs attached</li>
                <li>Information verified & reconciled</li>
                <li>No spelling/grammar errors</li>
                <li>Well-prepared and properly formatted</li>
              </ul>
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
                      name="buFu"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>BU/FU *</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="w-full max-w-450-[450px]">
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
                    <Card key={index} className="p-4">
                      <div className="flex items-start justify-between mb-4">
                        <h4 className="font-medium">Document {index + 1}</h4>
                        {documents.length > 1 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => removeDocument(index)}
                            className="h-8 w-8 text-destructive hover:text-destructive"
                          >
                            <TrashIcon className="h-4 w-4" />
                          </Button>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name={`documents.${index}.documentType`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Document Type *</FormLabel>
                              <FormControl>
                                <select
                                  className={cn(
                                    "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
                                    !field.value && "text-muted-foreground"
                                  )}
                                  {...field}
                                >
                                  <option value="">Select document type</option>
                                  {documentTypeOptions.map((option) => (
                                    <option
                                      key={option.value}
                                      value={option.value}
                                    >
                                      {option.label}
                                    </option>
                                  ))}
                                </select>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name={`documents.${index}.urgency`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Urgency *</FormLabel>
                              <FormControl>
                                <select
                                  className={cn(
                                    "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
                                    !field.value && "text-muted-foreground"
                                  )}
                                  {...field}
                                >
                                  <option value="">Select urgency</option>
                                  {urgencyOptions.map((option) => (
                                    <option
                                      key={option.value}
                                      value={option.value}
                                    >
                                      {option.label}
                                    </option>
                                  ))}
                                </select>
                              </FormControl>
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

                      <FormField
                        control={form.control}
                        name={`documents.${index}.documentDescription`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Enter document description"
                                className="min-h-24"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name={`documents.${index}.documentUrl`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Document URL</FormLabel>
                            <FormControl>
                              <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                  <Input
                                    type="file"
                                    accept=".pdf"
                                    className="cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-primary file:text-primary-foreground hover:file:bg-primary/90 file:inline-flex file:items-center file:justify-center file:leading-none"
                                    onChange={(
                                      e: React.ChangeEvent<HTMLInputElement>
                                    ) => {
                                      const file = e.target.files?.[0];
                                      if (file) {
                                        // Create a URL for the file (in production, you'd upload to a server)
                                        const fileUrl =
                                          URL.createObjectURL(file);
                                        field.onChange(fileUrl);
                                      }
                                    }}
                                  />
                                </div>
                                {/* {field.value && (
                                  <p className="text-sm text-muted-foreground">
                                    File selected:{" "}
                                    {field.value.split("/").pop() || "Document"}
                                  </p>
                                )} */}
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </Card>
                  ))}
                </div>

                {/* Form Actions */}
                <div className="flex flex-col sm:flex-row gap-4 justify-end pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    className="cursor-pointer"
                    onClick={() => form.reset()}
                  >
                    Reset
                  </Button>
                  <Button type="submit" className="cursor-pointer">
                    Submit
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
