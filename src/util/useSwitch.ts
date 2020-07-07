import * as React from 'react';

export default function useSwitch(initialState = false): [boolean, () => void] {
  const [isTrue, setValue] = React.useState(initialState);

  const switchFn = React.useCallback(() => {
    setValue(!isTrue);
  }, [isTrue]);

  return [isTrue, switchFn];
}
