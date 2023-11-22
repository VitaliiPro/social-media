import bcrypt from "bcrypt";
import { getClient } from "../db";

async function loadAdminUser(
  username: string,
  password: string,
): Promise<void> {
  const saltRound = 10;
  const hash = await bcrypt.hash(password, saltRound);

  const client = await getClient();

  await client.query(
    "insert into public.users (username, password, is_admin) values ($1, $2, $3)",
    [username, hash, true],
  );

  await client.end();
}

const username = process.argv[2];
const password = process.argv[3];

loadAdminUser(username, password);
