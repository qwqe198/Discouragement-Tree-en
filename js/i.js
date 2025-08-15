addLayer("i", {
    symbol: "I",
    position: 3,
    startData() {
        return {
            unlocked: true,
            points: new ExpantaNum(0)
        }
    },
    requires() { return new ExpantaNum(1e5) },
    color: "#4B4C83",
    resource: "Increments",
    type: "normal",
    passiveGeneration() {
        return 1
    },
    exponent: 0.5,
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
    layerShown() { return inChallenge("t", 11) },
    row: 1,

    buyables: {
        11: {
            title: "Increment Speed",
            cost(x = getBuyableAmount(this.layer, this.id)) {
                let c = new ExpantaNum(10).mul(new ExpantaNum(hasUpgrade("i", 22) ? 0.99 : 1.98).pow(x)).mul(new ExpantaNum(1.01).pow(x.pow(2)))
                return c
            },
            display() { 
                return `Increment gain<br />
                ×${format(buyableEffect(this.layer, this.id), 2)}<br />
                (Next level: ×${format(this.effect(getBuyableAmount(this.layer, this.id).add(1)))})
                <br />Cost: ${format(this.cost())} Increments<br>
                Level: ${formatWhole(getBuyableAmount(this.layer, this.id))}`
            },
            canAfford() { return player.i.points.gte(this.cost()) },
            buy() {
                player.i.points = player.i.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect(x = getBuyableAmount(this.layer, this.id)) {
                let base = hasUpgrade("i", 34) ? new ExpantaNum(1.5).add(getBuyableAmount("i", 11).mul(0.01)) : 1.5
                return new ExpantaNum(base).pow(x)
            },
            unlocked() { return hasUpgrade("i", 12) }
        },
        12: {
            title: "Increment Strength",
            cost(x = getBuyableAmount(this.layer, this.id)) {
                let c = new ExpantaNum("1e4").mul(new ExpantaNum(hasUpgrade("i", 23) ? 1 : 4).pow(x)).mul(new ExpantaNum(1.25).pow(x.pow(2)))
                if (hasUpgrade("a1", 32)) c = c.root(upgradeEffect("a1", 32))
                return c
            },
            display() { 
                return `Increment gain<br />
                ×${format(buyableEffect(this.layer, this.id), 2)}<br />
                (Next level: ×${format(this.effect(getBuyableAmount(this.layer, this.id).add(1)))})
                <br />Cost: ${format(this.cost())} Increments<br>
                Level: ${formatWhole(getBuyableAmount(this.layer, this.id))}`
            },
            canAfford() { return player.i.points.gte(this.cost()) },
            buy() {
                player.i.points = player.i.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect(x = getBuyableAmount(this.layer, this.id)) {
                let base = hasUpgrade("i", 33) ? new ExpantaNum(2).add(getBuyableAmount("i", 12).mul(0.02)) : 2
                return new ExpantaNum(base).pow(x)
            },
            unlocked() { return hasUpgrade("i", 13) }
        },
        13: {
            title: "Increment Resistance",
            cost(x = getBuyableAmount(this.layer, this.id)) {
                let c = new ExpantaNum("1e5").mul(new ExpantaNum(hasUpgrade("i", 24) ? 1 : 2).pow(x)).mul(new ExpantaNum(1.25).pow(x.pow(2))).mul(new ExpantaNum(hasUpgrade("i", 31) ? 1 : 1.5).pow(new ExpantaNum(1.45).pow(x)))
                return c
            },
            display() { 
                return `Base increment gain<br />
                ^${format(buyableEffect(this.layer, this.id), 2)}<br />
                (Next level: ^${format(this.effect(getBuyableAmount(this.layer, this.id).add(1)))})
                <br />Cost: ${format(this.cost())} Increments<br>
                Level: ${formatWhole(getBuyableAmount(this.layer, this.id))}`
            },
            canAfford() { return player.i.points.gte(this.cost()) },
            buy() {
                player.i.points = player.i.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect(x = getBuyableAmount(this.layer, this.id)) {
                let eff = new ExpantaNum(1.05).pow(x)
                if (eff.gte(10)) eff = eff.pow(0.5).mul(new ExpantaNum(10).root(2))
                return eff
            },
            unlocked() { return hasUpgrade("i", 14) }
        }
    },

    upgrades: {
        11: {
            description: "Points gain multiplied by increment amount",
            cost() {
                if (hasAchievement("rw", 105)) return new ExpantaNum(0)
                return new ExpantaNum(2)
            },
            effect() {
                let eff = player.i.points.add(1)
                if (hasUpgrade("i", 21)) eff = eff.pow(2)
                if (hasUpgrade("i", 24)) eff = eff.pow(buyableEffect('i', 13))
                eff = eff.pow(buyableEffect('csm', 11))
                eff = eff.pow(layers.bg.effect())
                eff = eff.pow(layers.bg.gpeff())
                return eff
            },
            unlocked() { return true },
            effectDisplay() { return `×${format(this.effect())}` }
        },
        12: {
            description: "Unlock first buyable. Each upgrade in this row makes increment gain ×1.1",
            cost: new ExpantaNum(30),
            unlocked() { return hasUpgrade("i", 11) }
        },
        13: {
            description: "Unlock second buyable",
            cost: new ExpantaNum(10000),
            unlocked() { return getBuyableAmount("i", 11).gte(10) }
        },
        14: {
            description: "Unlock third buyable",
            cost: new ExpantaNum(200000),
            unlocked() { return getBuyableAmount("i", 12).gte(3) }
        },
        21: {
            description: "First upgrade's effect becomes squared",
            cost: new ExpantaNum(200000),
            unlocked() { return getBuyableAmount("i", 11).gte(15) }
        },
        22: {
            description: "Can't reach next original upgrade? Check tasks. Remove linear growth from 'Increment Speed' price",
            cost: new ExpantaNum(1.5e8),
            unlocked() { return getBuyableAmount("i", 11).gte(19) }
        },
        23: {
            description: "Remove linear growth from 'Increment Strength' price",
            cost: new ExpantaNum(1e19),
            unlocked() { return getBuyableAmount("i", 11).gte(65) }
        },
        24: {
            description: "Remove linear growth from 'Increment Resistance' price and make it affect upgrade 11",
            cost: new ExpantaNum(1e20),
            unlocked() { return getBuyableAmount("i", 11).gte(67) }
        },
        31: {
            description: "Remove super-exponential growth from 'Increment Resistance' price",
            cost: new ExpantaNum(1e21),
            unlocked() { return getBuyableAmount("i", 12).gte(14) }
        },
        32: {
            description: "Task 46 reward applies before Increment Resistance",
            cost: new ExpantaNum(1e24),
            unlocked() { return getBuyableAmount("i", 12).gte(15) }
        },
        33: {
            description: "Each 'Increment Strength' adds 0.02 to its effect base",
            cost: new ExpantaNum(1e27),
            unlocked() { return getBuyableAmount("i", 11).gte(78) }
        },
        34: {
            description: "Each 'Increment Speed' adds 0.01 to its effect base",
            cost: new ExpantaNum(1e29),
            unlocked() { return getBuyableAmount("i", 11).gte(81) }
        },
        41: {
            description: "Increment amount boosts increment gain",
            cost: new ExpantaNum(1e123),
            effect() {
                return player.i.points.add(10).log10()
            },
            unlocked() { return getBuyableAmount("i", 11).gte(169) },
            effectDisplay() { return `×${format(this.effect())}` }
        },
        42: {
            description: "Triple increment gain",
            cost: new ExpantaNum(1e130),
            unlocked() { return getBuyableAmount("i", 11).gte(174) }
        },
        43: {
            description: "Unlock new increment upgrades",
            cost: new ExpantaNum(1e134),
            unlocked() { return getBuyableAmount("i", 11).gte(177) }
        },
        15: {
            description: "Base increment gain multiplied by 'Increment Strength' level",
            cost: new ExpantaNum(1e135),
            unlocked() { return hasUpgrade("i", 43) }
        },
        25: {
            description: "Base increment gain multiplied by 'Increment Resistance' level",
            cost: new ExpantaNum(1e177),
            unlocked() { return getBuyableAmount("i", 12).gte(43) }
        },
        35: {
            description: "Base increment gain multiplied by 'Increment Speed' level",
            cost: new ExpantaNum(1e248),
            unlocked() { return getBuyableAmount("i", 11).gte(241) }
        },
        44: {
            description: "I-layer upgrade 12 affects base increment gain",
            cost: new ExpantaNum("1e355"),
            unlocked() { return getBuyableAmount("i", 13).gte(61) }
        },
        45: {
            description: "Portal upgrade 11 affects base increment gain",
            cost: new ExpantaNum("1e751"),
            unlocked() { return getBuyableAmount("i", 11).gte(418) }
        }
    },

    tabFormat: {
        "Main": {
            content: [
                "main-display",
                ["display-text", () => 
                    `You gain ${format(layers.i.getResetGain())} increments per second. Buyables unlock upgrades at certain levels`,
                    { "font-size": "20px" }
                ],
                "blank",
                "buyables",
                "blank",
                "upgrades"
            ],
            unlocked() { return true }
        },
        "Details": {
            content: [
                "main-display",
                ["display-text", () => 
                    `Base increment gain formula is log10(points)-3, zero below ${format(hasAchievement("rw",105)?1e3:1e4)} points`
                ],
                ["display-text", () => 
                    "This number is affected by upgrades that boost base increment gain (multiplicative)"
                ],
                ["display-text", () => 
                    "Then this amount is raised to the power of 'Increment Resistance'"
                ],
                ["display-text", () => 
                    "Finally affected by upgrades that boost increment gain (multiplicative)"
                ]
            ],
            unlocked() { return true }
        }
    },

    getResetGain() {
        let gain = player.points.add(1).log10().sub(3).max(0)

        // Base
        if (hasAchievement("rw", 46) && hasUpgrade("i", 32)) gain = gain.mul(player.i.points.add(10).log10())
        if (hasUpgrade("i", 15)) gain = gain.mul(getBuyableAmount("i", 12).add(1))
        if (hasUpgrade("i", 25)) gain = gain.mul(getBuyableAmount("i", 13).add(1))
        if (hasUpgrade("i", 35)) gain = gain.mul(getBuyableAmount("i", 11).add(1))
        if (hasUpgrade("grz", 15)) gain = gain.mul(upgradeEffect("grz", 15))
        if (hasUpgrade("grz", 33)) gain = gain.mul(upgradeEffect("grz", 33))
        if (hasUpgrade("i", 45)) gain = gain.mul(upgradeEffect("csm", 11))
        if (hasUpgrade("i", 12) && hasUpgrade("i", 44)) gain = gain.mul(new ExpantaNum(1.1).pow(player.i.upgrades.length))

        gain = gain.max(1)
        gain = gain.pow(buyableEffect('i', 13))
        
        // Multipliers
        if (hasUpgrade("i", 12)) gain = gain.mul(new ExpantaNum(1.1).pow(player.i.upgrades.length))
        if (hasAchievement("rw", 46) && !hasUpgrade("i", 32)) gain = gain.mul(player.i.points.add(10).log10())
        if (hasAchievement("rw", 53)) gain = gain.mul(buyableEffect('a1', 11))
        gain = gain.mul(buyableEffect('i', 11))
        gain = gain.mul(buyableEffect('i', 12))
        if (hasUpgrade("csm", 12)) gain = gain.mul(upgradeEffect("csm", 12))
        if (hasUpgrade("i", 41)) gain = gain.mul(upgradeEffect("i", 41))
        if (hasUpgrade("i", 42)) gain = gain.mul(3)
        if (hasChallenge("cq", 22)) gain = gain.mul(3 ** player.cq.challenges[22])
        if (hasMilestone("t", 12)) gain = gain.mul(new ExpantaNum(1.1).pow(buyableEffect("t", 11)))
        if (hasAchievement("rw", 65)) gain = gain.pow(1.05)
        if (hasAchievement("rw", 101)) gain = gain.pow(1.1)
        gain = gain.mul(layers.csm.effect())
        
        // Portal effects
        if (player.csm.points.gte(1)) gain = expPow(gain.mul(10), new ExpantaNum(0.9).pow(player.csm.points))
        if (player.csm.points.gte(2)) gain = gain.pow(new ExpantaNum(0.5).pow(player.csm.points))
        if(gain.gte("1e700")) gain = gain.pow(0.5).mul("1e350")
        
        if (player.points.lt(hasAchievement("rw",105)?1e3:1e4) || !inChallenge("t", 11)) gain = new ExpantaNum(0)
        gain = gain.min(layers.csm.getNextAt().mul(hasAchievement("rw",102)?1000:1))

        return gain.floor()
    },

    update(diff) {
        if (hasUpgrade("cq", 65) && player.i.points.sub(1).gte(new ExpantaNum(1e5).mul(new ExpantaNum(1.25).pow(getBuyableAmount("i", 13).pow(2))))) {
            setBuyableAmount('i', 13, getBuyableAmount('i', 13).add(1))
        }
        if (hasAchievement("rw", 67) && player.i.points.sub(1).gte(new ExpantaNum(1e4).mul(new ExpantaNum(1.25).pow(getBuyableAmount("i", 12).pow(2))).root(upgradeEffect("a1", 32)))) {
            setBuyableAmount('i', 12, getBuyableAmount('i', 12).add(1))
        }
        if (hasAchievement("rw", 74) && player.i.points.sub(1).gte(new ExpantaNum(10).mul(new ExpantaNum(0.99).pow(getBuyableAmount("i", 11))).mul(new ExpantaNum(1.01).pow(getBuyableAmount("i", 11).pow(2))))) {
            setBuyableAmount('i', 11, getBuyableAmount('i', 11).add(1))
        }
    },

    autoUpgrade() { return hasAchievement("rw", 62) }
})