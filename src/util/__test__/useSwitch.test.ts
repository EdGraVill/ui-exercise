import { renderHook, act } from '@testing-library/react-hooks';
import useSwitch from '../useSwitch';

describe('useSwitch function', () => {
  it('Should switch between true & false', () => {
    const { result } = renderHook(() => useSwitch());

    expect(result.current[0]).toBe(false);

    act(() => {
      result.current[1]();
    });

    expect(result.current[0]).toBe(true);
  });

  it('Should switch between true & false with a initial state', () => {
    const initialState = true;

    const { result } = renderHook(() => useSwitch(initialState));

    expect(result.current[0]).toBe(initialState);

    act(() => {
      result.current[1]();
    });

    expect(result.current[0]).toBe(!initialState);
  });
});
