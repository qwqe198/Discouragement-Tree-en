addLayer("l", {
    symbol: "L",
    position: 0,
    startData() {
        return {
            unlocked: true,
            points: new ExpantaNum(0)
        }
    },
    requires() { return new ExpantaNum("1e7950") },
    color: "#BE0E00",
    resource: "Life",
    type: "normal",
    passiveGeneration() {
        return 0
    },
    exponent: 0.5,
    baseAmount() { return player.p.points },
    baseResource: "Reset Points",
    gainMult() {
        let mult = new ExpantaNum(1)
        return mult
    },
    gainExp() {
        let exp = new ExpantaNum(1)
        return exp
    },
    layerShown() { return hasMilestone("esc", 8) || hasMilestone("cq", 1) },
    row: 2,

    tabFormat: {
        "Milestones": {
            buttonStyle() { return { 'color': 'lightblue' } },
            content: [
                "main-display",
                "prestige-button",
                "resource-display",
                "milestones"
            ]
        },
        "Challenges": {
            buttonStyle() { return { 'color': 'lightblue' } },
            unlocked() { return hasMilestone("l", 10) },
            content: [
                "main-display",
                "challenges"
            ]
        },
        "Buyables": {
            buttonStyle() { return { 'color': 'lightblue' } },
            unlocked() { return player.l.challenges[11] >= 10 },
            content: [
                "main-display",
                "buyables"
            ]
        }
    },

    buyables: {
        11: {
            title: "α → ∂α",
            cost(x = getBuyableAmount(this.layer, this.id)) {
                let c = new ExpantaNum("1e20").mul(new ExpantaNum(10).pow(x)).mul(new ExpantaNum(2).pow(x.pow(2)))
                return c
            },
            display() { 
                return `Life gain<br />
                ×${format(buyableEffect(this.layer, this.id), 2)}<br />
                (Next level: ×${format(this.effect(getBuyableAmount(this.layer, this.id).add(1)))})
                <br />Cost: ${format(this.cost())} Life<br>
                Level: ${formatWhole(getBuyableAmount(this.layer, this.id))}`
            },
            canAfford() { return player.l.points.gte(this.cost()) },
            buy() {
                player.l.points = player.l.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect(x = getBuyableAmount(this.layer, this.id)) {
                let eff = player.points.add(2).log(2).add(2).log(2).pow(x)
                return eff
            },
            unlocked() { return true }
        },
        12: {
            title: "α → ∂β",
            cost(x = getBuyableAmount(this.layer, this.id)) {
                if(x.gte(7)) x = x.div(7).pow(2).mul(7)
                let c = new ExpantaNum("1e100").mul(new ExpantaNum(3).pow(x)).mul(new ExpantaNum(1.25).pow(x.pow(2)))
                return c
            },
            display() { 
                return `Infection Power gain<br />
                ^${format(buyableEffect(this.layer, this.id), 2)}<br />
                (Next level: ^${format(this.effect(getBuyableAmount(this.layer, this.id).add(1)))})
                <br />Cost: ${format(this.cost())} Life<br>
                Level: ${formatWhole(getBuyableAmount(this.layer, this.id))}`
            },
            canAfford() { return player.l.points.gte(this.cost()) },
            buy() {
                player.l.points = player.l.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            effect(x = getBuyableAmount(this.layer, this.id)) {
                let eff = x.mul(0.01).add(1)
                if(hasMilestone("cq",27)) eff = eff.pow(2)
                return eff
            },
            unlocked() { return true }
        }
    },

    challenges: {
        11: {
            name: "65. Machine Translation. Expansion",
            challengeDescription() {
                return `All previous resource exponents become<br>
                ^${format(tmp.l.challenges[11].challengeEffect)}<br>
                Each completion increases Life gain, every 10 completions unlocks a buyable`
            },
            goalDescription() {
                return hasAchievement("rw",115) ? "e7950 points" : "e7950 Reset Points"
            },
            challengeEffect() {
                let eff = new ExpantaNum(0.99).pow(player.l.challenges[11] + 1 - player.cq.challenges[13] * 0.2)
                    .mul(10000).floor().div(10000)
                return eff
            },
            goal: () => "1e7950",
            canComplete() { 
                return hasAchievement("rw",115) ? 
                    player.points.gte("1e7950") : 
                    player.p.points.gte("1e7950") 
            },
            rewardDescription() {
                return `Current: ×${format(tmp.l.challenges[11].rewardEffect)}<br>
                Completed: ${formatWhole(player.l.challenges[11])}/110 times`
            },
            completionLimit: 110,
            rewardEffect() {
                let eff = player.l.challenges[11] + 1
                if (hasMilestone("l", 16)) eff = eff**eff
                if (hasAchievement("rw", 27)) eff = eff**1.05
                if (hasAchievement("rw", 123)) eff = eff**(buyableEffect("l", 12))
                return eff
            },
            unlocked() { return hasMilestone("l", 10) }
        }
    },
   milestones: {
    1: {
        requirementDescription: "1 Life",
        done() { return player.l.points.gte(1) },
        effectDescription() {
            return `62. How is this the Tree of Life? First 50 Life make points ^1.01, Current: ^${format(new ExpantaNum(1.01).pow(player.l.points.min(50)))}`
        }
    },
    2: {
        requirementDescription: "2 Life",
        done() { return player.l.points.gte(2) },
        effectDescription() { return "63. Batch automation. Auto-buy first m-layer buyable" }
    },
    3: {
        requirementDescription: "3 Life",
        done() { return player.l.points.gte(3) },
        effectDescription() { return "Auto-buy second m-layer buyable" }
    },
    4: {
        requirementDescription: "4 Life",
        done() { return player.l.points.gte(4) },
        effectDescription() { return "Auto-buy third m-layer buyable" }
    },
    5: {
        requirementDescription: "5 Life",
        done() { return player.l.points.gte(5) },
        effectDescription() { return "Auto-buy fourth m-layer buyable" }
    },
    6: {
        requirementDescription: "6 Life",
        done() { return player.l.points.gte(6) },
        effectDescription() { return "Auto-buy fifth m-layer buyable" }
    },
    7: {
        requirementDescription: "7 Life",
        done() { return player.l.points.gte(7) },
        effectDescription() { return "Auto-buy sixth m-layer buyable" }
    },
    8: {
        requirementDescription: "8 Life",
        done() { return player.l.points.gte(8) },
        effectDescription() { return "Auto-buy seventh m-layer buyable" }
    },
    9: {
        requirementDescription: "9 Life",
        done() { return player.l.points.gte(9) },
        effectDescription() { return "Auto-buy eighth m-layer buyable" }
    },
    10: {
        requirementDescription: "10 Life",
        done() { return player.l.points.gte(10) },
        effectDescription() { return "64. Need massive Life resets. Unlock challenges" }
    },
    11: {
        requirementDescription: "1 Expansion completed",
        done() { return player.l.challenges[11] >= 1 },
        effectDescription() { return "Meta-property gain ^1.05" }
    },
    12: {
        requirementDescription: "100 Life",
        done() { return player.l.points.gte(100) },
        effectDescription() { return "66. Buff or nerf? p-layer buyable 2 price becomes ^10, effect becomes ^5" }
    },
    13: {
        requirementDescription: "150 Life",
        done() { return player.l.points.gte(150) },
        effectDescription() { 
            return `67. Useful or useless? Life boosts all previous resource gain, Current: ×${format(
                player.l.points.add(1).pow(5)
                    .pow(hasMilestone("l", 18) ? layers.a.effect() : 1)
                    .pow(buyableEffect("a1", 13))
            )}`
        }
    },
    14: {
        requirementDescription: "200 Life",
        done() { return player.l.points.gte(200) },
        effectDescription() { return "68. Useless or useful? m-layer buyable 1 price becomes ^25, effect becomes ^100" }
    },
    15: {
        requirementDescription: "250 Life",
        done() { return player.l.points.gte(250) },
        effectDescription() { return "69. Useful and useful. m-layer buyable 2 effect becomes ^1.5" }
    },
    16: {
        requirementDescription: "3 Expansions completed",
        done() { return player.l.challenges[11] >= 3 },
        effectDescription() { return "Expansion effect exponent ^2" }
    },
    17: {
        requirementDescription: "1000 Life",
        done() { return player.l.points.gte(1000) },
        effectDescription() { return `Each expansion makes Prestige Points gain ^1.05, Current: ^${format(new ExpantaNum(1.05).pow(player.l.challenges[11]))}` }
    },
    18: {
        requirementDescription: "50000 Life",
        done() { return player.l.points.gte(50000) },
        effectDescription() { return "b affects 150 Life milestone" }
    },
    19: {
        requirementDescription: "2.5M Life",
        done() { return player.l.points.gte(2500000) },
        effectDescription() { return "70. Necessary compromise. Challenge C-2 no longer boosts upgrade effects" }
    },
    20: {
        requirementDescription: "3M Life",
        done() { return player.l.points.gte(3000000) },
        effectDescription() { return "71. Feels so familiar. Unlock new layer" }
    },
    21: {
        requirementDescription: "e23872 points",
        done() { return player.points.gte("1e23872") },
        effectDescription() { return "Meta-property gain ^1.05" }
    },
    22: {
        requirementDescription: "10M Life",
        done() { return player.l.points.gte(10000000) },
        effectDescription() { return "72. Can't beat expansion without this. If in expansion, make Prestige boost affect Reset Points" }
    },
    23: {
        requirementDescription: "200M Life",
        done() { return player.l.points.gte(200000000) },
        effectDescription() { return "73. Negative first, positive later. m-layer buyable 3 price becomes ^20" }
    },
    24: {
        requirementDescription: "300M Life",
        done() { return player.l.points.gte(300000000) },
        effectDescription() { return "m-layer buyable 3 effect becomes ^15" }
    },
    25: {
        requirementDescription: "500M Life",
        done() { return player.l.points.gte(500000000) },
        effectDescription() { return "Remove m-layer buyable 3 price constant term" }
    },
    26: {
        requirementDescription: "3e9 Life",
        done() { return player.l.points.gte(3e9) },
        effectDescription() { return "Remove p buyable 11 first softcap" }
    },
    27: {
        requirementDescription: "5e9 Life",
        done() { return player.l.points.gte(5e9) },
        effectDescription() { return "Prestige Points gain ^1.1" }
    },
    28: {
        requirementDescription: "1e10 Life",
        done() { return player.l.points.gte(1e10) },
        effectDescription() { return "Finally... keep Point Singularity in Life resets" }
    },
    29: {
        requirementDescription: "5e11 Life",
        done() { return player.l.points.gte(5e11) },
        effectDescription() { return `First 50 orders of magnitude Life each make b×1.005, Current: ×${format(new ExpantaNum(1.005).pow(player.l.points.add(1).log10().min(50)))}` }
    },
    30: {
        requirementDescription: "1e12 Life",
        done() { return player.l.points.gte(1e12) },
        effectDescription() { return "Reduce Prestige upgrade cost" }
    },
    31: {
        requirementDescription: "2.5e13 Life",
        done() { return player.l.points.gte(2.5e13) },
        effectDescription() { return "b boosts p-layer upgrade 13" }
    },
    32: {
        requirementDescription: "1e18 Life",
        done() { return player.l.points.gte(1e18) },
        effectDescription() { return "Reduce p-layer buyable 11 price" }
    },
    33: {
        requirementDescription: "1e22 Life",
        done() { return player.l.points.gte(1e22) },
        effectDescription() { return "Too lazy to count quitting points: Is this the same p? Increase p-layer buyable 11 effect" }
    },
    34: {
        requirementDescription: "1e24 Life",
        done() { return player.l.points.gte(1e24) },
        effectDescription() { return "Weaken p-layer upgrade 22 effect softcap" }
    },
    35: {
        requirementDescription: "1e40000 points",
        done() { return player.points.gte("1e40000") },
        effectDescription() { return "First completely useless one, unlock new layer" }
    },
    36: {
        requirementDescription: "3e29 Life",
        done() { return player.l.points.gte(3e29) },
        effectDescription() { return "Weaken meta-property gain softcap, actually changing formula from +1e7500 to ×1e7500" }
    },
    37: {
        requirementDescription: "1e32 Life",
        done() { return player.l.points.gte(1e32) },
        effectDescription() { return "Won't this inflate? b affects Prestige Points gain" }
    },
    38: {
        requirementDescription: "1e38 Life",
        done() { return player.l.points.gte(1e38) },
        effectDescription() { return "Almost there... auto-buy p-layer 11 buyable amount ×5" }
    },
    39: {
        requirementDescription: "2e38 Life",
        done() { return player.l.points.gte(2e38) },
        effectDescription() { return `Still can't beat expansion... Each expansion makes meta-property gain ^1.06, Current: ^${format(new ExpantaNum(hasMilestone("l", 40) ? 1.1 : 1.06).pow(player.l.challenges[11]))}` }
    },
    40: {
        requirementDescription: "3e38 Life",
        done() { return player.l.points.gte(3e38) },
        effectDescription() { return "Finally can beat it! Above milestone effect increased to ^1.1" }
    },
    41: {
        requirementDescription: "1e50 Life",
        done() { return player.l.points.gte(1e50) },
        effectDescription() { return "Continue expanding - 150 Life milestone affects Reset Energy gain" }
    },
    42: {
        requirementDescription: "1e57 Life",
        done() { return player.l.points.gte(1e57) },
        effectDescription() { return "I never said before exponent - α → ∂α affects p-layer upgrade 24" }
    },
    43: {
        requirementDescription: "1e100 Life",
        done() { return player.l.points.gte(1e100) },
        effectDescription() { return "Keep all Life milestones on reset" }
    }
},


    update(diff) {

        if (hasAchievement("rw", 45) && player.l.points.sub(1).gte(n(1e20).mul(n(10).pow(getBuyableAmount("l", 11))).mul(n(2).pow(getBuyableAmount("l", 11).pow(2))))) setBuyableAmount('l', 11, getBuyableAmount('l', 11).add(1))
if (hasAchievement("rw", 77)&&player.l.challenges[11]<player.cq.milestones.length-3)player.l.challenges[11] = player.cq.milestones.length-3

    },

    /* upgrades:{
        11:{
            description:`点数加成自身.`,
            effect(){
                var eff = player.points.add(1).log10().add(1)
                return eff
            },
            effectDisplay(){return `x ${format(this.effect())}`},
            cost:n(4),
            unlocked(){return hasUpgrade(this.layer,this.id-1)},
        },
    }, */
    getResetGain() {
        var gain = player.p.points.add(10).log10().div(7950).pow((hasMilestone("lcb", 2) && player.l.challenges[11] >= 10 ? player.l.challenges[11] - 8 : 2) + player.cq.challenges[11] * 0.5)
        if (hasMilestone("l", 10)) gain = gain.mul(tmp.l.challenges[11].rewardEffect)
        if (hasMilestone("esc", 9)) gain = gain.mul(2)
if (hasUpgrade("grz", 15))gain=gain.mul(upgradeEffect("grz", 15))
        if (hasMilestone("lcb", 3)) gain = gain.mul(n(1.1).pow(player.l.points.add(10).log(10).floor().min(100)))
        if (hasUpgrade("p", 61)) gain = gain.mul(10)
        if (hasUpgrade("p", 62)) gain = gain.mul(50)
        if (hasUpgrade("p", 63)) gain = gain.mul(250)
        if (hasUpgrade("p", 64)) gain = gain.mul(1250)
        if (hasUpgrade("p", 65)) gain = gain.mul(6250)
        if (hasAchievement("rw", 106)) gain = gain.mul(69)
if (hasMilestone("t", 13)) gain = gain.mul(buyableEffect("t", 11).add(1))
        if (hasUpgrade("cq", 63)) gain = gain.mul(upgradeEffect("cq", 63))
        if (hasAchievement("rw", 15)) gain = gain.mul(1.5)
        gain = gain.mul(buyableEffect("a", 11))
        gain = gain.mul(buyableEffect("l", 11))
        gain = gain.mul(buyableEffect("cq", 11))
        gain = gain.mul(layers.a1.effect())
        if (hasMilestone("t", 8)) gain = gain.add(n(10).pow(buyableEffect("t", 11)))
        if (!hasMilestone("esc", 8)) gain = gain.min(0)
        return gain.floor()
    },
    getNextAt() {
        let gain = tmp.l.getResetGain.plus(1)
        if (hasMilestone("l", 10)) gain = gain.div(tmp.l.challenges[11].rewardEffect)
        if (hasMilestone("esc", 9)) gain = gain.div(2)
        if (hasUpgrade("p", 61)) gain = gain.div(10)
        gain = gain.div(buyableEffect("a", 11))
        gain = gain.div(buyableEffect("l", 11))
        gain = gain.div(buyableEffect("cq", 11))
        if (hasAchievement("rw", 15)) gain = gain.div(1.5)
        return n(10).pow(gain.root(2).mul(7950)).max("1e7950")
    },
    passiveGeneration() {
        if (player.cq.challenges[21] >= 1) return n(10).pow(player.cq.challenges[21]).div(100000)
        return 0
    },
    doReset(resettingLayer) {
        if (layers[resettingLayer].row > layers[this.layer].row) {
            let kept = ["unlocked", "auto"]
            if (hasAchievement("rw", 47)) {
                kept.push("buyables")
            }
             if (hasMilestone("l", 43)) {
                kept.push("milestones")
            }
            layerDataReset(this.layer, kept)
        }
    },
})