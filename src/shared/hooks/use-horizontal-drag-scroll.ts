"use client";

import { useEffect, useRef } from "react";

const DRAG_THRESHOLD_PX = 4;

export function useHorizontalDragScroll<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const isPressedRef = useRef(false);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const startScrollLeftRef = useRef(0);
  const pointerIdRef = useRef<number | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (event.pointerType !== "mouse" || event.button !== 0) return;
      if (el.scrollWidth <= el.clientWidth) return;

      isPressedRef.current = true;
      isDraggingRef.current = false;
      startXRef.current = event.clientX;
      startScrollLeftRef.current = el.scrollLeft;
      pointerIdRef.current = event.pointerId;
      // Intentionally NOT capturing yet — only once real dragging is
      // confirmed, so a plain click's `click` event still targets the
      // actual element the user clicked (setPointerCapture retargets
      // click to the capturing element, which breaks clicks on children).
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (!isPressedRef.current) return;

      const deltaX = event.clientX - startXRef.current;

      if (!isDraggingRef.current) {
        if (Math.abs(deltaX) < DRAG_THRESHOLD_PX) return;

        isDraggingRef.current = true;
        if (pointerIdRef.current !== null) {
          el.setPointerCapture(pointerIdRef.current);
        }
        el.classList.add("cursor-grabbing", "select-none");
      }

      el.scrollLeft = startScrollLeftRef.current - deltaX;
    };

    const stopDragging = (event: PointerEvent) => {
      if (!isPressedRef.current) return;

      isPressedRef.current = false;

      if (isDraggingRef.current && el.hasPointerCapture(event.pointerId)) {
        el.releasePointerCapture(event.pointerId);
      }

      isDraggingRef.current = false;
      pointerIdRef.current = null;
      el.classList.remove("cursor-grabbing", "select-none");
    };

    el.addEventListener("pointerdown", handlePointerDown);
    el.addEventListener("pointermove", handlePointerMove);
    el.addEventListener("pointerup", stopDragging);
    el.addEventListener("pointercancel", stopDragging);

    return () => {
      el.removeEventListener("pointerdown", handlePointerDown);
      el.removeEventListener("pointermove", handlePointerMove);
      el.removeEventListener("pointerup", stopDragging);
      el.removeEventListener("pointercancel", stopDragging);
    };
  }, []);

  return ref;
}
