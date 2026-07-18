# 📚 C# Вопросы для собеседования

**Всего блоков:** 40
**Всего вопросов:** 339

---

## 01. 1. ООП. Базовые принципы

*Файл: `1_OOP.html`*
*Вопросов: 16*

1. Что такое инкапсуляция? Приведите пример.
2. Что такое наследование? Приведите пример.
3. Что такое полиморфизм? Виды полиморфизма.
4. Что такое абстракция? Отличие от интерфейса.
5. abstract class vs interface — когда что использовать?
6. Какие модификаторы доступа существуют в C#?
7. virtual / override / new — в чем разница?
8. Что делает sealed? Для классов и методов.
9. Почему в C# запрещено множественное наследование классов?
10. От какого класса наследуются все типы в .NET?
11. Какие методы есть у System.Object?
12. IComparable vs IComparer — разница?
13. IEquatable&lt;T&gt; — зачем переопределять Equals?
14. Что такое UpCast и DownCast?
15. Операторы is и as — разница?
16. Паттерн Factory vs Abstract Factory — базово.

---

## 02. 2. Типы данных. Память

*Файл: `2_DataType.html`*
*Вопросов: 16*

1. Значимые (value) vs ссылочные (reference) — разница?
2. Stack vs Heap — где что хранится?
3. class vs struct — 7 отличий.
4. record (C# 9) — чем отличается от class?
5. string — ссылочный, но ведёт себя как значимый. Почему?
6. Boxing и Unboxing — что это, влияние на производительность?
7. ref / out / in / ref readonly — различия?
8. const vs readonly — разница?
9. Nullable типы (int?) — что это?
10. Операторы ?. (null-conditional) и ?? (null-coalescing).
11. var vs dynamic — отличия?
12. Span&lt;T&gt; и Memory&lt;T&gt; — зачем, когда использовать?
13. unsafe код — когда разрешён, риски?
14. decimal vs float vs double — когда что использовать?
15. Что такое выравнивание (alignment) в памяти?
16. StructLayout — Explicit, Auto, Sequential.

---

## 03. 3. String и StringBuilder

*Файл: `3_StringStringBuilder.html`*
*Вопросов: 8*

1. String — иммутабельность: что это значит?
2. StringBuilder — внутреннее устройство (буфер).
3. Когда использовать StringBuilder vs string?
4. String.Intern — пул строк.
5. Сравнение строк: Equals vs == vs Compare.
6. StringComparison — Ordinal, InvariantCulture, CurrentCulture.
7. StringBuilder.Append vs AppendLine vs AppendFormat.
8. String.Create (C# 10) — высокопроизводительное создание строк.

---

## 04. 4. Коллекции и LINQ

*Файл: `4_CollectionsLINQ.html`*
*Вопросов: 16*

1. Array — фиксированный размер, сложность O(1) по индексу.
2. List&lt;T&gt; — динамический массив, сложность Add.
3. Dictionary&lt;K,V&gt; — хэш-таблица, сложность.
4. HashSet&lt;T&gt; — что это, сложность.
5. Queue&lt;T&gt; и Stack&lt;T&gt; — описание.
6. LinkedList&lt;T&gt; — когда использовать?
7. SortedList vs SortedDictionary — различия.
8. Concurrent коллекции — какие есть?
9. IEnumerable vs IQueryable — КРИТИЧНО для EF.
10. IEnumerable vs IList vs ICollection — иерархия.
11. IEnumerator и yield return — как работает?
12. LINQ — отложенное выполнение (deferred execution).
13. LINQ: немедленное выполнение — примеры.
14. First() vs FirstOrDefault() vs Single() vs SingleOrDefault().
15. LINQ: Select, Where, GroupBy, OrderBy, Distinct, Join.
16. Написать свой метод Where / Select (с yield).

---

## 05. 5. Garbage Collector. Управление памятью

*Файл: `5_GC.html`*
*Вопросов: 16*

1. Как работает GC — корневые объекты, маркировка, очистка.
2. Поколения: Gen 0, Gen 1, Gen 2 — зачем?
3. Large Object Heap (LOH) — объекты > 85 KB, особенности.
4. Когда вызывается GC — автоматически, GC.Collect() (не рекомендуется).
5. IDisposable и Dispose — освобождение ресурсов.
6. Finalize (деструктор) — финализация, когда вызывается?
7. using — во что компилируется?
8. Disposable паттерн (Dispose(bool disposing)) — для managed + unmanaged.
9. IAsyncDisposable — когда использовать?
10. WeakReference — зачем, когда использовать?
11. GCHandle — закрепление объектов (pinning).
12. GC.TryStartNoGCRegion — для высоконагруженных сценариев.
13. Что такое "утечка памяти" в .NET?
14. Как найти утечку памяти — профайлеры.
15. Generation и LOH compaction — .NET Core 2.1+.
16. POH (Pinned Object Heap) — что это?

---

## 06. 6. Многопоточность и Асинхронность

*Файл: `6_MultiThreadingAsync.html`*
*Вопросов: 16*

1. Процесс vs Поток (Process vs Thread) — разница?
2. Thread vs Task — отличия, что использовать?
3. ThreadPool — зачем нужен, как работает?
4. TPL (Task Parallel Library) — Parallel.For, Parallel.ForEach.
5. async / await — как работает, State Machine.
6. Почему async void — плохо (кроме событий)?
7. ConfigureAwait(false) — зачем, когда использовать?
8. Task vs ValueTask — разница, когда использовать ValueTask?
9. lock — синхронизация, объект блокировки.
10. Monitor — низкоуровневый аналог lock.
11. Mutex, Semaphore, SemaphoreSlim — межпроцессная/внутренняя синхронизация.
12. Deadlock — причины, как избежать?
13. Race Condition — что это, как избежать?
14. Interlocked — атомарные операции.
15. Асинхронность vs Многопоточность vs Параллелизм — разница.
16. CPU-bound vs IO-bound задачи — как выбирать подход.

---

## 07. 7. Делегаты, События, Generics

*Файл: `7_DelegateEventGenerics.html`*
*Вопросов: 9*

1. Делегат (delegate) — указатель на метод.
2. Func, Action, Predicate — встроенные делегаты.
3. Многоадресный делегат (MulticastDelegate).
4. event vs delegate — разница (инкапсуляция).
5. Generics (обобщения) — зачем нужны.
6. Ограничения обобщений: where T : class, struct, new(), unmanaged.
7. Ковариантность (out) и контравариантность (in).
8. Как реализованы дженерики в .NET — стирание типов? Нет, reified.
9. Когда генерируется конкретный Generic-класс — JIT при первом обращении.

---

## 08. 8. Исключения. Тестирование

*Файл: `8_ExceptionsTesting.html`*
*Вопросов: 8*

1. try / catch / finally — порядок выполнения.
2. Когда finally НЕ выполняется?
3. throw vs throw ex — разница (потеря stack trace).
4. Когда создавать своё исключение.
5. Unit-тесты vs Интеграционные тесты — разница.
6. AAA — Arrange, Act, Assert.
7. Mock / Stub / Fake — разница.
8. Moq / NSubstitute — популярные фреймворки.

---

## 09. 9. ASP.NET Core. Web API

*Файл: `9_ASPNETCoreAndWebApi.html`*
*Вопросов: 12*

1. REST API — принципы (ресурсы, HTTP методы, stateless).
2. GET vs POST vs PUT vs PATCH vs DELETE.
3. HTTP коды: 200, 201, 204, 400, 401, 403, 404, 409, 500.
4. Middleware — что это, порядок регистрации.
5. JWT-токен — структура (Header, Payload, Signature).
6. Аутентификация vs Авторизация — разница.
7. Dependency Injection в ASP.NET Core — встроенный контейнер.
8. Transient / Scoped / Singleton — жизненные циклы.
9. IoC контейнеры: встроенный, Autofac, Unity — сравнение.
10. Kestrel — что это, reverse proxy (Nginx/IIS).
11. Фильтры: Authorization, Resource, Action, Exception, Result.
12. Model Binding и Model Validation — Data Annotations.

---

## 10. 10. Базы данных. SQL. Индексы

*Файл: `10_DataBaseSqlIndexes.html`*
*Вопросов: 14*

1. Реляционные vs Нереляционные БД — плюсы/минусы.
2. Первичный ключ (PK) vs Внешний ключ (FK).
3. JOIN: INNER, LEFT, RIGHT, FULL, CROSS — разница.
4. Агрегатные функции: COUNT, SUM, AVG, MAX, MIN.
5. GROUP BY и HAVING — фильтрация групп.
6. Индексы — B-Tree, структура, когда использовать.
7. Кластеризованный vs Некластеризованный индекс — разница.
8. ACID — расшифровка, примеры.
9. Уровни изоляции транзакций: Read Uncommitted, Read Committed, Repeatable Read, Serializable, Snapshot.
10. DELETE vs TRUNCATE — разница.
11. Оконные функции: ROW_NUMBER, RANK, DENSE_RANK, LAG, LEAD.
12. CTE (Common Table Expression) — WITH ... AS.
13. План выполнения запроса (Execution Plan) — как читать.
14. Оптимизация запросов: WHERE по индексированным полям, избегать SELECT *.

---

## 11. 11. ORM: Entity Framework Core и Dapper

*Файл: `11_ORMEntityFrameworkCoreDapper.html`*
*Вопросов: 10*

1. Entity Framework Core — Code First vs Database First.
2. Миграции (Migrations) — Add-Migration, Update-Database.
3. AsNoTracking() — когда использовать (только чтение).
4. Include() / ThenInclude() — Eager Loading.
5. Lazy Loading — прокси, когда опасно (N+1 проблема).
6. IQueryable vs IEnumerable в EF — критично.
7. Транзакции в EF — BeginTransaction, SaveChanges.
8. Dapper — микро-ORM, когда использовать.
9. EF vs Dapper — производительность, удобство, когда что выбирать.
10. Query Tracking — отслеживание изменений, когда отключать.

---

## 12. 12. SOLID. Архитектурные паттерны

*Файл: `12_SOLIDArchitecturePatterns.html`*
*Вопросов: 15*

1. S — Single Responsibility (единственная ответственность).
2. O — Open/Closed (открыт для расширения, закрыт для изменения).
3. L — Liskov Substitution (подстановка Барбары Лисков).
4. I — Interface Segregation (разделение интерфейсов).
5. D — Dependency Inversion (инверсия зависимостей).
6. IoC (Inversion of Control) — что это, зачем.
7. DI (Dependency Injection) — конструкторная, свойств, методовая.
8. Cohesion (связность) vs Coupling (сцепление) — разница.
9. Паттерны GoF: Singleton, Factory, Abstract Factory, Builder.
10. Паттерны: Strategy, Observer, Decorator, Adapter, Facade.
11. Паттерны: Repository, Unit of Work.
12. Clean Architecture / Onion Architecture — базово.
13. Микросервисы vs Монолит — плюсы/минусы, когда выбирать.
14. DDD (Domain-Driven Design) — Entity, Value Object, Aggregate.
15. CQRS — Command Query Responsibility Segregation.

---

## 13. 13. .NET Platform. CLR, IL, JIT

*Файл: `13_.NETPlatformCLRILJIT.html`*
*Вопросов: 14*

1. CLR — Common Language Runtime.
2. IL (Intermediate Language) — что это.
3. JIT-компиляция — Just-In-Time, преимущества.
4. AOT-компиляция (Ahead-Of-Time) — когда используется.
5. Управляемый vs Неуправляемый код.
6. Сборка (Assembly) — .dll / .exe, структура.
7. Манифест сборки — что содержит.
8. GAC (Global Assembly Cache) — зачем, сильные имена.
9. Reflection — что это, когда использовать.
10. Атрибуты (Attributes) — как создать, использовать.
11. Методы расширения (Extension Methods) — как работают.
12. Частичные классы (partial) — зачем.
13. Статический конструктор — когда вызывается.
14. .NET Standard vs .NET Core vs .NET Framework — разница.

---

## 14. 14. Docker. CI/CD. Брокеры

*Файл: `14_DockerCICDBrockers.html`*
*Вопросов: 10*

1. Docker — что это, зачем нужен.
2. Образ (Image) vs Контейнер (Container) — разница.
3. Dockerfile — основные инструкции (FROM, COPY, RUN, CMD).
4. Docker Compose — для чего.
5. Docker vs Виртуальная машина — различия.
6. Брокер сообщений — RabbitMQ, Apache Kafka.
7. Очереди сообщений — зачем нужны, паттерны.
8. At-least-once, At-most-once, Exactly-once семантика.
9. Idempotent сервисы — как строить.
10. Circuit Breaker — паттерн для распределённых систем.

---

## 15. 15. Сети. Безопасность

*Файл: `15_NetworksSecurity.html`*
*Вопросов: 8*

1. Модель OSI — основные уровни (L4, L7).
2. TCP vs UDP — отличия, когда использовать.
3. TCP Handshake (3-way handshake) — как устанавливается соединение.
4. HTTP vs HTTPS — разница, TLS/SSL.
5. SQL-инъекции — как защититься (параметризованные запросы).
6. CORS — зачем нужен, как настроить в ASP.NET Core.
7. JWT — структура, подпись, срок жизни.
8. OWASP Top 10 — базовое понимание.

---

## 16. 16. Алгоритмы. Структуры данных

*Файл: `16_AlgorithmsDataStructure.html`*
*Вопросов: 10*

1. Big O нотация — что это, примеры.
2. Бинарный поиск — суть, сложность, реализация.
3. Хэш-таблица — внутреннее устройство, сложность.
4. Коллизии хэшей — что это, методы разрешения.
5. Рекурсия — что это, опасности (StackOverflow), хвостовая рекурсия.
6. Стек и Очередь — структуры, где применяются.
7. Односвязный vs Двусвязный список — разница.
8. Деревья: бинарное дерево, AVL, красно-чёрное — базово.
9. Графы — обход в ширину (BFS) и в глубину (DFS) — суть.
10. Сортировки: быстрая (QuickSort), слиянием (MergeSort).

---

## 17. 17. Git. Инструменты

*Файл: `17_GitTools.html`*
*Вопросов: 6*

1. Основные команды Git: clone, commit, push, pull, fetch.
2. rebase vs merge — разница, когда использовать.
3. Конфликты — как возникают, как решать.
4. cherry-pick — зачем.
5. reset (--soft, --hard, --mixed) — разница.
6. Git Flow / GitHub Flow — базово.

---

## 18. 18. Middle: углублённые темы

*Файл: `18_MiddleDeepThemes.html`*
*Вопросов: 11*

1. Expression Trees — что это, когда использовать.
2. Source Generators — что это, отличие от Reflection.
3. Native AOT (.NET 8+) — что это, ограничения.
4. Функциональное программирование в C# — неизменяемость, чистые функции.
5. Фоновые задачи — IHostedService, BackgroundService.
6. Health Checks — для чего.
7. OpenTelemetry — распределённая трассировка.
8. Rate Limiting — ограничение запросов в ASP.NET Core.
9. Polly — Retry, Circuit Breaker, Timeout.
10. Channel (System.Threading.Channels) — Producer/Consumer.
11. MemoryCache / DistributedCache — кэширование.

---

## 19. 19. Микросервисы и Распределённые системы

*Файл: `19_Microservices.html`*
*Вопросов: 9*

1. Что такое микросервисы? Отличие от монолита.
2. Способы коммуникации микросервисов (REST, gRPC, Message Bus).
3. Service Discovery (Consul, Eureka) — зачем?
4. API Gateway (Ocelot, YARP) — зачем?
5. Distributed Tracing (Jaeger, Zipkin) — зачем?
6. Saga паттерн — для распределённых транзакций.
7. Circuit Breaker (Polly) — в распределённых системах.
8. Event Sourcing + CQRS — базовое понимание.
9. Docker + Kubernetes — для микросервисов.

---

## 20. 20. DevOps и CI/CD

*Файл: `20_DevOpsCICD.html`*
*Вопросов: 6*

1. Что такое CI/CD? GitHub Actions / GitLab CI.
2. Docker Compose — для локальной разработки.
3. Kubernetes (Pods, Services, Ingress) — базово.
4. Helm Charts — управление Kubernetes приложениями.
5. Мониторинг (Prometheus, Grafana) — базово.
6. Логирование (ELK, Seq) — базово.

---

## 21. 21. Дополнительные технологии

*Файл: `21_ExtendedTechnologies.html`*
*Вопросов: 6*

1. gRPC — что это, отличие от REST.
2. SignalR — Real-Time коммуникация.
3. Redis — кэширование, сессии, Distributed Lock.
4. Blazor — WebAssembly, Server.
5. MediatR — CQRS в .NET.
6. FluentValidation — валидация DTO.

---

## 22. 🏗 22. Архитектурные вопросы (System Design)

*Файл: `22_Architecture.html`*
*Вопросов: 6*

1. Как спроектировать систему? (High-Level Design).
2. Как масштабировать БД? (Sharding, Replication).
3. Как обработать 1 млн запросов в секунду?
4. Как обеспечить отказоустойчивость? (Resilience).
5. Как реализовать Distributed Lock?
6. Как гарантировать доставку сообщений? (At-least-once, Exactly-once).

---

## 23. 🏢 24. Вопросы от конкретных компаний

*Файл: `23_QuestionsForCompany.html`*
*Вопросов: 6*

1. Сбер — особенности собеседования.
2. Тинькофф — особенности собеседования.
3. Яндекс — особенности собеседования.
4. Ozon — особенности собеседования.
5. VK (VK Team, VK Cloud) — особенности собеседования.
6. Общие советы для всех компаний.

---

## 24. 💻 24. Практические задачи (Live Coding)

*Файл: `24_PracticeLiveCoding.html`*
*Вопросов: 10*

1. FizzBuzz — классическая задача.
2. Проверка строки на палиндром.
3. Поиск дубликатов в массиве.
4. Реализовать свой LINQ метод Where (с yield).
5. Потокобезопасный Singleton.
6. Реализовать Producer-Consumer с BlockingCollection.
7. Написать REST API (CRUD) на ASP.NET Core.
8. Написать функцию, проверяющую корректность скобок.
9. Найти отсутствующее число в массиве 1..N.
10. Найти максимальную сумму подмассива (Kadane's algorithm).

---

## 25. 🆕 25. Новые фичи C# 9, 10, 11, 12

*Файл: `25_CSharpNewFeatures.html`*
*Вопросов: 5*

1. C# 9: record, init, with.
2. C# 10: struct-записи, file-модификатор.
3. C# 11: required, raw string literals.
4. C# 12: primary constructors, collection expressions.
5. C# 13 (предварительно) — что ожидать.

---

## 26. 26. Производительность и оптимизация

*Файл: `26_PerformanceOptimization.html`*
*Вопросов: 7*

1. Профилирование — как найти узкие места.
2. Оптимизация памяти: Span, Memory, ArrayPool, ObjectPool.
3. Оптимизация LINQ — когда использовать, когда избегать.
4. Оптимизация строк — StringBuilder, String.Create, интернирование.
5. GC-оптимизация — избегать аллокаций в горячих путях.
6. Кэширование — стратегии (Cache-Aside, Write-Through, Write-Behind).
7. Асинхронная производительность — ValueTask, ConfigureAwait.

---

## 27. 27. Сериализация (JSON, XML, Protobuf)

*Файл: `27_Serialization.html`*
*Вопросов: 5*

1. System.Text.Json vs Newtonsoft.Json.
2. Атрибуты сериализации — JsonIgnore, JsonPropertyName.
3. Полиморфная сериализация.
4. XML-сериализация (XmlSerializer, DataContractSerializer).
5. Protobuf — для gRPC, бинарная сериализация.

---

## 28. 📊 28. Логирование и мониторинг

*Файл: `28_LoggingMonitoring.html`*
*Вопросов: 5*

1. ILogger vs Serilog vs NLog.
2. Структурированное логирование (JSON-логи).
3. Уровни логирования.
4. Health Checks — liveness, readiness, startup.
5. OpenTelemetry — распределённая трассировка.

---

## 29. 29. Интеграционное тестирование

*Файл: `29_IntegrationTesting.html`*
*Вопросов: 5*

1. WebApplicationFactory — тестирование ASP.NET Core API.
2. TestContainers — тестирование с реальной БД.
3. Moq / NSubstitute — мокирование зависимостей.
4. FluentAssertions — читаемые проверки.
5. Тестирование с БД — In-Memory vs реальная БД.

---

## 30. 🔄 30. Идемпотентность и обработка дубликатов

*Файл: `30_Idempotency.html`*
*Вопросов: 5*

1. Что такое идемпотентность?
2. Idempotency Key — как реализовать.
3. Обработка дубликатов в очередях.
4. Как гарантировать exactly-once доставку.
5. Как обрабатывать повторные запросы в REST API.

---

## 31. 🔁 31. Транзакции в распределённых системах

*Файл: `31_DistributedTransactions.html`*
*Вопросов: 5*

1. 2PC (Two-Phase Commit) — что это, почему не используют в микросервисах.
2. Saga — Choreography vs Orchestration (подробно).
3. Eventual Consistency — что это, когда допустимо.
4. Compensating Transaction — компенсирующие транзакции.
5. Outbox Pattern — как гарантировать доставку событий.

---

## 32. 32. Кэширование стратегии и инвалидация

*Файл: `32_Caching.html`*
*Вопросов: 4*

1. Cache-Aside — стратегия кэширования.
2. Write-Through и Write-Behind.
3. Cache Invalidation — как инвалидировать кэш.
4. Distributed Cache — Redis vs Memcached.

---

## 33. 🔒 33. Security (OAuth2, IdentityServer, JWT)

*Файл: `33_Security.html`*
*Вопросов: 5*

1. OAuth2 — что это, flow'ы (Authorization Code, Client Credentials).
2. OpenID Connect — отличие от OAuth2.
3. IdentityServer / Duende — реализация в .NET.
4. JWT — углублённо (подпись, валидация, refresh token).
5. Политики авторизации — Policy-based authorization.

---

## 34. 📊 34. Работа с большими данными (Big Data)

*Файл: `34_BigData.html`*
*Вопросов: 5*

1. Streaming — Kafka, Event Hubs.
2. Batch Processing — Spark, Hadoop.
3. Data Lake / Data Warehouse — базово.
4. ETL / ELT — что это.
5. Change Data Capture (CDC) — отслеживание изменений.

---

## 35. 💬 35. Soft Skills и вопросы "на подумать"

*Файл: `35_SoftSkills.html`*
*Вопросов: 7*

1. Расскажите о самом сложном баге, который вы фиксили.
2. Как вы работаете в команде?
3. Как вы принимаете решения?
4. Что делать, если не знаете ответ?
5. Как вы учитесь новому?
6. Почему вы хотите работать у нас?
7. Расскажите о вашем самом успешном проекте.

---

## 36. 36. Облачные платформы (Azure, AWS, Yandex Cloud)

*Файл: `36_CloudPlatforms.html`*
*Вопросов: 4*

1. Azure — основные сервисы для .NET разработчика.
2. AWS — основные сервисы для .NET разработчика.
3. Yandex Cloud — для российских компаний.
4. S3 / Blob Storage — работа с файлами в облаке.

---

## 37. 37. NoSQL базы данных

*Файл: `37_NoSQL.html`*
*Вопросов: 4*

1. MongoDB — документо-ориентированная БД.
2. Redis — in-memory кэш.
3. Elasticsearch — поиск и аналитика.
4. Когда использовать NoSQL вместо SQL.

---

## 38. 38. Message Brokers (RabbitMQ, Kafka, Azure Service Bus)

*Файл: `38_MessageBrockers.html`*
*Вопросов: 4*

1. RabbitMQ — очередь сообщений.
2. Apache Kafka — распределённый лог.
3. Azure Service Bus — облачный брокер.
4. Dead Letter Queue — обработка ошибочных сообщений.

---

## 39. 39. Дополнительные паттерны проектирования

*Файл: `39_ExtendedPatterns.html`*
*Вопросов: 6*

1. Chain of Responsibility — цепочка обязанностей.
2. Command — инкапсуляция запроса.
3. State — управление состояниями.
4. Proxy — заместитель.
5. Template Method — шаблонный метод.
6. Memento — сохранение состояния.

---

## 40. 40. Специфика РФ (1C, ГОСТ, ФСТЭК, импортозамещение)

*Файл: `40_SpecificationRU.html`*
*Вопросов: 5*

1. 1С интеграция — взаимодействие с 1С.
2. ГОСТ-криптография — российские стандарты шифрования.
3. ФСТЭК требования — аттестация и безопасность.
4. Импортозамещение — российские аналоги.
5. Postgres Pro / Альт — российские СУБД и ОС.

---


## 📊 Статистика

| Блок | Вопросов |
|------|----------|
| 01. 1. ООП. Базовые принципы | 16 |
| 02. 2. Типы данных. Память | 16 |
| 03. 3. String и StringBuilder | 8 |
| 04. 4. Коллекции и LINQ | 16 |
| 05. 5. Garbage Collector. Управление памятью | 16 |
| 06. 6. Многопоточность и Асинхронность | 16 |
| 07. 7. Делегаты, События, Generics | 9 |
| 08. 8. Исключения. Тестирование | 8 |
| 09. 9. ASP.NET Core. Web API | 12 |
| 10. 10. Базы данных. SQL. Индексы | 14 |
| 11. 11. ORM: Entity Framework Core и Dapper | 10 |
| 12. 12. SOLID. Архитектурные паттерны | 15 |
| 13. 13. .NET Platform. CLR, IL, JIT | 14 |
| 14. 14. Docker. CI/CD. Брокеры | 10 |
| 15. 15. Сети. Безопасность | 8 |
| 16. 16. Алгоритмы. Структуры данных | 10 |
| 17. 17. Git. Инструменты | 6 |
| 18. 18. Middle: углублённые темы | 11 |
| 19. 19. Микросервисы и Распределённые системы | 9 |
| 20. 20. DevOps и CI/CD | 6 |
| 21. 21. Дополнительные технологии | 6 |
| 22. 🏗 22. Архитектурные вопросы (System Design) | 6 |
| 23. 🏢 24. Вопросы от конкретных компаний | 6 |
| 24. 💻 24. Практические задачи (Live Coding) | 10 |
| 25. 🆕 25. Новые фичи C# 9, 10, 11, 12 | 5 |
| 26. 26. Производительность и оптимизация | 7 |
| 27. 27. Сериализация (JSON, XML, Protobuf) | 5 |
| 28. 📊 28. Логирование и мониторинг | 5 |
| 29. 29. Интеграционное тестирование | 5 |
| 30. 🔄 30. Идемпотентность и обработка дубликатов | 5 |
| 31. 🔁 31. Транзакции в распределённых системах | 5 |
| 32. 32. Кэширование стратегии и инвалидация | 4 |
| 33. 🔒 33. Security (OAuth2, IdentityServer, JWT) | 5 |
| 34. 📊 34. Работа с большими данными (Big Data) | 5 |
| 35. 💬 35. Soft Skills и вопросы "на подумать" | 7 |
| 36. 36. Облачные платформы (Azure, AWS, Yandex Cloud) | 4 |
| 37. 37. NoSQL базы данных | 4 |
| 38. 38. Message Brokers (RabbitMQ, Kafka, Azure Service Bus) | 4 |
| 39. 39. Дополнительные паттерны проектирования | 6 |
| 40. 40. Специфика РФ (1C, ГОСТ, ФСТЭК, импортозамещение) | 5 |

| **Итого** | **339** |