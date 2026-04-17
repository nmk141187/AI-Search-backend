import { Router } from 'express';
import { AIParserService } from '../ai/ai-parser.service';
import { CompanyController } from './company.controller';
import { CompanyRepository } from './company.repository';
import { CompanyService } from './company.service';

const router = Router();

const companyRepository = new CompanyRepository();
const companyService = new CompanyService(companyRepository);
const aiParserService = new AIParserService();
const companyController = new CompanyController(companyService, aiParserService);

router.get('/search', companyController.searchCompanies);
router.post('/ai-search', companyController.aiSearchCompanies);
router.get('/export', companyController.exportCompanies);
router.post('/ai-search/export', companyController.aiSearchandExport);

export { router as companyRoutes };