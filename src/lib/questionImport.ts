export type ImportedOption = {
  value: string;
  text: string;
  scores: Record<string, number>;
};

export type ImportedQuestion = {
  id: number;
  text: string;
  order: number;
  category: string;
  isActive: boolean;
  answers: ImportedOption[];
};

const clusters = ['thinker', 'seeker', 'builder', 'nurturer', 'spark', 'wanderer'];

function parseScores(scoringText: string) {
  const scores: Record<string, Record<string, number>> = {};
  
  // Match patterns like "A → Cluster +1" or "A → Cluster1 +1, Cluster2 +1"
  for (const match of scoringText.matchAll(/\b([A-E])\s*(?:→|->)\s*([\s\S]*?)(?=\s+[A-E]\s*(?:→|->)|$)/gi)) {
    scores[match[1].toUpperCase()] = {};
    const scoreContent = match[2];
    
    // Match all cluster+score pairs (e.g., "Nurturer +1", "Builder +2")
    for (const score of scoreContent.matchAll(/(thinker|seeker|builder|nurturer|spark|wanderer)\s*\+\s*(\d+)/gi)) {
      if (clusters.includes(score[1].toLowerCase())) {
        scores[match[1].toUpperCase()][score[1].toLowerCase()] = Number(score[2]);
      }
    }
  }
  
  return scores;
}

export function parseQuestionDocument(rawText: string): ImportedQuestion[] {
  const text = rawText.replace(/\r/g, '').replace(/[ \t]+/g, ' ').replace(/\n+/g, '\n').trim();
  
  // Split by "QUESTION" header (case-insensitive), including optional numbering
  const blocks = text.split(/(?=QUESTION\s+\d+|^\d+\s*[.)]\s+)/im).filter((block) => /QUESTION\s+\d+|^\d+\s*[.)]/i.test(block));

  return blocks.map((block, index) => {
    // Try to extract question number from "QUESTION 1" or "1. " format
    const questionMatch = block.match(/QUESTION\s+(\d+)/) || block.match(/^(\d+)\s*[.)]/);
    const id = questionMatch ? Number(questionMatch[1]) : index + 1;
    
    // Remove the question header
    const withoutHeader = block
      .replace(/^QUESTION\s+\d+(?:\s*\([^)]*\))?\s*/i, '')
      .replace(/^\d+\s*[.)]\s*/i, '')
      .trim();
    
    // Locate scoring section
    const scoringStart = withoutHeader.search(/(?:NEW\s+)?SCORING/i);
    const questionPart = (scoringStart >= 0 ? withoutHeader.slice(0, scoringStart) : withoutHeader).trim();
    const scoringPart = scoringStart >= 0 ? withoutHeader.slice(scoringStart) : '';
    
    // Extract all answer options (A-E)
    const optionMatches = [...questionPart.matchAll(/(?:^|\s)([A-E])\s*[.)]\s*([\s\S]*?)(?=\s+[A-E]\s*[.)]\s+|$)/gi)];
    const firstOption = optionMatches[0]?.index ?? questionPart.length;
    
    // Everything before the first option is the prompt
    const prompt = questionPart.slice(0, firstOption).replace(/^\d+[.)]\s*/i, '').trim();
    const scores = parseScores(scoringPart);

    return {
      id,
      text: prompt,
      order: id,
      category: 'CAT-20',
      isActive: false,
      answers: ['A', 'B', 'C', 'D', 'E'].map((value) => ({
        value,
        text: optionMatches.find((match) => match[1] === value)?.[2]?.trim() || '',
        scores: scores[value] || {},
      })),
    };
  }).filter((question) => question.text && question.answers.filter((answer) => answer.text).length >= 2);
}

export async function readQuestionDocument(file: File): Promise<ImportedQuestion[]> {
  const extension = file.name.toLowerCase().split('.').pop();
  if (extension === 'docx' || extension === 'doc') {
    const mammoth = await import('mammoth/mammoth.browser');
    const result = await mammoth.extractRawText({ arrayBuffer: await file.arrayBuffer() });
    return parseQuestionDocument(result.value);
  }
  if (extension === 'pdf') {
    const pdfjs = await import('pdfjs-dist/legacy/build/pdf.mjs');
    pdfjs.GlobalWorkerOptions.workerSrc = new URL('pdfjs-dist/legacy/build/pdf.worker.min.mjs', import.meta.url).toString();
    const document = await pdfjs.getDocument({ data: new Uint8Array(await file.arrayBuffer()) }).promise;
    const pages: string[] = [];
    for (let pageNumber = 1; pageNumber <= document.numPages; pageNumber += 1) {
      const page = await document.getPage(pageNumber);
      const content = await page.getTextContent();
      pages.push(content.items.map((item) => ('str' in item ? item.str : '')).join(' '));
    }
    return parseQuestionDocument(pages.join('\n'));
  }
  throw new Error('Please choose a PDF or Word document.');
}
