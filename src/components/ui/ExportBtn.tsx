import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { StoreState } from '../../redux';
import { TerrainBlock } from '../../utils/terrain';
import { Btn } from './Btn';

export function ExportBtn() {
  const terrainBlocks = useSelector<StoreState, TerrainBlock[]>(state => state.terrainBlocks);
  const handleExportClick = useCallback(() => {
    const blob = new Blob([new Uint8Array(terrainBlocks).buffer], { type: 'application/octet-stream' });
    const url = URL.createObjectURL(blob);
    const a = document.getElementById('pseudo-download-link');
    if (a) {
      a.setAttribute('href', url);
      a.setAttribute('download', 'ac-island-planner.bin');
      a.click();
    }
  }, [terrainBlocks]);

  return (
    <>
      <Btn icon='export' onClick={handleExportClick} tooltip={'Export Map'}/>
      <a id='pseudo-download-link' />
    </>
  );
}