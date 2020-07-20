import React, { ChangeEvent, useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { terrainBlocksSlice } from '../../redux';
import { TerrainBlock, TERRAIN_SIZE } from '../../utils/terrain';
import { Btn } from './Btn';

export function ImportBtn() {
  const dispatch = useDispatch();
  const [file, setFile] = useState<any>(); // TODO: `File` type fails typecheck 
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const handleImportClick = useCallback(() => setShowPopup(true), []);
  const handleFileChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files?.[0])
  }, []);
  const handlCancelClick = useCallback(() => setShowPopup(false), []);
  

  const handleConfirmClick = useCallback(async () => {
    if (!file || !file.arrayBuffer) {
      return;
    }
    const buffer = await file.arrayBuffer();
    if (buffer) {
      const array = Array.from(new Uint8Array(buffer));
      for (let i = 0; i < TERRAIN_SIZE; i++) {
        if (array[i] === undefined) {
          array[i] = TerrainBlock.landLow;
        }
      }
      dispatch(terrainBlocksSlice.actions.update(array));
  }
  }, [file]);

  return (
    <>
      <Btn icon='import' onClick={handleImportClick} tooltip={'Import Map'} />
      {showPopup && <div className="popup-overlay" onClick={handlCancelClick}>
        <div className="popup">
          <div className="popup-close" onClick={handlCancelClick} />
          <input type='file' id='file-selector' onChange={handleFileChange} />
          {(file?.size || 0) > TERRAIN_SIZE &&
            <div>File size is too large. Please check if this is the correct map file.</div>}
          <button disabled={!file || file.size > TERRAIN_SIZE} onClick={handleConfirmClick}>Submit</button>
        </div>
      </div>}
    </>
  );
}