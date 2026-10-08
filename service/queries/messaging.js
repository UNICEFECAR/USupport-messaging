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
      SET messages = CASE
        -- A retried message (e.g. after a lost response on a bad connection) is stored only once
        WHEN EXISTS (
          SELECT 1 FROM unnest(messages) AS existing
          WHERE existing->>'time' = $2::json->>'time'
            AND existing->>'senderId' = $2::json->>'senderId'
            AND existing->>'content' = $2::json->>'content'
        ) THEN messages
        ELSE messages || $2::json
      END
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

export const getAllChatDataQuery = async ({
  poolCountry,
  providerDetailId,
  clientDetailId,
}) => {
  return await getDBPool("clinicalDb", poolCountry).query(
    `
        SELECT chat_id, client_detail_id, provider_detail_id, messages, date, client_socket_id, provider_socket_id
        FROM chat
        WHERE client_detail_id = $1 AND provider_detail_id = $2
        ORDER BY created_at ASC
      `,
    [clientDetailId, providerDetailId]
  );
};
