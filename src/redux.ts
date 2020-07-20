
import { CombinedState, combineReducers, configureStore, createSlice, Reducer } from "@reduxjs/toolkit";
import { TerrainBlock, TERRAIN_SIZE } from './utils/terrain'

const initBlocks = () => {
  let blocks = [];
  try {
    const parsed = JSON.parse(localStorage.getItem('blocks') || '[0,0,0,0,0,0,0,0,0,0,0,3,0,0,0,0,0,0,0,0,0,6,1,1,6,0,3,3,3,3,3,3,0,0,6,1,0,0,0,0,0,1,1,1,1,0,3,3,3,3,3,3,0,6,1,1,0,0,0,0,0,1,1,1,1,1,1,4,4,4,4,1,1,1,1,1,0,0,0,0,0,1,1,1,1,1,1,1,4,4,1,1,1,1,1,1,0,0,0,0,0,6,1,1,1,1,1,1,1,4,1,1,1,1,1,1,0,0,0,0,0,0,1,1,2,2,2,2,2,5,2,2,2,2,1,1,0,0,0,0,0,0,1,2,2,2,2,2,2,5,2,2,2,2,2,1,0,0,0,0,0,1,2,2,2,2,5,5,5,5,2,2,2,2,2,1,0,0,0,0,0,1,2,2,2,5,5,5,5,5,2,2,2,2,2,1,0,0,0,0,0,1,2,2,2,2,2,2,2,2,2,2,2,2,2,1,1,0,0,0,0,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,0,0,0,0,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]');
    if (Array.isArray(parsed)) {
      blocks = parsed;
    }
  } catch (e) {
    /* noop */
  }

  for (let i = 0; i < TERRAIN_SIZE; i++) {
    if (blocks[i] === undefined) {
      blocks[i] = TerrainBlock.landLow;
    }
  }

  return blocks;
}

export const terrainBlocksSlice = createSlice({
  name: 'terrainBlocks',
  initialState: initBlocks(),
  reducers: {
    update: (_state, action) => {
      localStorage.setItem('blocks', JSON.stringify(action.payload.slice(0, TERRAIN_SIZE)));
      return action.payload
    }
  }
})

export const activeBlockIndexSlice = createSlice({
  name: 'activeBlockIndex',
  initialState: -1,
  reducers: {
    update: (_state, action) => action.payload
  }
})


export const selectedToolSlice = createSlice({
  name: 'selectedTool',
  initialState: -1,
  reducers: {
    update: (_state, action) => action.payload
  }
})



const reducer = combineReducers({
  terrainBlocks: terrainBlocksSlice.reducer,
  activeBlockIndex: activeBlockIndexSlice.reducer,
  selectedTool: selectedToolSlice.reducer
})

export type StoreState = typeof reducer extends Reducer<CombinedState<infer P>> ? P : never;

export const store = configureStore({ reducer });
