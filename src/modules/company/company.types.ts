export interface Company {
    companyName: string;
    email: string;
    phone: string;
    sector: string;
    subSector: string;
    location: string;
    linkedIn?: string;
    tags?: string[];
}

export interface CompanySearchFilters {
    sector?: string;
    subSector?: string;
    location?: string;
    tags?: string[];
    page:number;
    limit:number;   
}

export interface CompanyExportFilters {
    sector?: string;
    subSector?: string;
    location?: string;
    tags?: string[];
}

export interface CompanySearchResult<T> {
   filters: Omit<CompanySearchFilters, 'page' | 'limit'>;
   pagination: {
       page: number;
       limit: number;
       total: number;
       totalPages: number;
   };
   data: T[];
}