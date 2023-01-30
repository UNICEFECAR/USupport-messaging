import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

// KZ Database connection strings
const CLINICAL_DB_URL_KZ = process.env.CLINICAL_DB_URL_KZ;

export const getDBPool = (dbType, country) => {
  let currentConnString = null;

  switch (country) {
    case "KZ":
      if (dbType === "clinicalDb") currentConnString = CLINICAL_DB_URL_KZ;
      else throw Error("DB Type not recognized");

      break;
    default:
      throw Error("DB Country not recognized");
  }

  return new pg.Pool({ connectionString: currentConnString });
};
