# Solve парсер

## Информация о парсере

Данный парсер принимает 3 JSON, которые содержат необходимые данные (JSON должен экспортиться из JS-файла) (все они берутся с системы [Solve](acm.bsuir.by/solve)):

1. __solve-participants.js__ - содержит в себе массив объектов, которые описывают данные об участниках. Пример:

    ```javascript
    export default [
      {
        id: 2048,
        scope_user: {
            id: 32,
            login: "some_user",
            title: "ФИО"
        },
        contest_id: 1024,
        kind: "upsolving"
      },
      ...
    ]
    ```

2. __solve-problems.js__ - содержит в себе массив объектов, которые описывают данные о задачах. Пример:

    ```javascript
    export default[
      {
        id: 1,
        title: "number",
        statement: { locale: "ru", title: "Число" },
        contest_id: 1024,
        code: "A"
      },
      ...
    ];
    ```

3. __solve-solutions.js__ - содержит в себе массив объектов, которые описывают данные о задачах. Пример:

    ```javascript
    export default [
      {
        id: 2425,
        contest_id: 1,
        problem: {
          id: 1,
          title: "number",
          statement: { locale: "ru", title: "Число" },
          contest_id: 1024,
          code: "A"
        },
        compiler: {
          id: 1,
          name: "cpp",
          config: {
            compile: {
              binary: "solution",
              source: "solution.cpp",
              command:
                  "g++ --std=c++17 -O2 -DONLINE_JUDGE -o solution solution.cpp",
              environ: [
                  "PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin",
              ],
              workdir: "/home/judge"
            },
            execute: {
              binary: "solution",
              command: "./solution",
              environ: [],
              workdir: "/home/judge"
            },
            compiler: "gcc-12.2.1",
            language: "C++17",
            extensions: ["cpp", "h", "hpp", "c++", "cxx"]
          },
        },
        participant: {
          id: 404,
          scope_user: {
            id: 32,
            login: "some_user",
            title: "ФИО"
          },
          contest_id: 1024,
          kind: "upsolving"
        },
        report: { verdict: "accepted", used_time: 35, used_memory: 200704 },
        create_time: 1678398020
      },
      ...
    ]
    ```

4. __solve-verdicts.js__ - содержит в объект, которые описывают данные о вердиктах. Пример:

    ```javascript
    export default {
      accepted: ["accepted"],
      withPenalty: [
        "wrong_answer",
        "runtime_error",
        "time_limit_exceeded",
        "memory_limit_exceeded",
        "presentation_error",
      ],
      withoutPenalty: ["compilation_error"],
    };
    ```

## Данные

### solveContest - содержит данные о соревновании

- Поля

  - *title*
    - __тип__: `String`
    - __описание__: Название соревнования

  - *duration*
    - __тип__: `Integer`
    - __описание__: длительность соревнования __в секундах__

  - *freezeTime*
    - __тип__: `Integer`
    - __описание__: время начала заморозки таблицы __в секундах__

  - *type*
    - __тип__: `String`
    - __описание__: тип соревнования *IOI* или *ICPC*

  - *penalty*
    - __тип__: `Integer`
    - __описание__: штраф за неверную попытку __в секундах__

### solveVerdicts - содержит данные о вердиктах

- Поля

  - *accepted*
    - __тип__: `Array[String]`
    - __описание__: содержит список вердиктов, которые считают решение верным

  - *withPenalty*
    - __тип__: `Array[String]`
    - __описание__: содержит список вердиктов, которые считают решение неверным и дают штраф

  - *withoutPenalty*
    - __тип__: `Array[String]`
    - __описание__: содержит список вердиктов, которые считают решением неверным, но не дают штраф

## Функции

### getSolveProblems()

- __описание__: требуется для парсинга задач и преобразования их в требуемый для программного обеспечения вид
- __возвращаемое значение__: список из объектов, которые описывают задачу

### getSolveContestants()

- __описание__: требуется для парсинга участников соревнования и преобрзования их в требуемый для программного обеспечения вид
- __возвращаемое значение__: список из объектов, которые описывают участника соревнования

### getSolveSubmissionsICPC()

- __параметры__
  - *verdicts*
    - __тип__: `Array[String]`
    - __описание__: содержит данные о вердиктах. Подробнее смотреть *solveVerdicts*
- __описание__: требуется для парсинга посылок *ICPC*-соревнования и преобразования их в требуемый для программного обеспечения вид
- __возвращаемое значение__: список из объектов, которые описывают посылку
