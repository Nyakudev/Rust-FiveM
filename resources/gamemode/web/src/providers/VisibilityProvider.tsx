import React, {Context, createContext, useContext, useEffect, useState} from "react";
import {useNuiEvent} from "../hooks/useNuiEvent";
import {isEnvBrowser} from "../utils/misc";
import {fetchNui} from "../utils/fetchNui";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const VisibilityCtx = createContext<VisibilityProviderValue | null>(null)

interface VisibilityProviderValue {
  setVisible: (visible: boolean) => void
  visible: boolean
}

// This should be mounted at the top level of your application, it is currently set to
// apply a CSS visibility value. If this is non-performant, this should be customized.
export const VisibilityProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
  const [visible, setVisible] = useState(false)

  const clearWaitingQueue = () => {
    // Easy, right 😎
    toast.clearWaitingQueue();
  }

  window.addEventListener('message', (event) => {
    if (event.data.type === 'sendNotification') {
        toast(event.data.data.message, {
          position: "bottom-center",
          autoClose: event.data.data.duration,
          hideProgressBar: false,
          pauseOnFocusLoss: false,
          draggable: false,
          theme:"dark",
        });
        clearWaitingQueue()
      }
    });

  // useNuiEvent<boolean>('setVisible', setVisible)

  return (
      <VisibilityCtx.Provider
          value={{
            visible,
            setVisible
          }}
      >
        <div style={{visibility: visible ? 'visible' : 'hidden', height: '100%'}}>
          {children}
        </div>
        <ToastContainer limit={1}/>
      </VisibilityCtx.Provider>)
}

export const useVisibility = () => useContext<VisibilityProviderValue>(VisibilityCtx as Context<VisibilityProviderValue>)
