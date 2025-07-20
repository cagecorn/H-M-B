class DelayEngine {
    constructor() {
        this.holding = false;
    }

    async hold(ms = 0) {
        this.holding = true;
        await new Promise(resolve => setTimeout(resolve, ms));
        this.holding = false;
    }

    isHolding() {
        return this.holding;
    }
}

export const delayEngine = new DelayEngine();
