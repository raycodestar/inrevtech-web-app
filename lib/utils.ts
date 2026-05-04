import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface PortableTextHeading {
  _key?: string;
  level: 'h2' | 'h3';
  text: string;
  id: string;
}

export function slugifyHeading(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

export function getPortableTextBlockText(block: any) {
  return (
    block?.children
      ?.map((child: any) => (typeof child?.text === 'string' ? child.text : ''))
      .join('')
      .trim() || ''
  );
}

// Utility function to extract headings from Portable Text.
export function getHeadings(blocks: any[]) {
  const headings: PortableTextHeading[] = [];
  const slugCounts = new Map<string, number>();

  blocks?.forEach((block) => {
    if (block?._type !== 'block' || (block.style !== 'h2' && block.style !== 'h3')) {
      return;
    }

    const text = getPortableTextBlockText(block);
    const baseId = slugifyHeading(text);

    if (!text || !baseId) {
      return;
    }

    const count = slugCounts.get(baseId) || 0;
    slugCounts.set(baseId, count + 1);

    headings.push({
      _key: block._key,
      level: block.style,
      text,
      id: count === 0 ? baseId : `${baseId}-${count + 1}`,
    });
  });

  return headings;
}
