<p align="center">
  <a href="https://osrd.fr/ru/">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="/assets/branding/osrd_small_dark.svg">
      <img width="340px" style="max-width: 100%;" src="/assets/branding/osrd_small.svg" alt="Логотип OSRD">
    </picture>
  </a>
&nbsp;&nbsp;
  <a href="https://publiccode.eu/">
    <img src="assets/PMPC_badge.svg" width="110px" alt="Public Money Public Code"/>
  </a>
</p>

<p align="center">
  <a href="https://osrd.fr/ru/docs/guides/contribute/"><img src="https://img.shields.io/github/contributors-anon/OpenRailAssociation/osrd" alt="Значок участников" /></a>
  <a href="https://github.com/OpenRailAssociation/osrd/blob/dev/LICENSE"><img src="https://img.shields.io/badge/license-LGPL-blue.svg" alt="Значок лицензии LGPL" /></a>
  <a href="https://github.com/OpenRailAssociation/osrd/actions/workflows/build.yml"><img src="https://github.com/OpenRailAssociation/osrd/actions/workflows/build.yml/badge.svg" alt="Статус сборки" /></a>
  <a href="https://api.reuse.software/info/github.com/OpenRailAssociation/osrd"><img src="https://api.reuse.software/badge/github.com/OpenRailAssociation/osrd" alt="Статус REUSE" /></a>
  <a href="https://github.com/OpenRailAssociation/technical-committee/blob/main/incubation-process.md"><img src="https://openrailassociation.org/badges/openrail-project-stage-2.svg" alt="Стадия инкубации Openrail" /></a>
</p>

## Что такое OSRD?

OSRD (Open Source Railway Designer) — это веб-приложение с открытым исходным кодом для проектирования железнодорожной инфраструктуры,
анализа пропускной способности, составления расписаний, симуляции и запросов на краткосрочные маршруты.

Это бесплатное программное обеспечение с открытым исходным кодом навсегда!

Узнайте больше о проекте на [osrd.fr](https://osrd.fr/ru/).

## Демо

Доступ к демонстрационной версии: [demo.osrd.fr](https://demo.osrd.fr).

> [!IMPORTANT]
> Эта среда не предназначена для использования в производственных целях. Она обновляется ежедневно, и введенные данные доступны всем.

## ⚠️ Статус разработки

OSRD все еще находится в активной разработке.
Пользовательские и программные интерфейсы не являются полностью стабильными и время от времени изменяются.
Если вы полагаетесь на OSRD, будьте готовы к регулярным изменениям.

## Языки

OSRD поддерживает несколько языков. Ниже представлен статус перевода для разных языков.
Интегрировано означает, что пользователи могут активировать язык в приложении.
Если вы хотите внести свой вклад в перевод, вы можете легко это сделать с помощью [Weblate](https://hosted.weblate.org/engage/osrd/).

| **Язык**      |                                                          **Статус**                                                         | **Интегрировано** |
|---------------|:---------------------------------------------------------------------------------------------------------------------------:|:-----------------:|
| 🇬🇧 Английский | [![Статус перевода](https://hosted.weblate.org/widget/osrd/-/en/svg-badge.svg)](https://hosted.weblate.org/engage/osrd/)     |        ✅         |
| 🇫🇷 Французский| [![Статус перевода](https://hosted.weblate.org/widget/osrd/-/fr/svg-badge.svg)](https://hosted.weblate.org/engage/osrd/)     |        ✅         |
| 🇩🇪 Немецкий   | [![Статус перевода](https://hosted.weblate.org/widget/osrd/-/de/svg-badge.svg)](https://hosted.weblate.org/engage/osrd/)     |        ✅         |
| 🇵🇹 Португальский| [![Статус перевода](https://hosted.weblate.org/widget/osrd/-/pt/svg-badge.svg)](https://hosted.weblate.org/engage/osrd/)     |        ✅         |
| 🇪🇸 Испанский  | [![Статус перевода](https://hosted.weblate.org/widget/osrd/-/es/svg-badge.svg)](https://hosted.weblate.org/engage/osrd/)     |        ❌         |

## Начало работы

Чтобы скомпилировать и запустить приложение с примером инфраструктуры:

```sh
# собрать и запустить весь стек
docker compose up -d --build

# импортировать небольшой пример инфраструктуры ("small_infra")
./scripts/load-railjson-infra.sh small_infra tests/data/infras/small_infra/infra.json

# импортировать подвижной состав с реалистичными характеристиками, представляющими отрасль
./scripts/load-railjson-rolling-stock.sh tests/data/rolling_stocks/realistic/*.json --force

# импортировать больше подвижного состава
./scripts/load-railjson-rolling-stock.sh tests/data/rolling_stocks/*.json

# открыть веб-приложение
xdg-open http://localhost:4000/
```

Пользователи Linux или WSL могут использовать `./osrd-compose host` вместо `docker compose` для включения сетевого режима хоста: это может быть полезно для запуска служб в отладчике.

Пользователи macOS на Apple Silicon должны убедиться, что установили имя образа arm64 для Postgres/PostGIS (чтобы предотвратить медленную эмуляцию amd64). Это имя образа можно установить, выполнив `export OSRD_POSTGIS_IMAGE='nickblah/postgis:16-postgis-3'` перед первой командой `docker compose`.

Модуль поезда в последнюю минуту (STDCM) требует дополнительной настройки: начните с создания сценария, скопируйте его ID из URL-адреса, затем выполните:

```sh
docker compose exec editoast editoast stdcm-search-env set-from-scenario <id>
```

Если вам нужно использовать теги ограничений скорости и габариты погрузки, выполните это:

```sh
echo '{ "LG1": [], "LG2": [] }' > /tmp/allowed_tracks.json
docker cp /tmp/allowed_tracks.json osrd-editoast:/tmp/
docker compose exec editoast editoast stdcm-search-env set-from-scenario <id> --speed-limit-tags "CC100|100" "CC90|90" "CC200|200" --default-speed-limit-tag "CC100" /tmp/allowed_tracks.json
```

## Работа над одним компонентом

Каждый компонент имеет _justfile_ для выполнения обычных задач разработки. Установите [just](https://github.com/casey/just#installation) и запустите его, чтобы увидеть доступные рецепты. Все компоненты включают:

* run
* install
* test
* format
* lint
* fix-lint

## Развертывание

Для развертывания приложения на сервере ознакомьтесь с [руководством по развертыванию](https://osrd.fr/ru/docs/guides/deploy/).

## Свяжитесь с нами

Отправьте электронное письмо по адресу <contact@osrd.fr>, [создайте issue](https://github.com/OpenRailAssociation/osrd/issues/new?labels=kind%3Aquestion&template=question.yaml) или присоединяйтесь к каналу matrix [#public-general:osrd.fr](https://matrix.to/#/#public-general:osrd.fr).

## Спонсоры

<p align="center">
  <img src="assets/sponsors/ministere-amenagement-territoire-decentralisation.png" width="150px" height="150px" alt="Министерство территориального планирования и децентрализации"/>
  <img src="assets/sponsors/european-union.svg" width="150px" height="150px" alt="Европейский Союз"/>
  <img src="assets/sponsors/sncf-reseau.svg" width="150px" height="150px" alt="SNCF Réseau"/>
</p>

## Лицензия

OSRD распространяется под лицензией GNU Lesser General Public License v3.0, см. LICENSE.

Copyright © 2022 The OSRD Contributors
# Train_for_Diplom
# Train_for_Diplom
