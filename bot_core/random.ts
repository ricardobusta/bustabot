import seedrandom = require('seedrandom');

class Random {
    private randomGenerator;

    constructor(seed: string) {
        this.randomGenerator = seedrandom(seed);
    }

    getRng(): number {
        return this.randomGenerator();
    }

    skip(amount: number) {
        for (let i = 0; i < amount; i++) {
            this.randomGenerator();
        }
    }

    getFixedInt(rng: number, min: number, max: number) {
        return min + Math.floor(this.randomGenerator() * (max - min + 1));
    }

    getFixedFloat(rng: number, min: number, max: number) {
        return min + (this.randomGenerator() * (max - min + 1));
    }

    getFixedArrayRange<T>(rng: number, arr: Array<T>): T {
        return arr[Math.floor(rng * arr.length)];
    }

    getRangeInt(min: number, max: number): number {
        return this.getFixedInt(this.randomGenerator(), min, max);
    }

    getRangeFloat(min: number, max: number): number {
        return this.getFixedFloat(this.randomGenerator(), min, max);
    }

    getTransformInt(min: number, max: number, transform: (t: number) => number) {
        return this.getFixedInt(transform(this.randomGenerator()), min, max);
    }

    getTransformFloat(min: number, max: number, transform: (t: number) => number) {
        return this.getFixedFloat(transform(this.randomGenerator()), min, max);
    }

    getArrayRange<T>(arr: Array<T>): T {
        return this.getFixedArrayRange(this.randomGenerator(), arr);
    }
}

export default Random;