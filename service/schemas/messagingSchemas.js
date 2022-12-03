import * as yup from "yup";

export const getChatByIdSchema = yup.object().shape({
  country: yup.string().required(),
  language: yup.string().required(),
  chatId: yup.string().uuid().required(),
});

export const addMessageToChatSchema = yup.object().shape({
  country: yup.string().required(),
  language: yup.string().required(),
  chatId: yup.string().uuid().required(),
  message: yup.object().shape({
    type: yup.string().oneOf(["text", "system"]).required(),
    senderId: yup.string().uuid().required(),
    time: yup.string().required(),
    content: yup.string().required(),
  }),
});

export const getClientSocketByChatIdSchema = yup.object().shape({
  country: yup.string().required(),
  language: yup.string().required(),
  chatId: yup.string().uuid().required(),
});

export const updateClientSocketByChatIdSchema = yup.object().shape({
  country: yup.string().required(),
  language: yup.string().required(),
  chatId: yup.string().uuid().required(),
  socketId: yup.string().required(),
});

export const getProviderSocketByChatIdSchema = yup.object().shape({
  country: yup.string().required(),
  language: yup.string().required(),
  chatId: yup.string().uuid().required(),
});

export const updateProviderSocketByChatIdSchema = yup.object().shape({
  country: yup.string().required(),
  language: yup.string().required(),
  chatId: yup.string().uuid().required(),
  socketId: yup.string().required(),
});
