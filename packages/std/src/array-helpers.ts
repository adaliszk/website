import "@total-typescript/ts-reset/filter-boolean";

type NonFalsy<T> = T extends false | 0 | "" | null | undefined | 0n ? never : T;

declare global {
    interface Array<T> {
        choose(): T;
        pick(amount: number): T[];
        sortBy<T>(this: Array<T>, key: keyof T): T[];
        filterOk<T>(this: Array<T>): Array<NonFalsy<T>>;
    }
}

/**
 * Choose a random element from the array.
 * Inspired by Python's random.choice.
 */
Array.prototype.choose = function <T>(this: Array<T>): T {
    return this[Math.floor(Math.random() * this.length)];
};

/**
 * Pick a random amount of elements from the array.
 */
Array.prototype.pick = function <T>(this: Array<T>, amount: number): T[] {
    const pickAmount = Math.min(amount, this.length);
    const available = new Set<number>([...this.keys()]);
    const picked = new Set<T>();

    for (let i = 0; i < pickAmount; i++) {
        const index = Array.from(available).choose();
        available.delete(index);
        picked.add(this[index]);
    }

    return Array.from(picked);
};

/**
 * Sort the array by the specified key.
 */
Array.prototype.sortBy = function <T>(this: Array<T>, key: keyof T): T[] {
    return this.toSorted((a, b) => {
        const aValue = a[key];
        const bValue = b[key];

        if (aValue < bValue) return -1;
        if (aValue > bValue) return 1;
        return 0;
    });
};

/**
 * Filter out all the elements that are not Ok.
 */
Array.prototype.filterOk = function filterOk<T>(this: Array<T>): Array<NonFalsy<T>> {
    return this.filter(Boolean);
};
