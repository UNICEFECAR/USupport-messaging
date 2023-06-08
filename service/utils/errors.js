import { t } from "#translations/index";

export const chatNotFound = (language) => {
  const error = new Error();
  error.message = t("chat_not_found_error", language);
  error.name = "CHAT NOT FOUND";
  error.status = 404;
  return error;
};

export const userNotAuthorized = (language) => {
  const error = new Error();
  error.message = t("user_not_authorized_error", language);
  error.name = "USER NOT AUTHORIZED";
  error.status = 401;
  return error;
};
