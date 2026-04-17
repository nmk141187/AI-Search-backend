import request from 'supertest';
import { app } from '../app';
import { CompanyModel } from '../modules/company/company.model';

describe('Company export API', () => {
  beforeEach(async () => {
    await CompanyModel.insertMany([
      {
        companyName: 'Export Payments',
        email: 'export@test.com',
        phone: '1234567890',
        sector: 'Fintech',
        subSector: 'Payments',
        location: 'London',
        linkedIn: 'https://linkedin.com/company/export',
        tags: ['payments']
      }
    ]);
  });

  it('should export csv with correct headers', async () => {
    const response = await request(app)
      .get('/api/v1/companies/export')
      .query({ sector: 'Fintech' });

    expect(response.status).toBe(200);
    expect(response.header['content-type']).toContain('text/csv');
    expect(response.text).toContain('Company Name');
    expect(response.text).toContain('Export Payments');
  });
});
