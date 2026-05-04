import React from 'react';

type TableRow = {
  _key: string;
  _type: 'tableRow';
  cells: string[];
};

type TableBlock = {
  _key: string;
  _type: 'table';
  hasHeaderRow: boolean;
  rows: TableRow[];
};

function createKey() {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID().replace(/-/g, '').slice(0, 12);
  }

  return Math.random().toString(36).slice(2, 14);
}

function normalizeCellText(value: string) {
  return value.replace(/\s+/g, ' ').trim();
}

function normalizeRows(rows: string[][]) {
  return rows
    .map((row) => row.map(normalizeCellText))
    .filter((row) => row.some(Boolean));
}

function rowsToTableBlock(rows: string[][]): TableBlock | null {
  const normalizedRows = normalizeRows(rows);
  const columnCount = Math.max(...normalizedRows.map((row) => row.length), 0);

  if (normalizedRows.length < 2 || columnCount < 2) {
    return null;
  }

  return {
    _key: createKey(),
    _type: 'table',
    hasHeaderRow: true,
    rows: normalizedRows.map((row) => ({
      _key: createKey(),
      _type: 'tableRow',
      cells: Array.from({ length: columnCount }, (_, index) => row[index] || ''),
    })),
  };
}

function parseHtmlTable(html: string) {
  if (!html || !html.includes('<table')) {
    return null;
  }

  const document = new DOMParser().parseFromString(html, 'text/html');
  const table = document.querySelector('table');

  if (!table) {
    return null;
  }

  const rows = Array.from(table.querySelectorAll('tr')).map((row) =>
    Array.from(row.querySelectorAll('th,td')).map((cell) => cell.textContent || '')
  );

  return rowsToTableBlock(rows);
}

function parseMarkdownTable(text: string) {
  const lines = text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  if (lines.length < 3 || !lines.every((line) => line.includes('|'))) {
    return null;
  }

  const separatorIndex = lines.findIndex((line) =>
    /^\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)+\|?$/.test(line)
  );

  if (separatorIndex < 1) {
    return null;
  }

  const tableLines = lines.filter((_, index) => index !== separatorIndex);
  const rows = tableLines.map((line) => {
    const trimmedLine = line.replace(/^\|/, '').replace(/\|$/, '');
    return trimmedLine.split('|');
  });

  return rowsToTableBlock(rows);
}

function parseTsvTable(text: string) {
  const lines = text
    .split(/\r?\n/)
    .map((line) => line.trimEnd())
    .filter(Boolean);

  if (lines.length < 2 || !lines.every((line) => line.includes('\t'))) {
    return null;
  }

  return rowsToTableBlock(lines.map((line) => line.split('\t')));
}

function parsePastedTable(event: React.ClipboardEvent) {
  const clipboardData = event.clipboardData;
  const html = clipboardData.getData('text/html');
  const text = clipboardData.getData('text/plain');

  return parseHtmlTable(html) || parseMarkdownTable(text) || parseTsvTable(text);
}

export function SmartPortableTextInput(props: any) {
  return props.renderDefault({
    ...props,
    onPaste: (data: any) => {
      const tableBlock = parsePastedTable(data.event);

      if (!tableBlock) {
        return undefined;
      }

      data.event.preventDefault();

      return {
        insert: [tableBlock],
        path: data.path,
      };
    },
  });
}
