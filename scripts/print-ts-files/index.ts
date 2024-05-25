import * as ts from 'typescript';
import * as fs from 'fs';
import * as path from 'path';

const visitedFiles: Set<string> = new Set();

function logFileContent(filePath: string) {
  const content = fs.readFileSync(filePath, 'utf8');
  console.log(`// ${filePath}`);
  console.log(content);
  console.log('');
}

function resolveModule(moduleName: string, containingFile: string): string | undefined {
  const result = ts.resolveModuleName(moduleName, containingFile, {
    moduleResolution: ts.ModuleResolutionKind.NodeJs,
    target: ts.ScriptTarget.ESNext,
  }, ts.sys);

  if (result.resolvedModule) {
    return result.resolvedModule.resolvedFileName;
  }

  return undefined;
}

function processFile(filePath: string) {
  if (visitedFiles.has(filePath)) {
    return;
  }

  visitedFiles.add(filePath);

  logFileContent(filePath);

  const sourceFile = ts.createSourceFile(
    filePath,
    fs.readFileSync(filePath, 'utf8'),
    ts.ScriptTarget.ESNext,
    true,
  );

  sourceFile.forEachChild(node => {
    if (ts.isImportDeclaration(node) && ts.isStringLiteral(node.moduleSpecifier)) {
      const importPath = node.moduleSpecifier.text;
      const resolvedPath = resolveModule(importPath, filePath);

      if (resolvedPath && resolvedPath.endsWith('.ts')) {
        processFile(resolvedPath);
      }
    }
  });
}

const entryFile = process.argv[2];

if (!entryFile) {
  console.error('Please provide the entry file path as the first argument');
  process.exit(1);
}

const entryFilePath = path.resolve(entryFile);

if (!fs.existsSync(entryFilePath)) {
  console.error(`The file ${entryFilePath} does not exist`);
  process.exit(1);
}

processFile(entryFilePath);