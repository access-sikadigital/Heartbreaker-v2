"use client";

/**
 * Tiny pub/sub so above-the-fold animations wait for the preloader to lift.
 * On repeat visits in a session the preloader is skipped (see `introSkipScript`) and this resolves at once.
 */
let done = false;
const listeners = new Set<() => void>();

export function markIntroDone() {
  if (done) return;
  done = true;
  listeners.forEach((fn) => fn());
  listeners.clear();
}

export function onIntroDone(fn: () => void) {
  if (done) {
    fn();
    return () => {};
  }
  listeners.add(fn);
  return () => {
    listeners.delete(fn);
  };
}

export const INTRO_KEY = "hb-intro-seen";
