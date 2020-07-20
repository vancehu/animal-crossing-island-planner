import { Object3D } from 'three';
import { CornerDirection, isEdge, TerrainBlock, TERRAIN_WIDTH, validateAdjacentCorner } from '../../../utils/terrain';
import { MeshLayerRenderFunc, withMeshLayer } from './withMeshLayer';

const positionList = {
  NE: new Float32Array([
    1, 0, 0, 1, 0, -1, 0, 0, -1
  ]),
  NW: new Float32Array([
    0, 0, 0, 1, 0, -1, 0, 0, -1
  ]),
  SE: new Float32Array([
    0, 0, 0, 1, 0, 0, 1, 0, -1
  ]),
  SW: new Float32Array([
    0, 0, 0, 1, 0, 0, 0, 0, -1
  ]),
}

const uvList = {
  NE: new Float32Array([
    1, 0, 1, 1, 0, 1
  ]),
  NW: new Float32Array([
    0, 0, 1, 1, 0, 1
  ]),
  SE: new Float32Array([
    0, 0, 1, 0, 1, 1
  ]),
  SW: new Float32Array([
    0, 0, 1, 0, 0, 1
  ]),
}

const handleUpdate: (direction: CornerDirection) => MeshLayerRenderFunc = direction =>
  (blocks, prevBlocks, mesh) => {
    const dummyObj = new Object3D();
    for (let i = 0; i < blocks.length; i++) {
      const block = blocks[i];
      if (block !== prevBlocks[i]) {
        if (isEdge(i)) {
          continue;
        }

        let y = -1;

        if (
          (block === TerrainBlock.landLow_WaterLow ||
            block === TerrainBlock.landMid_LandLow) &&
          validateAdjacentCorner(i, direction, blocks, [TerrainBlock.landLow])
        ) {
          y = 0;
        } else if (
          (block === TerrainBlock.landMid_LandLow ||
            block === TerrainBlock.landMid_WaterLow ||
            block === TerrainBlock.landMid_WaterMid) &&
          validateAdjacentCorner(i, direction, blocks, [TerrainBlock.landMid])
        ) {
          y = 1;
        } else if (
          (block === TerrainBlock.landHigh_LandMid ||
            block === TerrainBlock.landHigh_WaterHigh) &&
          validateAdjacentCorner(i, direction, blocks, [TerrainBlock.landHigh])
        ) {
          y = 2;
        }

        if (y === -1) {
          continue;
        }
        const x = i % TERRAIN_WIDTH;
        const z = -(i - x) / TERRAIN_WIDTH;

        dummyObj.position.set(x, y, z);
        dummyObj.updateMatrix();
        mesh.setMatrixAt(i, dummyObj.matrix);
        mesh.instanceMatrix.needsUpdate = true;
      }
    }
  }

export const CornerLandNE = withMeshLayer(positionList.NE, uvList.NE, handleUpdate(CornerDirection.NE));
export const CornerLandNW = withMeshLayer(positionList.NW, uvList.NW, handleUpdate(CornerDirection.NW));
export const CornerLandSE = withMeshLayer(positionList.SE, uvList.SE, handleUpdate(CornerDirection.SE));
export const CornerLandSW = withMeshLayer(positionList.SW, uvList.SW, handleUpdate(CornerDirection.SW));
