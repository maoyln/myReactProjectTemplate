import { useEffect, useRef } from 'react';
import {CustomEventType} from './types'

const useCustomEvent = (eventName: string, handler: (event: CustomEventType) => void) => {
  const savedHandler = useRef(handler);

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    const eventListener = (event: CustomEventType) => {
      if (savedHandler.current) {
        savedHandler.current(event);
      }
    };

    (window as any).addEventListener(eventName, eventListener);

    return () => {
      (window as any).removeEventListener(eventName, eventListener);
    };
  }, [eventName]);
};

export default useCustomEvent;
