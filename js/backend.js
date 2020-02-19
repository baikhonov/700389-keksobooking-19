'use strict';

(function () {

  var StatusCode = {
    OK: 200
  };
  var TIMEOUT_IN_MS = 10000;
  var messageSuccessTemplate = document.querySelector('#success').content.querySelector('.success');
  var messageErrorTemplate = document.querySelector('#error').content.querySelector('.error');

  var dataDownload = function (onSuccess, onError) {
    var URL = 'https://js.dump.academy/keksobooking/data';

    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';
    xhr.timeout = TIMEOUT_IN_MS;

    xhr.addEventListener('load', function () {
      var error;
      switch (xhr.status) {
        case StatusCode.OK:
          onSuccess(xhr.response);
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
          error = 'Cтатус ответа: : ' + xhr.status + ' ' + xhr.statusText;
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

    xhr.open('GET', URL);
    xhr.send();

  };

  var formUpload = function (data, onLoad, onError) {
    var URL = 'https://js.dump.academy/keksobooking';
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      var error;
      switch (xhr.status) {
        case StatusCode.OK:
          onLoad(xhr.response);
          window.form.showMessage(messageSuccessTemplate);
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
          error = 'Cтатус ответа: : ' + xhr.status + ' ' + xhr.statusText;
      }
      if (error) {
        onError(error);
        window.form.showMessage(messageErrorTemplate);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + ' мс');
    });

    xhr.open('POST', URL);
    xhr.send(data);
  };

  window.backend = {
    load: dataDownload,
    save: formUpload,
  };

})();
