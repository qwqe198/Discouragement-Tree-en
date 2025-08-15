addLayer("a1", { // This is the node code in the game. For example, player.p can access this layer's data. Use convenient letters, avoid starting with numbers.
    symbol: `A`, // The letter displayed on the node
    position: 2, // Node order
    startData() {
        return {
            unlocked: true, // Whether it's unlocked from the start
            points: new ExpantaNum(0),
        }
    },
    requires() { return new ExpantaNum("1e8") },
    color: "#BB4C83",
    resource: "Amoeba", // Name of the reset resource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    passiveGeneration() {
        if(hasAchievement("rw", 91)) return 1
        if (hasUpgrade("a1", 23)) return 1
        return 0
    },
    getResetGain() {
        var mult = player.cq.hp.div(1e8).pow(0.1)
        mult = mult.pow(buyableEffect('csm', 13))
        if (hasUpgrade("a1", 33)) mult = mult.pow(3)
        if (hasUpgrade("a1", 13)) mult = mult.mul(upgradeEffect("a1", 13))
        if (hasUpgrade("a1", 14)) mult = mult.mul(upgradeEffect("a1", 14))
        if (hasMilestone("cq", 22)) mult = mult.mul(player.cq.hp.pow(0.02))
        if (hasAchievement("rw", 41)) mult = mult.mul(1.2)
        if (hasChallenge("cq", 22)) mult = mult.mul(3 ** player.cq.challenges[22])
        if (hasUpgrade("a1", 23)) mult = mult.mul(2)
        mult = mult.mul(buyableEffect('a1', 12))
        if (hasUpgrade("grz", 15)) mult = mult.mul(upgradeEffect("grz", 15))
        if (hasAchievement("rw", 62)) mult = mult.mul(13)
        if (hasAchievement("rw", 66)) mult = mult.mul(player.i.points.add(10).log10())
        if(mult.gte(1e15)) mult = mult.root(7.5).mul(1e13)
        return mult.floor()
    },
    effectDescription() {
        return `Dungeon 1: Amoeba (Recommended Power: 25): Weak monsters from the rebirth chain, but a group of amoebas can be troublesome. The difficulty of killing them is proportional to the 10th power of the number killed simultaneously.<br>
Health and HP gain x${format(this.effect())}.`
    },
    effect() {
        let eff = player.a1.points.add(1).pow(0.5)
        if (eff.gte(100)) eff = eff.root(2).mul(10)
        if (eff.gte(1000)) eff = eff.root(3).mul(100)
        if (eff.gte(10000)) eff = eff.root(4).mul(1000)
        return eff
    },
    exponent: 0.1,
    baseAmount() { return player.cq.hp }, // Base resource amount
    baseResource: "HP", // Base resource name
    gainMult() { // Resource gain multiplier
        mult = new ExpantaNum(1)
        return mult
    },
    gainExp() { // Resource gain exponent (multiplied with exponent)
        var exp = new ExpantaNum(1)
        return exp
    },
    layerShown() { return hasMilestone("cq", 20) },
    row: 100, // Row the layer is in on the tree (0 is the first row). QwQ: 1 can also be the first row.
    doReset(resettingLayer) {
        player.cq.hp = n(0)
    },
    onPrestige(resettingLayer) {
        player.cq.hp = n(0)
    },
    buyables: {
        11: {
            cost(x = getBuyableAmount(this.layer, this.id)) {
                var c = n("500").mul(n(2).pow(x)).mul(n(1.001).pow(x.pow(2)))
                return c
            },
            display() { return `A-layer Upgrade 11 Effect<br />x${format(buyableEffect(this.layer, this.id), 2)}. (Next level: ${format(this.effect(getBuyableAmount(this.layer, this.id).add(1)))})\nCost: ${format(this.cost(getBuyableAmount(this.layer, this.id)))} Amoeba<br>Level: ${formatWhole(getBuyableAmount(this.layer, this.id))}` },
            canAfford() { return player.a1.points.gte(this.cost()) },
            buy() {
                player.a1.points = player.a1.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect(x = getBuyableAmount(this.layer, this.id)) {
                var eff = n(1.5).pow(hasUpgrade("a1", 24) ? x.add(getBuyableAmount("a1", 12)) : x)
                return eff
            },
            unlocked() { return hasUpgrade("a1", 15) },
        },
        12: {
            cost(x = getBuyableAmount(this.layer, this.id)) {
                var c = n("10000").mul(n(3).pow(x)).mul(n(1.005).pow(x.pow(2)))
                return c
            },
            display() { return `Amoeba Gain<br />x${format(buyableEffect(this.layer, this.id), 2)}. (Next level: ${format(this.effect(getBuyableAmount(this.layer, this.id).add(1)))})\nCost: ${format(this.cost(getBuyableAmount(this.layer, this.id)))} Amoeba<br>Level: ${formatWhole(getBuyableAmount(this.layer, this.id))}` },
            canAfford() { return player.a1.points.gte(this.cost()) },
            buy() {
                player.a1.points = player.a1.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect(x = getBuyableAmount(this.layer, this.id)) {
                var eff = n(1.1).pow(x)
                return eff
            },
            unlocked() { return hasUpgrade("a1", 22) },
        },
        13: {
            cost(x = getBuyableAmount(this.layer, this.id)) {
                var c = n("1e7").mul(n(5).pow(x)).mul(n(1.01).pow(x.pow(2)))
                return c
            },
            display() { return `150 Life Milestone Effect<br />^${format(buyableEffect(this.layer, this.id), 2)}. (Next level: ${format(this.effect(getBuyableAmount(this.layer, this.id).add(1)))})\nCost: ${format(this.cost(getBuyableAmount(this.layer, this.id)))} Amoeba<br>Level: ${formatWhole(getBuyableAmount(this.layer, this.id))}` },
            canAfford() { return player.a1.points.gte(this.cost()) },
            buy() {
                player.a1.points = player.a1.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect(x = getBuyableAmount(this.layer, this.id)) {
                var eff = x.mul(0.05).add(1)
                return eff
            },
            unlocked() { return hasUpgrade("a1", 31) },
        },
    },
    upgrades: {
        11: {
            description: "Amoeba boosts points.",
            effect() {
                var eff = player.a1.points.add(1).pow(hasUpgrade("a1", 21) ? n(2).add(player.a1.upgrades.length * 0.5) : 2)
                eff = eff.mul(buyableEffect("a1", 11))
                if (hasAchievement("rw", 37)) eff = eff.pow(player.a1.upgrades.length)
                if (eff.gte(1e100)) eff = expPow(eff.mul(10), 0.5).mul("1e90")
                return eff
            },
            effectDisplay() { return `x ${format(this.effect())}` },
            cost: n(2),
            unlocked() { return true },
        },
        12: {
            description: "Each amoeba upgrade makes points ^1.01.",
            effect() {
                var eff = n(hasUpgrade("a1", 21) ? n(1.01).add(player.a1.upgrades.length * 0.0005) : 1.01).pow(player.a1.upgrades.length)
                return eff
            },
            effectDisplay() { return `^ ${format(this.effect())}` },
            cost: n(15),
            unlocked() { return true },
        },
        13: {
            description: "Each amoeba upgrade makes amoeba x1.2.",
            effect() {
                var eff = n(1.2).pow(player.a1.upgrades.length)
                return eff
            },
            effectDisplay() { return `x ${format(this.effect())}` },
            cost: n(100),
            unlocked() { return true },
        },
        14: {
            description: "Amoeba boosts itself.",
            effect() {
                var eff = player.a1.points.add(10).log10()
                if (hasAchievement("rw", 71)) eff = eff.pow(2)
                return eff
            },
            effectDisplay() { return `x ${format(this.effect())}` },
            cost: n(300),
            unlocked() { return true },
        },
        15: {
            description: "Unlock 0.5 amoeba buyables.",
            cost: n(1000),
            unlocked() { return true },
        },
        21: {
            description: "Each amoeba upgrade adds 0.5 to amoeba upgrade 11 base exponent.",
            cost: n(2500),
            unlocked() { return true },
        },
        22: {
            description: "Unlock the second amoeba buyable.",
            cost: n(10000),
            unlocked() { return true },
        },
        23: {
            description: "Double amoeba gain and gain 100% amoeba per second, but remove the reset button.",
            cost: n(30000),
            unlocked() { return getBuyableAmount("a1", 12).gte(1) },
        },
        24: {
            description: "A-layer buyable 12 levels are added to A-layer buyable 11",
            cost: n(15e4),
            unlocked() { return getBuyableAmount("a1", 12).gte(3) },
        },
        25: {
            description: "Each amoeba upgrade adds 0.0005 to amoeba upgrade 12 base",
            cost: n(5e5),
            unlocked() { return getBuyableAmount("a1", 11).gte(10) },
        },
        31: {
            description: "Unlock the third amoeba buyable.",
            cost: n(1e7),
            unlocked() { return hasUpgrade("a1", 25) },
        },
        32: {
            description: "Amoeba reduces incremental strength price.",
            effect() {
                var eff = player.a1.points.add(10).log10().mul(0.05).add(1)
                if (hasUpgrade("csm", 13)) eff = eff.mul(upgradeEffect("csm", 13))
                return eff
            },
            effectDisplay() { return `Take the ${format(this.effect())}th root` },
            cost: n(1e10),
            unlocked() { return hasUpgrade("a1", 31) },
        },
        33: {
            description: "Base amoeba gain becomes cubed.",
            cost: n(3e12),
            unlocked() { return hasAchievement("rw", 73) },
        },
    },
    tabFormat: {
        "Upgrades": {
            buttonStyle() { return { 'color': 'lightblue' } },
            content: [
                "main-display",
                ["prestige-button", "", function () { return hasUpgrade("a1", 23) ? { 'display': 'none' } : {} }],
                "resource-display",
                "upgrades",
            ],
        },
        "Buyables": {
            buttonStyle() { return { 'color': 'lightblue' } },
            unlocked() { return hasUpgrade("a1", 15) && hasMilestone("esc", 11) },
            content: [
                "main-display",
                ["prestige-button", "", function () { return hasUpgrade("a1", 23) ? { 'display': 'none' } : {} }],
                "resource-display",
                "buyables",
            ],
        },
    },
    resetsNothing() { return hasAchievement("rw", 42) },
    autoUpgrade() { return hasAchievement("rw", 91) },
})