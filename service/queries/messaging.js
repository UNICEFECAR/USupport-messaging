import { getDBPool } from "#utils/dbConfig";

export const getChatByIdQuery = async ({ poolCountry, chatId }) =>
  await getDBPool("clinicalDb", poolCountry).query(
    `
      SELECT chat_id, client_detail_id, provider_detail_id, messages, date
      FROM chat
      WHERE chat_id = $1
    `,
    [chatId]
  );

export const addMessageToChatQuery = async ({ poolCountry, chatId, message }) =>
  await getDBPool("clinicalDb", poolCountry).query(
    `
      UPDATE chat
      SET messages = messages || $2::json
      WHERE chat_id = $1
      RETURNING *;
    `,
    [chatId, message]
  );
