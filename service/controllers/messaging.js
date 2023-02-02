import {
  getChatByIdQuery,
  addMessageToChatQuery,
  updateSocketByChatIdQuery,
} from "#queries/messaging";

import { chatNotFound } from "#utils/errors";

export const getChatById = async ({
  country,
  language,
  chatId,
  socketType,
}) => {
  const chatData = await getChatByIdQuery({ poolCountry: country, chatId })
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

  switch (socketType) {
    case "provider": {
      const { provider_socket_id } = chatData;
      return { provider_socket_id };
    }
    case "client": {
      const { client_socket_id } = chatData;
      return { client_socket_id };
    }
    default: {
      return chatData;
    }
  }
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

export const updateSocketByChatId = async (props) => {
  return await updateSocketByChatIdQuery({
    ...props,
    poolCountry: props.country,
  })
    .then((res) => {
      if (res.rowCount === 0) {
        return chatNotFound(props.language);
      } else {
        return res.rows[0];
      }
    })
    .catch((err) => {
      throw err;
    });
};
