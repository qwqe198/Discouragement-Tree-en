addLayer("grz", {
    symbol: "IN",
    position: 0,
    startData() {
        return {
            unlocked: true,
            points: new ExpantaNum(0),
            ll: new ExpantaNum(0),
            crgr: new ExpantaNum(0),
            jb: new ExpantaNum(0),
        }
    },
    requires() { return new ExpantaNum(500) },
    color: "green",
    resource: "Infected",
    type: "static",
    passiveGeneration() {
        return 0
    },

    milestones: {
        1: {
            requirementDescription: "6 Infected",
            done() { return player.grz.points.gte(6) },
            effectDescription() {
                return "Unlock buyables"
            }
        },
        2: {
            requirementDescription: "13 Infected",
            done() { return player.grz.points.gte(13) },
            effectDescription() {
                return "Unlock Contagious Infection"
            }
        },
        3: {
            requirementDescription: "18 Infected",
            done() { return player.grz.points.gte(18) },
            effectDescription() {
                return "Unlock Infectious Disease and auto-buy first row buyables"
            }
        }
    },

    onPrestige(resettingLayer) {
        player.a1.points = new ExpantaNum(0)
        player.a1.upgrades = []
        player.a1.buyables[11] = new ExpantaNum(0)
        player.a1.buyables[12] = new ExpantaNum(0)
        player.a1.buyables[13] = new ExpantaNum(0)
    },

    effectDescription() { 
        return `Instance 2. You have ${format(player.grz.ll)} Infection Power (+${format(layers.grz.llgain())}/s), Points cap ^${format(this.lleff().mul(10000).floor().div(10000))}`
    },

    lleff() {
        let eff = player.grz.ll.add(1).log10().mul(0.001).add(1)
        eff = eff.pow(buyableEffect("grz", 13))
        if(eff.gte(1.01)) eff = eff.mul(0.1).add(new ExpantaNum(1.01).mul(0.9))
        if(eff.gte(1.035)) eff = eff.mul(0.01).add(new ExpantaNum(1.035).mul(0.99))
        return eff
    },

    llpow() {
        let pow = new ExpantaNum(2)
        if (hasUpgrade("grz", 22)) pow = pow.mul(upgradeEffect("grz", 22))
        if (hasUpgrade("grz", 25)) pow = pow.mul(upgradeEffect("grz", 25))
        pow = pow.mul(buyableEffect("grz", 12))
        if(pow.gte(300)) pow = pow.add(700).log10().mul(100)
        return pow
    },

    llgain() {
        let gain = player.grz.points.pow(layers.grz.llpow())
        if (hasUpgrade("grz", 14)) gain = gain.mul(player.points.add(1e10).log10().log10())
        if (hasUpgrade("grz", 21)) gain = gain.mul(upgradeEffect("grz", 21))
        if (hasUpgrade("grz", 23)) gain = gain.mul(upgradeEffect("grz", 23))
        if (hasUpgrade("grz", 34)) gain = gain.mul(upgradeEffect("grz", 34))
        if (hasAchievement("rw", 86)) gain = gain.mul(10)
        gain = gain.mul(buyableEffect("grz", 11))
        if (hasMilestone("t", 15)) gain = gain.mul(new ExpantaNum(1.1).pow(buyableEffect("t", 11)))
        if (hasMilestone("lcb", 6)) gain = gain.mul(new ExpantaNum(1.1).pow(player.grz.ll.add(10).log(10).floor().min(100)))
        if (hasUpgrade("grz", 15) && hasAchievement("rw", 84)) gain = gain.mul(upgradeEffect("grz", 15))
        gain = gain.pow(buyableEffect("l", 12))
        if(gain.gte(1e300)) gain = gain.log10().add(700).pow(100) // Softcap
        if (hasAchievement("rw", 113)) gain = gain.mul(1e10)
        return gain
    },

    jbgain() {
        let gain = player.grz.ll.add(10).log10().div(327).max(0)
        if(gain.lt(1)) gain = new ExpantaNum(0)
        if(hasAchievement("rw",116)) gain = gain.mul(1.5)
        if(hasAchievement("rw",122)) gain = gain.mul(2.2222)
        if (hasMilestone("t", 16)) gain = gain.mul(new ExpantaNum(1.005).pow(buyableEffect("t", 11)))
        if (hasUpgrade("grz", 83)) gain = gain.mul(upgradeEffect("grz", 83))
        if (hasUpgrade("grz", 86)) gain = gain.mul(upgradeEffect("grz", 86))
        gain = gain.mul(buyableEffect("grz", 41))
        gain = gain.pow(buyableEffect("grz", 41))
        return gain
    },

    pthc() {
        let gain = new ExpantaNum("1e50000").pow(this.lleff())
        if (hasUpgrade("grz", 13)) gain = gain.mul(upgradeEffect("grz", 13))
        if (hasUpgrade("grz", 14)) gain = gain.mul(player.points.add(10).log(10).pow(7))
        if(hasAchievement("rw",93)) gain = gain.mul(1e50)
        return gain
    },

    crgr() {
        let gain = new ExpantaNum(0)
            .add(getBuyableAmount(this.layer, 11))
            .add(getBuyableAmount(this.layer, 12).mul(2))
            .add(getBuyableAmount(this.layer, 13).mul(3))
            .add(getBuyableAmount(this.layer, 21).mul(10))
        if(hasMilestone("cq",27)) gain = gain.add(1)
        return gain
    },
upgrades: {
    11: {
        description: "Boost points after first softcap based on Infection Power",
        cost() { return new OmegaNum(200) },
        unlocked() { return true },
        effect() {
            let eff = player.grz.ll.add(1).log10().mul(0.004).add(1)
            if (hasUpgrade("grz", 16)) eff = eff.pow(upgradeEffect("grz", 16))
            if(eff.gte(1.1)) eff = eff.pow(0.5).mul(n(1.1).pow(0.5))
            if(eff.gte(1.3)) eff = eff.pow(0.5).mul(n(1.3).pow(0.5))
            if(eff.gte(1.5)) eff = eff.pow(0.2).mul(n(1.5).pow(0.8))
            if (hasUpgrade("grz", 81)) eff = eff.pow(upgradeEffect("grz", 81))
            return eff
        },
        effectDisplay() { return `^${format(this.effect())}` },
        currencyDisplayName: "Infection Power",
        currencyInternalName: "ll",
        currencyLayer: "grz"
    },
    12: {
        description: "Infection Power boosts Reset Points gain and doubles 'Digital Life' buyable amounts",
        cost() { return new OmegaNum(250) },
        unlocked() { return true },
        effect() {
            let eff = player.grz.ll.add(1).pow(10)
            if (eff.gte("1e1000")) eff = expPow(eff.mul(10), n(1).div(3)).mul("1e990")
            return eff
        },
        effectDisplay() { return `×${format(this.effect())}` },
        currencyDisplayName: "Infection Power",
        currencyInternalName: "ll",
        currencyLayer: "grz"
    },
    13: {
        description: "Increase points cap based on Infection Power",
        cost() { return new OmegaNum(2000) },
        unlocked() { return true },
        effect() {
            let eff = player.grz.ll.add(1).pow(5)
            if (eff.gte(1e100)) eff = expPow(eff.mul(10), 0.5).mul("1e90")
            return eff
        },
        effectDisplay() { return `×${format(this.effect())}` },
        currencyDisplayName: "Infection Power",
        currencyInternalName: "ll",
        currencyLayer: "grz"
    },
    14: {
        description: "Boost Infection Power gain based on points and increase points cap",
        cost() { return new OmegaNum(3000) },
        unlocked() { return true },
        effect1() {
            let eff = player.points.add(1e10).log10().log10()
            if(hasAchievement("rw",111)) eff = eff.pow(player.grz.points.add(1))
            return eff
        },
        effect2() {
            return player.points.add(10).log10().pow(7)
        },
        effectDisplay() { return `×${format(this.effect1())} and ×${format(this.effect2())}` },
        currencyDisplayName: "Infection Power",
        currencyInternalName: "ll",
        currencyLayer: "grz"
    },
    15: {
        description: "Boost Life, HP, Increments, Flawless Points, Amoebas, and Combat Power based on Infected",
        cost() { return new OmegaNum(15000) },
        unlocked() { return true },
        effect() {
            return player.grz.points
        },
        effectDisplay() { return `×${format(this.effect())}` },
        currencyDisplayName: "Infection Power",
        currencyInternalName: "ll",
        currencyLayer: "grz"
    },
    16: {
        description: "Boost upgrade 11 effect based on b",
        cost() { return new OmegaNum(20000) },
        unlocked() { return true },
        effect() {
            return layers.a.effect().pow(0.2)
        },
        effectDisplay() { return `^${format(this.effect())}` },
        currencyDisplayName: "Infection Power",
        currencyInternalName: "ll",
        currencyLayer: "grz"
    },
    21: {
        description: "Boost Infection Power gain based on Reset Points",
        cost() { return new OmegaNum(30000) },
        unlocked() { return true },
        effect() {
            let eff = player.a.points.add(1e10).log10().log10()
            if(hasAchievement("rw",121)) eff = player.a.points.add(1).root(1000)
            if(hasUpgrade("grz",56)) eff = eff.pow(upgradeEffect("grz", 55))
            if(hasUpgrade("grz",56)) eff = eff.pow(upgradeEffect("grz", 54))
            return eff
        },
        effectDisplay() { return `×${format(this.effect())}` },
        currencyDisplayName: "Infection Power",
        currencyInternalName: "ll",
        currencyLayer: "grz"
    },
    22: {
        description: "Boost Infected base based on Infection Power",
        cost() { return new OmegaNum(400000) },
        unlocked() { return true },
        effect() {
            let eff = player.grz.ll.add(10).log10().mul(0.015).add(1)
            if(eff.gte(2) && !hasAchievement("rw",112)) eff = eff.pow(0.1).mul(n(2).pow(0.9))
            return eff
        },
        effectDisplay() { return `×${format(this.effect())}` },
        currencyDisplayName: "Infection Power",
        currencyInternalName: "ll",
        currencyLayer: "grz"
    },
    23: {
        description: "Boost Infection Power gain based on Combat Power",
        cost() { return new OmegaNum(1000000) },
        unlocked() { return true },
        effect() {
            let eff = player.cq.points.add(1).pow(0.5)
            if(hasAchievement("rw",95)) eff = eff.pow(2)
            if(hasUpgrade("grz",36)) eff = eff.pow(upgradeEffect("grz", 55))
            if(hasUpgrade("grz",36)) eff = eff.pow(upgradeEffect("grz", 54))
            return eff
        },
        effectDisplay() { return `×${format(this.effect())}` },
        currencyDisplayName: "Infection Power",
        currencyInternalName: "ll",
        currencyLayer: "grz"
    },
    24: {
        description: "Each upgrade makes Combat Power gain ×1.15, gain 10% Combat Power per second",
        cost() { return new OmegaNum(25000000) },
        unlocked() { return true },
        effect() {
            return n(1.15).pow(player.grz.upgrades.length)
        },
        effectDisplay() { return `×${format(this.effect())}` },
        currencyDisplayName: "Infection Power",
        currencyInternalName: "ll",
        currencyLayer: "grz"
    },
    25: {
        description: "Combat Power boosts Infected base",
        cost() { return new OmegaNum(3e11) },
        unlocked() { return true },
        effect() {
            let eff = player.cq.points.add(1).pow(0.025)
            if(eff.gte(1.5) && !hasAchievement("rw",117)) eff = eff.pow(0.1).mul(n(1.5).pow(0.9))
            if(hasAchievement("rw",117)) eff = eff.pow(buyableEffect("grz", 13))
            return eff
        },
        effectDisplay() { return `×${format(this.effect())}` },
        currencyDisplayName: "Infection Power",
        currencyInternalName: "ll",
        currencyLayer: "grz"
    },
    26: {
        description: "Boost Combat Power gain based on Amoebas",
        cost() { return new OmegaNum(1.31e13) },
        unlocked() { return true },
        effect() {
            return player.a1.points.add(1).pow(0.022)
        },
        effectDisplay() { return `×${format(this.effect())}` },
        currencyDisplayName: "Infection Power",
        currencyInternalName: "ll",
        currencyLayer: "grz"
    },
    31: {
        description: "Gain 100% Combat Power per second, disable Combat Power resets",
        cost() { return new OmegaNum(2.52e25) },
        unlocked() { return true },
        currencyDisplayName: "Infection Power",
        currencyInternalName: "ll",
        currencyLayer: "grz"
    },
    32: {
        description: "Infected upgrade 15 affects Rebirth Increments, auto-boost ATK/DEF",
        cost() { return new OmegaNum(2.72e27) },
        unlocked() { return true },
        currencyDisplayName: "Infection Power",
        currencyInternalName: "ll",
        currencyLayer: "grz"
    },
    33: {
        description: "Infection Power boosts Increment gain",
        cost() { return new OmegaNum(2.92e29) },
        unlocked() { return true },
        effect() {
            return player.grz.ll.add(1).log10().pow(10)
        },
        effectDisplay() { return `×${format(this.effect())}` },
        currencyDisplayName: "Infection Power",
        currencyInternalName: "ll",
        currencyLayer: "grz"
    },
    34: {
        description: "Boost self-gain based on Infection Power",
        cost() { return new OmegaNum(1.939e193) },
        unlocked() { return true },
        effect() {
            let eff = player.grz.ll.add(1).log10()
            if(hasAchievement("rw",122)) eff = player.grz.ll.add(1).root(10)
            if(hasUpgrade("grz",54)) eff = eff.pow(upgradeEffect("grz", 54))
            if(hasUpgrade("grz",55)) eff = eff.pow(upgradeEffect("grz", 55))
            return eff
        },
        effectDisplay() { return `×${format(this.effect())}` },
        currencyDisplayName: "Infection Power",
        currencyInternalName: "ll",
        currencyLayer: "grz"
    },
    35: {
        description: "Boost Combat Power gain based on Infection Power",
        cost() { return new OmegaNum(2.19e219) },
        unlocked() { return true },
        effect() {
            return player.grz.ll.add(1).log10().add(1).log10()
        },
        effectDisplay() { return `×${format(this.effect())}` },
        currencyDisplayName: "Infection Power",
        currencyInternalName: "ll",
        currencyLayer: "grz"
    },
    36: {
        description: "Contagious Infection's 3rd row upgrades affect upgrade 23",
        cost() { return new OmegaNum(2.29e229) },
        unlocked() { return true },
        currencyDisplayName: "Infection Power",
        currencyInternalName: "ll",
        currencyLayer: "grz"
    },
    51: {
        description: "Base 'Power gain' +1",
        cost() { return new OmegaNum(50) },
        unlocked() { return true },
        currencyDisplayName: "Contagious Infection",
        currencyInternalName: "crgr",
        currencyLayer: "grz"
    },
    52: {
        description: "Contagious Infection reduces Infected cost (max 500)",
        cost() { return new OmegaNum(140) },
        unlocked() { return true },
        effect() {
            return player.grz.crgr.min(500)
        },
        effectDisplay() { return `/${format(this.effect())}` },
        currencyDisplayName: "Contagious Infection",
        currencyInternalName: "crgr",
        currencyLayer: "grz"
    },
    53: {
        description: "Base 'Immunity reduction' +0.01",
        cost() { return new OmegaNum(350) },
        unlocked() { return true },
        currencyDisplayName: "Contagious Infection",
        currencyInternalName: "crgr",
        currencyLayer: "grz"
    },
    54: {
        description: "Boost Infected upgrade 34 effect based on milestones",
        cost() { return new OmegaNum(380) },
        unlocked() { return true },
        effect() {
            return player.lcb.points.pow(0.5)
        },
        effectDisplay() { return `^${format(this.effect())}` },
        currencyDisplayName: "Contagious Infection",
        currencyInternalName: "crgr",
        currencyLayer: "grz"
    },
    55: {
        description: "Boost Infected upgrade 34 effect based on Infected",
        cost() { return new OmegaNum(400) },
        unlocked() { return true },
        effect() {
            return player.grz.points.pow(0.25)
        },
        effectDisplay() { return `^${format(this.effect())}` },
        currencyDisplayName: "Contagious Infection",
        currencyInternalName: "crgr",
        currencyLayer: "grz"
    },
    56: {
        description: "Previous two upgrades affect upgrade 21",
        cost() { return new OmegaNum(425) },
        unlocked() { return true },
        currencyDisplayName: "Contagious Infection",
        currencyInternalName: "crgr",
        currencyLayer: "grz"
    },
    61: {
        description: "Combat Power gain scales with Combat Power",
        cost() { return new OmegaNum(525) },
        unlocked() { return true },
        effect() {
            return player.cq.points.add(1).log10()
        },
        effectDisplay() { return `×${format(this.effect())}` },
        currencyDisplayName: "Contagious Infection",
        currencyInternalName: "crgr",
        currencyLayer: "grz"
    },
    62: {
        description: "Boost Power gain base based on Infection Power",
        cost() { return new OmegaNum(580) },
        unlocked() { return true },
        effect() {
            return player.grz.ll.add(10).log10().add(10).log10()
        },
        effectDisplay() { return `+${format(this.effect())}` },
        currencyDisplayName: "Contagious Infection",
        currencyInternalName: "crgr",
        currencyLayer: "grz"
    },
    63: {
        description: "Boost 'Infected base' base based on Infectious Disease",
        cost() { return new OmegaNum(645) },
        unlocked() { return true },
        effect() {
            return player.grz.jb.add(10).log10().add(10).log10().div(100)
        },
        effectDisplay() { return `+${format(this.effect())}` },
        currencyDisplayName: "Contagious Infection",
        currencyInternalName: "crgr",
        currencyLayer: "grz"
    },
    65: {
        description: "Boost Power gain base based on Infectious Disease",
        cost() { return new OmegaNum(585) },
        unlocked() { return true },
        effect() {
            return player.grz.jb.add(10).log10().pow(0.5)
        },
        effectDisplay() { return `+${format(this.effect())}` },
        currencyDisplayName: "Contagious Infection",
        currencyInternalName: "crgr",
        currencyLayer: "grz"
    },
    72: {
        description: "Boost Power gain base based on Combat Power",
        cost() { return new OmegaNum(590) },
        unlocked() { return true },
        effect() {
            return player.cq.points.add(10).log10().pow(0.7)
        },
        effectDisplay() { return `+${format(this.effect())}` },
        currencyDisplayName: "Contagious Infection",
        currencyInternalName: "crgr",
        currencyLayer: "grz"
    },
    81: {
        description: "Boost main interface's first upgrade effect after softcap based on Disease",
        cost() { return new OmegaNum(50000) },
        unlocked() { return true },
        effect() {
            let eff = player.grz.jb.add(1).log10().mul(0.01).add(1)
            if(eff.gte(1.1)) eff = eff.pow(0.5).mul(n(1.1).pow(0.5))
            if(eff.gte(1.3)) eff = eff.pow(0.5).mul(n(1.3).pow(0.5))
            if(eff.gte(1.5)) eff = eff.pow(0.2).mul(n(1.5).pow(0.8))
            return eff
        },
        effectDisplay() { return `^${format(this.effect())}` },
        currencyDisplayName: "Infectious Disease",
        currencyInternalName: "jb",
        currencyLayer: "grz"
    },
    82: {
        description: "Boost Infection Power gain based on Infectious Disease",
        cost() { return new OmegaNum(100000) },
        unlocked() { return true },
        effect() {
            let eff = player.grz.jb.add(1)
            eff = expPow(eff.mul(10), 1.2)
            if (eff.gte("1e1000")) eff = expPow(eff.mul(10), n(1).div(3)).mul("1e990")
            return eff
        },
        effectDisplay() { return `×${format(this.effect())}` },
        currencyDisplayName: "Infectious Disease",
        currencyInternalName: "jb",
        currencyLayer: "grz"
    },
    83: {
        description: "Boost Infectious Disease gain based on Infection Power",
        cost() { return new OmegaNum(15000000) },
        unlocked() { return true },
        effect() {
            return player.grz.ll.add(10).log10().add(10).log10()
        },
        effectDisplay() { return `×${format(this.effect())}` },
        currencyDisplayName: "Infectious Disease",
        currencyInternalName: "jb",
        currencyLayer: "grz"
    },
    84: {
        description: "Base 'Infected base' +0.05",
        cost() { return new OmegaNum(2.828e28) },
        unlocked() { return true },
        currencyDisplayName: "Infectious Disease",
        currencyInternalName: "jb",
        currencyLayer: "grz"
    },
    85: {
        description: "Base 'Disease gain' +0.025",
        cost() { return new OmegaNum(3.434e34) },
        unlocked() { return true },
        currencyDisplayName: "Infectious Disease",
        currencyInternalName: "jb",
        currencyLayer: "grz"
    },
    86: {
        description: "Boost Infectious Disease gain based on Infected effect",
        cost() { return new OmegaNum(5.757e57) },
        unlocked() { return true },
        effect() {
            return layers.grz.lleff()
        },
        effectDisplay() { return `×${format(this.effect())}` },
        currencyDisplayName: "Infectious Disease",
        currencyInternalName: "jb",
        currencyLayer: "grz"
    }
},
    symbol: "IN",
    position: 0,
    startData() {
        return {
            unlocked: true,
            points: new ExpantaNum(0),
            ll: new ExpantaNum(0),
            crgr: new ExpantaNum(0),
            jb: new ExpantaNum(0)
        }
    },
    requires() { return new ExpantaNum(500) },
    color: "green",
    resource: "Infected",
    type: "static",
    exponent: 5,
    baseAmount() { return player.cq.points },
    baseResource: "Combat Power",
    gainMult() {
        let mult = new ExpantaNum(1)
        return mult
    },
    gainExp() {
        let exp = new ExpantaNum(0.5)
        return exp
    },
    getNextAt() {
        let gain = new ExpantaNum(500).mul(new ExpantaNum(2).pow(player.grz.points))
        if(player.grz.points.gte(13)) gain = new ExpantaNum(500).mul(new ExpantaNum(3).pow(player.grz.points))
        if(hasUpgrade("grz",52)) gain = gain.div(upgradeEffect("grz", 52))
        return gain
    },
    layerShown() { return hasMilestone("cq", 23) || player.grz.points.gte(1) },
    row: 101,

    update(diff) {
        player.grz.ll = player.grz.ll.add(this.llgain().mul(diff))
        player.grz.jb = player.grz.jb.add(this.jbgain().mul(diff))
        
        if (hasMilestone("grz", 2)) player.grz.crgr = this.crgr()
        
        if (hasMilestone("grz", 3) && player.grz.ll.sub(1).gte(new ExpantaNum(1e8).mul(new ExpantaNum(2).pow(getBuyableAmount("grz", 11)).mul(new ExpantaNum(1.005).pow(getBuyableAmount("grz", 11).pow(2)))))) {
            setBuyableAmount('grz', 11, getBuyableAmount('grz', 11).add(1))
        }
        
        if (hasMilestone("grz", 3) && player.grz.ll.sub(1).gte(new ExpantaNum(10).pow(getBuyableAmount("grz", 12).pow(1.3).add(66)))) {
            setBuyableAmount('grz', 12, getBuyableAmount('grz', 12).add(1))
        }
        
        if (hasMilestone("grz", 3) && player.grz.ll.sub(1).gte(new ExpantaNum(10).pow(getBuyableAmount("grz", 13).pow(1.5).add(108)))) {
            setBuyableAmount('grz', 13, getBuyableAmount('grz', 13).add(1))
        }
    },

    buyables: {
        11: {
            title: "Power Gain",
            cost(x = getBuyableAmount(this.layer, this.id)) {
                let c = new ExpantaNum("1e8").mul(new ExpantaNum(2).pow(x)).mul(new ExpantaNum(1.005).pow(x.pow(2)))
                return c
            },
            display() { 
                return `Infection Power gain<br />
                ×${format(buyableEffect(this.layer, this.id), 2)}<br />
                (Next level: ×${format(this.effect(getBuyableAmount(this.layer, this.id).add(1)))})
                <br />Cost: ${format(this.cost())} Infection Power<br>
                Level: ${formatWhole(getBuyableAmount(this.layer, this.id))}`
            },
            canAfford() { return player.grz.ll.gte(this.cost()) },
            buy() {
                player.grz.ll = player.grz.ll.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect(x = getBuyableAmount(this.layer, this.id)) {
                let base = new ExpantaNum(2)
                if(hasUpgrade("grz",51)) base = base.add(1)
                if(hasUpgrade("grz",62)) base = base.add(upgradeEffect("grz", 62))
                if(hasUpgrade("grz",65)) base = base.add(upgradeEffect("grz", 65))
                if(hasUpgrade("grz",72)) base = base.add(upgradeEffect("grz", 72))
                base = base.add(buyableEffect("grz", 21))
                x = x.add(getBuyableAmount(this.layer, 12))
                x = x.add(getBuyableAmount(this.layer, 13))
                let eff = new ExpantaNum(base).pow(x)
                if(eff.gte(1e130) && !hasAchievement("rw",107)) eff = eff.root(2).mul(1e65)
                return eff
            },
            unlocked() { return true }
        },
        12: {
            title: "Infected Base",
            cost(x = getBuyableAmount(this.layer, this.id)) {
                return new ExpantaNum(10).pow(x.pow(1.3).add(66))
            },
            display() { 
                return `Infected base<br />
                ×${format(buyableEffect(this.layer, this.id), 2)}<br />
                (Next level: ×${format(this.effect(getBuyableAmount(this.layer, this.id).add(1)))})
                <br />Cost: ${format(this.cost())} Infection Power<br>
                Level: ${formatWhole(getBuyableAmount(this.layer, this.id))}`
            },
            canAfford() { return player.grz.ll.gte(this.cost()) },
            buy() {
                player.grz.ll = player.grz.ll.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect(x = getBuyableAmount(this.layer, this.id)) {
                x = x.add(getBuyableAmount(this.layer, 13))
                let base = new ExpantaNum(1.03)
                if(hasUpgrade("grz",84)) base = base.add(0.05)
                if(hasUpgrade("grz",63)) base = base.add(upgradeEffect("grz", 63))
                let eff = new ExpantaNum(base).pow(x)
                if(eff.gte(5) && !hasAchievement("rw",107)) eff = eff.root(2).mul(new ExpantaNum(5).root(2))
                return eff
            },
            unlocked() { return true }
        },
        13: {
            title: "Immunity Reduction",
            cost(x = getBuyableAmount(this.layer, this.id)) {
                return new ExpantaNum(10).pow(x.pow(1.5).add(108))
            },
            display() { 
                return `Immunity reduction<br />
                ^${format(buyableEffect(this.layer, this.id), 2)}<br />
                (Next level: ^${format(this.effect(getBuyableAmount(this.layer, this.id).add(1)))})
                <br />Cost: ${format(this.cost())} Infection Power<br>
                Level: ${formatWhole(getBuyableAmount(this.layer, this.id))}`
            },
            canAfford() { return player.grz.ll.gte(this.cost()) },
            buy() {
                player.grz.ll = player.grz.ll.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect(x = getBuyableAmount(this.layer, this.id)) {
                let base = new ExpantaNum(1.04)
                if(hasUpgrade("grz",53)) base = base.add(0.01)
                let eff = new ExpantaNum(base).pow(x)
                if(eff.gte(5)) eff = eff.pow(0.3).mul(new ExpantaNum(5).pow(0.7))
                return eff
            },
            unlocked() { return true }
        },
        21: {
            title: "Power Base",
            cost(x = getBuyableAmount(this.layer, this.id)) {
                return new ExpantaNum(10).pow(x.pow(2).add(349))
            },
            display() { 
                return `Increase "Power gain" base<br />
                +${format(buyableEffect(this.layer, this.id), 2)}<br />
                (Next level: +${format(this.effect(getBuyableAmount(this.layer, this.id).add(1)))})
                <br />Cost: ${format(this.cost())} Infection Power<br>
                Level: ${formatWhole(getBuyableAmount(this.layer, this.id))}`
            },
            canAfford() { return player.grz.ll.gte(this.cost()) },
            buy() {
                player.grz.ll = player.grz.ll.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect(x = getBuyableAmount(this.layer, this.id)) {
                return new ExpantaNum(5).mul(x)
            },
            unlocked() { return true }
        },
        41: {
            title: "Disease Gain",
            cost(x = getBuyableAmount(this.layer, this.id)) {
                if(x.gte(11)) x = x.div(11).pow(2).mul(11)
                if(x.gte(7)) x = x.div(7).pow(2).mul(7)
                return new ExpantaNum(2).pow(x.pow(1.5)).mul(5)
            },
            display() { 
                return `Disease gain base multiplier and exponent<br />
                ${format(buyableEffect(this.layer, this.id), 2)}<br />
                (Next level: ${format(this.effect(getBuyableAmount(this.layer, this.id).add(1)))})
                <br />Cost: ${format(this.cost())} Infectious Disease<br>
                Effect: ${format(buyableEffect(this.layer, this.id), 2)}×,<br>
                ^${format(buyableEffect(this.layer, this.id), 2)}<br>
                Level: ${formatWhole(getBuyableAmount(this.layer, this.id))}`
            },
            canAfford() { return player.grz.jb.gte(this.cost()) },
            buy() {
                player.grz.jb = player.grz.jb.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect(x = getBuyableAmount(this.layer, this.id)) {
                let base = new ExpantaNum(1.25)
                if(hasUpgrade("grz",85)) base = base.add(0.025)
                return new ExpantaNum(base).pow(x)
            },
            unlocked() { return true }
        }
    },

    tabFormat: {
        "Main": {
            buttonStyle() { return { 'color': 'green' } },
            content: [
                "main-display",
                "prestige-button",
                "resource-display",
                ["display-text", function() {
                    return `Base Infection Power: ${format(player.grz.points)}^${format(layers.grz.llpow())}=${format(player.grz.points.pow(layers.grz.llpow()))}`
                }],
                ["display-text", function() {
                    return player.grz.ll.gte(1e300) ? "Because Infection Power exceeded 1e300, overflow occurred, gain x->(lg(x+700))^100" : ""
                }],
                ["row", [
                    ["upgrade",11], ["upgrade",12], ["upgrade",13], 
                    ["upgrade",14], ["upgrade",15], ["upgrade",16]
                ]],
                ["row", [
                    ["upgrade",21], ["upgrade",22], ["upgrade",23],
                    ["upgrade",24], ["upgrade",25], ["upgrade",26]
                ]],
                ["row", [
                    ["upgrade",31], ["upgrade",32], ["upgrade",33],
                    ["upgrade",34], ["upgrade",35], ["upgrade",36]
                ]],
                ["row", [
                    ["upgrade",41], ["upgrade",42], ["upgrade",43],
                    ["upgrade",44], ["upgrade",45], ["upgrade",46]
                ]]
            ]
        },
        "Milestones": {
            buttonStyle() { return { 'color': 'green' } },
            content: [
                "main-display",
                "prestige-button",
                "resource-display",
                "milestones"
            ]
        },
        "Buyables": {
            buttonStyle() { return { 'color': 'green' } },
            unlocked() { return hasMilestone("grz", 1) },
            content: [
                "main-display",
                "prestige-button",
                "resource-display",
                ["display-text", function() {
                    return hasMilestone("grz", 2) ? 
                        `You have ${format(player.grz.crgr)} Contagious Infection<br>
                        Buyables give additional levels to left buyables<br>
                        Each buyable provides 1 Contagious Infection<br>
                        Each second row buyable provides 10 Contagious Infection` : ""
                }],
                ["row", [
                    ["buyable",11], ["buyable",12], ["buyable",13]
                ]],
                ["row", [
                    ["buyable",21], ["buyable",22], ["buyable",23]
                ]]
            ]
        },
        "Contagion": {
            buttonStyle() { return { 'color': 'green' } },
            unlocked() { return hasMilestone("grz", 2) },
            content: [
                "main-display",
                "prestige-button",
                "resource-display",
                ["display-text", function() {
                    return hasMilestone("grz", 2) ? 
                        `You have ${format(player.grz.crgr)} Contagious Infection<br>
                        Buyables give additional levels to left buyables<br>
                        Each buyable provides 1 Contagious Infection<br>
                        Each second row buyable provides 10 Contagious Infection` : ""
                }],
                ["upgrade",51],
                ["row", [
                    ["upgrade",52], ["upgrade",53]
                ]],
                ["row", [
                    ["upgrade",54], ["upgrade",55]
                ]],
                ["upgrade",56],
                ["upgrade",61],
                ["row", [
                    ["upgrade",62], ["upgrade",65], ["upgrade",72]
                ]],
                ["row", [
                    ["upgrade",63], ["upgrade",66], ["upgrade",73]
                ]],
                ["row", [
                    ["upgrade",64], ["upgrade",71], ["upgrade",74]
                ]],
                ["upgrade",75],
                ["upgrade",76]
            ]
        },
        "Disease": {
            buttonStyle() { return { 'color': 'green' } },
            unlocked() { return hasMilestone("grz", 3) },
            content: [
                "main-display",
                "prestige-button",
                "resource-display",
                ["display-text", function() {
                    return `You have ${format(player.grz.jb)} Infectious Disease (+${format(layers.grz.jbgain())}/s) (starts at 1.000e327 Infection Power)`
                }],
                ["row", [
                    ["upgrade",81], ["upgrade",82], ["upgrade",83],
                    ["upgrade",84], ["upgrade",85], ["upgrade",86]
                ]],
                ["row", [
                    ["buyable",41], ["buyable",42]
                ]]
            ]
        }
    }
})