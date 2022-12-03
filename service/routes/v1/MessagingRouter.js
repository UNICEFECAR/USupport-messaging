import express from "express";

import { populateUser } from "#middlewares/populateMiddleware";

import { getChatById, addMessageToChat } from "#controllers/messaging";

import {
  getChatByIdSchema,
  addMessageToChatSchema,
} from "#schemas/messagingSchemas";

const router = express.Router();

router.get("/", populateUser, async (req, res, next) => {
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

  const payload = req.body;

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

export { router };
