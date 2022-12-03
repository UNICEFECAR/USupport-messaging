import { getDBPool } from "#utils/dbConfig";

export const getChatByIdQuery = async ({ poolCountry, chatId }) =>
  await getDBPool("clinicalDb", poolCountry).query(
    `
      SELECT chat_id, client_detail_id, provider_detail_id, messages, date, client_socket_id, provider_socket_id
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

export const updateClientSocketByChatIdQuery = async ({
  poolCountry,
  chatId,
  socketId,
}) =>
  await getDBPool("clinicalDb", poolCountry).query(
    `
        UPDATE chat
        SET client_socket_id = $2
        WHERE chat_id = $1
        RETURNING *;
      `,
    [chatId, socketId]
  );

export const updateProviderSocketByChatIdQuery = async ({
  poolCountry,
  chatId,
  socketId,
}) =>
  await getDBPool("clinicalDb", poolCountry).query(
    `
        UPDATE chat
        SET provider_socket_id = $2
        WHERE chat_id = $1
        RETURNING *;
      `,
    [chatId, socketId]
  );
