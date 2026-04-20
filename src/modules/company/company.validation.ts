import { z } from "zod";
import { ALLOWED_LOCATIONS, ALLOWED_SECTORS, ALLOWED_SUBSECTORS, ALLOWED_TAGS } from "../../shared/constants/search";

const searchableString = z.string().trim().min(1).max(500);

export const searchCompaniesQuerySchema = z.object({
    sector: z.enum(ALLOWED_SECTORS).optional(),
    subSector: z.preprocess(
    (value) => (typeof value === 'string' ? value.trim() : value),
    z.enum(ALLOWED_SUBSECTORS).optional()
  ),
    location: z.enum(ALLOWED_LOCATIONS).optional(), 
    tags: z.union([z.enum(ALLOWED_TAGS), z.array(z.enum(ALLOWED_TAGS)), 
    searchableString.transform((value)=> value.split(',').map((item)=> item.trim()))]).optional(),
    page: z.coerce.number().int().positive().default(1),
    limit: z.coerce.number().int().positive().max(100).default(10),
});

export const exportCompaniesQuerySchema = z.object({
    sector: z.enum(ALLOWED_SECTORS).optional(),
    subSector: z.enum(ALLOWED_SUBSECTORS).optional(),
    location: z.enum(ALLOWED_LOCATIONS).optional(), 
    tags: z.union([z.enum(ALLOWED_TAGS), z.array(z.enum(ALLOWED_TAGS)), 
    searchableString.transform((value)=> value.split(',').map((item)=> item.trim()))]).optional(),
});

export const normalizeTags = (tags: string | string[] | undefined): string[] | undefined => {
    if (!tags) return undefined;
    if(Array.isArray(tags)) return tags as string[];
    if (typeof tags === 'string') return tags.split(',').map(tag => tag.trim());
    return undefined;
};