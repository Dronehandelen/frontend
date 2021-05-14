import React from 'react';
import loadable from '@loadable/component';

const Editor = loadable(() => import('./Editor'));
const DisplayEditor = loadable(() => import('./DisplayEditor'));

const EditorContainer = (props) => {
    if (typeof props.onChange === 'function') {
        return <Editor {...props} />;
    }

    return <DisplayEditor {...props} />;
};

export default EditorContainer;
