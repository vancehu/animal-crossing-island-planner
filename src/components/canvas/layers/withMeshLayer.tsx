
import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { throttle } from 'lodash-es';
import { PointerEvent } from 'react-three-fiber';
import { BufferGeometry, InstancedMesh, Material, Texture } from 'three';
import { activeBlockIndexSlice, StoreState } from '../../../redux';
import { attachObjectKeys } from '../../../utils/constants';
import { TerrainBlock } from '../../../utils/terrain';

export type MeshLayerRenderFunc =
  (blocks: TerrainBlock[], prevBlocks: TerrainBlock[], mesh: InstancedMesh) => void;

export function withMeshLayer(
  position: Float32Array, uv: Float32Array, onUpdate: MeshLayerRenderFunc
) {
  return function (props: { texture: Texture }) {
    const { texture } = props;
    const terrainBlocks = useSelector<StoreState, TerrainBlock[]>(state => state.terrainBlocks);
    const geometryRef = useRef<BufferGeometry>();
    const meshRef = useRef<InstancedMesh>();
    const prevBlocksRef = useRef<TerrainBlock[]>([]);
    const dispatch = useDispatch();
    const handlePointerMove = useCallback(throttle((e: PointerEvent) =>
      dispatch(activeBlockIndexSlice.actions.update(e.instanceId)), 50), []);
    const instanceMeshArgs = useMemo(() => {
      const args: [BufferGeometry, Material, number] = [
        null as unknown as BufferGeometry, null as unknown as Material, terrainBlocks.length];
      return args;
    }, [terrainBlocks.length]);

    useEffect(() => {
      if (meshRef.current) {
        onUpdate(terrainBlocks, prevBlocksRef.current, meshRef.current);
        prevBlocksRef.current = terrainBlocks;
      }
    }, [terrainBlocks, texture]);

    useEffect(() => {
      geometryRef.current?.computeVertexNormals();
    }, [texture]);

    return (
      <instancedMesh ref={meshRef} args={instanceMeshArgs} onPointerMove={handlePointerMove}>
        <bufferGeometry attach='geometry' ref={geometryRef}>
          <bufferAttribute attachObject={attachObjectKeys.position} array={position} itemSize={3} count={position.length / 3} />
          <bufferAttribute attachObject={attachObjectKeys.uv} array={uv} count={uv.length / 2} itemSize={2} />
        </bufferGeometry>
        <meshPhongMaterial attach='material' map={texture} />
      </instancedMesh>
    )

  }
}
