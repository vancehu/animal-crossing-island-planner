import React, { useCallback } from 'react';
import { ExportBtn } from './ExportBtn';
import { Btn } from './Btn';
import { useSelector, useDispatch } from 'react-redux';
import { StoreState, selectedToolSlice } from '../../redux';
import { ImportBtn } from './ImportBtn';

export enum Tool {
  raiseLand,
  lowerLand,
  water,
  pan,
  rotate,
  zoom
}

export function Toolbox() {
  const selectedTool = useSelector<StoreState, Tool>(state => state.selectedTool);
  const dispatch = useDispatch();
  const selectTool = (tool: Tool) => () =>
    dispatch(selectedToolSlice.actions.update(tool));
  const openGitHub = useCallback(() =>
    window.open('https://github.com/vancehu/animal-crossing-island-planner'), [])
  return (
    <div className="toolbox">
      <Btn
        icon='cliffup' tooltip='Raise Land'
        onClick={selectTool(Tool.raiseLand)} selected={selectedTool === Tool.raiseLand}
      />
      <Btn
        icon='cliffdown' tooltip='Lower Land'
        onClick={selectTool(Tool.lowerLand)} selected={selectedTool === Tool.lowerLand}
      />
      <Btn
        icon='water' tooltip='Water'
        onClick={selectTool(Tool.water)} selected={selectedTool === Tool.water}
      />
      <div className="divider" />
      <Btn
        icon='pan' tooltip='Camera Pan'
        onClick={selectTool(Tool.pan)} selected={selectedTool === Tool.pan}
      />
      <Btn
        icon='rotate' tooltip='Camera Rotate'
        onClick={selectTool(Tool.rotate)} selected={selectedTool === Tool.rotate}
      />
      <Btn
        icon='zoom' tooltip='Camera Zoom'
        onClick={selectTool(Tool.zoom)} selected={selectedTool === Tool.zoom}
      />
      <div className="divider" />
      <ExportBtn />
      <ImportBtn />
      <div className="divider" />
      <Btn
        icon='github' tooltip='GitHub' onClick={openGitHub} />
    </div>
  );
}