addLayer("csm", {
    symbol: "<img src='portal.png' style='width:calc(60%);height:calc(60%);margin:20%'></img>",
    position: 2,
    startData() {
        return {
            unlocked: true,
            points: new ExpantaNum(0),
            ati: new ExpantaNum(0),
        }
    },
    color: "#ffffffff",
    resource: "Portal Charges", 
    type: "static",
    requires() {
        return new ExpantaNum("1e700")
    },
    baseAmount() { return player.i.points },
    baseResource: "Increments",
    gainMult() {
        let mult = new ExpantaNum(1)
        return mult
    },
    gainExp() {
        let exp = new ExpantaNum(1)
        return exp
    },
    row: 2,
    layerShown() { return inChallenge("t", 11) && hasMilestone("esc", 13) },
    getNextAt() {
        let gain = new ExpantaNum("1e700").mul(new ExpantaNum("1e300").pow(player.csm.points.pow(2)))
        return gain
    },
    effectDescription() {
        return `<br><br>Rebirth Increments: ${format(player.csm.ati)} (${format(this.atigain())}/s), making Increment gain ×${format(this.effect())}`
    },
    
    upgrades: {
        11: {
            description: "Point Infusion II - Flawless Points",
            cost() { return new OmegaNum(10000) },
            unlocked() { return true },
            effect() {
                let eff = new ExpantaNum(1.33).pow(getBuyableAmount(this.layer, 11))
                return eff
            },
            effectDisplay() { return `×${format(this.effect())}` },
            currencyDisplayName: "Rebirth Increments",
            currencyInternalName: "ati",
            currencyLayer: "csm"
        },
        12: {
            description: "Increment Infusion II - Increment gain",
            cost() { return new OmegaNum(10000) },
            unlocked() { return true },
            effect() {
                let eff = new ExpantaNum(getBuyableAmount(this.layer, 12).add(1))
                    .pow(getBuyableAmount(this.layer, 12).mul(getBuyableAmount(this.layer, 12).add(10).log10()))
                if(hasAchievement("rw",103)) eff = eff.pow(2.2222)
                return eff
            },
            effectDisplay() { return `×${format(this.effect())}` },
            currencyDisplayName: "Rebirth Increments",
            currencyInternalName: "ati",
            currencyLayer: "csm"
        },
        13: {
            description: "Amoeba Infusion II - Amoeba upgrade 32",
            cost() { return new OmegaNum(10000) },
            unlocked() { return true },
            effect() {
                let eff = new ExpantaNum(0.02).mul(getBuyableAmount(this.layer, 13)).add(1)
                if(hasAchievement("rw",103)) eff = eff.pow(2.2222)
                return eff
            },
            effectDisplay() { return `×${format(this.effect())}` },
            currencyDisplayName: "Rebirth Increments",
            currencyInternalName: "ati",
            currencyLayer: "csm"
        },
    },
    
    buyables: {
        11: {
            cost(x = getBuyableAmount(this.layer, this.id)) {
                let c = new ExpantaNum("1e9").mul(new ExpantaNum(5).pow(x)).mul(new ExpantaNum(1.025).pow(x.pow(2)))
                return c
            },
            display() { 
                return `I-layer upgrade 11 effect<br />
                ^${format(buyableEffect(this.layer, this.id), 2)}<br />
                (Next level: ^${format(this.effect(getBuyableAmount(this.layer, this.id).add(1)))})
                <br />Cost: ${format(this.cost())} points<br>
                Level: ${formatWhole(getBuyableAmount(this.layer, this.id))}`
            },
            canAfford() { return player.points.gte(this.cost()) },
            buy() {
                player.points = player.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            title: "Point Infusion",
            effect(x = getBuyableAmount(this.layer, this.id)) {
                return x.add(1)
            },
            unlocked() { return player.csm.points.gte(1) },
        },
        12: {
            cost(x = getBuyableAmount(this.layer, this.id)) {
                let c = new ExpantaNum("1e55").mul(new ExpantaNum(100000).pow(x)).mul(new ExpantaNum(2).pow(x.pow(2)))
                return c
            },
            display() { 
                return `Rebirth Increment effect<br />
                ^${format(buyableEffect(this.layer, this.id), 2)}<br />
                (Next level: ^${format(this.effect(getBuyableAmount(this.layer, this.id).add(1)))})
                <br />Cost: ${format(this.cost())} increments<br>
                Level: ${formatWhole(getBuyableAmount(this.layer, this.id))}`
            },
            canAfford() { return player.i.points.gte(this.cost()) },
            buy() {
                player.i.points = player.i.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            title: "Increment Infusion",
            effect(x = getBuyableAmount(this.layer, this.id)) {
                return x.add(1)
            },
            unlocked() { return hasAchievement("rw", 72) && player.csm.points.gte(1) },
        },
        13: {
            cost(x = getBuyableAmount(this.layer, this.id)) {
                let c = new ExpantaNum("1e11").mul(new ExpantaNum(10).pow(x)).mul(new ExpantaNum(1.03).pow(x.pow(2)))
                return c
            },
            display() { 
                return `Base Amoeba gain<br />
                ^${format(buyableEffect(this.layer, this.id), 2)}<br />
                (Next level: ^${format(this.effect(getBuyableAmount(this.layer, this.id).add(1)))})
                <br />Cost: ${format(this.cost())} amoebas<br>
                Level: ${formatWhole(getBuyableAmount(this.layer, this.id))}`
            },
            canAfford() { return player.a1.points.gte(this.cost()) },
            buy() {
                player.a1.points = player.a1.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            title: "Amoeba Infusion",
            effect(x = getBuyableAmount(this.layer, this.id)) {
                return x.pow(0.5).add(1)
            },
            unlocked() { return hasAchievement("rw", 73) && player.csm.points.gte(1) },
        },
    },
    
    effect() {
        let eff = player.csm.ati.add(1)
        eff = eff.pow(buyableEffect('csm', 12))
        if (eff.gte("1e100")) eff = expPow(eff.mul(10), 0.5).mul("1e90")
        return eff
    },
    
    atigain() {
        let eff = player.csm.points
        if (hasAchievement("rw", 85)) eff = eff.mul(10)
        if (hasMilestone("cq", 24)) eff = eff.mul(2)
        if (hasUpgrade("grz", 32)) eff = eff.mul(upgradeEffect("grz", 15))
        if (hasMilestone("t", 14)) eff = eff.mul(new ExpantaNum(1.07).pow(buyableEffect("t", 11)))
        return eff
    },
    
    tabFormat: {
        "Infusions": {
            content: [
                "main-display",
                "prestige-button",
                "blank",
                "buyables"
            ],
            unlocked() { return true }
        },
        "Upgrades": {
            content: [
                "main-display",
                "prestige-button",
                "blank",
                "upgrades"
            ],
            unlocked() { return hasAchievement("rw", 85) }
        },
        "Effects": {
            content: [
                "main-display",
                ["display-text", () => 
                    `<text style="color:red">-</text> Flawless Points gain /${new ExpantaNum("1e4").pow(player.csm.points.pow(2))}, Increment exponent ^${new ExpantaNum(0.9).pow(player.csm.points)}`
                ],
                ["display-text", () => 
                    `<text style="color:green">+</text> Unlocks Rebirth Increments and Point Infusions`
                ],
                ["display-text", () => 
                    player.csm.points.gte(2) ? 
                    `<text style="color:red">-</text> Flawless Points gain ^${new ExpantaNum(0.95).pow(player.csm.points)}, Increment gain ^${new ExpantaNum(0.5).pow(player.csm.points)}` : ``
                ],
                ["display-text", () => 
                    player.csm.points.gte(2) ? 
                    `<text style="color:green">+</text> Unlocks Amplifiers and Generators` : ``
                ]
            ],
            unlocked() { return player.csm.points.gte(1) }
        }
    },
    
    update(diff) {
        player.csm.ati = player.csm.ati.add(this.atigain().mul(diff))
    }
})