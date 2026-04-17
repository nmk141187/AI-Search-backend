import { Router } from "express";
import { companyRoutes } from "../modules/company/company.routes";

const router = Router();

router.get('/health', (req,res) =>{
  res.status(200).json({
    message: "API Service is Healthy"
  });       
});

router.use('/api/v1/companies', companyRoutes);

export { router };