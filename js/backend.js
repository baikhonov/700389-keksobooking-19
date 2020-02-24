'use strict';

(function () {

  var TIMEOUT_IN_MS = 10000;
  var URL_GET = 'https://js.dump.academy/keksobooking/data';
  var URL_POST = 'https://js.dump.academy/keksobooking';
  var StatusCode = {
    OK: 200
  };
  var messageSuccessTemplate = document.querySelector('#success').content.querySelector('.success');
  var messageErrorTemplate = document.querySelector('#error').content.querySelector('.error');

  var errorHandler = function (message) {
    var errorText = messageErrorTemplate.querySelector('p');
    errorText.textContent = message;
    window.form.showMessage(messageErrorTemplate);
  };

  var setupXhr = function (onSuccess, showMessage) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';
    xhr.timeout = TIMEOUT_IN_MS;

    xhr.addEventListener('load', function () {
      var error;
      switch (xhr.status) {
        case StatusCode.OK:
          onSuccess(xhr.response);
          if (showMessage) {
            window.form.showMessage(messageSuccessTemplate);
          }
          break;
        case 400:
          error = 'Неверный запрос';
          break;
        case 401:
          error = 'Пользователь не авторизован';
          break;
        case 403:
          error = 'Ты не пройдёшь!';
          break;
        case 404:
          error = 'Ничего не найдено';
          break;
        default:
          // error = 'Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText;
          error = 'Проблема на стороне сервера';
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

  var dataDownload = function (onSuccess) {
    var xhr = setupXhr(onSuccess, false);

    xhr.open('GET', URL_GET);
    xhr.send();
  };

  var formUpload = function (data, onSuccess) {
    var xhr = setupXhr(onSuccess, true);

    xhr.open('POST', URL_POST);
    xhr.send(data);
  };

  window.backend = {
    load: dataDownload,
    save: formUpload,
  };

})();
