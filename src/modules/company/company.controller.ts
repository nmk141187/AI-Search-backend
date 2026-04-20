import { NextFunction, Request, Response } from "express";
import { createCompanyCsvStringifier } from "../../shared/utils/csv";
import { AppError } from "../../shared/errors/AppError";
import { exportCompaniesQuerySchema, normalizeTags, searchCompaniesQuerySchema } from "./company.validation";
import { CompanyService } from "./company.service";
import { AIParserService } from "../ai/ai-parser.service";
import { aiPromptSchema } from "../ai/ai-parser.validation";


export class CompanyController {

    constructor(
        private readonly companyService: CompanyService,
        private readonly aiParserService: AIParserService
    ) { }

    searchCompanies = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {

            const data = searchCompaniesQuerySchema.parse({
                sector: req.query.sector,
                subSector: req.query.subSector,
                location: req.query.location,
                tags: normalizeTags(req.query.tags as string | string[] | undefined),
                page: req.query.page,
                limit: req.query.limit,
            });

            const filters = {
                sector: data.sector,
                subSector: data.subSector,
                location: data.location,
                tags: data.tags ? (Array.isArray(data.tags) ? data.tags : [data.tags]) : undefined,
                page: data.page,
                limit: data.limit,
            };

            const results = await this.companyService.searchCompanies(filters);

            res.status(200).json({
                success: true,
                message: "Companies details fetched successfully",
                ...results
            });

        } catch (error) {
            next(error);
        }
    }

    aiSearchCompanies = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { prompt } = aiPromptSchema.parse(req.body);
            const aiparsedFilters = await this.aiParserService.parsePrompt(prompt);


            const results = await this.companyService.searchCompanies({
                ...aiparsedFilters,
                tags: aiparsedFilters.tags ? Array.isArray(aiparsedFilters.tags) ? aiparsedFilters.tags : [aiparsedFilters.tags] : undefined,
                page: 1,
                limit: 10
            });

            res.status(200).json({
                success: true,
                message: "Companies details fetched successfully",
                parsedFilters: aiparsedFilters,
                ...results
            });

        } catch (error) {
            next(error);
        }
    }

    exportCompanies = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const data = exportCompaniesQuerySchema.parse({
                ...req.query,
                tags: normalizeTags(req.query.tags as string | string[] | undefined)
            });

            const filters = {
                sector: data.sector,
                subSector: data.subSector,
                location: data.location,
                tags: data.tags ? Array.isArray(data.tags) ? data.tags : [data.tags] : undefined,
            };

            const cursor = await this.companyService.exportCompanies(filters);
            const csvStringifier = createCompanyCsvStringifier();

            res.setHeader('Content-Type', 'text/csv');
            res.setHeader('Content-Disposition', 'attachment; filename=companies.csv');

            csvStringifier.pipe(res);

            for await (const company of cursor) {
                csvStringifier.write({
                    companyName: company.companyName,
                    email: company.email,
                    phone: company.phone,
                    sector: company.sector,
                    subSector: company.subSector,
                    location: company.location,
                    linkedIn: company.linkedIn || '',
                    tags: Array.isArray(company.tags) ? company.tags.join(',') : (company.tags || '')
                });
            }
            csvStringifier.end();

        } catch (error) {
            next(error);
        }
    };

    health = async (req: Request, res: Response): Promise<void> => {
        res.status(200).json({
            message: "Company service is healthy"
        });
    }

    aiSearchandExport = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { prompt } = aiPromptSchema.parse(req.body);
            const aiparsedFilters = await this.aiParserService.parsePrompt(prompt);
            const cursor = await this.companyService.exportCompanies(aiparsedFilters);
            const csvStringifier = createCompanyCsvStringifier();

            res.setHeader('Content-Type', 'text/csv');
            res.setHeader('Content-Disposition', 'attachment; filename=companies.csv');

            csvStringifier.pipe(res);

            for await (const company of cursor) {
                csvStringifier.write({
                    companyName: company.companyName,
                    email: company.email,
                    phone: company.phone,
                    sector: company.sector,
                    subSector: company.subSector,
                    location: company.location,
                    linkedIn: company.linkedIn || '',
                    tags: Array.isArray(company.tags) ? company.tags.join(',') : (company.tags || '')
                });
            }
            csvStringifier.end();

        } catch (error) {
            next(error);
        }
    };

}

export function ensureCompanyController(controller: CompanyController | null): asserts controller is CompanyController {
    if (!controller) {
        throw new AppError('CompanyController instance is required', 500);
    }
}