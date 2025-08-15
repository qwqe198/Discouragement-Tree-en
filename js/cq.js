//!!谢谢你啊谢谢你啊 输入怪物属性 返回扣除血量
function battle(hp, atk, def) {
    let turns = n(hp).div(player.cq.atk.sub(def)).ceil().sub(1).max(0)//!!你减1再floor是啥 剩下1点血不打了？
    let trueDamage = n(atk).sub(player.cq.def).max(0)
    return turns.mul(trueDamage)
}


addLayer("cq", { // This is the node code in the game. For example, player.p can access this layer's data. Use convenient letters, avoid starting with numbers.
    symbol: `cq`, // The letter displayed on the node
    position: 0, // Node order
    startData() {
        return {
            unlocked: true, // Whether it's unlocked from the start
            points: new ExpantaNum(0),
            hp: new ExpantaNum(0),
            atk: new ExpantaNum(1),
            def: new ExpantaNum(0),
        }
    },
    requires() { return new ExpantaNum("10") },
    color: "yellow",
    resource: "Combat Power", // Name of the reset resource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    passiveGeneration() {
        if (hasUpgrade("grz", 31)) return 1
        if (hasUpgrade("grz", 24)) return 0.1
        return 0
    },

    tabFormat: {
        "Milestones": {
            buttonStyle() { return { 'color': 'yellow' } },
            content: [
                "main-display",
                ["prestige-button", "", function () { return hasUpgrade("grz", 31) ? { 'display': 'none' } : {} }], 
                "resource-display",
                "milestones",
            ],
        },
        "Combat": {
            buttonStyle() { return { 'color': 'yellow' } },
            unlocked() { return hasMilestone("cq", 1) },
            content: [
                "main-display",
                "upgrades",
            ],
        },
        "Enhancements": {
            buttonStyle() { return { 'color': 'yellow' } },
            unlocked() { return hasMilestone("cq", 2) },
            content: [
                "main-display",
                "buyables",
            ],
        },
        "Trials": {
            buttonStyle() { return { 'color': 'yellow' } },
            unlocked() { return hasMilestone("cq", 3) },
            content: [
                "main-display",
                "challenges",
            ],
        },
    },

    effectDescription() {
        return `
        <br>
        HP: ${format(player.cq.hp)}(+${format(layers.cq.effect())}/s)<br>
        Attack: ${format(player.cq.atk.mul(100).floor().div(100))}<br>
        Defense: ${format(player.cq.def.mul(100).floor().div(100))}<br>
        `},
    effect() {
        let eff = player.cq.points.max(0)
        if (hasAchievement("rw", 15)) eff = eff.mul(1.5)
        if (hasUpgrade("grz", 15)) eff = eff.mul(upgradeEffect("grz", 15))
        eff = eff.mul(buyableEffect("cq", 11))
        eff = eff.mul(tmp.cq.challenges[11].rewardEffect)
        if (hasMilestone("t", 5)) eff = eff.mul(buyableEffect("t", 11).add(1))
        if (hasMilestone("cq", 21)) eff = eff.mul(player.a1.points.add(10).log10())
        eff = eff.mul(layers.a1.effect())
        if (hasUpgrade("cq", 62)) eff = eff.mul(upgradeEffect("cq", 62))
        if (hasAchievement("rw", 33)) eff = eff.pow(1.1)
        if (hasAchievement("rw", 57)) eff = eff.pow(1.05)
        return eff
    },
    exponent: 1,
    baseAmount() { return player.esc.points }, // Base resource amount
    baseResource: "Persuasion Points", // Base resource name
    gainMult() { // Resource gain multiplier
        mult = new ExpantaNum(1)
        if (hasMilestone("lcb", 5)) mult = mult.mul(n(2).pow(player.lcb.points.sub(4)).min(100).max(0))
        if (hasAchievement("rw", 77)) mult = mult.mul(2)
        if (hasUpgrade("grz", 15)) mult = mult.mul(upgradeEffect("grz", 15))
        if (hasUpgrade("grz", 24)) mult = mult.mul(upgradeEffect("grz", 24))
        if (hasUpgrade("grz", 26)) mult = mult.mul(upgradeEffect("grz", 26))
        if (hasUpgrade("grz", 35)) mult = mult.mul(upgradeEffect("grz", 35))
        if (hasUpgrade("grz", 61)) mult = mult.mul(upgradeEffect("grz", 61))
        if (hasMilestone("cq", 26)) mult = mult.mul(2.3)
        if(mult.gte(1e5)) mult = mult.pow(0.8).mul(10)
        return mult.floor()
    },
    gainExp() { // Resource gain exponent (multiplied with exponent)
        var exp = new ExpantaNum(1)
        return exp
    },
    layerShown() { return hasMilestone("esc", 10) || hasMilestone("cq", 1) },
    row: 100, // Row the layer is in on the tree (0 is the first row). QwQ: 1 can also be the first row.

    milestones: {
        1: {
            requirementDescription: "1 Combat Power",
            effectDescription: "Obtain Monster Manual (unlocks Combat), Floor Teleporter (maintains previous layer unlocks but still requires corresponding Persuasion Points to gain resources), unlocks Quests",
            done() { return player.cq.points.gte(1) }
        },
        2: {
            requirementDescription: "2 Combat Power",
            effectDescription: "Unlock some attribute enhancements",
            done() { return player.cq.points.gte(2) }
        },
        3: {
            requirementDescription: "3 Combat Power",
            effectDescription: "Persuasion Tree is a revolutionary idle game innovation, unlocks Trials",
            done() { return player.cq.points.gte(3) }
        },
        4: {
            requirementDescription: "5 Combat Power",
            effectDescription: "Too much HP? Unlock the Tower",
            done() { return player.cq.points.gte(5) }
        },
        5: {
            requirementDescription: "6 Combat Power",
            effectDescription: "Segmented Automation 2 - Same persuasion can happen twice. Retain auto-buy for p-layer buyable 11",
            done() { return player.cq.points.gte(6) }
        },
        6: {
            requirementDescription: "7 Combat Power",
            effectDescription: "Here retain auto-buy for p-layer buyable 12",
            done() { return player.cq.points.gte(7) }
        },
        7: {
            requirementDescription: "8 Combat Power",
            effectDescription: "Auto-buy - retain auto-buy for p-layer buyable 13",
            done() { return player.cq.points.gte(8) }
        },
        8: {
            requirementDescription: "9 Combat Power",
            effectDescription: "Can retain auto-buy for p-layer buyable 14",
            done() { return player.cq.points.gte(9) }
        },
        9: {
            requirementDescription: "10 Combat Power",
            effectDescription: "Ignore unlock conditions - retain auto-buy for p-layer buyable 21",
            done() { return player.cq.points.gte(10) }
        },
        10: {
            requirementDescription: "11 Combat Power",
            effectDescription: "Therefore retain auto-buy for p-layer buyable 22",
            done() { return player.cq.points.gte(11) }
        },
        11: {
            requirementDescription: "12 Combat Power",
            effectDescription: "Simple Trial 2 - retain auto-buy for p-layer buyable 23",
            done() { return player.cq.points.gte(12) }
        },
        12: {
            requirementDescription: "13 Combat Power",
            effectDescription: "Much easier - retain auto-buy for p-layer buyable 24",
            done() { return player.cq.points.gte(13) }
        },
        13: {
            requirementDescription: "14 Combat Power",
            effectDescription: "Of course - retain auto-complete for p-layer challenge 11",
            done() { return player.cq.points.gte(14) }
        },
        14: {
            requirementDescription: "15 Combat Power",
            effectDescription: "Auto-challenge - retain auto-complete for p-layer challenge 12",
            done() { return player.cq.points.gte(15) }
        },
        15: {
            requirementDescription: "16 Combat Power",
            effectDescription: "Same applies - retain auto-complete for p-layer challenge 13",
            done() { return player.cq.points.gte(16) }
        },
        16: {
            requirementDescription: "17 Combat Power",
            effectDescription: "However - retain auto-complete for p-layer challenge 14",
            done() { return player.cq.points.gte(17) }
        },
        17: {
            requirementDescription: "18 Combat Power",
            effectDescription: "There isn't a dedicated trial related to challenges - retain auto-complete for p-layer challenge 21",
            done() { return player.cq.points.gte(18) }
        },
        18: {
            requirementDescription: "19 Combat Power",
            effectDescription: "Therefore - retain auto-complete for p-layer challenge 22",
            done() { return player.cq.points.gte(19) }
        },
        19: {
            requirementDescription: "20 Combat Power",
            effectDescription: "This is really just a QoL - retain auto-complete for p-layer challenge 23",
            done() { return player.cq.points.gte(20) }
        },
        20: {
            requirementDescription: "25 Combat Power",
            effectDescription: "Unlock Dungeons, meta-property gain ^1.15 but remove Point Singularity",
            done() { return player.cq.points.gte(25)||player.grz.points.gte(2) }
        },
        21: {
            requirementDescription: "30 Combat Power",
            effectDescription() { return "Amoeba boosts HP gain, current: x" + format(player.a1.points.add(10).log10()) },
            done() { return player.cq.points.gte(30) }
        },
        22: {
            requirementDescription: "50 Combat Power",
            effectDescription() { return "HP boosts Amoeba gain, current: x" + format(player.cq.hp.pow(0.02)) },
            done() { return player.cq.points.gte(50) }
        },
        23: {
            requirementDescription: "300 Combat Power",
            effectDescription() { return "Unlock 2nd Dungeon" },
            done() { return player.cq.points.gte(300)&&hasAchievement("rw", 77) },
            unlocked() { return hasAchievement("rw", 77) },
        },
        24: {
            requirementDescription: "21 Expansions completed",
            done() { return player.l.challenges[11] >= 21 },
            effectDescription() {
                return "Lazy developer promises - Rebirth increment x2"
            },
        },
        25: {
            requirementDescription: "22 Expansions completed",
            done() { return player.l.challenges[11] >= 22 },
            effectDescription() { return "Retain Combat Power milestones on reset. If points exceed 1e50950, point gain after double softcap x1e100" },
        },
        26: {
            requirementDescription: "23 Expansions completed",
            done() { return player.l.challenges[11] >= 23 },
            effectDescription() { return "Combat Power gain x2.3" },
        },
        27: {
            requirementDescription: "24 Expansions completed",
            done() { return player.l.challenges[11] >= 24 },
            effectDescription() { return "L-layer buyable 12 effect ^2, Infection +1" },
        },
        28: {
            requirementDescription: "25 Expansions completed",
            done() { return player.l.challenges[11] >= 25 },
            effectDescription() { return "Rewards are in the quests, wait, you've seen this description somewhere before" },
        },

    },
upgrades: {
    10000: {
        description: "Store Attack Power",
        effect() {
            let eff = new ExpantaNum(1)
            if (hasAchievement("rw", 17)) eff = eff.add(1)
            eff = eff.add(buyableEffect("cq", 12))
            eff = eff.mul(tmp.cq.challenges[12].rewardEffect)
            return eff
        },
        effectDisplay() { return `+${format(this.effect())}` },
        cost() { return new OmegaNum("1eeeeeeeeeeeeeee10") },
    },
    10001: {
        description: "Store Defense Power",
        effect() {
            let eff = new ExpantaNum(0)
            eff = eff.add(buyableEffect("cq", 13))
            if (hasAchievement("rw", 26)) eff = eff.mul(1.1)
            return eff
        },
        effectDisplay() { return `+${format(this.effect())}` },
        unlocked() { return false },
        cost() { return new OmegaNum("1eeeeeeeeeeeeeeee10") },
    },
    11: {
        description: "10/3/0 - Points gain ×3",
        cost() { return battle(10, 3, 0) },
        unlocked() { return true },
        currencyDisplayName: "HP",
        currencyInternalName: "hp",
        currencyLayer: "cq"
    },
    12: {
        description: "15/4/0 - Reset Points gain ×5",
        cost() { return battle(15, 4, 0) },
        unlocked() { return hasUpgrade("cq", 11) },
        currencyDisplayName: "HP",
        currencyInternalName: "hp",
        currencyLayer: "cq"
    },
    13: {
        description: "5/15/0 - Points gain scales with points",
        cost() { return battle(5, 15, 0) },
        unlocked() { return hasUpgrade("cq", 12) },
        effect() {
            let eff = player.points.add(10).log10()
            if (hasUpgrade("cq", 34)) eff = eff.pow(player.esc.points.add(1))
            return eff
        },
        effectDisplay() { return `×${format(this.effect())}` },
        currencyDisplayName: "HP",
        currencyInternalName: "hp",
        currencyLayer: "cq"
    },
    14: {
        description: "75/2/0 - Points gain scales with reset points",
        cost() { return battle(75, 2, 0) },
        unlocked() { return hasUpgrade("cq", 13) },
        effect() {
            let eff = player.p.points.add(10).log10()
            if (hasUpgrade("cq", 34)) eff = eff.pow(player.esc.points.add(1))
            return eff
        },
        effectDisplay() { return `×${format(this.effect())}` },
        currencyDisplayName: "HP",
        currencyInternalName: "hp",
        currencyLayer: "cq"
    },
    15: {
        description: "25/10/0 - Reset Points gain scales with reset points",
        cost() { return battle(25, 10, 0) },
        effect() {
            let eff = player.p.points.add(10).log10()
            if (hasUpgrade("cq", 34)) eff = eff.pow(player.esc.points.add(1))
            return eff
        },
        effectDisplay() { return `×${format(this.effect())}` },
        unlocked() { return hasUpgrade("cq", 14) },
        currencyDisplayName: "HP",
        currencyInternalName: "hp",
        currencyLayer: "cq"
    },
    21: {
        description: "20/7/0 ×2 - Reset Energy gain ×20",
        cost() { return new battle(75, 2, 0).mul(2) },
        unlocked() { return hasUpgrade("cq", 15) },
        currencyDisplayName: "HP",
        currencyInternalName: "hp",
        currencyLayer: "cq"
    },
    22: {
        description: "30/3/0 ×3 - p-layer buyable 11 effect ×1.01",
        cost() { return battle(75, 2, 0).mul(3) },
        unlocked() { return hasUpgrade("cq", 21) },
        currencyDisplayName: "HP",
        currencyInternalName: "hp",
        currencyLayer: "cq"
    },
    23: {
        description: "50/6/0 - Reset Points gain scales with points",
        cost() { return battle(50, 6, 0) },
        unlocked() { return hasUpgrade("cq", 22) },
        effect() {
            let eff = player.points.add(10).log10()
            if (hasUpgrade("cq", 34)) eff = eff.pow(player.esc.points.add(1))
            return eff
        },
        effectDisplay() { return `×${format(this.effect())}` },
        currencyDisplayName: "HP",
        currencyInternalName: "hp",
        currencyLayer: "cq"
    },
    24: {
        description: "50/1/0 - Points gain ^1.01",
        cost() { return battle(50, 1, 0) },
        unlocked() { return hasUpgrade("cq", 23) },
        currencyDisplayName: "HP",
        currencyInternalName: "hp",
        currencyLayer: "cq"
    },
    25: {
        description: "3/300/0 - Reset Points gain ^1.01",
        cost() { return battle(3, 300, 0) },
        unlocked() { return hasUpgrade("cq", 24) },
        currencyDisplayName: "HP",
        currencyInternalName: "hp",
        currencyLayer: "cq"
    },
    31: {
        description: "100/10/1 - Enemies gain defense. Keep Point Singularity when resetting first 4 layers",
        cost() { return battle(100, 10, 1) },
        unlocked() { return hasUpgrade("cq", 25) },
        currencyDisplayName: "HP",
        currencyInternalName: "hp",
        currencyLayer: "cq"
    },
    32: {
        description: "111/11/1 - Auto-buy Digital Life",
        cost() { return battle(111, 11, 1) },
        unlocked() { return hasUpgrade("cq", 31) },
        currencyDisplayName: "HP",
        currencyInternalName: "hp",
        currencyLayer: "cq"
    },
    33: {
        description: "50/15/1 - Prestige doesn't reset anything",
        cost() { return battle(50, 15, 1) },
        unlocked() { return hasUpgrade("cq", 32) },
        currencyDisplayName: "HP",
        currencyInternalName: "hp",
        currencyLayer: "cq"
    },
    34: {
        description: "20/222/1 - Persuasion Points boost upgrades 13/14/15/23 effects",
        cost() { return battle(20, 222, 1) },
        unlocked() { return hasUpgrade("cq", 33) },
        effect() {
            let eff = player.esc.points.add(1)
            if (hasUpgrade("cq", 41)) eff = eff.pow(2)
            return eff
        },
        effectDisplay() { return `^${format(this.effect())}` },
        currencyDisplayName: "HP",
        currencyInternalName: "hp",
        currencyLayer: "cq"
    },
    35: {
        description: "1000/5/2 - Keep 12.5% of Reset Points per second",
        cost() { return battle(1000, 5, 2) },
        unlocked() { return hasUpgrade("cq", 34) },
        currencyDisplayName: "HP",
        currencyInternalName: "hp",
        currencyLayer: "cq"
    },
    41: {
        description: "666/10/3 - Can instakill Simple Trial 1? Upgrade 34 effect ^2",
        cost() { return battle(666, 10, 3) },
        unlocked() { return hasUpgrade("cq", 35) },
        currencyDisplayName: "HP",
        currencyInternalName: "hp",
        currencyLayer: "cq"
    },
    42: {
        description: "1111/11/4 - Legend Power boosts points gain",
        cost() { return battle(1111, 11, 4) },
        effect() {
            return player.cq.points.add(1)
        },
        unlocked() { return hasUpgrade("cq", 41) },
        effectDisplay() { return `×${format(this.effect())}` },
        currencyDisplayName: "HP",
        currencyInternalName: "hp",
        currencyLayer: "cq"
    },
    43: {
        description: "1666/11/5 - Reset Energy gain scales with points (affected by upgrade 34)",
        cost() { return battle(1666, 11, 0) },
        effect() {
            let eff = player.points.add(10).log10()
            if (hasUpgrade("cq", 34)) eff = eff.pow(player.esc.points.add(1))
            return eff
        },
        unlocked() { return hasUpgrade("cq", 42) },
        effectDisplay() { return `×${format(this.effect())}` },
        currencyDisplayName: "HP",
        currencyInternalName: "hp",
        currencyLayer: "cq"
    },
    44: {
        description: "10000/15/0 - Reset Energy gain scales with reset points (affected by upgrade 34)",
        cost() { return battle(10000, 15, 0) },
        effect() {
            let eff = player.p.points.add(10).log10()
            if (hasUpgrade("cq", 34)) eff = eff.pow(player.esc.points.add(1))
            return eff
        },
        unlocked() { return hasUpgrade("cq", 43) },
        effectDisplay() { return `×${format(this.effect())}` },
        currencyDisplayName: "HP",
        currencyInternalName: "hp",
        currencyLayer: "cq"
    },
    45: {
        description: "222/100/5 - Reset Energy gain scales with reset energy (affected by upgrade 34)",
        cost() { return battle(222, 100, 5) },
        effect() {
            let eff = player.p.e0.add(10).log10()
            if (hasUpgrade("cq", 34)) eff = eff.pow(player.esc.points.add(1))
            return eff
        },
        unlocked() { return hasUpgrade("cq", 44) },
        effectDisplay() { return `×${format(this.effect())}` },
        currencyDisplayName: "HP",
        currencyInternalName: "hp",
        currencyLayer: "cq"
    },
    51: {
        description: "1000/66/6 - Points gain scales with Legend Power",
        cost() { return battle(1000, 66, 6) },
        effect() {
            return player.cq.points.add(10).log10().mul(0.01).add(1)
        },
        unlocked() { return hasUpgrade("cq", 45) },
        effectDisplay() { return `^${format(this.effect())}` },
        currencyDisplayName: "HP",
        currencyInternalName: "hp",
        currencyLayer: "cq"
    },
    52: {
        description: "1777/77/7 - Keep auto-buying pp-layer upgrades",
        cost() { return battle(1777, 77, 7) },
        unlocked() { return hasUpgrade("cq", 51) },
        currencyDisplayName: "HP",
        currencyInternalName: "hp",
        currencyLayer: "cq"
    },
    53: {
        description: "2888/88/8 - Auto-buy q-layer upgrades",
        cost() { return battle(2888, 88, 8) },
        unlocked() { return hasUpgrade("cq", 52) },
        currencyDisplayName: "HP",
        currencyInternalName: "hp",
        currencyLayer: "cq"
    },
    54: {
        description: "3999/99/9 - Keep auto-gaining Prestige Points",
        cost() { return battle(3999, 99, 9) },
        unlocked() { return hasUpgrade("cq", 53) },
        currencyDisplayName: "HP",
        currencyInternalName: "hp",
        currencyLayer: "cq"
    },
    55: {
        description: "5000/100/10 - Keep auto-gaining Meta Points",
        cost() { return battle(5000, 100, 10) },
        unlocked() { return hasUpgrade("cq", 54) },
        currencyDisplayName: "HP",
        currencyInternalName: "hp",
        currencyLayer: "cq"
    },
    61: {
        description: "300k fixed damage - In Simple Trial 3: Unlock Prestige Points but they're ^0.1",
        cost() { return new ExpantaNum(3e5) },
        unlocked() { return hasUpgrade("cq", 55) },
        currencyDisplayName: "HP",
        currencyInternalName: "hp",
        currencyLayer: "cq"
    },
    62: {
        description: "7777/111/11 - HP gain scales with itself",
        cost() { return battle(7777, 111, 11) },
        unlocked() { return hasUpgrade("cq", 61) },
        effect() {
            return player.cq.hp.add(10).log10()
        },
        effectDisplay() { return `×${format(this.effect())}` },
        currencyDisplayName: "HP",
        currencyInternalName: "hp",
        currencyLayer: "cq"
    },
    63: {
        description: "9999/133/13 - Life gain scales with itself",
        cost() { return battle(9999, 133, 13) },
        unlocked() { return hasUpgrade("cq", 62) },
        effect() {
            return player.l.points.add(10).log10()
        },
        effectDisplay() { return `×${format(this.effect())}` },
        currencyDisplayName: "HP",
        currencyInternalName: "hp",
        currencyLayer: "cq"
    },
    64: {
        description: "10000/100/50 ×3 - Legend Power boosts Flawless Points",
        cost() { return battle(10000, 100, 50).pow(3) },
        unlocked() { return hasAchievement("rw", 63) },
        effect() {
            let eff = player.cq.points.add(1)
            if(eff.gte(1e7)) eff = eff.log10().add(3).pow(7)
            return eff
        },
        effectDisplay() { return `×${format(this.effect())}` },
        currencyDisplayName: "HP",
        currencyInternalName: "hp",
        currencyLayer: "cq"
    },
    65: {
        description: "11111/111/55 ×3 - Auto-buy Increment Resistance",
        cost() { return battle(11111, 111, 55).pow(3) },
        unlocked() { return hasUpgrade("cq", 64) },
        currencyDisplayName: "HP",
        currencyInternalName: "hp",
        currencyLayer: "cq"
    }
},
challenges: {
    11: {
        name: "Basic Trial 1",
        challengeDescription() {
            let a = "(Recommended Power: 3) Persuasion Points effect becomes original^"
            let e = tmp.cq.challenges[11].challengeEffect
            let f = ", affects reset points and reset energy. Reward: Each completion gives HP gain ×2, Life base exponent +0.5"
            return a + e + f
        },
        goalDescription() {
            return "4 Persuasion Points"
        },
        challengeEffect() {
            let eff = n(2).pow(player.cq.challenges[11])
            eff = eff.mul(-1)
            return eff
        },
        goal: () => "4",
        canComplete: () => player.esc.points.gte(tmp.cq.challenges[11].goal),
        rewardDescription() {
            let b = "Current: ×" + format(tmp.cq.challenges[11].rewardEffect)
            let c = "<br>Completed: "
            c += formatWhole(player.cq.challenges[11]) + "/5 times"
            return b + c
        },
        completionLimit: 5,
        rewardEffect() {
            let eff = n(2).pow(player.cq.challenges[11])
            return eff
        },
        unlocked() {
            return hasMilestone("cq", 3)&&!hasAchievement("rw", 77)
        },
    },
    12: {
        name: "Basic Trial 2",
        challengeDescription() {
            let a = "(Recommended Power: 5) p-layer buyable 11 effect/"
            let e = player.cq.challenges[12] * 0.2 + 1.2
            let f = " Reward: Each completion gives ATK ×1.1"
            return a + e + f
        },
        goalDescription() {
            return "4 Persuasion Points"
        },
        challengeEffect() {
            let eff = n(1.2).pow(player.cq.challenges[12] + 1)
            return eff
        },
        goal: () => "4",
        canComplete: () => player.esc.points.gte(4),
        rewardDescription() {
            let b = "Current: ×" + format(tmp.cq.challenges[12].rewardEffect)
            let c = "<br>Completed: "
            c += formatWhole(player.cq.challenges[12]) + "/5 times"
            return b + c
        },
        completionLimit: 5,
        rewardEffect() {
            let eff = n(1.1).pow(player.cq.challenges[12])
            return eff
        },
        unlocked() {
            return player.cq.challenges[11] >= 1&&!hasAchievement("rw", 77)
        },
    },
    13: {
        name: "Basic Trial 3",
        challengeDescription() {
            let a = "(Recommended Power: 10) You are trapped in "
            let e = (player.cq.challenges[13] + 1) * 3
            let f = " layers of expansion. Reward: Each completion reduces effective expansion layers by 0.2 (applies to challenge entry effect)"
            return a + e + f
        },
        goalDescription() {
            return "4 Persuasion Points"
        },
        challengeEffect() {
            let eff = n(3).mul(player.cq.challenges[13] + 1)
            return eff
        },
        goal: () => "4",
        canComplete: () => player.esc.points.gte(4),
        rewardDescription() {
            let b = "Current: -" + format(tmp.cq.challenges[13].rewardEffect)
            let c = "<br>Completed: "
            c += formatWhole(player.cq.challenges[13]) + "/5 times"
            return b + c
        },
        completionLimit: 5,
        rewardEffect() {
            let eff = n(0.2).mul(player.cq.challenges[13])
            return eff
        },
        unlocked() {
            return buyableEffect("t", 11).gte(7)
        },
    },
    21: {
        name: "Basic Trial 4",
        challengeDescription() {
            let a = "(Recommended Power: 20) Drunken balance: Points gain "
            let e = (3 ** (player.cq.challenges[21] + 1))
            let f = "th root, p-layer upgrade 14 disabled. Reset Points gain^"
            let g = (player.cq.challenges[21] >= 3?1:2 ** (player.cq.challenges[21] + 1))
            let h = " Reward: Auto gain (1e-3 * 10^x)% Life per second"
            return a + e + f + g + h
        },
        goalDescription() {
            return "4 Persuasion Points"
        },
        challengeEffect() {
            let eff = n(3).pow(player.cq.challenges[21] + 1)
            return eff
        },
        goal: () => "4",
        canComplete: () => player.esc.points.gte(4),
        rewardDescription() {
            let b = "Current: " + format(tmp.cq.challenges[21].rewardEffect) + "%"
            let c = "<br>Completed: "
            c += formatWhole(player.cq.challenges[21]) + "/5 times"
            return b + c
        },
        completionLimit: 5,
        rewardEffect() {
            let eff = n(10).pow(player.cq.challenges[21]).div(1000)
            return eff
        },
        unlocked() {
            return player.cq.challenges[13] >= 1
        },
    },
    22: {
        name: "Basic Trial 5",
        challengeDescription() {
            let a = "(Recommended Power: 50) You have too many bonuses,"
            let b = player.cq.challenges[22] >= 3 ? " p-layer upgrades 11,12,13,14,32 disabled, points^0.1" :
                 player.cq.challenges[22] >= 2 ? " p-layer upgrades 11,12,13,14 disabled, points^0.25" :
                 player.cq.challenges[22] >= 1 ? " p-layer upgrades 11,12,13 disabled" : 
                 "p-layer upgrades 11,12 disabled"
            let h = " Reward: Each completion gives Flawless Points ×3, Amoeba ×3, Increment ×10"
            return a + b + h
        },
        goalDescription() {
            return "4 Persuasion Points"
        },
        goal: () => "4",
        canComplete: () => player.esc.points.gte(4),
        rewardDescription() {
            let c = "<br>Completed: "
            c += formatWhole(player.cq.challenges[22]) + "/5 times"
            return c
        },
        completionLimit: 5,
        unlocked() {
            return hasAchievement("rw", 54)
        },
    },
    23: {
        name: "Basic Trial 6",
        challengeDescription() {
            let a = "(Recommended Power: 69) "
            let b = player.cq.challenges[23] >= 2 ? "Persuasion Points separators now very large. Upgrade 13 effect inverted. p-layer buyables scale harder. Reset Points and upgrades reset when resetting" :
                 player.cq.challenges[23] >= 1 ? "Persuasion Points separators now very large. Upgrade 13 effect inverted. Reset Points and upgrades reset when resetting" : 
                 "Persuasion Points separators now very large. Reset Points and upgrades reset when resetting"
            let h = " Reward: Each completion gives Legend Power gain ×2"
            return a + b + h
        },
        goalDescription() {
            return "4 Persuasion Points"
        },
        goal: () => "4",
        canComplete: () => player.esc.points.gte(4),
        rewardDescription() {
            let c = "<br>Completed: "
            c += formatWhole(player.cq.challenges[23]) + "/5 times"
            return c
        },
        completionLimit: 5,
        unlocked() {
            return hasAchievement("rw", 65)
        },
    }
},

 buyables: {
    11: {
        title: "Vitality Training",
        description: "Enhance HP and Life generation",
        cost(x = getBuyableAmount(this.layer, this.id)) {
            let cost = new ExpantaNum("1e50")
                .mul(new ExpantaNum(10000).pow(x))
                .mul(new ExpantaNum(5).pow(x.pow(2)));
            if (hasAchievement("rw", 36)) cost = cost.pow(0.9);
            return cost;
        },
        display() { 
            return `HP and Life gain<br />
            ×${format(buyableEffect(this.layer, this.id), 2)}<br />
            (Next level: ×${format(this.effect(getBuyableAmount(this.layer, this.id).add(1)))})
            <br />Cost: ${format(this.cost())} Life<br>
            Level: ${formatWhole(getBuyableAmount(this.layer, this.id))}` 
        },
        canAfford() { return player.l.points.gte(this.cost()) },
        buy() {
            player.l.points = player.l.points.sub(this.cost());
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1));
        },
        effect(x = getBuyableAmount(this.layer, this.id)) {
            return new ExpantaNum(1.5).pow(x);
        },
        unlocked() { return hasMilestone("cq", 2) },
    },
    12: {
        title: "Attack Boost",
        description: "Increase combat attack power",
        cost(x = getBuyableAmount(this.layer, this.id)) {
            let baseCost = hasUpgrade("grz", 32) ? 1 : 1000;
            return new ExpantaNum(baseCost).mul(new ExpantaNum(2).pow(x));
        },
        display() { 
            return `Attack +<br />
            ${format(buyableEffect(this.layer, this.id), 2)}<br />
            (Next level: +${format(this.effect(getBuyableAmount(this.layer, this.id).add(1)))})
            <br />Cost: ${format(this.cost())} HP<br>
            Level: ${formatWhole(getBuyableAmount(this.layer, this.id))}` 
        },
        canAfford() { return player.cq.hp.gte(this.cost()) },
        buy() {
            player.cq.hp = player.cq.hp.sub(this.cost());
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1));
        },
        effect(x = getBuyableAmount(this.layer, this.id)) {
            return new ExpantaNum(x);
        },
        unlocked() { return hasMilestone("cq", 2) },
    },
    13: {
        title: "Defense Boost",
        description: "Increase combat defense power",
        cost(x = getBuyableAmount(this.layer, this.id)) {
            let baseCost = hasUpgrade("grz", 32) ? 1 : 1000;
            return new ExpantaNum(baseCost).mul(new ExpantaNum(2).pow(x));
        },
        display() { 
            return `Defense +<br />
            ${format(buyableEffect(this.layer, this.id), 2)}<br />
            (Next level: +${format(this.effect(getBuyableAmount(this.layer, this.id).add(1)))})
            <br />Cost: ${format(this.cost())} HP<br>
            Level: ${formatWhole(getBuyableAmount(this.layer, this.id))}` 
        },
        canAfford() { return player.cq.hp.gte(this.cost()) },
        buy() {
            player.cq.hp = player.cq.hp.sub(this.cost());
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1));
        },
        effect(x = getBuyableAmount(this.layer, this.id)) {
            return new ExpantaNum(x);
        },
        unlocked() { return hasMilestone("cq", 2) },
    }
},
    doReset(resettingLayer) {
        if (layers[resettingLayer].row > layers[this.layer].row) {
            let kept = ["unlocked", "auto"]
           
                kept.push("challenges")
              if (hasAchievement("rw", 94)) kept.push("milestones")
            layerDataReset(this.layer, kept)
        }
    },
    update(diff) {
        player.cq.hp = player.cq.hp.add(layers.cq.effect().mul(diff))
        player.cq.atk = upgradeEffect("cq", 10000)
        player.cq.def = upgradeEffect("cq", 10001)

        if (player.cq.challenges[21] > 4) player.cq.challenges[21] = 4//下版本删
        if (player.cq.challenges[22] > 3) player.cq.challenges[22] = 3
        if (player.cq.challenges[23] > 2) player.cq.challenges[23] = 2
if (hasUpgrade("grz", 32))setBuyableAmount('cq', 12, player.cq.hp.add(1).log10().div(0.3010299956639812).floor().add(1))
if (hasUpgrade("grz", 32))setBuyableAmount('cq', 13, player.cq.hp.add(1).log10().div(0.3010299956639812).floor().add(1))
 if (hasAchievement("rw", 92) && player.l.points.root(0.9).sub(1).gte(n(1e50).mul(n(10000).pow(getBuyableAmount("cq", 11))).mul(n(5).pow(getBuyableAmount("cq", 11).pow(2))))) setBuyableAmount("cq", 11, getBuyableAmount("cq", 11).add(1))
if(player.grz.points.gte(10))player.cq.points=player.cq.points.max(300)

    },
autoUpgrade() { return hasAchievement("rw", 83) },


})