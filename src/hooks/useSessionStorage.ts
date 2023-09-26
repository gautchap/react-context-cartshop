import { Dispatch, SetStateAction, useEffect, useState } from "react";

export const useSessionStorage = <T>(key: string, initialState?: T | (() => T)): [T, Dispatch<SetStateAction<T>>] => {
    const [state, setState] = useState<T>(initialState as T);

    useEffect(() => {
        const item = window.sessionStorage.getItem(key);
        if (item) setState(parse(item));
    }, [key]);

    useEffect(() => {
        if (state !== initialState) {
            window.sessionStorage.setItem(key, JSON.stringify(state));
        }
    }, [initialState, key, state]);

    return [state, setState];
};

const parse = (value: string) => {
    try {
        return JSON.parse(value);
    } catch {
        return value;
    }
};
