import { faker } from "@faker-js/faker";
import bcrypt from "bcrypt";
import * as process from "process";
import { getClient } from "../db";

async function loadFakeData(numUsers: number = 10): Promise<void> {
  const client = await getClient();

  try {
    await client.query("begin");

    for (let i = 0; i < numUsers; i++) {
      const saltRound = 10;
      const hash = await bcrypt.hash("string123", saltRound);

      await client.query(
        "insert into public.users (username, password, avatar) values ($1, $2, $3)",
        [faker.internet.userName(), hash, faker.image.avatar()],
      );
    }

    const res = await client.query(
      "select id from public.users order by created_at desc limit $1",
      [numUsers],
    );

    for (const row of res.rows) {
      for (let i = 0; i < Math.ceil(Math.random() * 50); i++) {
        await client.query(
          "insert into public.posts (user_id, content) values($1, $2)",
          [row.id, faker.lorem.sentence()],
        );
      }
    }

    for (const row1 of res.rows) {
      for (const row2 of res.rows) {
        if (row1.id !== row2.id) {
          if (Math.random() > 0.5) {
            await client.query(
              "insert into follows (user_id, follower_id) values ($1, $2)",
              [row1.id, row2.id],
            );
          }
        }
      }
    }

    await client.query("commit");
  } catch (error) {
    await client.query("rollback");
    throw error;
  } finally {
    await client.end();
  }
}

const numUsers = parseInt(process.argv[2]) || 10;

loadFakeData(numUsers);
