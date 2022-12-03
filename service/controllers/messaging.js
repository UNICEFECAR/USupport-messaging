import {
  getChatByIdQuery,
  addMessageToChatQuery,
  updateClientSocketByChatIdQuery,
  updateProviderSocketByChatIdQuery,
} from "#queries/messaging";

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

export const getClientSocketByChatId = async ({
  country,
  language,
  chatId,
}) => {
  return await getChatByIdQuery({ poolCountry: country, chatId })
    .then((res) => {
      if (res.rowCount === 0) {
        return chatNotFound(language);
      } else {
        const { client_socket_id } = res.rows[0];
        return { client_socket_id };
      }
    })
    .catch((err) => {
      throw err;
    });
};

export const updateClientSocketByChatId = async ({
  country,
  language,
  chatId,
  socketId,
}) => {
  return await updateClientSocketByChatIdQuery({
    poolCountry: country,
    chatId,
    socketId,
  })
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

export const getProviderSocketByChatId = async ({
  country,
  language,
  chatId,
}) => {
  return await getChatByIdQuery({ poolCountry: country, chatId })
    .then((res) => {
      if (res.rowCount === 0) {
        return chatNotFound(language);
      } else {
        const { provider_socket_id } = res.rows[0];
        return { provider_socket_id };
      }
    })
    .catch((err) => {
      throw err;
    });
};

export const updateProviderSocketByChatId = async ({
  country,
  language,
  chatId,
  socketId,
}) => {
  return await updateProviderSocketByChatIdQuery({
    poolCountry: country,
    chatId,
    socketId,
  })
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
