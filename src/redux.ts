
import { CombinedState, combineReducers, configureStore, createSlice, Reducer } from "@reduxjs/toolkit";
import { TerrainBlock, TERRAIN_SIZE } from './utils/terrain'

const { landLow, landMid_LandLow, landMid, landHigh, waterMid, waterHigh } = TerrainBlock;
// const mockTerrainBlocks: TerrainBlock[] = Array.from(new Uint8Array([
//   landLow, landLow, landLow, landLow, landLow, landLow,
//   landLow, landMid_LandLow, landMid, landMid, landMid, landLow,
//   landMid, landMid, waterMid, waterMid, landMid, landMid,
//   landHigh, landHigh, landHigh, waterHigh, landHigh, landHigh
// ]));
const mockTerrainBlocks: TerrainBlock[] = Array(TERRAIN_SIZE).fill(TerrainBlock.landLow);

// const blob = new Blob([new Uint8Array(mockTerrainBlocks).buffer], { type: 'application/octet-stream' });
// const url = URL.createObjectURL(blob);
// const a = document.createElement('a')
// a.href = url;
// a.download = 'ac-island-planner.bin';
// a.click();


export const terrainBlocksSlice = createSlice({
  name: 'terrainBlocks',
  initialState: mockTerrainBlocks as TerrainBlock[],
  reducers: {
    update: (_state, action) => action.payload
  }
})

export const activeBlockIndexSlice = createSlice({
  name: 'activeBlockIndex',
  initialState: -1,
  reducers: {
    update: (_state, action) => action.payload
  }
})



const reducer = combineReducers({
  terrainBlocks: terrainBlocksSlice.reducer,
  activeBlockIndex: activeBlockIndexSlice.reducer,
})

export type StoreState = typeof reducer extends Reducer<CombinedState<infer P>> ? P : never;

export const store = configureStore({ reducer });
