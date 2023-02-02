import express from "express";

import { populateUser } from "#middlewares/populateMiddleware";

import {
  getChatById,
  updateSocketByChatId,
  addMessageToChat,
} from "#controllers/messaging";

import {
  getChatByIdSchema,
  updateChatIdSchema,
  addMessageToChatSchema,
} from "#schemas/messagingSchemas";

const router = express.Router();

router
  .route("/")
  .get(async (req, res, next) => {
    /**
     * #route   GET /messaging/v1/
     * #desc    Get a chat by given ID
     */
    const country = req.header("x-country-alpha-2");
    const language = req.header("x-language-alpha-2");
    const chatId = req.query.chatId;

    return await getChatByIdSchema
      .noUnknown(true)
      .strict(true)
      .validate({ country, language, chatId })
      .then(getChatById)
      .then((result) => res.status(200).send(result))
      .catch(next);
  })
  .put(populateUser, async (req, res, next) => {
    /**
     * #route   PUT /messaging/v1/
     * #desc    Add a message to the given chat
     */
    const country = req.header("x-country-alpha-2");
    const language = req.header("x-language-alpha-2");

    const user = req.user;
    let payload = req.body;

    if (payload && payload.message) {
      if (user.type === "client") {
        payload.message.senderId = user.client_detail_id;
      } else if (user.type === "provider") {
        payload.message.senderId = user.provider_detail_id;
      }
    }

    return await addMessageToChatSchema
      .noUnknown(true)
      .strict()
      .validate({ ...payload, country, language })
      .then(addMessageToChat)
      .then((result) => res.status(200).send(result))
      .catch(next);
  });

router
  .route("/client-socket")
  .get(async (req, res, next) => {
    /**
     * #route   GET /messaging/v1/client-socket
     * #desc    Get a client socket by given chat ID
     */
    const country = req.header("x-country-alpha-2");
    const language = req.header("x-language-alpha-2");

    const chatId = req.query.chatId;

    return await getChatByIdSchema
      .noUnknown(true)
      .strict(true)
      .validate({ country, language, chatId, socketType: "client" })
      .then(getChatById)
      .then((result) => res.status(200).send(result))
      .catch(next);
  })
  .put(async (req, res, next) => {
    /**
     * #route   PUT /messaging/v1/client-socket
     * #desc    Update the client socket ID for a given chat ID
     */
    const country = req.header("x-country-alpha-2");
    const language = req.header("x-language-alpha-2");

    const payload = req.body;

    return await updateChatIdSchema
      .noUnknown(true)
      .strict()
      .validate({ ...payload, country, language, socketType: "client" })
      .then(updateSocketByChatId)
      .then((result) => res.status(200).send(result))
      .catch(next);
  });

router
  .route("/provider-socket")
  .get(async (req, res, next) => {
    /**
     * #route   GET /messaging/v1/provider-socket
     * #desc    Get a provider socket by given chat ID
     */
    const country = req.header("x-country-alpha-2");
    const language = req.header("x-language-alpha-2");

    const chatId = req.query.chatId;

    return await getChatByIdSchema
      .noUnknown(true)
      .strict(true)
      .validate({ country, language, chatId, socketType: "provider" })
      .then(getChatById)
      .then((result) => res.status(200).send(result))
      .catch(next);
  })
  .put(async (req, res, next) => {
    /**
     * #route   PUT /messaging/v1/provider-socket
     * #desc    Update the provider socket ID for a given chat ID
     */
    const country = req.header("x-country-alpha-2");
    const language = req.header("x-language-alpha-2");

    const payload = req.body;

    return await updateChatIdSchema
      .noUnknown(true)
      .strict()
      .validate({ ...payload, country, language, socketType: "provider" })
      .then(updateSocketByChatId)
      .then((result) => res.status(200).send(result))
      .catch(next);
  });

export { router };
