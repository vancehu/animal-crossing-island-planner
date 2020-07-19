import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../../redux';
import { LoadFile } from './LoadFile';
import { Toolbox } from './Toolbox';

export function UIRoot() {
  return (
    <Provider store={store}>
      <div className='ui-root'>
        <LoadFile />
        <Toolbox />
      </div>
    </Provider>
  );
}