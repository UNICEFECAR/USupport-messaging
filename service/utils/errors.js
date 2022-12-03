import { t } from "#translations/index";

export const chatNotFound = (language) => {
  const error = new Error();
  error.message = t("chat_not_found_error", language);
  error.name = "CHAT NOT FOUND";
  error.status = 404;
  return error;
};
