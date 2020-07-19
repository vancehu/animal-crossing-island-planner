import { Object3D } from 'three';
import { CornerDirection, isEdge, TerrainBlock, TERRAIN_WIDTH, validateAdjacentCorner } from '../../../utils/terrain';
import { MeshLayerRenderFunc, withMeshLayer } from './withMeshLayer';

const positionList = {
  NW: new Float32Array([
    0, 0, 0, 1, 0, -1, 1, 1, -1,
    0, 0, 0, 1, 1, -1, 0, 1, 0
  ]),
  NE: new Float32Array([
    0, 0, -1, 1, 0, 0, 1, 1, 0,
    0, 0, -1, 1, 1, 0, 0, 1, -1
  ]),
}

const uvList = {
  NE: new Float32Array([
    0, 0, 1, 0, 1, 1,
    0, 0, 1, 1, 0, 1
  ]),
  NW: new Float32Array([
    0, 0, 1, 0, 1, 1,
    0, 0, 1, 1, 0, 1
  ]),
}

const handleUpdate: (direction: CornerDirection) => MeshLayerRenderFunc = direction =>
  (blocks, prevBlocks, mesh) => {
    const dummyObj = new Object3D();
    loop: for (let i = 0; i < blocks.length; i++) {
      const block = blocks[i];
      if (block !== prevBlocks[i]) {
        if (isEdge(i)) {
          continue loop;
        }

        let y = -1;

        if (
          (block === TerrainBlock.landMid_LandLow ||
            block === TerrainBlock.landMid_WaterLow ||
            block === TerrainBlock.landMid_WaterMid) &&
          validateAdjacentCorner(i, direction, blocks, [TerrainBlock.landMid])
        ) {
          y = 0;
        } else if (
          (block === TerrainBlock.landHigh_LandMid ||
            block === TerrainBlock.landHigh_WaterHigh) &&
          validateAdjacentCorner(i, direction, blocks, [TerrainBlock.landHigh])
        ) {
          y = 1;
        }

        if (y === -1) {
          continue loop;
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

export const CornerCliffSE = withMeshLayer(positionList.NE, uvList.NE, handleUpdate(CornerDirection.NE));
export const CornerCliffSW = withMeshLayer(positionList.NW, uvList.NW, handleUpdate(CornerDirection.NW));
