import { AppError } from "../../shared/errors/AppError";
import { ALLOWED_LOCATIONS, ALLOWED_SECTORS, ALLOWED_SUBSECTORS, ALLOWED_TAGS } from "../../shared/constants/search";
import { AIParsedFilters} from "./ai-parser.types";
import { aiParsedFiltersSchema } from "./ai-parser.validation";

export class AIParserService {

    async parsePrompt(prompt: string): Promise<AIParsedFilters> {

        const normalizedPrompt = prompt.trim().toLowerCase();
        const filters: AIParsedFilters = {};

        const sector= ALLOWED_SECTORS.find((item) => normalizedPrompt?.includes(item.toLowerCase()));
        const subSector = ALLOWED_SUBSECTORS.find((item) => normalizedPrompt?.includes(item.toLowerCase()));
        const location = ALLOWED_LOCATIONS.find((item) => normalizedPrompt?.includes(item.toLowerCase()));
        const tags = ALLOWED_TAGS.filter((item) => normalizedPrompt?.includes(item.toLowerCase()));

        if (sector) filters.sector = sector;
        if (subSector) filters.subSector = subSector;
        if (location) filters.location = location;
        
        const searchResults= aiParsedFiltersSchema.parse(filters);

        if(Object.keys(searchResults).length === 0){
            throw new AppError("Unable to parse the prompt. Please provide more specific details.", 400);
        }
        
        return searchResults;   
    }
}