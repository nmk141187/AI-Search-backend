import { z } from 'zod';
import { ALLOWED_LOCATIONS, ALLOWED_SECTORS,ALLOWED_SUBSECTORS,ALLOWED_TAGS } from '../../shared/constants/search';

export const aiPromptSchema = z.object({
    prompt: z.string().trim().min(3).max(200)
});

export const aiParsedFiltersSchema = z.object({
    sector: z.enum(ALLOWED_SECTORS).optional(),
  subSector: z.enum(ALLOWED_SUBSECTORS).optional(),
  location: z.enum(ALLOWED_LOCATIONS).optional(),
  tags: z.array(z.enum(ALLOWED_TAGS)).optional()
});