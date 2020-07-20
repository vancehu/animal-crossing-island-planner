import React, { useEffect, useMemo } from 'react';
import { Provider } from 'react-redux';
import { useThree } from 'react-three-fiber';
import { Color, TextureLoader } from 'three';
import { store } from '../../redux';
import { Controls } from './Controls';
import { HoverLight } from './HoverLight';
import { CliffBottom, CliffLeft, CliffRight } from './layers/Cliff';
import { CornerCliffSE, CornerCliffSW } from './layers/CornerCliff';
import { CornerLandNE, CornerLandNW, CornerLandSE, CornerLandSW } from './layers/CornerLand';
import { Land } from './layers/Land';
import { Water } from './layers/Water';
import { WaterCliffLeft, WaterCliffRight, WaterCliffTop } from './layers/WaterCliff';
import { WaterfallBottom, WaterfallLeft, WaterfallRight } from './layers/Waterfall';



const textureLoader = new TextureLoader();

export function World() {
  const landTexture = useMemo(() => textureLoader.load('./textures/land.jpg'), []);
  const cliffTexture = useMemo(() => textureLoader.load('./textures/cliff.jpg'), []);
  const waterTexture = useMemo(() => textureLoader.load('./textures/water.jpg'), []);
  const waterfallTexture = useMemo(() => textureLoader.load('./textures/waterfall.jpg'), []);
  const { camera, scene } = useThree();
  useEffect(() => {
    camera.layers.enable(1);
    scene.background = new Color(0xcdf0ff);
  }, []);

  return (
  <Provider store={store}>
      <group>
        <Controls />
        <ambientLight intensity={0.5} />
        <pointLight position={[20, 10, 10]} distance={60} intensity={1.2}/>
        <Land texture={landTexture} />
        <CornerLandNE texture={landTexture} />
        <CornerLandNW texture={landTexture} />
        <CornerLandSE texture={landTexture} />
        <CornerLandSW texture={landTexture} />
        <CliffBottom texture={cliffTexture} />
        <CliffLeft texture={cliffTexture} />
        <CliffRight texture={cliffTexture} />
        <CornerCliffSE texture={cliffTexture} />
        <CornerCliffSW texture={cliffTexture} />
        <CliffRight texture={cliffTexture} />
        <Water texture={waterTexture} />
        <WaterCliffTop texture={cliffTexture} />
        <WaterCliffLeft texture={cliffTexture} />
        <WaterCliffRight texture={cliffTexture} />
        <WaterfallLeft texture={waterfallTexture} />
        <WaterfallRight texture={waterfallTexture} />
        <WaterfallBottom texture={waterfallTexture} />
        <HoverLight />
      </group>
    </Provider>
  )
}
