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
  var main = document.querySelector('main');
  var messageSuccessTemplate = document.querySelector('#success').content.querySelector('.success');
  var messageErrorTemplate = document.querySelector('#error').content.querySelector('.error');

  var showMessage = function (messageTemplate) {
    var messageElement = messageTemplate.cloneNode(true);
    main.appendChild(messageElement);
    var messageKeydownHandler = function (evt) {
      if (evt.key === 'Escape') {
        main.removeChild(messageElement);
        document.removeEventListener('keydown', messageKeydownHandler);
      }
    };
    var messageClickHandler = function (evt) {
      if (evt.target.closest('div')) {
        main.removeChild(messageElement);
        document.removeEventListener('click', messageClickHandler);
      }
    };
    document.addEventListener('keydown', messageKeydownHandler);
    document.addEventListener('click', messageClickHandler);
  };

  var errorHandler = function (message) {
    var errorText = messageErrorTemplate.querySelector('p');
    errorText.textContent = message;
    showMessage(messageErrorTemplate);
  };

  var setupXhr = function (onSuccess, showInfo) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';
    xhr.timeout = TIMEOUT;

    xhr.addEventListener('load', function () {
      var error;
      switch (xhr.status) {
        case StatusCode.OK:
          onSuccess(xhr.response);
          if (showInfo) {
            showMessage(messageSuccessTemplate);
          }
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
          error = 'Неизвестная ошибка';
      }
      if (error) {
        errorHandler(error);
      }
    });
    xhr.addEventListener('error', function () {
      errorHandler('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      errorHandler('Запрос не успел выполниться за ' + xhr.timeout + ' мс');
    });

    return xhr;
  };

  var downloadAds = function (onSuccess) {
    var xhr = setupXhr(onSuccess, false);

    xhr.open('GET', Url.GET);
    xhr.send();
  };

  var uploadForm = function (data, onSuccess) {
    var xhr = setupXhr(onSuccess, true);

    xhr.open('POST', Url.POST);
    xhr.send(data);
  };

  window.backend = {
    load: downloadAds,
    save: uploadForm,
  };

})();
