import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PointLight } from 'three';
import { StoreState } from '../../redux';
import { TerrainBlock, TERRAIN_WIDTH } from '../../utils/terrain';

export function HoverLight() {
  const index = useSelector<StoreState, number>(state => state.activeBlockIndex);
  const terrainBlocks = useSelector<StoreState, TerrainBlock[]>(state => state.terrainBlocks);

  const pointLightRef = useRef<PointLight>();
  useDispatch();

  let z;
  switch (terrainBlocks[index]) {
    case TerrainBlock.landHigh:
    case TerrainBlock.landHigh_LandMid:
    case TerrainBlock.landHigh_WaterHigh:
    case TerrainBlock.waterHigh:
      z = 2;
      break;
    case TerrainBlock.landMid:
    case TerrainBlock.landMid_LandLow:
    case TerrainBlock.landMid_WaterLow:
    case TerrainBlock.landMid_WaterMid:
    case TerrainBlock.waterMid:
      z = 1;
      break;
    default:
      z = 0;
  }
  const x = index % TERRAIN_WIDTH;
  const y = (index - x) / TERRAIN_WIDTH;
  return (
    <pointLight
      ref={pointLightRef}
      position={[0.5 + x, 0.1 + z, -0.5 - y]}
      distance={0.9}
      intensity={1.5}
    />
  );
}

