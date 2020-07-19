import { useEffect } from 'react';
import { useFrame, useThree } from 'react-three-fiber';
import { MOUSE, TOUCH } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';




export const Controls = (props: {}) => {
  const { camera, gl: { domElement } } = useThree();
  useEffect(() => {
    const controls = new OrbitControls(camera, domElement);
    controls.mouseButtons = {
      LEFT: MOUSE.PAN,
      MIDDLE: MOUSE.DOLLY,
      RIGHT: MOUSE.ROTATE
    };
    controls.touches = {
      ONE: TOUCH.PAN,
      TWO: TOUCH.DOLLY_PAN
    }
    controls.minAzimuthAngle = -0;
    controls.maxAzimuthAngle = 0;
    controls.minPolarAngle = 0.1;
    controls.maxPolarAngle = Math.PI/2 - 0.1;
    controls.minDistance = 1;
    controls.maxDistance = 40;
    // const hammer = new Hammer(domElement);
    camera.position.set(20, 2, -10);
    controls.target.set(20, 0, -12);


    controls.update();

    // const handleMousedown = (e: MouseEvent) => {
    //   mouseStatus++;
    //   if (e.target !== domElement) {
    //     return;
    //   }
    //   e.preventDefault();
    // }
    // const handleMouseup = (e: MouseEvent) => {
    //   mouseStatus--;
    //   if (e.target !== domElement) {
    //     return;
    //   }
    //   e.preventDefault();
    // }
    // const handleMousemove = (e: MouseEvent) => {
    //   if (e.target !== domElement) {
    //     return;
    //   }
    //   e.preventDefault();
    //   if (mouseStatus > 0) {
    //     _x += e.movementX;
    //     _y += e.movementY;
    //     setX(_x);
    //     setY(_y);
    //   }
    // }
    // const handlePan = (e: HammerInput) => {
    //   // console.log(e);
    // }

    // hammer.on('pan', handlePan);
    // return () => {
    //   hammer.off('pan', handlePan);
    //   hammer.destroy();
    // }
  }, []);

  useEffect(() => {

    // const tween = new TWEEN.Tween(camera.position).to({
    //   x,
    //   y,
    //   z: 15
    // }, 100)
    // .easing(TWEEN.Easing.Linear.None)
    // // .onUpdate(function () {
    // //   console.log('updated');
    // //   camera.position.set(camera.position.x, camera.position.y, camera.position.z);
    // //   // camera.lookAt(new THREE.Vector3(0,0,0));
    // // })
    // // .onComplete(function () {
    // //   // camera.lookAt(new THREE.Vector3(0,0,0));
    // // })
    // .start();
    // // camera.position.set(x, y, 15);
    // // camera.lookAt(x, y + 5, 0);
    // return () => { tween.stop() };
  }, [])
  return null;
};
