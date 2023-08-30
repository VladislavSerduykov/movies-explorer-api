const ERROR_MESSAGES = {
  USER_CONFLICT: 'Такой пользователь уже существует',
  MOVIE_CONFLICT: 'Фильм с таким id уже существует',
  FORBIDDEN: 'Недостаточно прав',
  USER_NOT_FOUND: 'Пользователь не найден',
  MOVIE_NOT_FOUND: 'Фильм не найден',
  WRONG_CREDENTIALS: 'Неверный адресс запроса',
  UNAUTHORIZED: 'Для обработки запроса необходима авторизация',
  WRONG_DATA_AT_FIELD: 'Неверные данные в поле',
  UNKNOWN_ERROR: 'Неизвестная ошибка',
};

const STATUS_CODE = {
  CONFLICT: 409,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  UNAUTHORIZED: 401,
  BAD_REQUEST: 400,
  INTERNAL_SERVER_ERROR: 500,
};

module.exports = { STATUS_CODE, ERROR_MESSAGES };
