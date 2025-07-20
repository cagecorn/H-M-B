self.onmessage = (e) => {
    const { cmd, attacker, defender } = e.data;
    if (cmd === 'calculateDamage') {
        const base = attacker?.finalStats?.physicalAttack || 0;
        const def = defender?.finalStats?.physicalDefense || 0;
        const damage = Math.max(1, base - def);
        self.postMessage({ damage });
    }
};
