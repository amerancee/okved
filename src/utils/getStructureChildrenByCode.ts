import type { ListStructure } from '../api/api.types.ts';
import { GlobalConstants } from '../constants/global.ts';

export function getStructureChildrenByCode(
  structure: ListStructure[],
  code: string,
  currentLevel: number = 0
): ListStructure | undefined {
  const requiredLevel = getCodeLevel(code);
  const currentLevelCode = sliceCode(code, currentLevel);

  const target = structure?.find((item) => item.code === currentLevelCode);

  if (requiredLevel === currentLevel) {
    return target;
  }

  if (target && Array.isArray(target.children)) {
    return getStructureChildrenByCode(target.children, code, currentLevel + 1);
  }
}

function getCodeLevel(code: string) {
  return code.split(GlobalConstants.okvedCodeSeparatorSymbol).length - 1;
}

function sliceCode(code: string, level: number) {
  return code
    .split(GlobalConstants.okvedCodeSeparatorSymbol)
    .slice(0, level + 1)
    .join(GlobalConstants.okvedCodeSeparatorSymbol);
}
