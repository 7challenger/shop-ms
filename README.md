# Stack
- Frontend: ts + vue?
- Parser: ts + puppeter + faas? + redis
- DB: postgres for data + mongo for sites and markup

---------------------------------------------------

# Микросервисный подход
## Первый вариант
Пусть Data - стартовый набор данных (массив сайтов)
Есть несколько сервисов:
- A - забирает Data из базы и обрабатывает и кладет их в базу (take - process - put)
- B - получает данные и нормализует и кладет их в базу (take - normalize - put)

***composedApp = Data -> A | B -> Proc***

## Второй вариант
Пусть Data - стартовый набор данных (массив сайтов)
Есть несколько сервисов:
- A - забирает Data из базы и обрабатывает и нормализует и кладет их в базу (take - process - normalize - put)

***composedApp = Data -> A***

---------------------------------------------------

# FaaS подход
Пусть Data - стартовый набор данных (массив сайтов)
Есть несколько функций:
```
                                        ____________________________
                                      | A - процессинг данных        |
request -> traefik -> api gateway ->  |                              | -> postgres/mongo
                          ↑           | B - нормализация данных      |
                          ↑              ----------------------------
                          ↑
                          ↑
                    postgres/mongo
```

***composedApp = Gateway (take) -> ~A~ && ~B~ -> DB(put)***

Steps:
  - Create docker images for functions
  - Create docker image for api gateway
  - Create compose with images above + traefik + util services (mongo + postgres)

---------------------------------------------------

# https://github.com/nicolaspearson/node.api.gateway -> Пример nats + hemera для микросервисов

