import express from "express";

import { populateUser } from "#middlewares/populateMiddleware";

import {
  getChatById,
  addMessageToChat,
  getClientSocketByChatId,
  updateClientSocketByChatId,
  getProviderSocketByChatId,
  updateProviderSocketByChatId,
} from "#controllers/messaging";

import {
  getChatByIdSchema,
  addMessageToChatSchema,
  getClientSocketByChatIdSchema,
  updateClientSocketByChatIdSchema,
  getProviderSocketByChatIdSchema,
  updateProviderSocketByChatIdSchema,
} from "#schemas/messagingSchemas";

const router = express.Router();

router.get("/", async (req, res, next) => {
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
});

router.put("/", populateUser, async (req, res, next) => {
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
    .validate({
      country,
      language,
      ...payload,
    })
    .then(addMessageToChat)
    .then((result) => res.status(200).send(result))
    .catch(next);
});

router.get("/client-socket", async (req, res, next) => {
  /**
   * #route   GET /messaging/v1/client-socket
   * #desc    Get a client socket by given chat ID
   */
  const country = req.header("x-country-alpha-2");
  const language = req.header("x-language-alpha-2");

  const chatId = req.query.chatId;

  return await getClientSocketByChatIdSchema
    .noUnknown(true)
    .strict(true)
    .validate({ country, language, chatId })
    .then(getClientSocketByChatId)
    .then((result) => res.status(200).send(result))
    .catch(next);
});

router.put("/client-socket", async (req, res, next) => {
  /**
   * #route   PUT /messaging/v1/client-socket
   * #desc    Update the client socket ID for a given chat ID
   */
  const country = req.header("x-country-alpha-2");
  const language = req.header("x-language-alpha-2");

  const payload = req.body;

  return await updateClientSocketByChatIdSchema
    .noUnknown(true)
    .strict()
    .validate({
      country,
      language,
      ...payload,
    })
    .then(updateClientSocketByChatId)
    .then((result) => res.status(200).send(result))
    .catch(next);
});

router.get("/provider-socket", async (req, res, next) => {
  /**
   * #route   GET /messaging/v1/provider-socket
   * #desc    Get a provider socket by given chat ID
   */
  const country = req.header("x-country-alpha-2");
  const language = req.header("x-language-alpha-2");

  const chatId = req.query.chatId;

  return await getProviderSocketByChatIdSchema
    .noUnknown(true)
    .strict(true)
    .validate({ country, language, chatId })
    .then(getProviderSocketByChatId)
    .then((result) => res.status(200).send(result))
    .catch(next);
});

router.put("/provider-socket", async (req, res, next) => {
  /**
   * #route   PUT /messaging/v1/provider-socket
   * #desc    Update the provider socket ID for a given chat ID
   */
  const country = req.header("x-country-alpha-2");
  const language = req.header("x-language-alpha-2");

  const payload = req.body;

  return await updateProviderSocketByChatIdSchema
    .noUnknown(true)
    .strict()
    .validate({
      country,
      language,
      ...payload,
    })
    .then(updateProviderSocketByChatId)
    .then((result) => res.status(200).send(result))
    .catch(next);
});

export { router };
