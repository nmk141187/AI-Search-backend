import { CompanyDcoument } from "./company.model";
import { CompanyRepository } from "./company.repository";
import { CompanyExportFilters, CompanySearchFilters, CompanySearchResult } from "./company.types";

export class CompanyService {
    constructor(private  readonly companyRepository: CompanyRepository) {}

    async searchCompanies(filters: CompanySearchFilters): Promise<CompanySearchResult<CompanyDcoument>> {
        return this.companyRepository.search(filters);
    }

    exportCompanies(filters: CompanyExportFilters) {
        return this.companyRepository.exportSearch(filters);
    }
}
