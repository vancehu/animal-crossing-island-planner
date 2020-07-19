import { Object3D } from 'three';
import { EdgeDirection, TerrainBlock, TERRAIN_WIDTH, validateAdjacentEdge } from '../../../utils/terrain';
import { MeshLayerRenderFunc, withMeshLayer } from './withMeshLayer';


const positionList = {
  bottom: new Float32Array([
    0, -0.2, 0, 1, -0.2, 0, 1, 0.8, 0,
    0, -0.2, 0, 1, 0.8, 0, 0, 0.8, 0,
  ]),
  left: new Float32Array([
    0, -0.2, -1, 0, -0.2, 0, 0, 0.8, 0,
    0, -0.2, -1, 0, 0.8, 0, 0, 0.8, -1,
  ]),
  right: new Float32Array([
    1, -0.2, 0, 1, -0.2, -1, 1, 0.8, -1,
    1, -0.2, 0, 1, 0.8, -1, 1, 0.8, 0,
  ]),
}

const uvList = {
  bottom: new Float32Array([
    0, 0, 1, 0, 1, 1,
    0, 0, 1, 1, 0, 1
  ]),
  left: new Float32Array([
    0, 0, 1, 0, 1, 1,
    0, 0, 1, 1, 0, 1
  ]),
  right: new Float32Array([
    0, 0, 1, 0, 1, 1,
    0, 0, 1, 1, 0, 1
  ])
}

const handleUpdate: (direction: EdgeDirection) => MeshLayerRenderFunc = direction =>
  (blocks, prevBlocks, mesh) => {
    const dummyObj = new Object3D();
    for (let i = 0; i < blocks.length; i++) {
      if (blocks[i] !== prevBlocks[i]) {
        const block = blocks[i];
        let y = -1;
        if (block === TerrainBlock.waterMid &&
          validateAdjacentEdge(i, direction, blocks, [TerrainBlock.waterLow])) {
          y = 0;
        } else if (block === TerrainBlock.waterHigh &&
          validateAdjacentEdge(i, direction, blocks, [TerrainBlock.waterMid])) {
          y = 1;
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

export const WaterfallBottom = withMeshLayer(positionList.bottom, uvList.bottom, handleUpdate(EdgeDirection.bottom));
export const WaterfallLeft = withMeshLayer(positionList.left, uvList.left, handleUpdate(EdgeDirection.left));
export const WaterfallRight = withMeshLayer(positionList.right, uvList.right, handleUpdate(EdgeDirection.right));
