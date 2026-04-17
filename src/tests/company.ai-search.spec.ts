import request from 'supertest';
import { app } from '../app';
import { CompanyModel } from '../modules/company/company.model';

describe('AI company search API', () => {
  beforeEach(async () => {
    await CompanyModel.insertMany([
      {
        companyName: 'Acme Payments',
        email: 'acme@test.com',
        phone: '1234567890',
        sector: 'Fintech',
        subSector: 'Payments',
        location: 'London',
        linkedIn: 'https://linkedin.com/company/acme',
        tags: ['payments', 'api']
      },
      {
        companyName: 'Care Health',
        email: 'care@test.com',
        phone: '1234567891',
        sector: 'HealthTech',
        subSector: 'Telemedicine',
        location: 'Mumbai',
        linkedIn: 'https://linkedin.com/company/care',
        tags: ['growth']
      }
    ]);
  });

  it('should parse prompt and return matching records', async () => {
    const response = await request(app)
      .post('/api/v1/companies/ai-search')
      .send({ prompt: 'Fintech companies in London doing payments' });

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.parsedFilters.sector).toBe('Fintech');
    expect(response.body.parsedFilters.location).toBe('London');
    expect(response.body.data).toHaveLength(1);
  });

  it('should fail when prompt is empty', async () => {
    const response = await request(app)
      .post('/api/v1/companies/ai-search')
      .send({ prompt: '' });

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
  });
});
