import { MutableRefObject, useEffect, useState } from "react";
import ResizeObserver from 'resize-observer-polyfill';

type UseResizeObserverProps<RefElement> = MutableRefObject<RefElement | HTMLElement>


export function useResizeObserver<Target>(ref: UseResizeObserverProps<Target>) {
  const [rect, setRect] = useState<Omit<DOMRectReadOnly, 'toJSON'>>(null!)

  useEffect(() => {
    const observerTarget = ref.current;

    const resizeObserver = new ResizeObserver((entries) => {

      for (let entry of entries) {
        if(entry.contentRect) setRect(entry.contentRect)
      }
    })

    resizeObserver.observe(observerTarget as HTMLElement);

    return () => {
      resizeObserver.unobserve(observerTarget as HTMLElement);
    }
  }, [ref])

  return rect
};