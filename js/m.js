addLayer("m", {
    symbol: "M",
    position: 2,
    startData() {
        return {
            unlocked: true,
            points: new ExpantaNum(0)
        }
    },
    requires() { return new ExpantaNum(1e20) },
    color: "#31aeb0",
    resource: "Meta-properties",
    type: "normal",
    passiveGeneration() {
        if (hasMilestone("esc", 8) || hasUpgrade("cq", 55)) return 10
        return 0
    },
    exponent: 0.5,
    baseAmount() { return player.points },
    baseResource: "Points",
    gainMult() {
        return new ExpantaNum(1)
    },
    gainExp() {
        return new ExpantaNum(1)
    },
    layerShown() { return hasMilestone("esc", 7) || hasMilestone("cq", 1) },
    row: 1,

    effectDescription() { 
        return `51. Is this the Grudge Tree? Based on points, makes Reset Points gain ×${format(this.effect())} 56. Abuse double exponent softcaps.`
    },
    effect() {
        let eff = player.points.add(1).pow(buyableEffect('m', 11)).log(10).sub(20).max(1)
        if (hasAchievement("rw", 14)) eff = eff.pow(1.025)
        eff = expPow(eff, buyableEffect('m', 23))

        if (eff.gte("1e10000")) eff = expPow(expPow(eff, 0.5), 0.5).mul("1e10000")
        if (eff.gte("1e15000")) eff = expPow(expPow(eff, 0.5), 0.5).mul("1e15000")
        if (eff.gte("1e250000")) eff = expPow(expPow(eff, 0.5), 0.5).mul("1e250000")

        return eff
    },

    getResetGain() {
        let gain = player.points.div(1e20).pow(0.5)
        gain = gain.mul(buyableEffect('m', 13))
        
        if (hasMilestone("l", 13)) {
            gain = gain.mul(
                player.l.points.add(1).pow(5)
                    .pow(hasMilestone("l", 18) ? layers.a.effect() : 1)
                    .pow(buyableEffect("a1", 13))
            )
        }
        
        if (hasMilestone("l", 39)) {
            gain = gain.pow(
                new ExpantaNum(hasMilestone("l", 40) ? 1.1 : 1.06)
                    .pow(player.l.challenges[11])
            )
        }
        
        if (hasMilestone("l", 11)) gain = gain.pow(1.05)
        if (hasMilestone("l", 21)) gain = gain.pow(1.05)
        gain = gain.pow(buyableEffect('m', 14))
        
        if (hasChallenge("p", 23)) gain = gain.pow(challengeEffect("p", 23))
        gain = gain.pow((hasMilestone("cq", 20) ? 1 : challengeEffect("m", 11) + 1) ** 0.01)
        
        if (hasMilestone("cq", 20)) gain = gain.pow(1.15)
        if (gain.gte(1e10)) gain = expPow(gain.mul(10), 0.8).add(9.99e9)
        
        if (gain.gte("1e7500") && !hasMilestone("l", 36)) {
            gain = expPow(gain.mul(10), 0.8).add("1e7500")
        }
        if (gain.gte("1e7500") && hasMilestone("l", 36)) {
            gain = expPow(gain.mul(10), 0.8).mul("1e7500")
        }
        
        if (inChallenge("l", 11)) {
            gain = expPow(gain.mul(10), tmp.l.challenges[11].challengeEffect).div(10)
        }
        
        if (!player.esc.points.gte(7)) gain = gain.min(0)
        return gain.floor()
    },

    update(diff) {
        if (hasMilestone("l", 2) && player.m.points.sub(1).gte(
            new ExpantaNum(1).mul(new ExpantaNum(2).pow(getBuyableAmount("m", 11)))
                .mul(new ExpantaNum(1.01).pow(getBuyableAmount("m", 11).pow(2)))
                .pow(hasMilestone("l", 14) ? 25 : 1)
        )) {
            setBuyableAmount('m', 11, getBuyableAmount('m', 11).add(hasMilestone("esc", 9) ? 10 : 1))
        }
        
        if (hasMilestone("l", 3) && player.m.points.sub(1).gte(
            new ExpantaNum(20).mul(new ExpantaNum(3).pow(getBuyableAmount("m", 12)))
                .mul(new ExpantaNum(1.02).pow(getBuyableAmount("m", 12).pow(2)))
        )) {
            setBuyableAmount('m', 12, getBuyableAmount('m', 12).add(hasMilestone("esc", 9) ? 10 : 1))
        }
        
        if (hasMilestone("l", 4) && player.m.points.sub(1).gte(
            new ExpantaNum(hasMilestone("l", 25) ? 1 : 1e200)
                .mul(new ExpantaNum(10).pow(getBuyableAmount("m", 13)))
                .mul(new ExpantaNum(1.1).pow(getBuyableAmount("m", 13).pow(2)))
                .pow(hasMilestone("l", 23) ? 20 : 1)
        )) {
            setBuyableAmount('m', 13, getBuyableAmount('m', 13).add(1))
        }
        
        if (hasMilestone("l", 5) && player.m.points.sub(1).gte(
            new ExpantaNum("1e229").mul(new ExpantaNum(1e10).pow(getBuyableAmount("m", 14)))
                .mul(new ExpantaNum(10).pow(getBuyableAmount("m", 14).pow(2)))
        )) {
            setBuyableAmount('m', 14, getBuyableAmount('m', 14).add(1))
        }
        
        if (hasMilestone("l", 6) && player.m.points.sub(1).gte(
            new ExpantaNum("1e845").mul(new ExpantaNum(1e15).pow(getBuyableAmount("m", 21)))
                .mul(new ExpantaNum(50).pow(getBuyableAmount("m", 21).pow(2)))
        )) {
            setBuyableAmount('m', 21, getBuyableAmount('m', 21).add(1))
        }
        
        if (hasMilestone("l", 7) && player.m.points.sub(1).gte(
            new ExpantaNum("1e925").mul(new ExpantaNum(1e20).pow(getBuyableAmount("m", 22)))
                .mul(new ExpantaNum(100).pow(getBuyableAmount("m", 22).pow(2)))
        )) {
            setBuyableAmount('m', 22, getBuyableAmount('m', 22).add(1))
        }
        
        if (hasMilestone("l", 8) && player.m.points.sub(1).gte(
            new ExpantaNum("1e1100").mul(new ExpantaNum(10000).pow(getBuyableAmount("m", 23)))
                .mul(new ExpantaNum(10).pow(getBuyableAmount("m", 23).pow(2)))
        )) {
            setBuyableAmount('m', 23, getBuyableAmount('m', 23).add(1))
        }
        
        if (hasMilestone("l", 9) && player.m.points.sub(1).gte(
            new ExpantaNum("1e1130").mul(new ExpantaNum(1e7).pow(getBuyableAmount("m", 24)))
                .mul(new ExpantaNum(100000).pow(getBuyableAmount("m", 24).pow(2)))
        )) {
            setBuyableAmount('m', 24, getBuyableAmount('m', 24).add(1))
        }
    },

    buyables: {
        11: {
            title: "Meta-space Upgrade",
            cost(x = getBuyableAmount(this.layer, this.id)) {
                let c = new ExpantaNum(1).mul(new ExpantaNum(2).pow(x)).mul(new ExpantaNum(1.01).pow(x.pow(2)))
                if (hasMilestone("l", 14)) c = c.pow(25)
                return c
            },
            display() { 
                return `52. Only useful at start and very end. Exponent boost points in formula.<br />
                ^${format(buyableEffect(this.layer, this.id), 2)}<br />
                (Next level: ^${format(this.effect(getBuyableAmount(this.layer, this.id).add(1)))})
                <br />Cost: ${format(this.cost())} Meta-properties<br>
                Level: ${formatWhole(getBuyableAmount(this.layer, this.id))}`
            },
            canAfford() { return player.m.points.gte(this.cost()) },
            buy() {
                player.m.points = player.m.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect(x = getBuyableAmount(this.layer, this.id)) {
                let eff = x.mul(1.6).add(1).root(3.6)
                if (hasMilestone("l", 14)) eff = eff.pow(100)
                return eff
            },
            unlocked() { return true }
        },
        12: {
            title: "Points Condensation",
            cost(x = getBuyableAmount(this.layer, this.id)) {
                return new ExpantaNum(20).mul(new ExpantaNum(3).pow(x)).mul(new ExpantaNum(1.02).pow(x.pow(2)))
            },
            display() { 
                return `Points boost points.<br />
                ×${format(buyableEffect(this.layer, this.id), 2)}<br />
                (Next level: ×${format(this.effect(getBuyableAmount(this.layer, this.id).add(1)))})
                <br />Cost: ${format(this.cost())} Meta-properties<br>
                Level: ${formatWhole(getBuyableAmount(this.layer, this.id))}`
            },
            canAfford() { return player.m.points.gte(this.cost()) },
            buy() {
                player.m.points = player.m.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect(x = getBuyableAmount(this.layer, this.id)) {
                let eff = player.points.add(10).log10().pow(x.mul(buyableEffect('m', 22)).mul(2))
                if (hasMilestone("l", 15)) eff = eff.pow(1.5)
                return eff
            },
            unlocked() { return true }
        },
        13: {
            title: "Meta-property Condensation",
            cost(x = getBuyableAmount(this.layer, this.id)) {
                let c = new ExpantaNum(hasMilestone("l", 25) ? 1 : 1e200)
                    .mul(new ExpantaNum(10).pow(x))
                    .mul(new ExpantaNum(1.1).pow(x.pow(2)))
                if (hasMilestone("l", 23)) c = c.pow(20)
                return c
            },
            display() { 
                return `Meta-properties boost meta-properties.<br />
                ×${format(buyableEffect(this.layer, this.id), 2)}<br />
                (Next level: ×${format(this.effect(getBuyableAmount(this.layer, this.id).add(1)))})
                <br />Cost: ${format(this.cost())} Meta-properties<br>
                Level: ${formatWhole(getBuyableAmount(this.layer, this.id))}`
            },
            canAfford() { return player.m.points.gte(this.cost()) },
            buy() {
                player.m.points = player.m.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect(x = getBuyableAmount(this.layer, this.id)) {
                let eff = player.m.points.add(10).log10().pow(x.mul(buyableEffect('m', 21)).mul(2))
                if (hasMilestone("l", 24)) eff = eff.pow(15)
                return eff
            },
            unlocked() { return true }
        },
        14: {
            title: "Meta-property Amplifier",
            cost(x = getBuyableAmount(this.layer, this.id)) {
                return new ExpantaNum(1e229).mul(new ExpantaNum(1e10).pow(x)).mul(new ExpantaNum(10).pow(x.pow(2)))
            },
            display() { 
                return `Boost meta-property gain.<br />
                ^${format(buyableEffect(this.layer, this.id), 2)}<br />
                (Next level: ^${format(this.effect(getBuyableAmount(this.layer, this.id).add(1)))})
                <br />Cost: ${format(this.cost())} Meta-properties<br>
                Level: ${formatWhole(getBuyableAmount(this.layer, this.id))}`
            },
            canAfford() { return player.m.points.gte(this.cost()) },
            buy() {
                player.m.points = player.m.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect(x = getBuyableAmount(this.layer, this.id)) {
                return x.add(1).root(4)
            },
            unlocked() { return true }
        },
        21: {
            title: "Condensed Meta-property Condensation",
            cost(x = getBuyableAmount(this.layer, this.id)) {
                return new ExpantaNum("1e845").mul(new ExpantaNum(1e15).pow(x)).mul(new ExpantaNum(50).pow(x.pow(2)))
            },
            display() { 
                return `53. Wrong word order. Condensed meta-properties boost condensed meta-properties.<br />
                ×${format(buyableEffect(this.layer, this.id), 2)} condensed meta-property levels<br />
                (Next level: ×${format(this.effect(getBuyableAmount(this.layer, this.id).add(1)))})
                <br />Cost: ${format(this.cost())} Meta-properties<br>
                Level: ${formatWhole(getBuyableAmount(this.layer, this.id))}`
            },
            canAfford() { return player.m.points.gte(this.cost()) },
            buy() {
                player.m.points = player.m.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect(x = getBuyableAmount(this.layer, this.id)) {
                return getBuyableAmount("m", 12).add(1).log10().mul(0.05).add(1).pow(x.root(6))
            },
            unlocked() { return true }
        },
        22: {
            title: "Acceleron",
            cost(x = getBuyableAmount(this.layer, this.id)) {
                return new ExpantaNum("1e925").mul(new ExpantaNum(1e20).pow(x)).mul(new ExpantaNum(100).pow(x.pow(2)))
            },
            display() { 
                return `54. Didn't consider inflation. Based on reset points, multiply points condensation.<br />
                ×${format(buyableEffect(this.layer, this.id), 2)} points condensation levels<br />
                (Next level: ×${format(this.effect(getBuyableAmount(this.layer, this.id).add(1)))})
                <br />Cost: ${format(this.cost())} Meta-properties<br>
                Level: ${formatWhole(getBuyableAmount(this.layer, this.id))}`
            },
            canAfford() { return player.m.points.gte(this.cost()) },
            buy() {
                player.m.points = player.m.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect(x = getBuyableAmount(this.layer, this.id)) {
                return player.p.points.add(1).log10().add(1).log10().mul(0.05).add(1).pow(x.root(11))
            },
            unlocked() { return true }
        },
        23: {
            title: "Meta-meta",
            cost(x = getBuyableAmount(this.layer, this.id)) {
                return new ExpantaNum("1e1100").mul(new ExpantaNum(10000).pow(x)).mul(new ExpantaNum(10).pow(x.pow(2)))
            },
            display() { 
                return `55. OP effect with OP softcap. Meta-property effect exponent.<br />
                ^${format(buyableEffect(this.layer, this.id), 2)}<br />
                (Next level: ^${format(this.effect(getBuyableAmount(this.layer, this.id).add(1)))})
                <br />Cost: ${format(this.cost())} Meta-properties<br>
                Level: ${formatWhole(getBuyableAmount(this.layer, this.id))}`
            },
            canAfford() { return player.m.points.gte(this.cost()) },
            buy() {
                player.m.points = player.m.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect(x = getBuyableAmount(this.layer, this.id)) {
                return x.root(2).add(1).mul(buyableEffect('m', 24))
            },
            unlocked() { return true }
        },
        24: {
            title: "57. Copied without checking name compatibility. Points Distortion",
            cost(x = getBuyableAmount(this.layer, this.id)) {
                return new ExpantaNum("1e1130").mul(new ExpantaNum(1e7).pow(x)).mul(new ExpantaNum(100000).pow(x.pow(2)))
            },
            display() { 
                return `Based on points and acceleron strength, boost meta-meta.<br />
                ×${format(buyableEffect(this.layer, this.id), 2)}<br />
                (Next level: ×${format(this.effect(getBuyableAmount(this.layer, this.id).add(1)))})
                <br />Cost: ${format(this.cost())} Meta-properties<br>
                Level: ${formatWhole(getBuyableAmount(this.layer, this.id))}`
            },
            canAfford() { return player.m.points.gte(this.cost()) },
            buy() {
                player.m.points = player.m.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect(x = getBuyableAmount(this.layer, this.id)) {
                return player.points.add(1).log10().add(1).log10().mul(0.05)
                    .mul(buyableEffect('m', 22)).add(1).pow(x.root(2))
            },
            unlocked() { return true }
        }
    },

    challenges: {
        11: {
            name: 'Points Singularity',
            challengeDescription: 'Points gain exponent becomes its 8th root. You gain boosts based on highest points reached in challenge.',
            rewardDescription() { 
                return `Current highest ${format(this.rewardEffect())}, Meta-property gain ^${format((this.rewardEffect() + 1) ** 0.01)}`
            },
            rewardEffect() {
                return new ExpantaNum(player.m.challenges[11])
            },
            goal: 0,
            onExit() {
                player.m.challenges[11] = player.points.max(challengeEffect("m", 11)).max(1)
            },
            completionLimit: "1eeeee10",
            canComplete() { return true },
            resource() { return player.points },
            unlocked() { return upgradeEffect("p", 25).gte(8) && !hasMilestone("cq", 20) }
        }
    },

    doReset(resettingLayer) {
        if (layers[resettingLayer].row > layers[this.layer].row) {
            let kept = ["unlocked", "auto"]
            if (resettingLayer == "l" && hasMilestone("l", 28)) {
                kept.push("challenges")
            }
            if (resettingLayer == "cq" && hasUpgrade("cq", 31)) {
                kept.push("challenges")
            }
            layerDataReset(this.layer, kept)
        }
    }
})