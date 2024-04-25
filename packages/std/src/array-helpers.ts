declare global {
    interface Array<T> {
        choose(): T;
        pick(amount: number): T[];
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
    if (amount > this.length) amount = this.length;

    const available = new Set<number>([...this.keys()]);
    const picked = new Set<T>();

    for (let i = 0; i < amount; i++) {
        const index = Array.from(available).choose();
        available.delete(index);
        picked.add(this[index]);
    }

    return Array.from(picked);
};

export type {};
