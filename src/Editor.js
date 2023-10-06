import React, { useEffect, useRef, useState } from 'react';
import * as Y from 'yjs';
import { WebrtcProvider } from 'y-webrtc';
import { QuillBinding } from 'y-quill';
import Quill from 'quill';
import QuillCursors from 'quill-cursors';
import './App.css'


Quill.register('modules/cursors', QuillCursors);

const Editor = () => {
  const editorRef = useRef(null);
  const [hasUnseenChanges, setHasUnseenChanges] = useState(false);

  useEffect(() => {
    console.log("Initializing Quill");
    
    const quill = new Quill(editorRef.current, {
      modules: {
        cursors: true,
        toolbar: [
          [{ header: [1, 2, false] }],
          ['bold', 'italic', 'underline'],
          ['image', 'code-block']
        ],
        history: {
          userOnly: true
        }
      },
      placeholder: 'Start collaborating...',
      theme: 'snow'
    });

    const ydoc = new Y.Doc();
    const provider = new WebrtcProvider('quill-demo-room', ydoc);
    
    provider.awareness.setLocalStateField('user', {
      name: 'User Name',
      color: 'red',
      country: 'US'
    });

    const ytext = ydoc.getText('quill');
    const binding = new QuillBinding(ytext, quill, provider.awareness);

    window.addEventListener('blur', () => { quill.blur() });

    provider.awareness.on('change', () => {
      provider.awareness.getStates().forEach((state, clientId) => {
        if (state.user) {
          const cursorModule = quill.getModule('cursors');
          if (cursorModule.cursors[clientId]) {
            const userCursorColorClass = `cursor-${state.user.color}`;
            cursorModule.cursors[clientId].el.classList.add(userCursorColorClass);
            cursorModule.cursors[clientId].el.innerText = `${state.user.name} ${getFlagEmoji(state.user.country)}`;
          }
        }
      });
    });

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible' && hasUnseenChanges) {
        setHasUnseenChanges(false);
      }
    };

    const handleExternalChanges = () => {
      if (document.visibilityState === 'hidden') {
        setHasUnseenChanges(true);
      }
    };

    ytext.observe(handleExternalChanges);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      console.log("Destroying Quill");
      binding.destroy();
      provider.destroy();
      ytext.unobserve(handleExternalChanges);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [hasUnseenChanges]);

  return (
    <>
      {hasUnseenChanges && (
        <div className="unseen-changes-indicator">
          New changes have been made!
        </div>
      )}
      <div ref={editorRef} style={{height: '400px'}} />
    </>
  );
};

function getFlagEmoji(countryCode) {
  const offset = 127397;
  return [...countryCode].map((char) => String.fromCodePoint(char.charCodeAt() + offset)).join('');
}

export default Editor;


