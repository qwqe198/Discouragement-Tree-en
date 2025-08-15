addLayer("q", {
    symbol: "P", // Changed from 'q' to 'P' for Prestige
    position: 1,
    startData() {
        return {
            unlocked: true,
            points: new ExpantaNum(0),
        }
    },
    requires() { return new ExpantaNum("1e2714") },
    color: "blue",
    resource: "Prestige Bonus", // Translated from "声望加成"
    type: "static",
    passiveGeneration() {
        return 0
    },
    effectDescription() { 
        return `Prestige Points gain ^${format(this.effect())}`
    },
    effect() {
        let eff = player.q.points.mul(hasUpgrade("q", 12) ? 0.075 : hasUpgrade("q", 11) ? 0.06 : 0.05).add(1)
        if (hasMilestone("t", 9)) eff = eff.pow(1.025)
        return eff
    },
    exponent: 5,
    baseAmount() { return player.a.points },
    baseResource: "Prestige Points", // Translated from "声望点"
    gainMult() {
        let mult = new ExpantaNum(1)
        return mult
    },
    gainExp() {
        let exp = new ExpantaNum(0.5)
        if (hasMilestone("l", 30)) exp = new ExpantaNum(0.7915)
        return exp
    },
    layerShown() { return hasMilestone("l", 20) || hasMilestone("cq", 1) },
    row: 2,

    upgrades: {
        11: {
            description: "Improves Prestige Bonus effect",
            cost() { return new OmegaNum(6) },
            unlocked() { return true },
        },
        12: {
            description: "Further improves Prestige Bonus effect",
            cost() { return new OmegaNum(9) },
            unlocked() { return true },
        },
    },

    resetsNothing() { return hasUpgrade("cq", 33) },
    autoUpgrade() { return hasUpgrade("cq", 53) },
    autoPrestige() { return hasAchievement("rw", 22) },
})
