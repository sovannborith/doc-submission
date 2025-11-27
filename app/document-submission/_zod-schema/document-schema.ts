import { z } from "zod";

const documentItemSchema = z.object({
  urgency: z.string().min(1, { message: "Urgency is required" }),
  documentType: z.string().min(1, { message: "Document Type is required" }),
  documentTitle: z
    .string()
    .min(1, { message: "Document Title must be at least 1 character" }),
  documentNumber: z
    .string()
    .min(1, { message: "Document Number must be at least 1 character" }),
  documentDescription: z.string().optional(),
  documentStatus: z.string().optional(),
  documentUrl: z.string().optional(),
  documentStage: z.string().optional(),
});

export const documentSchema = z.object({
  requestorName: z.string().min(1, { message: "Requestor Name is required" }),
  buFu: z.string().min(1, { message: "BU/FU is required" }),
  extension: z.string().min(1, { message: "Extension is required" }),
  documents: z.array(documentItemSchema).min(1, {
    message: "At least one document is required",
  }),
  submitDate: z.coerce.date(),
  approvalDate: z.coerce.date().optional(),
});

export type DocumentSchemaType = z.infer<typeof documentSchema>;
export type DocumentItemSchemaType = z.infer<typeof documentItemSchema>;
