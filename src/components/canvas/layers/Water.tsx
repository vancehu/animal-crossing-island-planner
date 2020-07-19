import { Object3D } from 'three';
import { TerrainBlock, TERRAIN_WIDTH } from '../../../utils/terrain';
import { MeshLayerRenderFunc, withMeshLayer } from './withMeshLayer';


const position = new Float32Array([
  0, -0.2, 0, 1, -0.2, 0, 1, -0.2, -1,
  0, -0.2, 0, 1, -0.2, -1, 0, -0.2, -1,
]);

const uv = new Float32Array([
  0, 0, 1, 0, 1, 1,
  0, 0, 1, 1, 0, 1
]);

const handleUpdate: MeshLayerRenderFunc = (blocks, prevBlocks, mesh) => {
  const dummyObj = new Object3D();
  for (let i = 0; i < blocks.length; i++) {
    if (blocks[i] !== prevBlocks[i]) {
      let y = -1;
      const block = blocks[i];
      if (block === TerrainBlock.waterLow) {
        y = 0;
      } else if (block === TerrainBlock.waterMid) {
        y = 1;
      } else if (block === TerrainBlock.waterHigh) {
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

export const Water = withMeshLayer(position, uv, handleUpdate);
