import { Object3D } from 'three';
import { TerrainBlock, TERRAIN_WIDTH } from '../../../utils/terrain';
import { MeshLayerRenderFunc, withMeshLayer } from './withMeshLayer';


const position = new Float32Array([
  0, 0, 0, 1, 0, 0, 1, 0, -1,
  0, 0, 0, 1, 0, -1, 0, 0, -1,
]);

const uv = new Float32Array([
  0, 0, 1, 0, 1, 1,
  0, 0, 1, 1, 0, 1
]);

const handleUpdate: MeshLayerRenderFunc = (blocks, prevBlocks, mesh) => {
  const dummyObj = new Object3D();
  for (let i = 0; i < blocks.length; i++) {
    if (blocks[i] !== prevBlocks[i]) {
      if (blocks[i] > TerrainBlock.landHigh) {
        continue;
      }
      const x = i % TERRAIN_WIDTH;
      const y = blocks[i];
      const z = -(i - x) / TERRAIN_WIDTH;

      dummyObj.position.set(x, y, z);
      dummyObj.updateMatrix();
      mesh.setMatrixAt(i, dummyObj.matrix);
      mesh.instanceMatrix.needsUpdate = true;
    }
  }
}

export const Land = withMeshLayer(position, uv, handleUpdate);
