addLayer("lcb", {
    symbol: "M",
    position: 1,
    startData() {
        return {
            unlocked: true,
            points: new ExpantaNum(0)
        }
    },
    requires() { return new ExpantaNum("1e40000") },
    color: "#793784",
    resource: "Milestones",
    type: "static",
    passiveGeneration() { return 0 },
    effectDescription() {
        return `Just a placeholder - this layer doesn't reset anything<br>`
    },
    exponent: 1,
    baseAmount() { return player.points },
    baseResource: "Points",
    gainMult() {
        return new ExpantaNum(1)
    },
    gainExp() {
        return new ExpantaNum(0.5)
    },
    layerShown() { return hasMilestone("l", 35) || hasMilestone("cq", 1) },
    row: 99,
    getNextAt() {
        let gain = player.lcb.points
        if(hasAchievement("rw",124)) gain = gain.sub(0.725)
        return new ExpantaNum("1e40000").pow(new ExpantaNum(1.05).pow(gain))
    },

    milestones: {
        1: {
            requirementDescription: "100th Milestone",
            effectDescription: "When points reach e1, e4, e9, e16, e25, e36, e49, e64, e81, e100, e121, e144, e169, e196, e225, e256, e289, e324, e361, e400, e441, e484, e529, e576, e625, e676, e729, e784, e841, e900, e961, e1024, e1089, e1156, e1225, e1296, e1369, e1444, e1521, e1600, e1681, e1764, e1849, e1936, e2025, e2116, e2209, e2304, e2401, e2500, e2601, e2704, e2809, e2916, e3025, e3136, e3249, e3364, e3481, e3600, e3721, e3844, e3969, e4096, e4225, e4356, e4489, e4624, e4761, e4900, e5041, e5184, e5329, e5476, e5625, e5776, e5929, e6084, e6241, e6400, e6561, e6724, e6889, e7056, e7225, e7396, e7569, e7744, e7921, e8100, e8281, e8464, e8649, e8836, e9025, e9216, e9409, e9604, e9801, e10000: Points gain ×1e10",
            done() { return player.lcb.points.gte(1) }
        },
        2: {
            requirementDescription: "200th Milestone",
            effectDescription: "When expansions reach 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110: Base Life gain exponent +1",
            done() { return player.lcb.points.gte(2) }
        },
        3: {
            requirementDescription: "300th Milestone",
            effectDescription: "When Life reaches e1, e2, e3, e4, e5, e6, e7, e8, e9, e10, e11, e12, e13, e14, e15, e16, e17, e18, e19, e20, e21, e22, e23, e24, e25, e26, e27, e28, e29, e30, e31, e32, e33, e34, e35, e36, e37, e38, e39, e40, e41, e42, e43, e44, e45, e46, e47, e48, e49, e50, e51, e52, e53, e54, e55, e56, e57, e58, e59, e60, e61, e62, e63, e64, e65, e66, e67, e68, e69, e70, e71, e72, e73, e74, e75, e76, e77, e78, e79, e80, e81, e82, e83, e84, e85, e86, e87, e88, e89, e90, e91, e92, e93, e94, e95, e96, e97, e98, e99, e100: Life gain ×1.1",
            done() { return player.lcb.points.gte(3) }
        },
        4: {
            requirementDescription: "400th Milestone",
            effectDescription: "When Prestige Points reach e20100, e20200, e20300, e20400, e20500, e20600, e20700, e20800, e20900, e21000, e21100, e21200, e21300, e21400, e21500, e21600, e21700, e21800, e21900, e22000, e22100, e22200, e22300, e22400, e22500, e22600, e22700, e22800, e22900, e23000, e23100, e23200, e23300, e23400, e23500, e23600, e23700, e23800, e23900, e24000, e24100, e24200, e24300, e24400, e24500, e24600, e24700, e24800, e24900, e25000, e25100, e25200, e25300, e25400, e25500, e25600, e25700, e25800, e25900, e26000, e26100, e26200, e26300, e26400, e26500, e26600, e26700, e26800, e26900, e27000, e27100, e27200, e27300, e27400, e27500, e27600, e27700, e27800, e27900, e28000, e28100, e28200, e28300, e28400, e28500, e28600, e28700, e28800, e28900, e29000, e29100, e29200, e29300, e29400, e29500, e29600, e29700, e29800, e29900, e30000: Prestige Points gain ^1.01-2.00 (increasing by 0.01 each)",
            done() { return player.lcb.points.gte(4) }
        },
        5: {
            requirementDescription: "500th Milestone",
            effectDescription: "When milestones reach 500, 600, 700, 800, 900, 1000, 1100, 1200, 1300, 1400, 1500, 1600, 1700, 1800, 1900, 2000, 2100, 2200, 2300, 2400, 2500, 2600, 2700, 2800, 2900, 3000, 3100, 3200, 3300, 3400, 3500, 3600, 3700, 3800, 3900, 4000, 4100, 4200, 4300, 4400, 4500, 4600, 4700, 4800, 4900, 5000, 5100, 5200, 5300, 5400, 5500, 5600, 5700, 5800, 5900, 6000, 6100, 6200, 6300, 6400, 6500, 6600, 6700, 6800, 6900, 7000, 7100, 7200, 7300, 7400, 7500, 7600, 7700, 7800, 7900, 8000, 8100, 8200, 8300, 8400, 8500, 8600, 8700, 8800, 8900, 9000, 9100, 9200, 9300, 9400, 9500, 9600, 9700, 9800, 9900, 10000, 10100, 10200, 10300, 10400: Combat Power gain ×2",
            done() { return player.lcb.points.gte(5) }
        },
        6: {
            requirementDescription: "600th Milestone",
            effectDescription: "When Infection Power reaches e1, e2, e3, e4, e5, e6, e7, e8, e9, e10, e11, e12, e13, e14, e15, e16, e17, e18, e19, e20, e21, e22, e23, e24, e25, e26, e27, e28, e29, e30, e31, e32, e33, e34, e35, e36, e37, e38, e39, e40, e41, e42, e43, e44, e45, e46, e47, e48, e49, e50, e51, e52, e53, e54, e55, e56, e57, e58, e59, e60, e61, e62, e63, e64, e65, e66, e67, e68, e69, e70, e71, e72, e73, e74, e75, e76, e77, e78, e79, e80, e81, e82, e83, e84, e85, e86, e87, e88, e89, e90, e91, e92, e93, e94, e95, e96, e97, e98, e99, e100: Infection Power gain ×1.1",
            done() { return player.lcb.points.gte(6) }
        },
        7: {
            requirementDescription: "700th Milestone",
            effectDescription: "When milestones reach multiples of 7 (7, 14, 21...700): Keep 1% of milestones on reset",
            done() { return player.lcb.points.gte(7) }
        }
    },

    resetsNothing: true,
    autoPrestige() { return hasAchievement("rw", 34) },
    doReset(resettingLayer) {
        if (layers[resettingLayer].row > layers[this.layer].row) {
            let kept = ["unlocked", "auto"]
            if (hasMilestone("lcb", 7)) kept.push("milestones")
            layerDataReset(this.layer, kept)
        }
    }
})