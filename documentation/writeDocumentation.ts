import type { DocObject } from "./documentationObjects.ts";

const VERSION = `0.1.4`;

const justParens = (line: string): number => {
  const openCount = (line.match(/\(/g) || []).length;
  const closeCount = (line.match(/\)/g) || []).length;
  return openCount - closeCount;
};

const exampleFinder = async (
  testText: string,
  name: string,
): Promise<string> => {
  let parenthesisCount = 0;
  let startCursor = 0;
  let endCursor = 0;
  let lines: string[] = testText.split("\n");
  for (let i = 0, l = lines.length; i < l; i++) {
    if (lines[i].includes(`Rhum.testSuite("${name}`)) {
      startCursor = i;
      endCursor = i;
      break;
    }
  }
  parenthesisCount = justParens(lines[endCursor]);
  while (parenthesisCount > 0) {
    endCursor += 1;
    parenthesisCount += justParens(lines[endCursor]);
  }
  return lines.slice(startCursor, endCursor + 1).join("\n");
};

export const documentationGenerator = async ({
  name,
  sourceFile,
  testFile,
  signature,
  description,
}: DocObject): Promise<string> => {
  const workingDirectory = Deno.cwd();
  const src = await Deno.readTextFile(`${workingDirectory}/${sourceFile}`);
  const examp = await Deno.readTextFile(
    `${workingDirectory}/${testFile}`,
  ).then((testText: string) => exampleFinder(testText, name));

  return `
## ${name}

#### import
\`\`\`typescript
import ${name} from "https://deno.land/x/denodash@0.1.1/${sourceFile}"
\`\`\`

#### signature
\`\`\`typescript
${signature}
\`\`\`

${description}

#### Source:

\`\`\`typescript
${src}
\`\`\`

#### Test Examples: 

\`\`\`typescript
${examp}
\`\`\`

  `;
};

export const writeDocumentation = async ({
  name,
  sourceFile,
  testFile,
  signature,
  description,
}: DocObject): Promise<void> => {
  const docs = await documentationGenerator({
    name,
    sourceFile,
    testFile,
    signature,
    description,
  });
  ("src/array/cartesianProduct.ts");
  const outputPath = sourceFile
    .replace("src", "documentation")
    .replace(".ts", ".md");
  await Deno.writeTextFile(outputPath, docs);
  console.log(`Wrote ${outputPath}`);
};

export default writeDocumentation;
