import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Canvas } from 'react-three-fiber';
import './App.css';
import { World } from './components/canvas/World';
import { Tool, Toolbox } from './components/ui/Toolbox';
import { store, StoreState, terrainBlocksSlice } from './redux';
import { EdgeDirection, isEdge, TerrainBlock, TERRAIN_WIDTH, validateAdjacentEdge } from './utils/terrain';

function App() {
  const index = useSelector<StoreState, number>(state => state.activeBlockIndex);
  const selectedTool = useSelector<StoreState, Tool>(state => state.selectedTool);
  const dispatch = useDispatch();

  const handleMouseClick = useCallback(() => {
    if (selectedTool <= Tool.water) {
      const blocks = [...store.getState().terrainBlocks];
      const block = blocks[index];
      let newBlock = block;
      switch (selectedTool) {
        case Tool.raiseLand:
          switch (block) {
            case TerrainBlock.landMid_LandLow:
              newBlock = TerrainBlock.landMid;
              break;
            case TerrainBlock.landHigh_LandMid:
              newBlock = TerrainBlock.landHigh;
              break;
            case TerrainBlock.landLow:
              if (!isEdge(index)) {
                const top = validateAdjacentEdge(index, EdgeDirection.top, blocks, [TerrainBlock.landMid, TerrainBlock.landMid_LandLow]);
                const right = validateAdjacentEdge(index, EdgeDirection.right, blocks, [TerrainBlock.landMid, TerrainBlock.landMid_LandLow]);
                const bottom = validateAdjacentEdge(index, EdgeDirection.bottom, blocks, [TerrainBlock.landMid, TerrainBlock.landMid_LandLow]);
                const left = validateAdjacentEdge(index, EdgeDirection.left, blocks, [TerrainBlock.landMid, TerrainBlock.landMid_LandLow]);
                const sum = Number(top) + Number(right) + Number(bottom) + Number(left);
                if (sum === 2 && top !== bottom && left !== right) {
                  newBlock = TerrainBlock.landMid_LandLow;
                } else {
                  newBlock = TerrainBlock.landMid;
                }
                if (top) {
                  blocks[index + TERRAIN_WIDTH] = TerrainBlock.landMid
                }
                if (right) {
                  blocks[index + 1] = TerrainBlock.landMid
                }
                if (bottom) {
                  blocks[index - TERRAIN_WIDTH] = TerrainBlock.landMid
                }
                if (left) {
                  blocks[index - 1] = TerrainBlock.landMid
                }
              }
              break;
            case TerrainBlock.landMid:
              if (!isEdge(index)) {
                const top = validateAdjacentEdge(index, EdgeDirection.top, blocks, [TerrainBlock.landHigh, TerrainBlock.landHigh_LandMid]);
                const right = validateAdjacentEdge(index, EdgeDirection.right, blocks, [TerrainBlock.landHigh, TerrainBlock.landHigh_LandMid]);
                const bottom = validateAdjacentEdge(index, EdgeDirection.bottom, blocks, [TerrainBlock.landHigh, TerrainBlock.landHigh_LandMid]);
                const left = validateAdjacentEdge(index, EdgeDirection.left, blocks, [TerrainBlock.landHigh, TerrainBlock.landHigh_LandMid]);
                const sum = Number(top) + Number(right) + Number(bottom) + Number(left);
                if (sum === 2 && top !== bottom && left !== right) {
                  newBlock = TerrainBlock.landHigh_LandMid;
                } else {
                  newBlock = TerrainBlock.landHigh;
                }
                if (top) {
                  blocks[index + TERRAIN_WIDTH] = TerrainBlock.landHigh
                }
                if (right) {
                  blocks[index + 1] = TerrainBlock.landHigh
                }
                if (bottom) {
                  blocks[index - TERRAIN_WIDTH] = TerrainBlock.landHigh
                }
                if (left) {
                  blocks[index - 1] = TerrainBlock.landHigh
                }
              }
              break;
          }

          if (newBlock !== block) {
            blocks[index] = newBlock;
            dispatch(terrainBlocksSlice.actions.update(blocks))
          }
      }
    }
  }, [index, selectedTool, dispatch]);

  return (
    <>
      <Canvas
        id='mainCanvas' pixelRatio={window.devicePixelRatio}
        onDoubleClick={handleMouseClick}
      >
        <World />
      </Canvas>
      <Toolbox />
      {/* <ThreeStats /> */}
    </>
  );
}

export default App;
