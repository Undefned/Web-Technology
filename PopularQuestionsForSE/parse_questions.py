import os
import re
from pathlib import Path

# ============================================================
# Парсер HTML-файлов с вопросами C#
# Извлекает: номер блока, название блока, список вопросов
# ============================================================

def parse_block_number(filename):
    """Извлекает номер блока из имени файла"""
    match = re.match(r'(\d+)_', filename)
    return int(match.group(1)) if match else 999

def parse_block_title(html_content):
    """Извлекает название блока из <h2> или <h1>"""
    # Ищем <h2> в секции
    match = re.search(r'<h2>(.*?)<\/h2>', html_content, re.DOTALL)
    if match:
        # Удаляем эмодзи и спаны с бейджами
        title = match.group(1)
        title = re.sub(r'<span[^>]*>.*?</span>', '', title)
        title = re.sub(r'[🧱📦🧵🗂️🧠⚡🧩🧪🌐💾🔗📐⚙️🐳🔐🧮📚🚀☁️🗄️📨🇷🇺]', '', title)
        title = re.sub(r'\s+', ' ', title).strip()
        return title
    
    # Ищем <h1>
    match = re.search(r'<h1>(.*?)<\/h1>', html_content, re.DOTALL)
    if match:
        title = match.group(1)
        title = re.sub(r'<span[^>]*>.*?</span>', '', title)
        title = re.sub(r'[🧱📦🧵🗂️🧠⚡🧩🧪🌐💾🔗📐⚙️🐳🔐🧮📚🚀☁️🗄️📨🇷🇺]', '', title)
        title = re.sub(r'\s+', ' ', title).strip()
        return title
    
    return "Без названия"

def parse_questions(html_content):
    """Извлекает все вопросы из тегов <details>"""
    questions = []
    
    # Ищем все <details> блоки
    details_matches = re.finditer(r'<details>(.*?)<\/details>', html_content, re.DOTALL)
    
    for match in details_matches:
        details_content = match.group(1)
        # Ищем <summary> внутри details
        summary_match = re.search(r'<summary>(.*?)<\/summary>', details_content, re.DOTALL)
        if summary_match:
            question = summary_match.group(1)
            # Очищаем от HTML-тегов
            question = re.sub(r'<[^>]+>', '', question)
            question = re.sub(r'\s+', ' ', question).strip()
            if question:
                questions.append(question)
    
    return questions

def get_block_name_from_filename(filename):
    """Возвращает читаемое имя файла"""
    # Убираем номер
    name = re.sub(r'^\d+_', '', filename)
    name = re.sub(r'\.html$', '', name)
    # Разбиваем по заглавным буквам
    name = re.sub(r'([A-Z])', r' \1', name).strip()
    # Специальные случаи
    replacements = {
        'OOP': 'ООП',
        'DataType': 'Типы данных',
        'StringStringBuilder': 'String и StringBuilder',
        'CollectionsLINQ': 'Коллекции и LINQ',
        'MultiThreadingAsync': 'Многопоточность и Асинхронность',
        'DelegateEventGenerics': 'Делегаты, События, Generics',
        'ExceptionsTesting': 'Исключения. Тестирование',
        'ASPNETCoreAndWebApi': 'ASP.NET Core и Web API',
        'DataBaseSqlIndexes': 'Базы данных. SQL. Индексы',
        'ORMEntityFrameworkCoreDapper': 'ORM: EF Core и Dapper',
        'SOLIDArchitecturePatterns': 'SOLID. Архитектурные паттерны',
        '.NETPlatformCLRILJIT': '.NET Platform. CLR, IL, JIT',
        'DockerCICDBrockers': 'Docker. CI/CD. Брокеры',
        'NetworksSecurity': 'Сети. Безопасность',
        'AlgorithmsDataStructure': 'Алгоритмы. Структуры данных',
        'GitTools': 'Git. Инструменты',
        'MiddleDeepThemes': 'Middle: углублённые темы',
        'Microservices': 'Микросервисы',
        'DevOpsCICD': 'DevOps и CI/CD',
        'ExtendedTechnologies': 'Дополнительные технологии',
        'Architecture': 'Архитектура (System Design)',
        'QuestionsForCompany': 'Вопросы от компаний',
        'PracticeLiveCoding': 'Практические задачи (Live Coding)',
        'CSharpNewFeatures': 'Новые фичи C# 9-12',
        'PerformanceOptimization': 'Производительность и оптимизация',
        'Serialization': 'Сериализация',
        'LoggingMonitoring': 'Логирование и мониторинг',
        'IntegrationTesting': 'Интеграционное тестирование',
        'Idempotency': 'Идемпотентность',
        'DistributedTransactions': 'Распределённые транзакции',
        'Caching': 'Кэширование',
        'Security': 'Security (OAuth2, JWT)',
        'BigData': 'Большие данные (Big Data)',
        'SoftSkills': 'Soft Skills',
        'CloudPlatforms': 'Облачные платформы',
        'NoSQL': 'NoSQL базы данных',
        'MessageBrockers': 'Message Brokers',
        'ExtendedPatterns': 'Дополнительные паттерны',
        'SpecificationRU': 'Специфика РФ'
    }
    
    for key, value in replacements.items():
        if key in name:
            return value
    
    return name

def parse_all_blocks(directory='.'):
    """Парсит все HTML-файлы в директории"""
    results = []
    
    # Находим все файлы вида N_*.html
    html_files = []
    for f in os.listdir(directory):
        if re.match(r'^\d+_.*\.html$', f):
            html_files.append(f)
    
    # Сортируем по номеру
    html_files.sort(key=parse_block_number)
    
    for filename in html_files:
        filepath = os.path.join(directory, filename)
        try:
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Извлекаем данные
            block_num = parse_block_number(filename)
            block_name = get_block_name_from_filename(filename)
            
            # Пробуем получить название из HTML
            html_title = parse_block_title(content)
            if html_title and html_title != "Без названия":
                block_name = html_title
            
            questions = parse_questions(content)
            
            results.append({
                'number': block_num,
                'filename': filename,
                'name': block_name,
                'questions': questions,
                'count': len(questions)
            })
            
        except Exception as e:
            print(f"⚠️ Ошибка при парсинге {filename}: {e}")
    
    return results

def generate_markdown(results, output_file='questions_summary.md'):
    """Генерирует Markdown-файл с результатами"""
    
    lines = []
    lines.append("# 📚 C# Вопросы для собеседования")
    lines.append("")
    lines.append(f"**Всего блоков:** {len(results)}")
    lines.append(f"**Всего вопросов:** {sum(r['count'] for r in results)}")
    lines.append("")
    lines.append("---")
    lines.append("")
    
    for block in results:
        lines.append(f"## {block['number']:02d}. {block['name']}")
        lines.append("")
        lines.append(f"*Файл: `{block['filename']}`*")
        lines.append(f"*Вопросов: {block['count']}*")
        lines.append("")
        
        if block['questions']:
            for i, q in enumerate(block['questions'], 1):
                lines.append(f"{i}. {q}")
        else:
            lines.append("*Вопросы не найдены*")
        
        lines.append("")
        lines.append("---")
        lines.append("")
    
    # Статистика
    lines.append("")
    lines.append("## 📊 Статистика")
    lines.append("")
    lines.append("| Блок | Вопросов |")
    lines.append("|------|----------|")
    for block in results:
        lines.append(f"| {block['number']:02d}. {block['name']} | {block['count']} |")
    lines.append("")
    lines.append(f"| **Итого** | **{sum(r['count'] for r in results)}** |")
    
    # Записываем в файл
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write('\n'.join(lines))
    
    print(f"✅ Готово! Результат сохранён в {output_file}")

def main():
    print("🔍 Парсинг HTML-файлов с вопросами C#")
    print("=" * 50)
    
    results = parse_all_blocks('.')
    
    # Вывод статистики
    print(f"\n📁 Найдено блоков: {len(results)}")
    total_questions = sum(r['count'] for r in results)
    print(f"📝 Всего вопросов: {total_questions}")
    print()
    
    for block in results:
        print(f"  {block['number']:02d}. {block['name']} — {block['count']} вопросов")
    
    # Генерация Markdown
    generate_markdown(results, 'questions_summary.md')
    
    print("\n" + "=" * 50)
    print("🎉 Готово!")

if __name__ == '__main__':
    main()