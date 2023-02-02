import * as yup from "yup";

export const getChatByIdSchema = yup.object().shape({
  country: yup.string().required(),
  language: yup.string().required(),
  chatId: yup.string().uuid().required(),
  socketType: yup
    .string()
    .oneOf(["provider", "client"])
    .nullable()
    .notRequired(),
});

export const updateChatIdSchema = getChatByIdSchema.shape({
  socketId: yup.string().required(),
});

export const addMessageToChatSchema = getChatByIdSchema.shape({
  message: yup.object().shape({
    type: yup.string().oneOf(["text", "system"]).required(),
    senderId: yup.string().uuid().required(),
    time: yup.string().required(),
    content: yup.string().required(),
  }),
});
