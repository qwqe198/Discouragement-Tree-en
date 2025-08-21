addLayer("p", {
    symbol: "RP",
    position: 0,
    startData() {
        return {
            unlocked: true,
            points: new ExpantaNum(0),
            e0: new ExpantaNum(0),
            e1: new ExpantaNum(0),
            e2: new ExpantaNum(0),
            e3: new ExpantaNum(0),
            e4: new ExpantaNum(0),
            e5: new ExpantaNum(0),
            e6: new ExpantaNum(0),
            e7: new ExpantaNum(0),
            e8: new ExpantaNum(0),
            e9: new ExpantaNum(0)
        }
    },
    autoUpgrade() { return hasMilestone("esc", 6) || hasAchievement("rw", 42) },
    onPrestige() {
        if(inChallenge("cq", 23)) {
            player.p.points = new ExpantaNum(0)
            player.p.upgrades = []
        }
    },
    color: "lime",
    resource: "Reset Points",
    type: "normal",
    requires() { return new ExpantaNum(1) },
    exponent: 0.25,
    baseAmount() { return player.points },
    baseResource: "Points",
    gainMult() {
        let mult = new ExpantaNum(1)
        const upgIDs = [14, 15]
        for (let i of upgIDs) {
            if (hasUpgrade("p", i)) mult = mult.mul(upgradeEffect("p", i))
        }
        if (hasUpgrade("cq", 12)) mult = mult.mul(5)
        if (hasMilestone("t", 2)) mult = mult.mul(buyableEffect("t", 11).add(1))
        if (hasUpgrade("cq", 14)) mult = mult.mul(upgradeEffect("cq", 14))
        if (hasUpgrade("cq", 23)) mult = mult.mul(upgradeEffect("cq", 23))
        if (hasUpgrade("p", 51)) mult = mult.mul(upgradeEffect("p", 51))
        if (hasUpgrade("p", 32)) mult = mult.mul(layers.p.effect())
        if (hasUpgrade("esc", 12) || inChallenge("cq", 11)) mult = mult.mul(layers.esc.effect())
        if (hasMilestone("esc", 7)) mult = mult.mul(layers.m.effect())
        if (hasUpgrade("grz", 12)) mult = mult.mul(upgradeEffect("grz", 12))
        if (hasMilestone("l", 13)) {
            mult = mult.mul(
                player.l.points.add(1).pow(5)
                    .pow(hasMilestone("l", 18) ? layers.a.effect() : 1)
                    .pow(buyableEffect("a1", 13))
            )
        }
        if (hasUpgrade("cq", 25)) mult = mult.pow(1.01)
        if (hasMilestone("t", 12)) mult = mult.pow(new ExpantaNum(1).add(buyableEffect("t", 11).mul(0.005)))
        if (inChallenge("cq", 21)) {
            mult = mult.pow((player.cq.challenges[21] >= 3 ? 1 : 2 ** (player.cq.challenges[21] + 1)))
        }
        if (player.q.points.gte(1) && hasMilestone("l", 22) && inChallenge("l", 11)) {
            mult = mult.pow(layers.q.effect())
        }
        if (inChallenge("l", 11)) {
            mult = expPow(mult.mul(10), tmp.l.challenges[11].challengeEffect).div(10)
        }
        if (inChallenge("cq", 13)) {
            mult = expPow(mult.mul(10), new ExpantaNum(0.99).pow((player.cq.challenges[13] + 1) * 3)
                .mul(10000).floor().div(10000)).div(10)
        }
        if (player.esc.points.gte(7) || inChallenge("cq", 23)) {
            mult = expPow(mult.mul(10), 0.8).div(10)
        }
        if (mult.gte("1e13000")) mult = expPow(mult.mul(10), 0.8).mul("1e11045")
        if (mult.gte("1e25000")) mult = expPow(mult.mul(10), 0.8).mul("1e21700")
        if (inChallenge("p", 21)) {
            mult = mult.div(player.p.points.mul(player.points.pow(0.1).add(1)).add(1))
            mult = mult.root(player.p.upgrades.length ** 0.2)
        }
        return mult
    },
    gainExp() {
        let exp = new ExpantaNum(1)
        if (hasUpgrade("p", 22)) exp = exp.mul(upgradeEffect("p", 22).add(1))
        if (hasUpgrade("esc", 11)) exp = exp.mul(1.01)
        if (inChallenge("p", 22)) exp = exp.mul(0.66)
        return exp
    },
    row: 1,
    layerShown() { return true },
    effectDescription() {
        return `
        This is a tree that collects many discouragement methods. If you can't continue, that's completely normal. 
        The main purpose of this tree is to prevent group authors from continuing to step on pitfalls.<br>
        Each discouragement method lasts until text indicates its end.<br>
        0. Unreasonable balance makes player experience fluctuate wildly
        1. Starting resource exponent is too low, making idle gains minimal. 3. No shortcuts or mobile QoL on top of this.
        ${hasUpgrade("p", 32) ? `<br><br>Reset Energy: ${format(player.p.e0)} (${format(upgradeEffect('p', 32))}/s), making Reset Points gain ×${format(this.effect())}` : ``}
        ${buyableEffect('p', 13).gte(1) ? `<br><br>1st Condensed Energy: ${format(player.p.e1)} (${format(player.p.e0.pow(1/9).div(100).mul(this.condenseEffect(player.p.e2)))}/s), making Reset Energy gain ×${format(this.condenseEffect(player.p.e1))}` : ``}
        ${buyableEffect('p', 13).gte(2) ? `<br><br>2nd Condensed Energy: ${format(player.p.e2)} (${format(player.p.e1.pow(1/9).div(100).mul(this.condenseEffect(player.p.e3)))}/s), making 1st Condensed Energy gain ×${format(this.condenseEffect(player.p.e2))}` : ``}
        ${buyableEffect('p', 13).gte(3) ? `<br><br>3rd Condensed Energy: ${format(player.p.e3)} (${format(player.p.e2.pow(1/9).div(100).mul(this.condenseEffect(player.p.e4)))}/s), making 2nd Condensed Energy gain ×${format(this.condenseEffect(player.p.e3))}` : ``}
        ${buyableEffect('p', 13).gte(4) ? `<br><br>4th Condensed Energy: ${format(player.p.e4)} (${format(player.p.e3.pow(1/9).div(100).mul(this.condenseEffect(player.p.e5)))}/s), making 3rd Condensed Energy gain ×${format(this.condenseEffect(player.p.e4))}` : ``}
        ${buyableEffect('p', 13).gte(5) ? `<br><br>5th Condensed Energy: ${format(player.p.e5)} (${format(player.p.e4.pow(1/9).div(100).mul(this.condenseEffect(player.p.e6)))}/s), making 4th Condensed Energy gain ×${format(this.condenseEffect(player.p.e5))}` : ``}
        ${buyableEffect('p', 13).gte(6) ? `<br><br>6th Condensed Energy: ${format(player.p.e6)} (${format(player.p.e5.pow(1/9).div(100).mul(this.condenseEffect(player.p.e7)))}/s), making 5th Condensed Energy gain ×${format(this.condenseEffect(player.p.e6))}` : ``}
        ${buyableEffect('p', 13).gte(7) ? `<br><br>7th Condensed Energy: ${format(player.p.e7)} (${format(player.p.e6.pow(1/9).div(100).mul(this.condenseEffect(player.p.e8)))}/s), making 6th Condensed Energy gain ×${format(this.condenseEffect(player.p.e7))}` : ``}
        `
    },
    effect() {
        let eff = player.p.e0.div(10).add(1).pow(2).pow(hasUpgrade("p", 44) ? buyableEffect("p", 22) : 1)
        if (hasMilestone("esc", 5)) eff = eff.mul(layers.esc.effect())
        if (hasUpgrade("a", 35)) eff = eff.pow(1.025)
        if (eff.gte("1e250000")) eff = expPow(eff.mul(10), 0.75).div(10).mul("1e240000")
        return eff
    },
    condenseEffect(x) {
        if (!x) return new ExpantaNum(1)
        return x.div(10).add(1).pow(2)
    },
upgrades: {
    11: {
        description: "2. Overused bland start. Reset Points boost Points.",
        effect() {
            let eff = player.p.points.add(1).pow(0.66)
            if (hasUpgrade("p", 21)) eff = eff.mul(upgradeEffect("p", 21).add(1))
            if (hasMilestone("t", 3)) eff = eff.mul(buyableEffect("t", 11).add(1))
            let buyablePow = new ExpantaNum(1)
            if (hasUpgrade("p", 31)) buyablePow = buyablePow.add(1)
            eff = eff.mul(buyableEffect("p", 11).pow(buyablePow))
            if (inChallenge("p", 22)) eff = eff.pow(0.5)
            if (inChallenge("cq", 22)) eff = new ExpantaNum(1)
            return eff
        },
        effectDisplay() { return `×${format(this.effect())}` },
        cost: new ExpantaNum(1),
        unlocked() { return true }
    },
    12: {
        description: "Points boost themselves.",
        effect() {
            let eff = player.points.add(1).log10().add(1)
            if ((hasUpgrade("p", 25) && !inChallenge("p", 11)) || inChallenge("p", 12)) {
                eff = expPow(eff.mul(10), 2).div(10)
            }
            if (hasChallenge("p", 12)) eff = eff.pow(challengeEffect("p", 12))
            if (hasMilestone("t", 4)) eff = eff.mul(buyableEffect("t", 11).add(1))
            let buyablePow = new ExpantaNum(1)
            if (hasUpgrade("p", 31)) buyablePow = buyablePow.add(1)
            eff = eff.mul(buyableEffect("p", 11).pow(buyablePow))
            if (hasUpgrade("a", 34)) eff = eff.pow(buyableEffect("p", 23))
            if (inChallenge("cq", 22)) eff = new ExpantaNum(1)
            return eff
        },
        effectDisplay() { return `×${format(this.effect())}` },
        cost: new ExpantaNum(4),
        unlocked() { return hasUpgrade("p", 11)||inChallenge("p", 14) }
    },
    13: {
        description: "Each upgrade makes Points ×1.75.",
        effect() {
            let base = new ExpantaNum(1.75)
            if (hasUpgrade("p", 24)) base = base.mul(upgradeEffect("p", 24))
            let eff = base.pow(player.p.upgrades.length)
            let buyablePow = new ExpantaNum(1)
            if (hasUpgrade("p", 31)) buyablePow = buyablePow.add(1)
            if (hasMilestone("t", 6)) eff = eff.mul(buyableEffect("t", 11).add(1))
            eff = eff.mul(buyableEffect("p", 11).pow(buyablePow))
                .pow(hasMilestone("l", 31) ? layers.a.effect() : 1)
            if (inChallenge("cq", 22) && player.cq.challenges[22] >= 1) eff = new ExpantaNum(1)
            return eff
        },
        effectDisplay() { return `×${format(this.effect())}` },
        cost: new ExpantaNum(16),
        unlocked() { return hasUpgrade("p", 12)||inChallenge("p", 14) }
    },
    14: {
        description: "Reset Points boost Reset Points.",
        effect() {
            let eff = player.p.points.div(16).add(1).cbrt()
            let buyablePow = new ExpantaNum(1)
            if (hasUpgrade("p", 31)) buyablePow = buyablePow.add(1)
            if (hasMilestone("t", 7)) eff = eff.mul(buyableEffect("t", 11).add(1))
            eff = eff.mul(buyableEffect("p", 11).pow(buyablePow))
            if (inChallenge("cq", 21)) eff = new ExpantaNum(1)
            if (inChallenge("cq", 22) && player.cq.challenges[22] >= 2) eff = new ExpantaNum(1)
            return eff
        },
        effectDisplay() { return `×${format(this.effect())}` },
        cost: new ExpantaNum(64),
        unlocked() { return hasUpgrade("p", 13)||inChallenge("p", 14) }
    },
    15: {
        description: "Points boost Reset Points. 4. Instant resets are far less effective than waiting a bit, and require large amounts.",
        effect() {
            let eff = player.points.add(10).log10()
            if (hasUpgrade("p", 31)) eff = expPow(eff.mul(10), 2).div(10)
            let buyablePow = new ExpantaNum(1)
            if (hasUpgrade("p", 31)) buyablePow = buyablePow.add(1)
            eff = eff.mul(buyableEffect("p", 11).pow(buyablePow))
                .pow(buyableEffect("p", 23))
            if (inChallenge("p", 22)) eff = eff.pow(0.5)
            return eff
        },
        effectDisplay() { return `×${format(this.effect())}` },
        cost: new ExpantaNum(256),
        unlocked() { return hasUpgrade("p", 14)||inChallenge("p", 14) }
    },
    21: {
        description: "6. Too many/too strong upgrades become the only growth method, creating obvious time walls when game content changes little. Upgrade 11 effect +^0.25.",
        effect() {
            let eff = new ExpantaNum(0.25)
            eff = eff.mul(buyableEffect("p", 11))
            if (inChallenge("p", 22)) eff = eff.mul(0.5)
            return eff.min(0.75)
        },
        effectDisplay() { return `+^${format(this.effect())} (Hardcap: +^0.75)` },
        cost: new ExpantaNum(10086),
        unlocked() { return hasUpgrade("p", 15)||isUnl(2)||inChallenge("p", 14) }
    },
    22: {
        description: "Discouragement 1 ended. p Reset Points gain exponent +×0.25.",
        effect() {
            let eff = new ExpantaNum(0.25)
            eff = eff.mul(buyableEffect("p", 11))
            if (!hasUpgrade("p", 55)) eff = eff.min(0.75)
            if (hasUpgrade("p", 55)) eff = eff.mul(hasMilestone("l", 34) ? 0.1 : 0.06).add(0.75)
            return eff
        },
        effectDisplay() { return `+×${format(this.effect())} (Hardcap: +×0.75)` },
        cost: new ExpantaNum(23333),
        unlocked() { return hasUpgrade("p", 21)||inChallenge("p", 14)   }
    },
    23: {
        description: "7. With low operation amounts, challenges become pure time walls. Unlock a challenge.",
        effect() {
            if (!hasUpgrade("p", 23)) return new ExpantaNum(0)
            return new ExpantaNum(1).mul(buyableEffect("p", 11))
        },
        effectDisplay() { return `Unlock ${format(this.effect())} challenge` },
        cost: new ExpantaNum(666666),
        unlocked() { return hasUpgrade("p", 22)||inChallenge("p", 14) }
    },
    24: {
        description: "Upgrade 13 base multiplied based on Reset Points.",
        effect() {
            let eff = player.p.points.add(1).log10().div(10).add(1)
            eff = eff.mul(buyableEffect("p", 11))
            if (hasChallenge("p", 21)) eff = eff.pow(challengeEffect("p", 21))
            if (hasMilestone("l", 42)) eff = eff.mul(buyableEffect("l", 11))
            return eff
        },
        effectDisplay() { return `×${format(this.effect())}` },
        cost: new ExpantaNum(1e6),
        unlocked() { return hasUpgrade("p", 23)||inChallenge("p", 14) }
    },
    25: {
        description: "Unlock a repeatable buyable. Upgrade 12 is greatly boosted (exponent^2, doesn't trigger in c1 challenge).",
        effect() {
            if (!hasUpgrade("p", 25)) return new ExpantaNum(0)
            return new ExpantaNum(1).mul(buyableEffect("p", 11))
        },
        effectDisplay() { return `Unlock ${format(this.effect())} buyable` },
        cost: new ExpantaNum(1e8),
        unlocked() { return hasUpgrade("p", 24)||inChallenge("p", 14) }
    },
    31: {
        description: "Strengthen upgrade 15. First five upgrades get +^1.5 effect when boosted by buyables.",
        effect() {
            let eff = new ExpantaNum(1.5)
            eff = eff.mul(buyableEffect("p", 11))
            eff = eff.mul(buyableEffect("p", 21))
            if (hasChallenge('p', 13)) eff = eff.mul(challengeEffect('p', 13))
            return eff
        },
        effectDisplay() { return `+^${format(this.effect())}` },
        cost: new ExpantaNum(1e16),
        unlocked() { return hasUpgrade("p", 25)||inChallenge("p", 14) }
    },
    32: {
        description: "Unlock Reset Energy. Reset Energy gain per second: Points^(1/18)/500",
        effect() {
            let eff = player.points.pow(1/18).div(500)
            if (inChallenge("cq", 11)) eff = eff.mul(layers.esc.effect())
            if (hasUpgrade("cq", 21)) eff = eff.mul(20)
            if (hasUpgrade("cq", 43)) eff = eff.mul(upgradeEffect('cq', 43))
            if (hasUpgrade("cq", 44)) eff = eff.mul(upgradeEffect('cq', 44))
            if (hasUpgrade("cq", 45)) eff = eff.mul(upgradeEffect('cq', 45))
            eff = eff.mul(buyableEffect("p", 12))
                .mul(layers.p.condenseEffect(player.p.e1))
            if (hasUpgrade('p', 34)) eff = eff.mul(upgradeEffect('p', 34))
            if (hasMilestone("l", 41)) {
                eff = eff.mul(
                    player.l.points.add(1).pow(5)
                        .pow(hasMilestone("l", 18) ? layers.a.effect() : 1)
                )
            }
            if (hasAchievement("rw", 25)) eff = eff.pow(1.025).mul(1e10)
            if (inChallenge("cq", 22) && player.cq.challenges[22] >= 3) eff = new ExpantaNum(0)
            return eff
        },
        effectDisplay() { return `+${format(this.effect())}/s` },
        cost: new ExpantaNum(1e50),
        unlocked() { return hasUpgrade("p", 31)||inChallenge("p", 14) }
    },
        33: {
    description: "15. Copied Antimatter Dimensions but didn't do it right. Unlocks a buyable about Condensed Energy (formula: x^(1/9)/100, based on previous tier energy).",
    effect() {
        return new ExpantaNum(1)
    },
    effectDisplay() { return `+${format(this.effect())}` },
    cost: new ExpantaNum(1e200),
    unlocked() { return hasUpgrade("p", 32) && isUnl(3) || isUnl(4) || inChallenge("p", 14) }
},
34: {
    description: "Discouragement Points slightly boost Reset Energy.",
    effect() {
        let eff = new ExpantaNum(1.8).pow(player.esc.points)
        if (hasUpgrade("p", 35)) eff = eff.pow(upgradeEffect("p", 35).add(1))
        return eff
    },
    effectDisplay() { return `×${format(this.effect())}` },
    cost: new ExpantaNum(1e308),
    unlocked() { return hasUpgrade("p", 33) || isUnl(4) || inChallenge("p", 14) }
},
35: {
    description: "First buyable boosts previous upgrade.",
    effect() {
        let eff = buyableEffect("p", 11).sub(1)
        if (hasChallenge("p", 14)) eff = eff.mul(challengeEffect("p", 14))
        if (hasUpgrade("p", 41)) eff = eff.mul(upgradeEffect("p", 41))
        eff = eff.mul(buyableEffect("p", 22))
        return eff
    },
    effectDisplay() { return `+^${format(this.effect())}` },
    cost: new ExpantaNum("1e450"),
    unlocked() { return hasUpgrade("p", 34) || isUnl(4) || inChallenge("p", 14) }
},
41: {
    description: "23. Requires players to wait through slow inflation. Fifth buyable boosts previous upgrade.",
    effect() {
        let eff = buyableEffect("p", 21)
        if (hasUpgrade("p", 42)) eff = eff.mul(upgradeEffect("p", 42))
        eff = eff.mul(buyableEffect("p", 22))
        return eff
    },
    effectDisplay() { return `×${format(this.effect())}` },
    cost: new ExpantaNum("1e1540"),
    unlocked() { return hasUpgrade("p", 35) && isUnl(4) || isUnl(5) }
},
42: {
    description: "24. Boring nesting. Fourth buyable boosts previous upgrade.",
    effect() {
        let eff = buyableEffect("p", 14)
        if (hasUpgrade("p", 43)) eff = eff.mul(upgradeEffect("p", 43))
        eff = eff.mul(buyableEffect("p", 22))
        return eff
    },
    effectDisplay() { return `×${format(this.effect())}` },
    cost: new ExpantaNum("1e1590"),
    unlocked() { return hasUpgrade("p", 41) || isUnl(5) || inChallenge("p", 14) }
},
43: {
    description: "25. Even more boring nesting. Third buyable boosts previous upgrade.",
    effect() {
        let eff = buyableEffect("p", 13)
        eff = eff.mul(buyableEffect("p", 22))
        return eff
    },
    effectDisplay() { return `×${format(this.effect())}` },
    cost: new ExpantaNum("1e1640"),
    unlocked() { return hasUpgrade("p", 42) || isUnl(5) || inChallenge("p", 14) }
},
44: {
    description: "28. Meta-meta nesting(?) Sixth buyable boosts Reset Energy effect exponentially.",
    effect() {
        return buyableEffect("p", 22)
    },
    effectDisplay() { return `^${format(this.effect())}` },
    cost: new ExpantaNum("1e2620"),
    unlocked() { return hasUpgrade("p", 43) || isUnl(5) || inChallenge("p", 14) }
},
45: {
    description: "29. Meta-meta-meta nesting(?) Sixth buyable boosts fifth buyable effect.",
    effect() {
        return buyableEffect("p", 22)
    },
    effectDisplay() { return `×${format(this.effect())}` },
    cost: new ExpantaNum("1e3140"),
    unlocked() { return hasUpgrade("p", 44) || isUnl(5) || inChallenge("p", 14) }
},
51: {
    description: "32. Lazy description copied from Math Tree. 2nd Condensed Energy isn't always useless - boosts Reset Points gain.",
    effect() {
        let eff = player.p.e2.add(1)
        if (hasUpgrade("a", 32)) eff = eff.pow(layers.a.effect())
        if (eff.gte("1e50000")) eff = expPow(eff.mul(10), 0.8).div(10).mul("1e44250")
        return eff
    },
    effectDisplay() { return `×${format(this.effect())}` },
    cost: new ExpantaNum("1e3690"),
    unlocked() { return hasUpgrade("p", 45) && isUnl(5) || isUnl(6) }
},
52: {
    description: "33. Adds completely useless things for current stage. 3rd Condensed Energy boosts Reset Points gain.",
    effect() {
        return player.p.e3.add(1)
    },
    effectDisplay() { return `×${format(this.effect())}` },
    cost: new ExpantaNum("1e3880"),
    unlocked() { return hasUpgrade("p", 51) || isUnl(6) || inChallenge("p", 14) }
},
53: {
    description: "34. Unoriginal nesting. Sixth buyable exponentially boosts second buyable effect.",
    effect() {
        return buyableEffect("p", 22)
    },
    effectDisplay() { return `^${format(this.effect())}` },
    cost: new ExpantaNum("1e3980"),
    unlocked() { return hasUpgrade("p", 52) || isUnl(6) || inChallenge("p", 14) }
},
54: {
    description: "38. Nonsense description. Seventh buyable effect boosts last buyable effect multiplicatively with square root when first buyable effect is between 6-7 (inclusive 6, exclusive 7).",
    effect() {
        return buyableEffect("p", 23).pow(0.5)
    },
    effectDisplay() { return `×${format(this.effect())}` },
    cost: new ExpantaNum("1e6280"),
    unlocked() { return hasUpgrade("p", 53) || isUnl(6) || inChallenge("p", 14) }
},
55: {
    description: "39. Changed effect without updating description. Upgrade 22's hardcap becomes softcap.",
    cost: new ExpantaNum("1e6666"),
    unlocked() { return hasUpgrade("p", 54) || isUnl(6) || inChallenge("p", 14) }
},
61: {
    description: "What a great upgrade! Life gain ×10",
    cost() { return new ExpantaNum("1e34265") },
    unlocked() { return hasUpgrade("p", 55) && hasMilestone("esc", 9) }
},
62: {
    description: "Life gain ×50",
    cost() { return new ExpantaNum("1e35430") },
    unlocked() { return hasUpgrade("p", 61) && hasMilestone("esc", 9) }
},
63: {
    description: "Life gain ×250",
    cost() { return new ExpantaNum("1e36185") },
    unlocked() { return hasUpgrade("p", 62) && hasMilestone("esc", 9) }
},
64: {
    description: "Life gain ×1250",
    cost() { return new ExpantaNum("1e37500") },
    unlocked() { return hasUpgrade("p", 63) && hasMilestone("esc", 9) }
},
65: {
    description: "Life gain ×6250",
    cost() { return new ExpantaNum("1e38565") },
    unlocked() { return hasUpgrade("p", 64) && hasMilestone("esc", 9) }
},},
   update(diff) {
        if (hasUpgrade("p", 32)) player.p.e0 = player.p.e0.add(upgradeEffect("p", 32).mul(diff))
        for (i = 1; i <= buyableEffect('p', 13).toNumber(); i++) player.p[`e${i}`] = player.p[`e${i}`].add(player.p[`e${i - 1}`].pow(1 / 9).div(100).mul(this.condenseEffect(player.p[`e${i + 1}`])).mul(diff))
        if ((hasMilestone("esc", 7) || hasMilestone("cq", 5)) && player.p.points.root(inChallenge("cq", 23)&&player.cq.challenges[23] >= 2?10000:1).sub(1).gte(n(hasUpgrade("a", 33) ? 1 : 1e10).mul(n(hasUpgrade("a", 41) ? 1 : 1e2).pow(getBuyableAmount("p", 11))).mul(n(2).pow(getBuyableAmount("p", 11).pow(2)).pow(getBuyableAmount("p", 11).gte(130) ? getBuyableAmount("p", 11).sub(30).mul(0.01) : 1)))) setBuyableAmount('p', 11, getBuyableAmount('p', 11).add(hasMilestone("l", 38) ? 5 : 1))
        if ((hasMilestone("esc", 7) || hasMilestone("cq", 6)) && player.p.e0.root(inChallenge("cq", 23)&&player.cq.challenges[23] >= 2?1000:1).sub(1).gte(three.pow(getBuyableAmount("p", 12)).mul(10).pow(getBuyableAmount("p", 12).gte(450) ? getBuyableAmount("p", 12).sub(350).mul(0.01) : 1).pow(hasMilestone("l", 12) ? 10 : 1))) setBuyableAmount('p', 12, getBuyableAmount('p', 12).add(hasMilestone("esc", 9) ? 10 : 1))
        if ((hasMilestone("esc", 7) || hasMilestone("cq", 7)) && (player.p[`e${buyableEffect('p', 13).toNumber()}`].sub(1)).gte(inChallenge("cq", 23)&&player.cq.challenges[23] >= 2?"1e9000":1e9)) setBuyableAmount('p', 13, getBuyableAmount('p', 13).add(1))
        if ((hasMilestone("esc", 7) || hasMilestone("cq", 8)) && player.p.points.root(inChallenge("cq", 23)&&player.cq.challenges[23] >= 2?1000:1).sub(1).gte(n(hasUpgrade("a", 33) ? 1 : 1e308).mul(n(hasUpgrade("a", 41) ? 1 : 1e49).pow(getBuyableAmount("p", 14))).mul(n(1e4).pow(getBuyableAmount("p", 14).pow(2))))) setBuyableAmount('p', 14, getBuyableAmount('p', 14).add(1))
        if ((hasMilestone("esc", 7) || hasMilestone("cq", 9)) && player.p.e0.root(inChallenge("cq", 23)&&player.cq.challenges[23] >= 2?1000:1).sub(1).gte(n(hasUpgrade("a", 33) ? 1 : 1e100).mul(n(hasUpgrade("a", 41) ? 1 : 1e8).pow(getBuyableAmount("p", 21))).mul(n(100).pow(getBuyableAmount("p", 21).pow(2))))) setBuyableAmount('p', 21, getBuyableAmount('p', 21).add(1))
        if ((hasMilestone("esc", 7) || hasMilestone("cq", 10)) && player.p.points.root(inChallenge("cq", 23)&&player.cq.challenges[23] >= 2?1000:1).sub(1).gte(n(hasUpgrade("a", 33) ? 1 : "1e1800").mul(n(hasUpgrade("a", 41) ? 1 : 1e25).pow(getBuyableAmount("p", 22))).mul(n(10000).pow(getBuyableAmount("p", 22).pow(2))))) setBuyableAmount('p', 22, getBuyableAmount('p', 22).add(1))
        if ((hasMilestone("esc", 7) || hasMilestone("cq", 11)) && player.p.points.root(inChallenge("cq", 23)&&player.cq.challenges[23] >= 2?1000:1).sub(1).gte(n(hasUpgrade("a", 33) ? 1 : "1e5000").mul(n(hasUpgrade("a", 41) ? 1 : 1e100).pow(getBuyableAmount("p", 23))).mul(n(1e10).pow(getBuyableAmount("p", 23).pow(2))))) setBuyableAmount('p', 23, getBuyableAmount('p', 23).add(1))
        if ((hasMilestone("esc", 7) || hasMilestone("cq", 12)) && player.p.points.root(inChallenge("cq", 23)&&player.cq.challenges[23] >= 2?1000:1).sub(1).gte(n("1e10000").mul(n(1e200).pow(getBuyableAmount("p", 24))).mul(n(1e20).pow(getBuyableAmount("p", 24).pow(2))))) setBuyableAmount('p', 24, getBuyableAmount('p', 24).add(1))
        if ((hasMilestone("esc", 7) || hasMilestone("cq", 13)) && player.points.gte("1e5")) player.p.challenges[11]++
        if ((hasMilestone("esc", 7) || hasMilestone("cq", 14)) && player.points.gte("1e60")) player.p.challenges[12]++
        if ((hasMilestone("esc", 7) || hasMilestone("cq", 15)) && player.points.gte("1e200")) player.p.challenges[13]++
        if ((hasMilestone("esc", 7) || hasMilestone("cq", 16)) && player.points.gte("1e580")) player.p.challenges[14]++
        if ((hasMilestone("esc", 7) || hasMilestone("cq", 17)) && player.points.gte("1e175")) player.p.challenges[21]++
        if ((hasMilestone("esc", 7) || hasMilestone("cq", 18)) && player.points.gte("1e1335")) player.p.challenges[22]++
        if ((hasMilestone("esc", 7) || hasMilestone("cq", 19)) && player.points.gte("1e10000")) player.p.challenges[23]++

    },
    doReset(l) {
        if (layers[l].row <= this.row) return
        layerDataReset(this.layer)
    },

    challenges: {
    11: {
        name: "C-1",
        challengeDescription: "8. Upgrades with negative effects frustrate players. Upgrade 12 effect is inverted (whether you have it or not).",
        rewardDescription: "9. Mediocre automation makes players hesitate. Automatically gain 12.5% of Reset Points per second. 10. Too much QoL and automation when content is scarce. Discouragement 4 ends.",
        goalDescription: "Reach 1e6 points (1e5 after 4 Discouragement Points)",
        canComplete() { return player.points.gte(player.esc.points.gte(4) ? 1e5 : 1e6) },
        unlocked() { return hasUpgrade("p", 23) },
    },
    12: {
        name: "C-2",
        challengeDescription: "12. Excessive, complex text descriptions overwhelm players. Enhanced upgrade 12 effect is inverted (whether you have it or not). 13. Doesn't warn about resetting Reset Points, creating information asymmetry.",
        rewardDescription: "Upgrade 12 effect gets additional boost based on points.",
        rewardEffect() {
            let eff = player.points.add(1).log10().add(1).log10().add(1).pow(1.125)
            if (hasChallenge("p", 22)) eff = eff.pow(challengeEffect("p", 22))
            return eff
        },
        rewardDisplay() { return `^${format(this.rewardEffect())}` },
        goalDescription: "Reach 1e66 points (1e60 after 4 Discouragement Points)",
        canComplete() { return player.points.gte(player.esc.points.gte(4) ? 1e60 : 1e66) },
        unlocked() { return upgradeEffect('p', 23).gte(2) },
        onEnter() { player.p.points = new ExpantaNum(0) },
    },
    13: {
        name: "C-3",
        challengeDescription: "16. Boring challenge. Further enhanced upgrade 12 effect is inverted (whether you have it or not). 17. Resets even more things this time.",
        rewardDescription: "Upgrade 31 effect boosted based on Reset Points.",
        rewardEffect() {
            let eff = player.p.points.add(1).log10().add(1).log10().div(10).add(1).pow(3)
            if (hasChallenge("p", 22)) eff = eff.pow(challengeEffect("p", 22))
            return eff
        },
        rewardDisplay() { return `×${format(this.rewardEffect())}` },
        goalDescription: "Reach 1e216 points (1e200 after 4 Discouragement Points)",
        canComplete() { return player.points.gte(player.esc.points.gte(4) ? 1e200 : 1e216) },
        unlocked() { return upgradeEffect('p', 23).gte(3) || inChallenge('p', 13) },
        onEnter() {
            player.p.points = new ExpantaNum(0)
            player.p.e0 = new ExpantaNum(0)
            player.p.buyables[11] = new ExpantaNum(0)
        },
    },
    14: {
        name: "C-4",
        challengeDescription: "18. Newbie nightmare - resets even more things, and only allows buying 10 upgrades (can't complete if exceeded). 19. What kind of cursed challenge is this?",
        rewardDescription: "Upgrade 35 effect boosted based on Reset Points.",
        rewardEffect() {
            let eff = player.p.points.add(1).log10().add(1).log10().div(16).add(1).pow(3)
            if (hasChallenge("p", 22)) eff = eff.pow(challengeEffect("p", 22))
            return eff
        },
        rewardDisplay() { return `×${format(this.rewardEffect())}` },
        goalDescription: "Reach 1e616 points (1e580 after 4 Discouragement Points)",
        canComplete() { 
            return player.points.gte(player.esc.points.gte(4) ? '1e580' : '1e616') && 
                   player.p.upgrades.length <= (hasUpgrade("a", 22) ? 999999 : 10) 
        },
        unlocked() { return upgradeEffect('p', 23).gte(4) || inChallenge('p', 14) },
        onEnter() {
            player.p.points = new ExpantaNum(0)
            player.p.e0 = new ExpantaNum(0)
            player.p.buyables[11] = new ExpantaNum(0)
            player.p.upgrades = []
        },
    },
    21: {
        name: "C-5",
        challengeDescription: "Reset Points, Points and upgrade count reduce Reset Points gain. 27. Another cursed challenge???",
        rewardDescription: "Upgrade 24 effect boosted based on Reset Points.",
        goalDescription: "Reach 1e175 points",
        rewardEffect() {
            let eff = player.p.points.add(1).log10().add(1).log10().add(1)
            if (hasChallenge("p", 22)) eff = eff.pow(challengeEffect("p", 22))
            return eff
        },
        rewardDisplay() { return `^${format(this.rewardEffect())}` },
        canComplete() { return player.points.gte(1e175) },
        unlocked() { return upgradeEffect('p', 23).gte(5) },
        onEnter() {
            player.p.points = new ExpantaNum(0)
            player.p.e0 = new ExpantaNum(0)
            player.p.upgrades = [23]
        },
    },
    22: {
        name: "C-6",
        challengeDescription: "35. Meta-discouragement. Discouragement 1 returns stronger, upgrades for discouragements 2/4/6 are halved, discouragement 9 becomes 1e-5, discouragement 26 is inverted.",
        rewardDescription: "37. So obsessed with meta? Challenges C-2/C-3/C-4/C-5 effects boosted based on Reset Points.",
        goalDescription: "36. Unchanging goals are tedious. Reach 1e1335 points",
        rewardEffect() {
            let eff = player.p.points.add(1).log10().add(1).log10().add(1).pow(0.05)
                .pow(hasUpgrade("a", 42) ? 2 : 1)
                .pow(hasUpgrade("a", 43) ? 1.5 : 1)
                .pow(hasUpgrade("a", 44) ? 1.2 : 1)
                .pow(hasUpgrade("a", 45) ? 1.1 : 1)
            return eff
        },
        rewardDisplay() { return `×${format(this.rewardEffect())}` },
        canComplete() { return player.points.gte("1e1335") },
        unlocked() { return upgradeEffect('p', 23).gte(6) },
        onEnter() {
            player.p.points = new ExpantaNum(0)
            player.p.upgrades = [23]
        },
    },
    23: {
        name: "C-7",
        challengeDescription: "61. Why not make this an upgrade? There's no challenge here.",
        rewardDescription: "Meta-property gain increases based on Discouragement Points",
        goalDescription: "Reach 1e10000 points",
        rewardEffect() {
            return player.esc.points.add(1).log10().add(1).pow(0.25)
        },
        rewardDisplay() { return `^${format(this.rewardEffect())}` },
        canComplete() { return player.points.gte("1e10000") },
        unlocked() { return upgradeEffect('p', 23).gte(7) },
        onEnter() {}
    }
},

 buyables: {
    11: {
        cost(x = getBuyableAmount(this.layer, this.id)) {
            var c = n(hasUpgrade("a", 33) ? 1 : 1e10).mul(n(hasUpgrade("a", 41) ? 1 : 1e2).pow(x)).mul(n(2).pow(x.pow(2)).pow(getBuyableAmount(this.layer, this.id).gte(130) ? getBuyableAmount(this.layer, this.id).sub(30).mul(0.01) : 1))
            if(inChallenge("cq", 23) && player.cq.challenges[23] >= 2) c = c.pow(10000)
            return c
        },
        display() { 
            return `11. Multiplies upgrade 31 effect when not purchased. Multiplies first 11 upgrade effects.<br />
            ×${format(buyableEffect(this.layer, this.id), 2)}<br />
            (Next level: ×${format(this.effect(getBuyableAmount(this.layer, this.id).add(1)))})
            <br />Cost: ${format(this.cost())} Reset Points<br>
            Level: ${formatWhole(getBuyableAmount(this.layer, this.id))}`
        },
        canAfford() { return player.p.points.gte(this.cost()) },
        buy() {
            player.p.points = player.p.points.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
        effect(x = getBuyableAmount(this.layer, this.id)) {
            var eff = x.mul(1.6).add(1).root(hasMilestone("l", 33) ? 3 : 3.6)
            eff = eff.mul(buyableEffect('p', 14))
            if (hasAchievement("rw", 24)) eff = eff.mul(1.01)
            if (hasUpgrade("esc", 13)) eff = eff.mul(upgradeEffect("esc", 13))
            if (hasUpgrade("cq", 22)) eff = eff.mul(1.01)
            if (inChallenge("cq", 12)) eff = eff.div(player.cq.challenges[12] * 0.2 + 1.2)
            if (eff.gte(7.8) && !hasMilestone("l", 26)) eff = eff.mul(0.5).add(3.9)
            if (eff.gte(7.9)) eff = eff.mul(0.1).add(7.11)
            return eff.max(1)
        },
        unlocked() { return upgradeEffect("p", 25).gte(1) }
    },
    12: {
        cost(x = getBuyableAmount(this.layer, this.id)) {
            var c = three.pow(x).mul(10).pow(getBuyableAmount(this.layer, this.id).gte(450) ? getBuyableAmount(this.layer, this.id).sub(350).mul(0.01) : 1)
            if (hasMilestone("l", 12)) c = c.pow(10)
            if(inChallenge("cq", 23) && player.cq.challenges[23] >= 2) c = c.pow(1000)
            return c
        },
        display() { 
            return `Multiplies Reset Energy gain.<br />
            ×${format(buyableEffect(this.layer, this.id), 2)}<br />
            (Next level: ×${format(this.effect(getBuyableAmount(this.layer, this.id).add(1)))})
            <br />Cost: ${format(this.cost())} Reset Energy<br>
            Level: ${formatWhole(getBuyableAmount(this.layer, this.id))}`
        },
        canAfford() { return player.p.e0.gte(this.cost()) },
        buy() {
            player.p.e0 = player.p.e0.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
        effect(x = getBuyableAmount(this.layer, this.id)) {
            var eff = n(1.6).pow(x).pow(hasUpgrade(this.layer, 53) ? buyableEffect('p', 22) : 1)
            if (hasAchievement("rw", 24)) eff = eff.pow(1.1)
            if (hasUpgrade("a", 25)) eff = eff.pow(upgradeEffect("a", 15))
            if (hasMilestone("l", 12)) eff = eff.pow(5)
            return eff
        },
        unlocked() { return upgradeEffect("p", 25).gte(2) }
    },
    13: {
        cost(x = getBuyableAmount(this.layer, this.id)) {
            var c = n(1e9)
            if(inChallenge("cq", 23) && player.cq.challenges[23] >= 2) c = c.pow(1000)
            return c
        },
        display() { 
            return `Unlock next tier of Condensed Energy.<br />
            Current tier: ${format(buyableEffect(this.layer, this.id), 2)}<br />
            (Next tier: ${format(this.effect(getBuyableAmount(this.layer, this.id).add(1)))})
            <br />Cost: ${format(this.cost())} highest current Condensed Energy<br>
            Level: ${formatWhole(getBuyableAmount(this.layer, this.id))}/8`
        },
        canAfford() {
            return player.p[`e${buyableEffect('p', 13).toNumber()}`].gte(this.cost())
        },
        buy() {
            player.p[`e${buyableEffect('p', 13).toNumber()}`] = player.p[`e${buyableEffect('p', 13).toNumber()}`].sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
        effect(x = getBuyableAmount(this.layer, this.id)) {
            var eff = x
            return eff
        },
        purchaseLimit: 9,
        unlocked() { return hasUpgrade('p', 33) }
    },
    14: {
        cost(x = getBuyableAmount(this.layer, this.id)) {
            var c = n(hasUpgrade("a", 33) ? 1 : 1e308).mul(n(hasUpgrade("a", 41) ? 1 : 1e49).pow(x)).mul(n(1e4).pow(x.pow(2)))
            if(inChallenge("cq", 23) && player.cq.challenges[23] >= 2) c = c.pow(1000)
            return c
        },
        display() { 
            return `Multiplies first buyable effect.<br />
            ×${format(buyableEffect(this.layer, this.id), 2)}<br />
            (Next level: ×${format(this.effect(getBuyableAmount(this.layer, this.id).add(1)))})
            <br />Cost: ${format(this.cost())} Reset Points<br>
            Level: ${formatWhole(getBuyableAmount(this.layer, this.id))}`
        },
        canAfford() { return player.p.points.gte(this.cost()) },
        buy() {
            player.p.points = player.p.points.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
        effect(x = getBuyableAmount(this.layer, this.id)) {
            var eff = x.add(1).root(9.6)
            return eff
        },
        unlocked() { return upgradeEffect("p", 25).gte(3) }
    },
    21: {
        cost(x = getBuyableAmount(this.layer, this.id)) {
            var c = n(hasUpgrade("a", 33) ? 1 : 1e100).mul(n(hasUpgrade("a", 41) ? 1 : 1e8).pow(x)).mul(n(100).pow(x.pow(2)))
            if(inChallenge("cq", 23) && player.cq.challenges[23] >= 2) c = c.pow(1000)
            return c
        },
        display() { 
            return `Multiplies upgrade 31 effect.<br />
            ×${format(buyableEffect(this.layer, this.id), 2)}<br />
            (Next level: ×${format(this.effect(getBuyableAmount(this.layer, this.id).add(1)))})
            <br />Cost: ${format(this.cost())} Reset Energy<br>
            Level: ${formatWhole(getBuyableAmount(this.layer, this.id))}`
        },
        canAfford() { return player.p.e0.gte(this.cost()) },
        buy() {
            player.p.e0 = player.p.e0.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
        effect(x = getBuyableAmount(this.layer, this.id)) {
            var eff = x.add(1).root(9.6)
            if (hasUpgrade('p', 45)) eff = eff.mul(buyableEffect('p', 22))
            return eff
        },
        unlocked() { return upgradeEffect("p", 25).gte(4) }
    },
    22: {
        cost(x = getBuyableAmount(this.layer, this.id)) {
            var c = n(hasUpgrade("a", 33) ? 1 : "1e1800").mul(n(hasUpgrade("a", 41) ? 1 : 1e25).pow(x)).mul(n(10000).pow(x.pow(2)))
            if(inChallenge("cq", 23) && player.cq.challenges[23] >= 2) c = c.pow(1000)
            return c
        },
        display() { 
            return `26. Meta-nesting. Multiplies upgrades 35-43 effects.<br />
            ×${format(buyableEffect(this.layer, this.id), 2)}<br />
            (Next level: ×${format(this.effect(getBuyableAmount(this.layer, this.id).add(1)))})
            <br />Cost: ${format(this.cost())} Reset Points<br>
            Level: ${formatWhole(getBuyableAmount(this.layer, this.id))}`
        },
        canAfford() { return player.p.points.gte(this.cost()) },
        buy() {
            player.p.points = player.p.points.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
        effect(x = getBuyableAmount(this.layer, this.id)) {
            var eff = x.add(1).root(25).pow(hasUpgrade("a", 51) ? 2 : 1).pow(hasUpgrade("a", 52) ? 1.5 : 1).pow(hasUpgrade("a", 53) ? 1.2 : 1).pow(hasUpgrade("a", 54) ? 1.1 : 1)
            if (hasUpgrade("esc", 14)) eff = eff.mul(upgradeEffect("esc", 14))
            if (inChallenge("p", 22)) eff = eff.max(1).min(1).div(x.add(1).root(25))
            return eff
        },
        unlocked() { return upgradeEffect("p", 25).gte(5) }
    },
    23: {
        cost(x = getBuyableAmount(this.layer, this.id)) {
            var c = n(hasUpgrade("a", 33) ? 1 : "1e5000").mul(n(hasUpgrade("a", 41) ? 1 : 1e100).pow(x)).mul(n(1e10).pow(x.pow(2)))
            if(inChallenge("cq", 23) && player.cq.challenges[23] >= 2) c = c.pow(1000)
            return c
        },
        display() { 
            return `Multiplies upgrade 15 effect.<br />
            ^${format(buyableEffect(this.layer, this.id), 2)}<br />
            (Next level: ^${format(this.effect(getBuyableAmount(this.layer, this.id).add(1)))})
            <br />Cost: ${format(this.cost())} Reset Points<br>
            Level: ${formatWhole(getBuyableAmount(this.layer, this.id))}`
        },
        canAfford() { return player.p.points.gte(this.cost()) },
        buy() {
            player.p.points = player.p.points.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
        effect(x = getBuyableAmount(this.layer, this.id)) {
            var eff = x.add(1).root(7).pow(hasUpgrade("a", 55) ? 2 : 1).pow(hasUpgrade("a", 61) ? 1.5 : 1).pow(hasUpgrade("a", 62) ? 1.2 : 1).pow(hasUpgrade("a", 63) ? 1.1 : 1)
            if (hasUpgrade('p', 54)) eff = eff.mul(buyableEffect('p', 23).pow(0.5))
            return eff
        },
        unlocked() { return upgradeEffect("p", 25).gte(6) }
    },
    24: {
        cost(x = getBuyableAmount(this.layer, this.id)) {
            var c = n("1e10000").mul(n(1e200).pow(x)).mul(n(1e20).pow(x.pow(2)))
            if(inChallenge("cq", 23) && player.cq.challenges[23] >= 2) c = c.pow(1000)
            return c
        },
        display() { 
            return `62. Requires 8 Discouragement Points but appears early. Prestige Points gain.<br />
            ^${format(buyableEffect(this.layer, this.id), 2)}<br />
            (Next level: ^${format(this.effect(getBuyableAmount(this.layer, this.id).add(1)))})
            <br />Cost: ${format(this.cost())} Reset Points<br>
            Level: ${formatWhole(getBuyableAmount(this.layer, this.id))}`
        },
        canAfford() { return player.p.points.gte(this.cost()) },
        buy() {
            player.p.points = player.p.points.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
        effect(x = getBuyableAmount(this.layer, this.id)) {
            var eff = x.add(1).root(16.66)
            return eff
        },
        unlocked() { return upgradeEffect("p", 25).gte(7) }
    }
},
    passiveGeneration() {
if (inChallenge("cq", 23))return 0
        if (hasChallenge("p", 11) || hasUpgrade("cq", 35)) return inChallenge("p", 22) ? 1e-5 : hasMilestone("esc", 4) ? '1' : '0.125'

        return 0
    },

    getResetGain() {
        var gain = layers[this.layer].baseAmount().div(layers[this.layer].requires()).pow(layers[this.layer].exponent).pow(layers[this.layer].gainExp()).mul(layers[this.layer].gainMult())
        //gain = gain.min(1.79e308)
        return gain.floor()
    },

})


