class BindingManager {
    constructor() {
        this.bindings = new Map();
    }

    bind(unitId, elements) {
        if (!this.bindings.has(unitId)) {
            this.bindings.set(unitId, {});
        }
        const existing = this.bindings.get(unitId);
        Object.assign(existing, elements);
    }

    getBinding(unitId) {
        return this.bindings.get(unitId);
    }

    unbind(unitId) {
        this.bindings.delete(unitId);
    }

    clear() {
        this.bindings.clear();
    }
}

export const bindingManager = new BindingManager();
