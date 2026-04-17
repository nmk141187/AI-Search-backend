import { faker, fi } from "@faker-js/faker";
import { connectDB, disconnectDB } from "../../config/db";
import { ALLOWED_SECTORS, ALLOWED_LOCATIONS, ALLOWED_SUBSECTORS, ALLOWED_TAGS } from "../../shared/constants/search";
import { CompanyRepository } from "./company.repository";
import { link } from "fs";

async function seedCompanies(count: number = 500): Promise<void> {
    const repository = new CompanyRepository();

      const data = Array.from({ length: count }). map(() => ({
        companyName: faker.company.name(),
        email: faker.internet.email().toLocaleLowerCase(),
        phone: faker.phone.number(),
        sector: faker.helpers.arrayElement([...ALLOWED_SECTORS]),
        subSector: faker.helpers.arrayElement([...ALLOWED_SUBSECTORS]),
        location: faker.helpers.arrayElement([...ALLOWED_LOCATIONS]),
        linkedIn: faker.internet.url(),
        tags: faker.helpers.arrayElements([...ALLOWED_TAGS], { min: 1, max: 5 })
      }));
      await repository.deleteAll();
      await repository.insertMany(data);
    }
  
      (async () => {
        try {
          await connectDB();
          await seedCompanies();
          console.log("Connected to MongoDB");
        } catch (error) {
            console.error("Error connecting to MongoDB:", error);
            process.exitCode = 1;
            } finally { 
                await disconnectDB();
                console.log("Disconnected from MongoDB");
            }   
        })();
