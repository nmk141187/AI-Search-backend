import request from 'supertest';
import { app } from '../app';
import { CompanyModel } from '../modules/company/company.model';

describe('Structured company search API', () => {
  beforeEach(async () => {
    await CompanyModel.insertMany([
      {
        companyName: 'Alpha Payments',
        email: 'alpha@test.com',
        phone: '1234567890',
        sector: 'Fintech',
        subSector: 'Payments',
        location: 'London',
        linkedIn: 'https://linkedin.com/company/alpha',
        tags: ['payments', 'b2b']
      },
      {
        companyName: 'Beta Analytics',
        email: 'beta@test.com',
        phone: '1234567891',
        sector: 'SaaS',
        subSector: 'Analytics',
        location: 'Berlin',
        linkedIn: 'https://linkedin.com/company/beta',
        tags: ['saas']
      }
    ]);
  });

  it('should return filtered companies by sector', async () => {
    const response = await request(app)
      .get('/api/v1/companies/search')
      .query({ sector: 'Fintech', page: 1, limit: 10 });

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data).toHaveLength(1);
    expect(response.body.pagination.total).toBe(1);
  });

  it('should return empty list when no records match', async () => {
    const response = await request(app)
      .get('/api/v1/companies/search')
      .query({ sector: 'EdTech', page: 1, limit: 10 });

    expect(response.status).toBe(200);
    expect(response.body.data).toHaveLength(0);
    expect(response.body.pagination.total).toBe(0);
  });

  it('should reject invalid limit', async () => {
    const response = await request(app)
      .get('/api/v1/companies/search')
      .query({ sector: 'Fintech', limit: 500 });

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
  });
});
