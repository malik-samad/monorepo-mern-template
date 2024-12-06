import dotenv from "dotenv";

dotenv.config({ path: `.env` });
export const NODE_CONFIG_ENV = process.env.NODE_CONFIG_ENV ?? "development";
dotenv.config({ path: `.env.${NODE_CONFIG_ENV}.local` });
dotenv.config({ path: `.env.${NODE_CONFIG_ENV}` });
export const { ENVIRONMENT, PORT, NODE_ENV } = {
  ENVIRONMENT: NODE_CONFIG_ENV,
  ...process.env,
} as {
  [key: string]: string;
};
export const IS_LOCAL = NODE_ENV == "local";
