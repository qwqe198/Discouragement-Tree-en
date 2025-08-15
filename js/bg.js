addLayer("bg", { // This is the node code in the game. For example, player.p can access this layer's data. Use convenient letters, avoid starting with numbers.
    symbol: "BG", // The letter displayed on the node
    position: 3, // Node order
    startData() {
        return {
            unlocked: true, // Whether it's unlocked from the start
            points: new ExpantaNum(0),
            gp: new ExpantaNum(0),
        }
    },
    getNextAt() {
        let gain = n("1e9").mul(n("10").pow(player.bg.points.pow(1.5)))
        return gain
    },
    requires() { return new ExpantaNum("1e9") },
    color: "#00FFFF",
    resource: "Amplifiers and Generators", // Name of the reset resource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    passiveGeneration() {
        return 0
    },
    effectDescription() { 
        return `I-layer upgrade 11 effect ^${format(this.effect())}<br>You have ${format(player.bg.gp)} gp, I-layer upgrade 11 effect ^${format(this.gpeff())}.` 
    },
    effect() {
        let eff = n(2).pow(player.bg.points)
        if(player.csm.points.lt(2)) eff = n(1)
        return eff
    },
    gpgain() {
        let eff = player.bg.points.pow(2)
        return eff
    },
    gpeff() {
        let eff = player.bg.gp.add(10).log10()
        if(player.csm.points.lt(2)) eff = n(1)
        return eff
    },
    exponent: 5,
    baseAmount() { return player.points }, // Base resource amount
    baseResource: "Points", // Base resource name
    gainMult() { // Resource gain multiplier
        mult = new ExpantaNum(1)
        return mult
    },
    gainExp() { // Resource gain exponent (multiplied with exponent)
        var exp = new ExpantaNum(0.5)
        return exp
    },
    layerShown() { return inChallenge("t", 11) && player.csm.points.gte(2) },
    row: "2", // Row the layer is in on the tree (0 is the first row). QwQ: 1 can also be the first row.
    update(diff) {
        player.bg.gp = player.bg.gp.add(this.gpgain().mul(diff))
    },
})