import type { Err, Ok, Result as PlainResult } from "option-t/PlainResult";
import { unwrapErr, unwrapOk, unwrapOrForResult } from "option-t/PlainResult";

export type ResultHelpers<T> = {
    unwrap(): T;
    unwrapOr(defaultValue: T): T;
    isOk(): boolean;
    isErr(): boolean;
};

export type Result<T, E> = PlainResult<T, E> & ResultHelpers<T>;

export function createOk<T>(val: T): Ok<T> & ResultHelpers<T> {
    const result: Ok<T> = {
        ok: true,
        err: null,
        val,
    };
    return {
        ...result,
        isOk: () => true,
        isErr: () => false,
        unwrapOr: <D extends T>(defaultValue: D) => unwrapOrForResult(result, defaultValue),
        unwrap: () => unwrapOk(result),
    };
}

export function createErr<T, E>(err: E): Err<E> & ResultHelpers<T> {
    const result: Err<E> = {
        ok: false,
        val: null,
        err,
    };
    return {
        ...result,
        isOk: () => false,
        isErr: () => true,
        unwrapOr: <D extends T>(defaultValue: D) =>
            unwrapOrForResult(result, defaultValue) as Required<D>,
        unwrap: () => {
            throw unwrapErr(result);
        },
    };
}
