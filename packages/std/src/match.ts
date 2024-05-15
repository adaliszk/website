/*
 * Rust-style Match functions for TypeScript
 *
 * Two main cases are implemented:
 * - Finding a match on an object by a key
 * - Finding a match on an enum or literal type
 */

import { type Result, createErr, createOk } from "./result";

type ParentType<T> = T extends infer U ? U : never;
type MatchFn<DATA extends object | string, RESULT = ParentType<DATA[keyof DATA]>> = (
    data: DATA,
) => RESULT;

type MatchCaseHandlers<
    RESULT,
    DATA extends object | string,
    VALUES extends string | number | symbol,
> =
    | ({ [MATCHER in VALUES]: MatchFn<DATA, RESULT> } & {
          _?: MatchFn<DATA, RESULT>;
      }) // When all case handlers are present, the default is optional
    | ({ [MATCHER in VALUES]?: MatchFn<DATA, RESULT> } & {
          _: MatchFn<DATA, RESULT>;
      }); // When not all case handlers defined, the default is required

const DEBUG_MODE = process.env.DEBUG_MATCH === "true";

/**
 * Internal function to handle the match case handlers
 */
function _handleMatch<RESULT, SOURCE extends object | string>(
    source: SOURCE,
    handler?: MatchFn<SOURCE, RESULT>,
    defaultHandler?: MatchFn<SOURCE, RESULT>,
) {
    let defaultWasInvoked = false;
    try {
        if (handler) {
            const handlerResult = handler?.(source);
            DEBUG_MODE && console.debug("::_handleMatch() ->", { handlerResult });
            return createOk(handlerResult);
        }
        const defaultResult = defaultHandler?.(source);
        if (defaultResult) {
            DEBUG_MODE && console.debug("::_handleMatch() ->", { defaultResult });
            defaultWasInvoked = true;
            return createOk(defaultResult);
        }
    } finally {
        if (!defaultWasInvoked && defaultHandler !== undefined) {
            defaultHandler(source);
        }
    }

    DEBUG_MODE && console.debug("::_handleMatch() -> Error!");
    return createErr(new TypeError("Could not match with a handler or the default!"));
}

/**
 * Rust-style match function on an object key
 *
 * It will pick a handler function based on the key value, and call it with the entire source object to resolve a value.
 * When no handler is found, it will call the default handler for the value.
 *
 * When there was a handler to resolve the value and there is a default handler, the default handler will be called,
 * but its value will be ignored.
 */
export function matchByKey<
    RESULT,
    SOURCE extends Record<string, string | number | boolean>,
    PROPERTY extends keyof SOURCE,
    CASES extends MatchCaseHandlers<RESULT, SOURCE, SOURCE[PROPERTY] & string>,
>(source: SOURCE, property: PROPERTY, cases: CASES): Result<RESULT | unknown, TypeError> {
    const scenarioValue = source[property] as SOURCE[PROPERTY] & string;
    const handler = cases[scenarioValue];
    DEBUG_MODE && console.debug("::matchByKey()", { scenarioValue, cases, handler });
    return _handleMatch(source, handler, cases._);
}

/**
 * Rust-style match function on an enum or literal type
 *
 * It will pick a handler function based on the value, and call it with the entire source object to resolve a value.
 * When no handler is found, it will call the default handler for the value.
 *
 * When there was a handler to resolve the value and there is a default handler, the default handler will be called,
 * but its value will be ignored.
 */
export function matchByValue<
    RESULT,
    SOURCE extends string,
    CASES extends MatchCaseHandlers<RESULT, SOURCE, SOURCE>,
>(scenarioValue: SOURCE, cases: CASES): Result<RESULT | unknown, TypeError> {
    const handler = cases[scenarioValue];
    DEBUG_MODE && console.debug("::matchByValue()", { scenarioValue, cases, handler });
    return _handleMatch(scenarioValue, handler, cases._);
}
