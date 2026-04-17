import { InferSchemaType, Schema, model } from "mongoose";

const companySchema = new Schema({
    companyName: { type: String, required: true, index: true},
    email: { type: String, required: true },
    phone: { type: String, required: true },
    sector: { type: String, required: true, index: true },
    subSector: { type: String, required: true, index: true },
    location: { type: String, required: true, index: true },
    linkedIn: { type: String, default: '' },
    tags: [{ type: String, default: '' }]
},
{
   timestamps: true,
   versionKey: false 
}
);

companySchema.index({ sector: 1, subSector: 1, location: 1 });
companySchema.index({ companyName: 'text', subSector: 'text', location: 'text'});

export type CompanyDcoument = InferSchemaType<typeof companySchema>;
export const CompanyModel = model<CompanyDcoument>('Company', companySchema);