import AsyncStorage from '@react-native-community/async-storage'
import { Action, createActionCreator } from "deox";
import { IState } from ".";
import { IPayloads } from './meals';

type TResolver<TType extends string, TPayload> = (...args: any[]) => Action<TType, TPayload>

export function createSimpleActionCreator<P, K extends keyof P> (name: K) {
  return createActionCreator(<string>name, resolve => (payload: P[K]) => resolve(payload));
};

export const loadState = async () => {
  try {
    const serializedState = await AsyncStorage.getItem('state');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
}; 

export const saveState = async (state: Partial<IState>) => {
  try {
    const serializedState = JSON.stringify(state);
    await AsyncStorage.setItem('state', serializedState);
  } catch {
    // ignore write errors
  }
};