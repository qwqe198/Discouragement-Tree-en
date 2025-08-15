addLayer("t", {
    symbol: "T", // Changed from Chinese character to "T" for Tower
    position: 1,
    startData() {
        return {
            unlocked: true,
            points: new ExpantaNum(0),
            coin: new ExpantaNum(0),
        }
    },
    layerShown() { return true },
    color: "yellow",
    resource: "Floors", // Translated from "层"
    type: "normal",
    passiveGeneration() {
        return 0
    },
    effectDescription() {
        return `` // Empty as in original
    },
    requires() { return new ExpantaNum(1) },
    buyables: {
        11: {
            title: "Climb Tower",
            cost(x = getBuyableAmount(this.layer, this.id)) {
                let c = new ExpantaNum("1000")
                    .mul(new ExpantaNum(3).pow(x))
                    .mul(new ExpantaNum(1.1).pow(x.pow(2)))
                    .div(player.cq.atk.add(1))
                if (hasAchievement("rw", 51)) c = c.div(player.cq.def.add(1))
                return c
            },
            display() { 
                return `Requires: ${format(this.cost())} HP<br>
                Floors: ${formatWhole(getBuyableAmount(this.layer, this.id))}`
            },
            canAfford() { return player.cq.hp.gte(this.cost()) },
            buy() {
                player.cq.hp = player.cq.hp.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect(x = getBuyableAmount(this.layer, this.id)) {
                let eff = x
                if(hasAchievement("rw",96)) eff = eff.max(20)
                return eff
            },
            unlocked() { return true },
        },
    },
    exponent: 1,
    baseAmount() { return player.cq.hp },
    baseResource: "HP", // Translated from "血量"
    gainMult() {
        let mult = new ExpantaNum(1)
        return mult
    },
    gainExp() {
        let exp = new ExpantaNum(1)
        return exp
    },
    layerShown() { return hasMilestone("cq", 4) },
    row: 100,
    challenges: {
        11: {
            name: "Trial 1 - Enhanced Vaccine",
            challengeDescription() {
                return "(Recommended Power: 30) Points gain becomes log10/9, resets power on entry, resets increments on exit"
            },
            goalDescription() {
                return "1F1e308 points"
            },
            goal: () => "eeeeeeeeeeeeeee10",
            canComplete: () => player.points.gte(tmp.t.challenges[11].goal),
            rewardDescription() {
                return `<br>Completed: ${formatWhole(player.t.challenges[11])}/1 times`
            },
            onEnter() {
                doReset("t")
                if(hasAchievement("rw",114)) player.csm.points = new ExpantaNum(1)
            },
            onExit() {
                player.i.points = new ExpantaNum(0)
            },
            unlocked() {
                return hasAchievement("rw", 45)
            },
        },
    },
    milestones: {
        1: {
            requirementDescription: "1 Floor",
            effectDescription: "Points gain ×(x+1)",
            done() { return buyableEffect("t", 11).gte(1) }
        },
        2: {
            requirementDescription: "2 Floors",
            effectDescription: "Reset Points gain ×(x+1)",
            done() { return buyableEffect("t", 11).gte(2) }
        },
        3: {
            requirementDescription: "3 Floors",
            effectDescription: "p-layer upgrade 11 effect ×(x+1)",
            done() { return buyableEffect("t", 11).gte(3) }
        },
        4: {
            requirementDescription: "4 Floors",
            effectDescription: "p-layer upgrade 12 effect ×(x+1)",
            done() { return buyableEffect("t", 11).gte(4) }
        },
        5: {
            requirementDescription: "5 Floors",
            effectDescription: "HP gain ×(x+1)",
            done() { return buyableEffect("t", 11).gte(5) }
        },
        6: {
            requirementDescription: "6 Floors",
            effectDescription: "p-layer upgrade 13 effect ×(x+1)",
            done() { return buyableEffect("t", 11).gte(6) }
        },
        7: {
            requirementDescription: "7 Floors",
            effectDescription: "p-layer upgrade 14 effect ×(x+1), unlocks a new trial",
            done() { return buyableEffect("t", 11).gte(7) }
        },
        8: {
            requirementDescription: "8 Floors",
            effectDescription: "Light-speed through 8 discouragements - Life gain +1ex",
            done() { return buyableEffect("t", 11).gte(8) }
        },
        9: {
            requirementDescription: "9 Floors",
            effectDescription: "Prestige Bonus effect ^1.025",
            done() { return buyableEffect("t", 11).gte(9) }
        },
        10: {
            requirementDescription: "10 Floors",
            effectDescription: "Powerful beyond words - In Easy Trial 4, points gain ×1e(x^3.14)",
            done() { return buyableEffect("t", 11).gte(10) }
        },
        11: {
            requirementDescription: "12 Floors",
            effectDescription: "Flawless points gain ×(1.05^x)",
            done() { return buyableEffect("t", 11).gte(12) }
        },
        12: {
            requirementDescription: "14 Floors",
            effectDescription: "Increment gain ×(1.1^x), Reset Points gain ^(1+0.005x)",
            done() { return buyableEffect("t", 11).gte(14) }
        },
        13: {
            requirementDescription: "16 Floors",
            effectDescription: "Life gain ×(x+1)",
            done() { return buyableEffect("t", 11).gte(16) }
        },
        14: {
            requirementDescription: "18 Floors",
            effectDescription: "Rebirth increment gain ×(1.07^x)",
            done() { return buyableEffect("t", 11).gte(18) }
        },
        15: {
            requirementDescription: "20 Floors",
            effectDescription: "Infection Power gain ×(1.1^x)",
            done() { return buyableEffect("t", 11).gte(20) }
        },
        16: {
            requirementDescription: "22 Floors",
            effectDescription: "Infectious Disease gain ×(1.005^x)",
            done() { return buyableEffect("t", 11).gte(22) }
        },
    },
    tabFormat: {
        "Main": {
            buttonStyle() { return { 'color': 'lightblue' } },
            content: [
                "main-display",
                "resource-display",
                "buyables",
                "milestones",
                "challenges",
            ],
        },
    },
    getResetGain() {
        return new ExpantaNum(1)
    },
    update(diff) {
        player.t.points = buyableEffect("t", 11)
        if(hasAchievement("rw",96)) {
            setBuyableAmount("t", 11, getBuyableAmount("t", 11).max(20))
        }
    },
})