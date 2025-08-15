var escReq = [1e5, 1e18, 1e200, 'e1000', 'e2750', 'e6000', 'e4350', 'e7625', 'e19590', 'e47137', 'e50000', 'e999999']
var ez6escReq = ["1e2100", "1e16450", "1e16700", 'e16745', ]
var ez6escReq2 = ["1e4200", "1e20000", "1e22500", 'e26100', ]
var ez6escReq3 = ["1e4200", "1e20000", "1e22500", 'e30000', ]
function isUnl(escPointsRequired) {
    return player.esc.points.gte(escPointsRequired)
}




addLayer("esc", {
    symbol: "ESC",
    position: 0,
    startData() {
        return {
            unlocked: true,
            points: new ExpantaNum(0),
        }
    },
    color: "grey",
    resource: "Persuasion Points",
    type: "static",
    requires() {
        if(inChallenge("cq", 23) && player.cq.challenges[23] >= 2) return new ExpantaNum(ez6escReq2[player.esc.points.toNumber()])
        if(inChallenge("cq", 23) && player.cq.challenges[23] >= 1) return new ExpantaNum(ez6escReq2[player.esc.points.toNumber()])
        if(inChallenge("cq", 23)) return new ExpantaNum(ez6escReq[player.esc.points.toNumber()])
        if (inChallenge("esc", 11)) return new ExpantaNum(Infinity)
        if (escReq[player.esc.points.toNumber()]) return new ExpantaNum(escReq[player.esc.points.toNumber()])
        return new ExpantaNum(Infinity)
    },
    base: 1,
    exponent: 0,
    baseAmount() { return player.points },
    baseResource: "Points",
    gainMult() {
        let mult = new ExpantaNum(1)
        return mult
    },
    gainExp() {
        let exp = new ExpantaNum(1)
        return exp
    },
    row: 99,
    layerShown() { return true },
    effectDescription() {
        if (inChallenge("cq", 11)) return `Points gain /${format(this.effect().pow(-1))}`
        return `Points gain ×${format(this.effect())}`
    },
    effect() { 
        return new ExpantaNum(1.5).pow(player.esc.points.pow(2))
            .pow(inChallenge("cq", 11) ? tmp.cq.challenges[11].challengeEffect : 1) 
    },

    milestones: {
        1: {
            requirementDescription: "1 Persuasion Point",
            effectDescription: "5. Excessive repetition of basic content, also called 'Big Reset' (low bonuses but many resets required). Unlocks more~ upgrades.(?)",
            done() { return isUnl(1) }
        },
        2: {
            requirementDescription: "2 Persuasion Points",
            effectDescription: "Unlocks more~~~ upgrades.(?) Persuasion 11 ends",
            done() { return isUnl(2) }
        },
        3: {
            requirementDescription: "3 Persuasion Points",
            effectDescription: "Unlocks more~~~~~ upgrades.(?) 14. Reset costs grow too fast, making the game unfun",
            done() { return isUnl(3) }
        },
        4: {
            requirementDescription: "4 Persuasion Points",
            effectDescription: "Unlocks more~~~~~~~ upgrades.(?) 20. Unclear descriptions frustrate players. Nerfs Persuasion 7, enhances Challenge C-1 effect by 8×, Persuasion 9 ends",
            done() { return isUnl(4) }
        },
        5: {
            requirementDescription: "5 Persuasion Points",
            effectDescription: "Unlocks more~~~~~~~~~ upgrades.(?) Persuasion effect works on Reset Energy 30. Symbol abuse enhances emotions. 31. Still no automation",
            done() { return isUnl(5) }
        },
        6: {
            requirementDescription: "6 Persuasion Points",
            effectDescription: "40. Nerfs to hide poor balance. Points exponent ^0.8. 41. Didn't consider challenge effects. Auto-buy p-layer upgrades. Unlocks new layer",
            done() { return isUnl(6) }
        },
        7: {
            requirementDescription: "7 Persuasion Points",
            effectDescription: "Reset Points exponent ^0.8, unlocks more~~~~~~~~~~~ upgrades.(?) Unlocks new layer. Auto-buy all p-layer buyables",
            done() { return isUnl(7) }
        },
        8: {
            requirementDescription: "8 Persuasion Points",
            effectDescription: "Auto-buy pp-layer upgrades, gain 1000% Prestige Points and Meta Points per second, unlocks new layer",
            done() { return isUnl(8) }
        },
        9: {
            requirementDescription: "9 Persuasion Points",
            effectDescription: "Auto-buy p-layer buyable 12, m-layer buyable 11. Upgrade 12 effect improved. Auto-complete p-layer challenges. Life gain ×2",
            done() { return isUnl(9) }
        },
        10: {
            requirementDescription: "10 Persuasion Points",
            effectDescription: "Unlocks new layer",
            done() { return isUnl(10) }
        },
        11: {
            requirementDescription: "11 Persuasion Points",
            effectDescription: "Keep Persuasion milestones and upgrades in resets, effects trigger at current Persuasion Points. Unlocks Secret Realm (in Tower), A-layer upgrade 15 effect ×2",
            done() { return isUnl(11) }
        },
        12: {
            requirementDescription: "Get 1 Persuasion Point in Vaccine Boost",
            effectDescription() { return "I-layer upgrade 11 boosts Flawless Points (after Vaccine Boost effect). Current: ×" + format(upgradeEffect("i", 11).add(10).log10().pow(1.25)) },
            done() { return isUnl(1) && inChallenge("t", 11) },
            unlocked() { return inChallenge("t", 11) },
        },
        13: {
            requirementDescription: "Get 2 Persuasion Points in Vaccine Boost",
            effectDescription() { return "Unlocks Portal" },
            done() { return isUnl(2) && inChallenge("t", 11) },
            unlocked() { return inChallenge("t", 11) },
        },
    },
    
    upgrades: {
        11: {
            description: "21. Mediocre upgrade inspired by Tree of Life but necessary. Points and Reset Points gain ^1.01",
            effect() { return 1.01 },
            effectDisplay() { return `^${format(this.effect())}` },
            unlocked() { return hasMilestone("esc", 4) },
            cost() {
                if (hasAchievement("rw", 12)) return new ExpantaNum(0)
                return new ExpantaNum(3)
            }
        },
        12: {
            description: "22. Upgrade unlocked without notice. Persuasion Points affect Reset Points",
            unlocked() { return hasUpgrade("esc", 11) },
            cost: new ExpantaNum(0),
        },
        13: {
            description: "Persuasion Points boost p-layer buyable 11",
            effect() { return player.esc.points.mul(0.01).add(1) },
            effectDisplay() { return `×${format(this.effect())}` },
            unlocked() { return hasMilestone("esc", 7) },
            cost: new ExpantaNum(0),
        },
        14: {
            description: "Persuasion Points boost p-layer buyable 22",
            effect() { return player.esc.points.mul(0.01).add(1) },
            effectDisplay() { return `×${format(this.effect())}` },
            unlocked() { return hasMilestone("esc", 9) },
            cost: new ExpantaNum(0),
        },
    },
    
    resetsNothing() { return hasAchievement("rw", 32) },
    autoUpgrade() { return hasAchievement("rw", 43) },
    autoPrestige() { return hasAchievement("rw", 31) },
    
    doReset(resettingLayer) {
        if (layers[resettingLayer].row > layers[this.layer].row) {
            let kept = ["unlocked", "auto"]
            if (resettingLayer == "cq" && hasAchievement("rw", 45)) {
                kept.push("milestones")
                kept.push("upgrades")
            }
            if (resettingLayer == "t" && hasAchievement("rw", 45)) {
                kept.push("milestones")
                kept.push("upgrades")
            }
            if (resettingLayer == "a1" && hasAchievement("rw", 45)) {
                kept.push("milestones")
                kept.push("upgrades")
            }
            layerDataReset(this.layer, kept)
        }
    },
})