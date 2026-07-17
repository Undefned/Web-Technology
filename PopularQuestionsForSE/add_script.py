import os
import glob

# Строка для вставки
SCRIPT_TAG = '''<!-- ===== ПОДКЛЮЧЕНИЕ СКРИПТА ПОДСВЕТКИ ===== -->
<script src="script.js"></script>'''

def add_script_to_html():
    # Находим все HTML-файлы в текущей папке
    html_files = glob.glob('*.html')
    
    if not html_files:
        print("⚠️ HTML-файлы не найдены в текущей папке!")
        return
    
    print(f"📁 Найдено {len(html_files)} HTML-файлов")
    
    for file_path in html_files:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Проверяем, есть ли уже подключение
        if 'script.js' in content and 'ПОДКЛЮЧЕНИЕ СКРИПТА' in content:
            print(f"⏭️  Пропущено (уже есть): {file_path}")
            continue
        
        # Вариант 1: Если есть </body> — вставляем перед ним
        if '</body>' in content:
            new_content = content.replace('</body>', f'    {SCRIPT_TAG}\n</body>')
            print(f"✅ Обновлён (через </body>): {file_path}")
        else:
            # Вариант 2: Если нет </body> — добавляем в конец
            new_content = content + f'\n{SCRIPT_TAG}\n'
            print(f"✅ Обновлён (в конец файла): {file_path}")
        
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)

if __name__ == '__main__':
    print("🔧 Добавление скрипта во все HTML-файлы\n")
    add_script_to_html()
    print("\n✅ Готово!")