
В четвертой версии много чего изменилось, но на что нужно точно обратить внимание - это на `gulp.series()` и `gulp.parallel()`. Позже мы разберем параллельное выполнение задач.

Больше не рекомендуется использовать `gulp.task()`.

 Экспортирование функций позволяет разделять на публичные и приватные задачи.
 - `публичные задачи` - экспортируются из вашего gulpfile, что позволяет запускать их командой gulp.
 - `приватные задачи` - создаются для внутреннего использования, как правило, в составе `series()` или `parallel()`

Пару слов о шаблонах поиска файлов в функции `src`.
- `templates/*.html` - ищет файлы с расширением `html` в папке `templates`
- `templates/**/*.html` - ищет файлы с расширением `html` во всех папках, которые в `templates`

Создаем папку для нашего проекта. Внутри инициализируем npm `npm init --yes`
Ключ `--yes` означает автоматические ответы вопрос по проекту.

Создадим три папки:
- `build` - оптимизированные файлы для использования на сервере
- `src` - рабочая папка, где будут храниться все наши исходники
- `gulp` - здесь будут храниться наши tasks

```gitignore
# Файлы и папки операционной системы
.DS_Store
Thumbs.db

# Файлы редактора
.idea
*.sublime*
.vscode

# Вспомогательные файлы
*.log*
node_modules/

# Папка с собранными файлами проекта
# build/
```

## HTM

## Разделяем HTML

Разберем все более подробно.
- `pages` - папка для наших страниц, где в корне хранятся непосредственно страницы
- `common` - хранятся общие блоки для всех страниц
- `includes` - хранятся модули страниц, где внутри еще одна папка, которая соответствует названию страницы

Пройдемся по файлам:
- `layout.pug` - шаблон, который хранит основную структуру, и от него наследуются все другие страницы

- `index.pug` и `about.pug` - наши страницы, которые наследуются от шаблона и подключают свои контентные модули

Еще добавим [pug-linter](https://www.npmjs.com/package/gulp-pug-linter), чтобы новички не косячили и сохраняли единый стиль написания кода. Для конфигурации создадим файл `.pug-lint.json` в корне проекта. Правила для линтера писал на свой вкус. Вы без проблем сможете изменить. [Список правил.](https://github.com/pugjs/pug-lint/blob/master/docs/rules.md)

Еще добавим [gulp-w3c-html-validator](https://www.npmjs.com/package/gulp-w3c-html-validator), чтобы не было нелепых ошибок. Вы, наверное, догадались, что порядок подключения плагинов c помощью `pipe()` очень важен. То есть перед тем, как вызвать плагин `pug()` для компиляции, нужно сделать валидацию плагином `pugLinter()`, а плагин `gulp-w3c-html-validator` подключаем после `pug()`, потому что нам нужно валидировать скомпилированный `html`.

Последний плагин [gulp-html-bem-validator](https://www.npmjs.com/package/gulp-html-bem-validator) - самописный плагин, сделал на скорую руку, потому что не смог найти аналогов. Очень маленький функционал, думаю, со временем буду улучшать.

# Стили
Добавим вспомогательные плагины: `npm i gulp-autoprefixer  gulp-shorthand gulp-clean-css gulp-sourcemaps stylelint gulp-stylelint stylelint-scss stylelint-config-standard-scss stylelint-config-standard stylelint-config-htmlacademy`

Пройдемся по каждому плагину:
- [gulp-autoprefixer](https://www.npmjs.com/package/gulp-autoprefixer) - автоматическая расстановка префиксов для старых браузеров.
- [gulp-shorthand](https://www.npmjs.com/package/gulp-shorthand) - сокращает стили.
- [gulp-clean-css](https://www.npmjs.com/package/gulp-clean-css) - минификация стилей
- [gulp-sourcemaps](https://www.npmjs.com/package/gulp-sourcemaps) - [ответ](https://qna.habr.com/q/284526) на вопрос: "Что это такое и зачем нужно?"
- [stylelint](https://github.com/stylelint/stylelint) [gulp-stylelint](https://www.npmjs.com/package/gulp-stylelint) [stylelint-scss](https://www.npmjs.com/package/stylelint-scss) - плагины для проверки наших стилей
- [stylelint-config-htmlacademy](https://github.com/htmlacademy/stylelint-config-htmlacademy) [stylelint-config-standard](hhttps://github.com/stylelint/stylelint-config-standard) [stylelint-config-standard-scss](https://www.npmjs.com/package/stylelint-config-standard-scss) - готовые конфиги, которые мы подключили в свой конфиг

# JavaScript
Все делаем так же, как и с другими тасками, только подключаем другие плагины.
Установим сначала все необходимые зависимости `npm i gulp-babel @babel/core @babel/preset-env --save-dev`
и зависимости для [eslint](https://eslint.org/) `npm install eslint eslint-config-htmlacademy eslint-config-standard eslint-plugin-standard eslint-plugin-promise eslint-plugin-import eslint-plugin-node --save-dev`
- [gulp-babel](https://www.npmjs.com/package/gulp-babel) [@babel/core](https://www.npmjs.com/package/@babel/core) [@babel/preset-env](https://www.npmjs.com/package/@babel/preset-env) - [babel](https://babeljs.io/) конвертирует ECMAScript 2015+ код в более старую версию
- [gulp-terser](https://www.npmjs.com/package/gulp-terser) - минификация и оптимизация javascript.
- [eslint](https://eslint.org/) - мы уже знаем, что делают линтеры. Решил подключить готовые конфиги, потому что очень много разных правил, чтобы все настраивать с нуля.

# Оптимизируем картинки, копируем шрифты, делаем svg-sprite
Устанавливаем плагины `npm i gulp-imageMinify gulp-svgstore`
Для картинок используется банальный код, который вы уже на данном этапе без проблем можете понять.

Шрифты мы просто копируем.

Не вижу смысла объяснять, как делать svg спрайты, когда в интернете много статей. [Вот одна из них](http://glivera-team.github.io/svg/2016/06/13/svg-sprites-2.html).

# Экономим время
Чтобы каждый раз не обновлять страницу при изменении файла, подключим [browser-sync](https://www.browsersync.io/). У gulp есть встроенная функция,которая следит за изменениями и вызывает нужные нам функции. Советую зайти и почитать о возможностях [browsersync](https://www.browsersync.io/). Мне очень нравится возможность открытия сайта и синхронизации прокрутки страницы на нескольких устройствах. Очень удобно верстать адаптивные сайты: открыл на компьютере, открыл на телефоне - и сразу видишь результат.

Бывает такое, что сделал опечатку, сохранил код и сборка падает с ошибкой. Нужно снова перезапускать сборку, и со временем это может начать раздражать, поэтому установим `npm i gulp-plumber`. [Plumber](https://www.npmjs.com/package/gulp-plumber) будет перехватывать ошибки, и после устранения ошибки сборка восстановит работоспособность. Интегрировать его очень просто, добавляем его первым `.pipe(plumber())` в наших ~~трубопроводах~~ цепочках `pug2html` и `styles`.

Во время разработки мы будем создавать и удалять файлы. Так как у нас `live reload`, то созданные файлы автоматически попадут в `build`. Когда чуть позже мы решим удалить файл, то он останется в папке `build`, поэтому сделаем еще одну задачу `clean`, которая будет удалять папку. Установим плагин `npm install del`. [Del](https://www.npmjs.com/package/del).
```javascript
const del = require('del')

module.exports = function clean(cb) {
  return del('build').then(() => {
    cb()
  })
}
```
**Главное - не забыть вызвать функцию-callback, которая сообщит gulp, что задача выполнена.**

### Lighthouse

> [Lighthouse](https://github.com/GoogleChrome/lighthouse) - решение для веб-приложений и веб-страниц, которое собирает современные показатели производительности.

Кстати, некоторые заказчики смотрят на эти показатели, так как не знают других способов оценить качество верстки.

Вы можете возразить, зачем ради одной странички заморачиваться, но в реальных проектах их может быть больше 10.

Устанавливаем `npm i --save-dev gulp-connect lighthouse chrome-launcher`  и создаём задачу.
Результат для каждой странички будет генерироваться в папку `./reports`. Там будут 'html' файлы, они открываются автоматически, но вы сами в любой момент можете их открыть и посмотреть результат.

На первый взгляд может показаться, что лучше запустить несколько страниц на тестирование, но этого нельзя сделать в одном запущенном процессе хрома, а если запустить несколько процессов паралельно, то результаты могут быть очень неточные.

Кода многовато, но он простой. Запустили наш локальный сервер с помощью `browser-sync`, потом хром и в конце `lighthouse`, где говорим, по какому `url` искать наш сайт.

<!-- # Копируем зависимости (отключено)
В нашей команде есть правило, что все `dependencies` нужно загружать в репозиторий. Это было связано с тем, что иногда может пропасть интернет ~~в стране~~. Вручную скачивать пакеты с сайтов и загружать их в папку не очень удобно, ещё сложно следить за версиями пакетов, и каждый раз из node_modules обновлять также не очень удобно, поэтому мы должны оптимизировать этот процесс.

[gulp-npm-dist](https://www.npmjs.com/package/gulp-npm-dist) - очень хороший плагин, мне он нравится тем, что он не просто копирует всю папку модуля, а только нужные файлы. `README.md`, `LICENSE`, `.gitignore` и другие конфигурационные файлы не копируются.

Теперь сделаем, чтобы при изменении `package.json` вызывался плагин. Не вижу смысла сильно заморачиваться и следить только за изменениями объекта `dependencies`, поэтому будем просто следить за файлом. -->

# NPM-скрипты
Последняя оптимизация. Часто сложно и лень запоминать консольные команды, там много параметров, вводить все эти пути занимает время,
поэтому запишем длинные команды в более краткие команды.

Рассмотрим такую ситуацию: вы скопировали большой кусок кода с постороннего ресурса, и
он не соответствует вашим правилам форматирования.
Не будете же вы всё править руками? Можно просто в консоли ввести команду, которая все исправит
за вас `stylelint ./src/styles/**/*.scss --fix --syntax scss`, команда длинная,  поэтому запишем ее в NPM-скрипт

Как видим на скрине, теперь в консоли можно вводить `npm run stylelint-fix`.

Напишем еще несколько команд:

- `npm run start` - вместо `gulp`, привык, что любой проект у меня запускается этой командой
- `npm run build` - вместо `gulp build`, такая же ситуация, как в прошлом пункте
- `npm run lighthouse` - вместо `gulp build && gulp lighthouse`, сначала собираем проект, а потом уже тестируем
- `npm run test` - запуск разных линтеров, хорошей практикой будет запускать перед комитом

# PRE-COMMIT
Не верю я, что вы будете перед комитом запускать `npm run test`, даже не верю, что я буду. Поэтому скачаем [husky](https://www.npmjs.com/package/husky) и добавим: 
 ```javascript
"husky": {
    "hooks": {
      "pre-commit": "npm run test"
    }
  }
```
в `package.json`. Если `npm run test` вернет ошибку, то комит не будет сделан.

# Спасибо
Очень приятно, если вы прочли всю статью и сумели принять мои мысли. Отвечу на вопросы в комментариях и жду ваших `pull requests` и `issue`. Всем приятных сборок.

Ссылка на репозиторий с тем, что у нас получилось: [github](https://github.com/dDenysS/gulp-template).
