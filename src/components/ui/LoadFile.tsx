import React, { ChangeEvent, useCallback, useState } from 'react';
import { Provider, useDispatch } from 'react-redux';
import { store, terrainBlocksSlice } from '../../redux';
import { TerrainBlock, TERRAIN_SIZE } from '../../utils/terrain';

export function LoadFile() {
  const dispatch = useDispatch();
  const [file, setFile] = useState<any>(); // TODO: `File` type fails typecheck 
  const handleFileChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files?.[0])
  },
    []);

  const handleClick = useCallback(async () => {
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
  }, [file])

  return (
    <Provider store={store}>
      <div className="tools">
        <input type='file' id='file-selector' onChange={handleFileChange} />
        {(file?.size || 0) > TERRAIN_SIZE &&
          <div>File size is too large. Please check if this is the correct map file.</div>}
        <button disabled={!file || file.size > TERRAIN_SIZE} onClick={handleClick}>Submit</button>
      </div>
    </Provider>
  );
}