# BIRIMDIK

Сайт,который объединяет благотворительные организации для оказание помощи нуждающимся.

## Технологии проекта

Для создание проекта использовались:
BACKEND: node js + express + mysql
FRONTEND: jquery + html + css + bootstrap

### Как запустить проект

Для запуска требуется:

```
nodejs v8.5
npm
mysql
redis

```

### ЗАПУСК

Сначала установите все библиотеки:
```
npm install
```
Запускаем миграции
```
node_modules/sequelize/lib/sequelize db:migrate --url="mysql://{user}:{password}@{host}:{mysql_port}/{database}"
```
Запускаем проект
```
DB="{db}" USER="{DATABASE_USER}" PASS="{DATABASE_PASSWORD} npm start"
```
