// ============================================================
// Автоматическая подсветка кода как в VS Code (Dark+ тема)
// Без необходимости указывать классы языков
// ============================================================

document.addEventListener('DOMContentLoaded', function() {
    // Находим все блоки <pre>
    const codeBlocks = document.querySelectorAll('pre');
    
    codeBlocks.forEach(block => {
        // Получаем текст
        let code = block.textContent;
        
        // Автоопределение языка по содержимому
        let lang = detectLanguage(code);
        
        // Подсветка в зависимости от языка
        switch(lang) {
            case 'csharp':
                code = highlightCSharp(code);
                break;
            case 'json':
                code = highlightJson(code);
                break;
            case 'sql':
                code = highlightSql(code);
                break;
            case 'xml':
                code = highlightXml(code);
                break;
            case 'yaml':
                code = highlightYaml(code);
                break;
            case 'bash':
                code = highlightBash(code);
                break;
            default:
                code = escapeHtml(code);
        }
        
        // // Устанавливаем язык как data-атрибут для бейджа
        // block.setAttribute('data-lang', lang);
        block.innerHTML = code;
    });
});

// ============================================================
// Автоопределение языка
// ============================================================
function detectLanguage(code) {
    // C# — ключевые слова, using, namespace, class, public/private
    if (/\b(using|namespace|class|public|private|protected|internal|virtual|override|async|await|Task)\b/i.test(code)) {
        return 'csharp';
    }
    
    // JSON — ключи в кавычках, двоеточие, фигурные/квадратные скобки
    if (/^\s*\{[\s\S]*\}|\s*\[[\s\S]*\]\s*$/.test(code.trim()) && /"[^"]+":/.test(code)) {
        return 'json';
    }
    
    // SQL — SELECT, FROM, WHERE, JOIN, INSERT, UPDATE, DELETE
    if (/\b(SELECT|FROM|WHERE|JOIN|INSERT|UPDATE|DELETE|CREATE|ALTER|DROP|TABLE|INDEX)\b/i.test(code)) {
        return 'sql';
    }
    
    // XML — теги <...>
    if (/<[a-zA-Z][\s\S]*?>/.test(code) && /<\/[a-zA-Z]/.test(code)) {
        return 'xml';
    }
    
    // YAML — ключи с двоеточием, отступы, # комментарии
    if (/^[\s]*[a-zA-Z_][a-zA-Z0-9_]*:/.test(code) && /#/.test(code)) {
        return 'yaml';
    }
    
    // Bash — $, #, git, docker, dotnet, ls, cd, export
    if (/\$(?:[a-zA-Z_][a-zA-Z0-9_]*)/.test(code) || /\b(git|docker|dotnet|ls|cd|pwd|export|source)\b/.test(code)) {
        return 'bash';
    }
    
    return 'csharp'; // По умолчанию
}

// ============================================================
// Вспомогательная функция экранирования HTML
// ============================================================
function escapeHtml(str) {
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

// ============================================================
// Подсветка C# (VS Code Dark+)
// ============================================================
function highlightCSharp(code) {
    code = escapeHtml(code);
    
    // Ключевые слова C#
    const keywords = [
        'abstract', 'as', 'base', 'bool', 'break', 'byte', 'case', 'catch', 'char',
        'checked', 'class', 'const', 'continue', 'decimal', 'default', 'delegate',
        'do', 'double', 'else', 'enum', 'event', 'explicit', 'extern', 'false',
        'finally', 'fixed', 'float', 'for', 'foreach', 'goto', 'if', 'implicit',
        'in', 'int', 'interface', 'internal', 'is', 'lock', 'long', 'namespace',
        'new', 'null', 'object', 'operator', 'out', 'override', 'params', 'private',
        'protected', 'public', 'readonly', 'ref', 'return', 'sbyte', 'sealed',
        'short', 'sizeof', 'stackalloc', 'static', 'string', 'struct', 'switch',
        'this', 'throw', 'true', 'try', 'typeof', 'uint', 'ulong', 'unchecked',
        'unsafe', 'ushort', 'using', 'virtual', 'void', 'volatile', 'while',
        'add', 'alias', 'ascending', 'async', 'await', 'by', 'descending', 'dynamic',
        'equals', 'from', 'get', 'global', 'group', 'init', 'into', 'join', 'let',
        'nameof', 'nint', 'not', 'notnull', 'nuint', 'on', 'orderby', 'partial',
        'record', 'remove', 'required', 'select', 'set', 'value', 'var', 'when',
        'where', 'with', 'yield'
    ];
    
    // Строки
    code = code.replace(/(".*?")/g, '<span class="string">$1</span>');
    code = code.replace(/('.*?')/g, '<span class="string">$1</span>');
    
    // Комментарии однострочные
    code = code.replace(/(\/\/.*?$)/gm, '<span class="comment">$1</span>');
    
    // Комментарии многострочные
    code = code.replace(/(\/\*[\s\S]*?\*\/)/g, '<span class="comment">$1</span>');
    
    // Атрибуты [Attribute]
    code = code.replace(/(\[.*?\])/g, '<span class="attribute">$1</span>');
    
    // Числа
    code = code.replace(/\b(\d+\.?\d*)\b/g, '<span class="number">$1</span>');
    
    // null, true, false
    code = code.replace(/\b(null|true|false)\b/g, '<span class="keyword">$1</span>');
    
    // Ключевые слова
    code = code.replace(new RegExp('\\b(' + keywords.join('|') + ')\\b', 'g'), '<span class="keyword">$1</span>');
    
    // Типы (с большой буквы) — но не ключевые слова
    code = code.replace(/\b([A-Z][a-zA-Z0-9_]*)\b/g, function(match) {
        // Пропускаем уже обработанные
        if (match === 'Task' || match === 'List' || match === 'Dictionary' || 
            match === 'IEnumerable' || match === 'IQueryable' || match === 'HttpClient' ||
            match === 'StringBuilder' || match === 'Console' || match === 'Exception' ||
            match === 'Object' || match === 'String' || match === 'Int32' ||
            match === 'Int64' || match === 'DateTime' || match === 'Guid' ||
            match === 'IComparable' || match === 'IEquatable' || match === 'IDisposable' ||
            match === 'IEnumerator' || match === 'IEnumerable' || match === 'IList' ||
            match === 'ICollection' || match === 'IReadOnlyList' || match === 'IReadOnlyCollection' ||
            /^[A-Z][a-z]+/.test(match)) {
            return `<span class="type">${match}</span>`;
        }
        return match;
    });
    
    // Методы (с маленькой буквы, заканчиваются на ())
    code = code.replace(/\b([a-z][a-zA-Z0-9_]*)\s*\(/g, '<span class="method">$1</span>(');
    
    // Интерфейсы (I + большая буква)
    code = code.replace(/\b(I[A-Z][a-zA-Z0-9_]*)\b/g, '<span class="interface">$1</span>');
    
    return code;
}

// ============================================================
// Подсветка JSON
// ============================================================
function highlightJson(code) {
    code = escapeHtml(code);
    
    code = code.replace(/"([^"]+)":/g, '<span class="json-key">"$1"</span>:');
    code = code.replace(/:\s*"([^"]*)"/g, ': <span class="json-string">"$1"</span>');
    code = code.replace(/(:\s*)(\d+\.?\d*)/g, '$1<span class="json-number">$2</span>');
    code = code.replace(/\b(true|false|null)\b/g, '<span class="json-boolean">$1</span>');
    code = code.replace(/(\/\/.*?$)/gm, '<span class="comment">$1</span>');
    
    return code;
}

// ============================================================
// Подсветка SQL
// ============================================================
function highlightSql(code) {
    code = escapeHtml(code);
    
    const sqlKeywords = [
        'SELECT', 'FROM', 'WHERE', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'ON',
        'GROUP BY', 'ORDER BY', 'HAVING', 'UNION', 'ALL', 'DISTINCT', 'TOP', 'LIMIT',
        'INSERT', 'UPDATE', 'DELETE', 'CREATE', 'ALTER', 'DROP', 'TABLE', 'INDEX',
        'VIEW', 'PROCEDURE', 'FUNCTION', 'TRIGGER', 'DATABASE', 'SCHEMA', 'CONSTRAINT',
        'PRIMARY KEY', 'FOREIGN KEY', 'UNIQUE', 'NOT NULL', 'DEFAULT', 'CHECK',
        'IN', 'EXISTS', 'BETWEEN', 'LIKE', 'IS NULL', 'IS NOT NULL', 'AND', 'OR', 'NOT',
        'AS', 'COUNT', 'SUM', 'AVG', 'MAX', 'MIN', 'WITH', 'OVER', 'PARTITION BY',
        'ROW_NUMBER', 'RANK', 'DENSE_RANK', 'LAG', 'LEAD', 'CASE', 'WHEN', 'THEN', 'ELSE',
        'END', 'BEGIN', 'TRANSACTION', 'COMMIT', 'ROLLBACK', 'SAVEPOINT'
    ];
    
    code = code.replace(new RegExp('\\b(' + sqlKeywords.join('|') + ')\\b', 'gi'), 
        '<span class="sql-keyword">$1</span>');
    
    code = code.replace(/('[^']*')/g, '<span class="sql-string">$1</span>');
    code = code.replace(/\b(\d+)\b/g, '<span class="sql-number">$1</span>');
    code = code.replace(/(--.*?$)/gm, '<span class="comment">$1</span>');
    
    return code;
}

// ============================================================
// Подсветка XML
// ============================================================
function highlightXml(code) {
    code = escapeHtml(code);
    
    code = code.replace(/(&lt;\/?[a-zA-Z][a-zA-Z0-9]*)/g, '<span class="xml-tag">$1</span>');
    code = code.replace(/(\/?&gt;)/g, '<span class="xml-tag">$1</span>');
    code = code.replace(/\b([a-zA-Z][a-zA-Z0-9]*)=/g, '<span class="xml-attribute">$1</span>=');
    code = code.replace(/="([^"]*)"/g, '="<span class="xml-string">$1</span>"');
    code = code.replace(/(&lt;!--[\s\S]*?--&gt;)/g, '<span class="comment">$1</span>');
    
    return code;
}

// ============================================================
// Подсветка YAML
// ============================================================
function highlightYaml(code) {
    code = escapeHtml(code);
    
    code = code.replace(/^(\s*)([a-zA-Z_][a-zA-Z0-9_]*):/gm, 
        '$1<span class="yaml-key">$2</span>:');
    code = code.replace(/(:\s*)"([^"]*)"/g, ': <span class="yaml-string">"$2"</span>');
    code = code.replace(/(:\s*)'([^']*)'/g, ': <span class="yaml-string">\'$2\'</span>');
    code = code.replace(/\b(true|false|null|~)\b/g, '<span class="yaml-boolean">$1</span>');
    code = code.replace(/\b(\d+\.?\d*)\b/g, '<span class="yaml-number">$1</span>');
    code = code.replace(/(#.*?$)/gm, '<span class="comment">$1</span>');
    
    return code;
}

// ============================================================
// Подсветка Bash
// ============================================================
function highlightBash(code) {
    code = escapeHtml(code);
    
    const bashCommands = [
        'git', 'docker', 'kubectl', 'helm', 'dotnet', 'npm', 'node', 'python',
        'ls', 'cd', 'pwd', 'mkdir', 'rm', 'cp', 'mv', 'cat', 'grep', 'find',
        'chmod', 'chown', 'ps', 'kill', 'top', 'htop', 'tail', 'head', 'less',
        'echo', 'export', 'source', 'alias', 'unalias', 'which', 'whereis'
    ];
    
    code = code.replace(new RegExp('\\b(' + bashCommands.join('|') + ')\\b', 'g'), 
        '<span class="bash-command">$1</span>');
    
    code = code.replace(/(\s+)(-\w+)/g, '$1<span class="bash-flag">$2</span>');
    code = code.replace(/\$([a-zA-Z_][a-zA-Z0-9_]*)/g, 
        '<span class="bash-variable">$$$1</span>');
    code = code.replace(/(".*?")/g, '<span class="bash-string">$1</span>');
    code = code.replace(/(#.*?$)/gm, '<span class="comment">$1</span>');
    
    return code;
}