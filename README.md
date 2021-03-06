# IntegrationSite

Сайт, где можно связать сервисы друг с другом. Сначала выбираете нужный сервис в списке, затем с какой системой вы хотите его связать. После этого заполняете заявку (достаточно номера телефона), можете указать какие данные требуется передавать между сервисами. Заявка создаёт лид в Битрикс24.

Этот проект был создан с помощью [Angular CLI](https://github.com/angular/angular-cli) версии 12.2.3.

##Установка
Для того, что бы запустить это приложение требуется:

1. Установить свежую версию node.js с сайта https://nodejs.org/ru/.
2. Установить или обновить npm: [sudo] npm install -g npm (sudo требуется только на Mac/Linux).
3. Установить angular-cli: [sudo] npm install -g @angular/cli

Если ранее уже был установлен angular-cli, то рекомендуется его обновить:

[sudo] npm uninstall -g angular-cli @angular/cli

npm cache clean

[sudo] npm install -g @angular/cli

## Запуск сервера

Запустите `ng serve` для сервера разработки. Перейдите к `http://localhost:4200/`.

## Сборка

Запустите `ng build` чтобы собрать проект. Артефакты сборки будут храниться в каталоге `dist/`.

## Запуск модульных тестов

Запустите `ng test` чтобы выполнить модульное тестирование с помощью [Karma](https://karma-runner.github.io).

## Запуск end-to-end тестирования

Запустите `ng e2e` чтобы выполнить end-to-end тестирование via a platform of your choice. Чтобы использовать эту команду, нужно сначала добавить пакет, реализующий возможности end-to-end тестирования.

## Дальнейшая помощь

Чтобы получить дополнительную помощь по Angular CLI, используйте `ng help` или посетите сайт [Angular CLI Overview and Command Reference](https://angular.io/cli).
