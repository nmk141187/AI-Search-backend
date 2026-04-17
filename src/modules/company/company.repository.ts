import { FilterQuery } from "mongoose";
import { escapeRegex } from "../../shared/utils/regex";
import { getSkip,getTotalPages } from "../../shared/utils/pagination";
import { CompanyDcoument, CompanyModel } from "./company.model";
import { CompanyExportFilters, CompanySearchFilters, CompanySearchResult } from "./company.types";


export class CompanyRepository {

    buildQuery(filters: CompanyExportFilters): FilterQuery<CompanyDcoument> {

        const query: FilterQuery<CompanyDcoument> = {};

        if (filters.sector) {
            query.sector = new RegExp(`^${escapeRegex(filters.sector)}$`, 'i');
        }

        if (filters.subSector) {
            query.subSector = new RegExp(`^${escapeRegex(filters.subSector)}$`, 'i');
        }

        if (filters.location) {
            query.location = new RegExp(`^${escapeRegex(filters.location)}$`, 'i');
        }

        if (filters.tags && filters.tags?.length > 0) {
            query.tags = { $in: filters.tags};
        }
        return query;
    }

    async search(filters: CompanySearchFilters): Promise<CompanySearchResult<CompanyDcoument>> {
        const { page, limit, ...restFilters } = filters;
        const query = this.buildQuery(restFilters);
        const skip = getSkip(page, limit);

        const [data, total] = await Promise.all([
            CompanyModel.find(query).sort({companyName: 1}).skip(skip).limit(limit).lean(),
            CompanyModel.countDocuments(query).lean()
        ]);

        return {
            filters: restFilters,
            pagination: {
                page,
                limit,
                total,
                totalPages: getTotalPages(total, limit)
            },
            data: data as CompanyDcoument[]
        };
    }

    exportSearch(filters: CompanyExportFilters){
        const query = this.buildQuery(filters);
        return CompanyModel.find(query).sort({companyName: 1}).cursor();
    }

    async deleteAll(): Promise<void> {  
        await CompanyModel.deleteMany({});
    }

    async insertMany(companies: CompanyDcoument[] | Partial<CompanyDcoument>[]): Promise<void> {
        await CompanyModel.insertMany(companies);
    }
}