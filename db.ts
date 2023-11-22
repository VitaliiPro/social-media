import { Client } from "pg";
import { loadEnvConfig } from "@next/env";
import process from "process";

const projectDir = process.cwd();
loadEnvConfig(projectDir);

export async function getClient(): Promise<Client> {
  const client = new Client({
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_NAME,
    password: process.env.POSTGRES_PASSWORD,
    port: parseInt(process.env.POSTGRES_PORT!),
  });

  await client.connect();

  return client;
}
