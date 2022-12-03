import { getChatByIdQuery, addMessageToChatQuery } from "#queries/messaging";

import { chatNotFound } from "#utils/errors";

export const getChatById = async ({ country, language, chatId }) => {
  return await getChatByIdQuery({ poolCountry: country, chatId })
    .then((res) => {
      if (res.rowCount === 0) {
        return chatNotFound(language);
      } else {
        return res.rows[0];
      }
    })
    .catch((err) => {
      throw err;
    });
};

export const addMessageToChat = async ({
  country,
  language,
  chatId,
  message,
}) => {
  return await addMessageToChatQuery({ poolCountry: country, chatId, message })
    .then((res) => {
      if (res.rowCount === 0) {
        return chatNotFound(language);
      } else {
        return res.rows[0];
      }
    })
    .catch((err) => {
      throw err;
    });
};
