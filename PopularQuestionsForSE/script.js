// ============================================================
// Подсветка кода как в VS Code (Dark+ тема)
// Токенизация в один проход — без ломающихся вложенных replace()
// ============================================================

document.addEventListener('DOMContentLoaded', function () {
    const codeBlocks = document.querySelectorAll('pre');

    codeBlocks.forEach(block => {
        const code = block.textContent;
        const lang = detectLanguage(code);
        block.innerHTML = highlight(code, lang);
        // block.setAttribute('data-lang', lang);
    });
});

// ============================================================
// Автоопределение языка
// ============================================================
function detectLanguage(code) {
    if (/\b(using|namespace|class|public|private|protected|internal|virtual|override|async|await|Task)\b/i.test(code)) {
        return 'csharp';
    }
    if (/^\s*[\{\[][\s\S]*[\}\]]\s*$/.test(code.trim()) && /"[^"]+"\s*:/.test(code)) {
        return 'json';
    }
    if (/\b(SELECT|FROM|WHERE|JOIN|INSERT|UPDATE|DELETE|CREATE|ALTER|DROP|TABLE|INDEX)\b/i.test(code)) {
        return 'sql';
    }
    if (/<[a-zA-Z][\s\S]*?>/.test(code) && /<\/[a-zA-Z]/.test(code)) {
        return 'xml';
    }
    if (/^[ \t]*[a-zA-Z_][a-zA-Z0-9_]*:/m.test(code) && /#/.test(code)) {
        return 'yaml';
    }
    if (/\$(?:[a-zA-Z_][a-zA-Z0-9_]*)/.test(code) || /\b(git|docker|dotnet|ls|cd|pwd|export|source)\b/.test(code)) {
        return 'bash';
    }
    return 'csharp';
}

function escapeHtml(str) {
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

// ============================================================
// Ядро: один проход по коду через комбинированный regex с группами.
// Каждой группе соответствует свой CSS-класс. Всё, что не попало
// ни в одну группу, уходит в escapeHtml как обычный текст.
// Это исключает пересечение уже вставленных тегов с новыми replace().
// ============================================================
function tokenize(code, rules) {
    // rules: [{ name, regex source (без захватывающих скобок внутри!), className }]
    // Собираем один общий regex вида (r1)|(r2)|(r3)...
    const combined = new RegExp(
        rules.map(r => '(' + r.pattern + ')').join('|'),
        'gm'
    );

    let result = '';
    let lastIndex = 0;
    let match;

    while ((match = combined.exec(code)) !== null) {
        // Текст до совпадения — экранируем как есть
        if (match.index > lastIndex) {
            result += escapeHtml(code.slice(lastIndex, match.index));
        }

        // Определяем, какая именно группа сработала
        for (let i = 0; i < rules.length; i++) {
            if (match[i + 1] !== undefined) {
                const className = typeof rules[i].className === 'function'
                    ? rules[i].className(match[i + 1])
                    : rules[i].className;
                const text = escapeHtml(match[i + 1]);
                result += className
                    ? `<span class="${className}">${text}</span>`
                    : text;
                break;
            }
        }

        lastIndex = combined.lastIndex;
        // Защита от зацикливания на пустых совпадениях
        if (match[0].length === 0) {
            combined.lastIndex++;
        }
    }

    // Остаток строки после последнего совпадения
    if (lastIndex < code.length) {
        result += escapeHtml(code.slice(lastIndex));
    }

    return result;
}

function highlight(code, lang) {
    switch (lang) {
        case 'csharp': return highlightCSharp(code);
        case 'json':   return highlightJson(code);
        case 'sql':    return highlightSql(code);
        case 'xml':    return highlightXml(code);
        case 'yaml':   return highlightYaml(code);
        case 'bash':   return highlightBash(code);
        default:       return escapeHtml(code);
    }
}

// ============================================================
// C#
// ============================================================
const CSHARP_KEYWORDS = [
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

const CSHARP_TYPES = [
    'Task', 'List', 'Dictionary', 'IEnumerable', 'IQueryable', 'HttpClient',
    'StringBuilder', 'Console', 'Exception', 'Object', 'String', 'Int32',
    'Int64', 'DateTime', 'Guid', 'IComparable', 'IEquatable', 'IDisposable',
    'IEnumerator', 'IList', 'ICollection', 'IReadOnlyList', 'IReadOnlyCollection'
];

function highlightCSharp(code) {
    return tokenize(code, [
        { pattern: '//.*?$', className: 'comment' },
        { pattern: '/\\*[\\s\\S]*?\\*/', className: 'comment' },
        { pattern: '"(?:\\\\.|[^"\\\\])*"', className: 'string' },
        { pattern: "'(?:\\\\.|[^'\\\\])*'", className: 'string' },
        { pattern: '\\[[^\\]]*\\]', className: 'attribute' },
        { pattern: '\\b\\d+\\.?\\d*\\b', className: 'number' },
        { pattern: '\\b(?:' + CSHARP_KEYWORDS.join('|') + ')\\b', className: 'keyword' },
        { pattern: '\\bI[A-Z][a-zA-Z0-9_]*\\b', className: 'interface' },
        {
            pattern: '\\b(?:' + CSHARP_TYPES.join('|') + '|[A-Z][a-zA-Z0-9_]*)\\b',
            className: 'type'
        },
        { pattern: '\\b[a-z][a-zA-Z0-9_]*(?=\\s*\\()', className: 'method' }
    ]);
}

// ============================================================
// JSON
// ============================================================
function highlightJson(code) {
    return tokenize(code, [
        { pattern: '//.*?$', className: 'comment' },
        { pattern: '"(?:\\\\.|[^"\\\\])*"(?=\\s*:)', className: 'json-key' },
        { pattern: '"(?:\\\\.|[^"\\\\])*"', className: 'json-string' },
        { pattern: '\\b(?:true|false|null)\\b', className: 'json-boolean' },
        { pattern: '-?\\b\\d+\\.?\\d*\\b', className: 'json-number' }
    ]);
}

// ============================================================
// SQL
// ============================================================
const SQL_KEYWORDS = [
    'SELECT', 'FROM', 'WHERE', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'ON',
    'GROUP BY', 'ORDER BY', 'HAVING', 'UNION', 'ALL', 'DISTINCT', 'TOP', 'LIMIT',
    'INSERT', 'UPDATE', 'DELETE', 'CREATE', 'ALTER', 'DROP', 'TABLE', 'INDEX',
    'VIEW', 'PROCEDURE', 'FUNCTION', 'TRIGGER', 'DATABASE', 'SCHEMA', 'CONSTRAINT',
    'PRIMARY KEY', 'FOREIGN KEY', 'UNIQUE', 'NOT NULL', 'DEFAULT', 'CHECK',
    'IN', 'EXISTS', 'BETWEEN', 'LIKE', 'IS NULL', 'IS NOT NULL', 'AND', 'OR', 'NOT',
    'AS', 'COUNT', 'SUM', 'AVG', 'MAX', 'MIN', 'WITH', 'OVER', 'PARTITION BY',
    'ROW_NUMBER', 'RANK', 'DENSE_RANK', 'LAG', 'LEAD', 'CASE', 'WHEN', 'THEN', 'ELSE',
    'END', 'BEGIN', 'TRANSACTION', 'COMMIT', 'ROLLBACK', 'SAVEPOINT'
].sort((a, b) => b.length - a.length); // сначала длинные фразы, чтобы "PRIMARY KEY" не резалось на "KEY"

function highlightSql(code) {
    return tokenize(code, [
        { pattern: '--.*?$', className: 'comment' },
        { pattern: "'(?:''|[^'])*'", className: 'sql-string' },
        { pattern: '\\b(?:' + SQL_KEYWORDS.join('|') + ')\\b', className: 'sql-keyword' },
        { pattern: '\\b\\d+\\b', className: 'sql-number' }
    ]);
}

// ============================================================
// XML
// ============================================================
function highlightXml(code) {
    return tokenize(code, [
        { pattern: '<!--[\\s\\S]*?-->', className: 'comment' },
        { pattern: '</?[a-zA-Z][a-zA-Z0-9:_-]*', className: 'xml-tag' },
        { pattern: '/?>', className: 'xml-tag' },
        { pattern: '\\b[a-zA-Z][a-zA-Z0-9:_-]*(?==)', className: 'xml-attribute' },
        { pattern: '"[^"]*"', className: 'xml-string' }
    ]);
}

// ============================================================
// YAML
// ============================================================
function highlightYaml(code) {
    return tokenize(code, [
        { pattern: '#.*?$', className: 'comment' },
        { pattern: '"[^"]*"', className: 'yaml-string' },
        { pattern: "'[^']*'", className: 'yaml-string' },
        { pattern: '^[ \\t]*[a-zA-Z_][a-zA-Z0-9_]*(?=\\s*:)', className: 'yaml-key' },
        { pattern: '\\b(?:true|false|null|~)\\b', className: 'yaml-boolean' },
        { pattern: '\\b\\d+\\.?\\d*\\b', className: 'yaml-number' }
    ]);
}

// ============================================================
// Bash
// ============================================================
const BASH_COMMANDS = [
    'git', 'docker', 'kubectl', 'helm', 'dotnet', 'npm', 'node', 'python',
    'ls', 'cd', 'pwd', 'mkdir', 'rm', 'cp', 'mv', 'cat', 'grep', 'find',
    'chmod', 'chown', 'ps', 'kill', 'top', 'htop', 'tail', 'head', 'less',
    'echo', 'export', 'source', 'alias', 'unalias', 'which', 'whereis'
];

function highlightBash(code) {
    return tokenize(code, [
        { pattern: '#.*?$', className: 'comment' },
        { pattern: '"(?:\\\\.|[^"\\\\])*"', className: 'bash-string' },
        { pattern: '\\$[a-zA-Z_][a-zA-Z0-9_]*', className: 'bash-variable' },
        { pattern: '\\b(?:' + BASH_COMMANDS.join('|') + ')\\b', className: 'bash-command' },
        { pattern: '(?<=\\s)-{1,2}[a-zA-Z][a-zA-Z0-9-]*', className: 'bash-flag' }
    ]);
}