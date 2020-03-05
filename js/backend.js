'use strict';

(function () {

  var TIMEOUT = 10000;
  var Url = {
    GET: 'https://js.dump.academy/keksobooking/data',
    POST: 'https://js.dump.academy/keksobooking',
  };
  var StatusCode = {
    OK: 200,
    BAD_REQUEST: 400,
    UNATHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
  };

  /**
   * Обработчик ошибки при загрузке или отправке данных
   * @param {string} errorMessage - текст ошибки
   */
  var errorHandler = function (errorMessage) {
    var message = document.createElement('div');
    message.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    message.style.position = 'absolute';
    message.style.left = 0;
    message.style.right = 0;
    message.style.fontSize = '30px';

    message.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', message);
    var messageClickHandler = function () {
      message.remove();
    };
    message.addEventListener('click', messageClickHandler);
  };

  /**
   * Первоначальная настройка XMLHttpRequest
   * @param {Function} onSuccess - функция, запускаемая в случае успеха
   * @param {Function} onError - функция, запускаемая в случае ошибки
   * @return {XMLHttpRequest} - настроенный запрос
   */
  var setupXhr = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';
    xhr.timeout = TIMEOUT;

    xhr.addEventListener('load', function () {
      var error;
      switch (xhr.status) {
        case StatusCode.OK:
          onSuccess(xhr.response);
          break;
        case StatusCode.BAD_REQUEST:
          error = 'Неверный запрос';
          break;
        case StatusCode.UNATHORIZED:
          error = 'Вы не авторизованы';
          break;
        case StatusCode.FORBIDDEN:
          error = 'Доступ запрещён';
          break;
        case StatusCode.NOT_FOUND:
          error = 'Ничего не найдено';
          break;
        default:
          error = 'Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText;
      }
      if (error) {
        onError(error);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + ' мс');
    });

    return xhr;
  };

  /**
   * Загрузка объявлений с сервера
   * @param {*} onSuccess - функция, запускаемая в случае успеха
   * @param {*} onError - функция, запускаемая в случае ошибки
   */
  var downloadAds = function (onSuccess, onError) {
    var xhr = setupXhr(onSuccess, onError);

    xhr.open('GET', Url.GET);
    xhr.send();
  };

  /**
   * Отправка данных формы на сервер
   * @param {Object} data - данные формы
   * @param {Function} onSuccess - функция, запускаемая в случае успеха
   * @param {Function} onError - функция, запускаемая в случае ошибки
   */
  var uploadForm = function (data, onSuccess, onError) {
    var xhr = setupXhr(onSuccess, onError);

    xhr.open('POST', Url.POST);
    xhr.send(data);
  };

  window.backend = {
    load: downloadAds,
    save: uploadForm,
    errorHandler: errorHandler
  };

})();
