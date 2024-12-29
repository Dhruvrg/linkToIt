import { z } from "zod";

export const CreateProjectValidation = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be at most 25 characters"),
  description: z
    .string()
    .max(100, "Description must be at most 100 characters"),
});

export const CreateLinkValidation = z.object({
  destination: z.string().url({ message: "Please enter a valid URL" }),
  title: z.string().min(2, { message: "Title must be at least 2 characters" }),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters" }),
  shortUrl: z
    .string()
    .min(3, { message: "Short URL name must be at least 3 characters" }),
  utmMedium: z.string().optional(),
  utmCampaign: z.string().optional(),
  utmSource: z.string().optional(),
  utmTerm: z.string().optional(),
  utmContent: z.string().optional(),
});
