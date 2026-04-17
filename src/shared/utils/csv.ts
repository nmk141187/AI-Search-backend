import { stringify } from "csv-stringify";

export function createCompanyCsvStringifier(){
    return stringify({
        header: true,
        columns: [
            { key: "companyName", header: "Company Name" },
            { key: "email", header: "Email" },
            { key: "phone", header: "Phone" },
            { key: "sector", header: "Sector" },
            { key: "subSector", header: "Sub-Sector" },
            { key: "location", header: "Location" },
            { key: "linkedIn", header: "LinkedIn" },    
            { key: "tags", header: "Tags" },
        ]
    });

}