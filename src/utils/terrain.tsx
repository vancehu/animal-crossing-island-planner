export const TERRAIN_WIDTH = 20;
export const TERRAIN_HEIGHT = 16;
export const TERRAIN_SIZE = TERRAIN_WIDTH * TERRAIN_HEIGHT;

export enum TerrainBlock {
  landLow = 0,
  landMid,
  landHigh,
  waterLow,
  waterMid,
  waterHigh,
  landMid_LandLow,
  landHigh_LandMid,
  landLow_WaterLow,
  landMid_WaterMid,
  landHigh_WaterHigh,
  landMid_WaterLow
}

export enum CornerDirection {
  NE,
  NW,
  SE,
  SW
}

export enum EdgeDirection {
  top,
  bottom,
  left,
  right
}

export function isEdge(index: number): boolean {
  return (index + TERRAIN_WIDTH >= TERRAIN_SIZE) || // top
    (index - TERRAIN_WIDTH < 0) || // bottom
    (index % TERRAIN_WIDTH === 0) || // left
    (index % TERRAIN_WIDTH === TERRAIN_WIDTH - 1) // right
}

export function validateAdjacentEdge(
  index: number, direction: EdgeDirection, blocks: TerrainBlock[],
  adjacentTypes: TerrainBlock[], excludeMode: boolean = false
): boolean {

  switch (direction) {
    case EdgeDirection.top:
      return adjacentTypes.includes(blocks[index + TERRAIN_WIDTH]) !== excludeMode;
    case EdgeDirection.bottom:
      return adjacentTypes.includes(blocks[index - TERRAIN_WIDTH]) !== excludeMode;
    case EdgeDirection.left:
      return index % TERRAIN_WIDTH > 0 && adjacentTypes.includes(blocks[index - 1]) !== excludeMode;
    default:
      return index % TERRAIN_WIDTH < TERRAIN_WIDTH - 1 &&
        adjacentTypes.includes(blocks[index + 1]) !== excludeMode;
  }
}

export function validateAdjacentCorner(
  index: number, direction: CornerDirection, blocks: TerrainBlock[], adjacentTypes: TerrainBlock[], checkEdge?: boolean
): boolean {
  if (checkEdge && isEdge(index)) {
    return false;
  }
  switch (direction) {
    case CornerDirection.NE:
      return adjacentTypes.includes(blocks[index + 1]) && adjacentTypes.includes(blocks[index + TERRAIN_WIDTH]);
    case CornerDirection.NW:
      return adjacentTypes.includes(blocks[index - 1]) && adjacentTypes.includes(blocks[index + TERRAIN_WIDTH]);
    case CornerDirection.SE:
      return adjacentTypes.includes(blocks[index + 1]) && adjacentTypes.includes(blocks[index - TERRAIN_WIDTH]);
    default:
      return adjacentTypes.includes(blocks[index - 1]) && adjacentTypes.includes(blocks[index - TERRAIN_WIDTH]);
  }
}

export function getEdges(index: number): {
  top: boolean, bottom: boolean, left: boolean, right: boolean
} {
  const size = TERRAIN_WIDTH * TERRAIN_HEIGHT;
  return {
    top: index + TERRAIN_WIDTH >= size,
    bottom: index - TERRAIN_WIDTH < 0,
    left: index % TERRAIN_WIDTH > 0,
    right: index % TERRAIN_WIDTH < TERRAIN_WIDTH - 1
  }
}


export function getAdjacentMatches(
  index: number, blocks: TerrainBlock[], adjacentType: TerrainBlock
): {
  top: boolean, bottom: boolean, left: boolean, right: boolean
} {
  const { top, bottom, left, right } = getAdjacentIndices(index);
  return {
    top: blocks[top] === adjacentType,
    bottom: blocks[bottom] === adjacentType,
    left: blocks[left] === adjacentType,
    right: blocks[right] === adjacentType,
  }
}

export enum DiagonalDirection { topRight = 0, bottomRight, bottomLeft, topLeft }
export function getDiagonalDirection(
  index: number, blocks: TerrainBlock[], adjacentType: TerrainBlock): DiagonalDirection | null {
  const { top, bottom, left, right } = getAdjacentIndices(index);
  if (blocks[top] === adjacentType && blocks[right] === adjacentType) {
    return DiagonalDirection.topRight;
  }
  if (blocks[right] === adjacentType && blocks[bottom] === adjacentType) {
    return DiagonalDirection.bottomRight;
  }
  if (blocks[bottom] === adjacentType && blocks[left] === adjacentType) {
    return DiagonalDirection.bottomLeft;
  }
  if (blocks[left] === adjacentType && blocks[top] === adjacentType) {
    return DiagonalDirection.topLeft;
  }
  return null;
}

function getAdjacentIndices(index: number): {
  top: number, bottom: number, left: number, right: number
} {
  return {
    top: index + TERRAIN_WIDTH,
    bottom: index - TERRAIN_WIDTH,
    left: index - 1,
    right: index + 1
  }
}