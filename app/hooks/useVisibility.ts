import {useCallback, useMemo, useState} from 'react';

const useVisibility = (initialState?: boolean) => {
  const [visible, setVisible] = useState(initialState || false);

  const show = useCallback(() => setVisible(true), []);
  const hide = useCallback(() => setVisible(false), []);
  const toggle = useCallback(() => setVisible(prev => !prev), []);
  const set = useCallback((newValue: boolean) => setVisible(newValue), []);

  return useMemo(
    () => ({
      visible,
      show,
      hide,
      toggle,
      set,
    }),
    [visible, show, hide, toggle, set],
  );
};

export type UseVisibility = {
  visible: boolean;
  show: () => void;
  hide: () => void;
  toggle: () => void;
  set: (neeValue: boolean) => void;
};

export default useVisibility;
