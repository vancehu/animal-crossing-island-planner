import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useThree } from 'react-three-fiber';
import { MOUSE, TOUCH } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { StoreState } from '../../redux';
import { Tool } from '../ui/Toolbox';




export const Controls = (_props: {}) => {
  const { camera, gl: { domElement } } = useThree();
  const selectedTool = useSelector<StoreState, Tool>(state => state.selectedTool);
  const controlsRef = useRef<OrbitControls>();

  useEffect(() => {
    const controls = new OrbitControls(camera, domElement)
    controls.minAzimuthAngle = -0;
    controls.maxAzimuthAngle = 0;
    controls.minPolarAngle = 0.1;
    controls.maxPolarAngle = Math.PI / 2 - 0.1;
    controls.minDistance = 1;
    controls.maxDistance = 30;
    camera.position.set(10, 2, 1);
    controls.target.set(10, 1, -1);


    controls.update();

    controlsRef.current = controls;
  }, []);

  useEffect(() => {
    const controls = controlsRef.current;
    if (!controls) {
      return;
    }
    switch (selectedTool) {
      case Tool.pan:
        controls.mouseButtons = {
          LEFT: MOUSE.PAN,
          MIDDLE: MOUSE.DOLLY,
          RIGHT: MOUSE.ROTATE
        };
        controls.touches = {
          ONE: TOUCH.PAN,
          TWO: TOUCH.DOLLY_PAN
        }
        controls.enabled = true;
        controls.update();
        break;

      case Tool.rotate:
        controls.mouseButtons = {
          LEFT: MOUSE.ROTATE,
          MIDDLE: MOUSE.DOLLY,
          RIGHT: MOUSE.PAN
        };
        controls.touches = {
          ONE: TOUCH.ROTATE,
          TWO: TOUCH.DOLLY_PAN
        }
        controls.enabled = true;
        controls.update();
        break;

      case Tool.zoom:
        controls.mouseButtons = {
          LEFT: MOUSE.DOLLY,
          MIDDLE: MOUSE.PAN,
          RIGHT: MOUSE.ROTATE
        };
        controls.touches = {
          ONE: TOUCH.DOLLY_ROTATE,
          TWO: TOUCH.DOLLY_PAN
        }
        controls.enabled = true;
        controls.update();
        break;

      default:
        controls.mouseButtons = {
          LEFT: MOUSE.PAN,
          MIDDLE: MOUSE.DOLLY,
          RIGHT: MOUSE.ROTATE
        };
        controls.update();
    }

  }, [selectedTool])
  return null;
};
