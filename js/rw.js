addLayer("rw", {
    startData() {
        return {
            unlocked: true,
        }
    },
    color: "yellow",
    row: "side",
    layerShown() { return hasMilestone("cq", 1) || hasAchievement("rw", 81) },
    tooltip() {
        return "Quests"
    },
    symbol: "Qu",
    achievements: {
        11: {
            name: "Enter Beginner Village",
            done() { return hasMilestone("cq", 1) },
            tooltip: "Gain 1 Combat Power. Reward: No offline time cap."
        },
        12: {
            name: "No Cost",
            done() { return hasMilestone("cq", 1) && hasMilestone("esc", 4) },
            tooltip: "Gain 4 Discouragement Points. Reward: esc upgrades become free."
        },
        13: {
            name: "Prestige Again",
            done() { return hasMilestone("cq", 1) && player.a.points.gte(1) },
            tooltip: "Gain 1 Prestige Point. Reward: ×1.005 boost."
        },
        14: {
            name: "Meta Meta Meta",
            done() { return hasMilestone("cq", 1) && player.m.points.gte(1) },
            tooltip: "Gain 1 Meta-property. Reward: Meta-property effect ^1.025."
        },
        15: {
            name: "HP or Life?",
            done() { return hasMilestone("cq", 1) && player.l.points.gte(1) },
            tooltip: "Gain 1 Life. Reward: Life and HP gain ×1.5."
        },
        16: {
            name: "Prestige Bonus",
            done() { return hasMilestone("cq", 1) && player.q.points.gte(1) },
            tooltip: "Gain 1 Prestige Bonus. Reward: Prestige Points gain ×1e10."
        },
        17: {
            name: "Second Time",
            done() { return player.cq.points.gte(2) },
            tooltip: "Gain 2 Combat Power. Reward: +1 ATK."
        },
        21: {
            name: "Unlock Trials",
            done() { return player.cq.points.gte(3) },
            tooltip: "Gain 3 Combat Power. Reward: Points gain ×2."
        },
        22: {
            name: "Discouragement Reverse Effect",
            done() { return player.cq.challenges[11] >= 1 },
            tooltip: "Complete 1 Easy Trial 1. Reward: Auto-buy Prestige Bonus."
        },
        23: {
            name: "Tower of Babel!",
            done() { return player.cq.points.gte(5) },
            tooltip: "Gain 5 Combat Power. Reward: ATK works on Tower monsters."
        },
        24: {
            name: "Weaker Buyables",
            done() { return player.cq.challenges[12] >= 1 },
            tooltip: "Complete 1 Easy Trial 2. Reward: p-layer buyable 11 effect ×1.01, 12 effect ^1.1."
        },
        25: {
            name: "Start Climbing",
            done() { return buyableEffect("t", 11).gte(1) },
            tooltip: "Climb 1 Tower floor. Reward: Reset Energy gain ^1.025 then ×1e10."
        },
        26: {
            name: "Getting Better",
            done() { return buyableEffect("t", 11).gte(5) },
            tooltip: "Climb 5 Tower floors. Reward: DEF ×1.1."
        },
        27: {
            name: "This Quest is Sponsored",
            done() { return player.cq.challenges[13] >= 1 },
            tooltip: "Complete 1 Easy Trial 3. Reward: Expansion reward ^1.05."
        },
        31: {
            name: "Automation 1",
            done() { return player.cq.points.gte(13) },
            tooltip: "Keep all auto p-layer buyables on Combat Power reset. Reward: Auto-gain Discouragement Points."
        },
        32: {
            name: "Automation 2",
            done() { return player.cq.points.gte(20) },
            tooltip: "Keep all auto p-layer challenges on Combat Power reset. Reward: Discouragement Points no longer reset anything."
        },
        33: {
            name: "The Drunkard's Pavilion",
            done() { return player.cq.challenges[21] >= 1 },
            tooltip: "Complete 1 Easy Trial 4. Reward: HP gain ^1.1."
        },
        34: {
            name: "Double Power",
            done() { return player.lcb.points.gte(5) },
            tooltip: "Gain 2 Combat Power in one reset. Reward: Auto-reset milestones."
        },
        35: {
            name: "There's More?",
            done() { return player.cq.points.gte(25) },
            tooltip: "Unlock Dungeon. Reward: Unlock a new layer."
        },
        36: {
            name: "Bug Hunt",
            done() { return player.a1.points.gte(1) },
            tooltip: "Kill 1 Amoeba. Reward: HP buy price ^0.9."
        },
        37: {
            name: "Bugs Hunt Points",
            done() { return hasUpgrade("a1", 12) },
            tooltip: "Get A-layer upgrade 12. Reward: Upgrade count boosts previous upgrade effect (^x)."
        },
        41: {
            name: "More Bugs",
            done() { return hasUpgrade("a1", 13) },
            tooltip: "Get A-layer upgrade 13. Reward: Amoeba ×1.2."
        },
        42: {
            name: "Self-Replicating Bugs",
            done() { return hasUpgrade("a1", 14) },
            tooltip: "Get A-layer upgrade 14. Reward: Keep auto p-layer upgrades."
        },
        43: {
            name: "Bug Purchases",
            done() { return hasUpgrade("a1", 15) },
            tooltip: "Get A-layer upgrade 15. Reward: Auto-buy esc-layer upgrades."
        },
        44: {
            name: "Points Cap",
            done() { return player.points.gte("1e50000") },
            tooltip: "Get 1e50000 points. Reward: Amoeba only resets HP. Hint: Points gain seems hardcapped, enter 2nd dungeon to increase."
        },
        45: {
            name: "Discouragement Overflow",
            done() { return hasMilestone("esc", 11) },
            tooltip: "Get 11 Discouragement Points. Reward: Auto-buy L-layer buyable 11."
        },
        46: {
            name: "Increment Start",
            done() { return player.i.points.gte(1) },
            tooltip: "Gain 1 Increment. Reward: Increment gain scales with itself."
        },
        51: {
            name: "Virus Tree Endgame?",
            done() { return player.points.gte("1.1981e7") && inChallenge("t", 11) },
            tooltip: "Get 1.1981e7 points in Enhanced Vaccine. Reward: DEF works on Tower monsters."
        },
        47: {
            name: "1e6",
            done() { return player.points.gte("1e6") && inChallenge("t", 11) },
            tooltip: "Get 1e6 points in Enhanced Vaccine. Reward: Easy Trial 3 is easy - Keep L-layer buyables on reset."
        },
        52: {
            name: "Oh No, Softcap",
            done() { return upgradeEffect("a1", 11).gte("1e100") },
            tooltip: "A-layer upgrade 11 effect reaches 1e100. Reward: Effects above 1e100 get ^0.5 exponent."
        },
        53: {
            name: "This Seems Useless",
            done() { return getBuyableAmount("a1", 11).gte(5) },
            tooltip: "Buy A-layer buyable 11 5 times. Reward: This buyable affects Increment gain."
        },
        54: {
            name: "More Increments",
            done() { return player.i.points.gte(5e22) },
            tooltip: "Get 5e22 Increments. Reward: Unlock Easy Trial 5."
        },
        55: {
            name: "Zodiac",
            done() { return buyableEffect("t", 11).gte(14) },
            tooltip: "Get 12 Tower milestones. Reward: Flawless Points ×12."
        },
        56: {
            name: "1e10",
            done() { return player.points.gte("1e10") && player.i.points.gte("1e110") && inChallenge("t", 11) },
            tooltip: "Get 1e10 points and 1e110 Increments in Enhanced Vaccine. Reward: Points ×1e15 then ^1.15."
        },
        57: {
            name: "Break Restrictions",
            done() { return player.cq.challenges[22] >= 1 },
            tooltip: "Complete 1 Easy Trial 5. Reward: HP gain ^1.05."
        },
        61: {
            name: "Exponential Base",
            done() { return hasUpgrade("a1", 25) },
            tooltip: "Get A-layer upgrade 25. Reward: This upgrade is already powerful."
        },
        62: {
            name: "1e13",
            done() { return player.points.gte("1e13") && player.i.points.gte("1e411") && inChallenge("t", 11) },
            tooltip: "Get 1e13 points and 1e411 Increments in Enhanced Vaccine. Reward: Auto-buy I-layer upgrades, Amoeba ×13."
        },
        63: {
            name: "Amoeba Life",
            done() { return getBuyableAmount("a1", 13).gte(1) },
            tooltip: "Buy A-layer buyable 13 once. Reward: Unlock new battle."
        },
        64: {
            name: "What's the 4th Number",
            done() { return hasUpgrade("cq", 64) },
            tooltip: "Get cq-layer upgrade 64. Reward: Of course it's damage exponent."
        },
        65: {
            name: "Matches Quest Number",
            done() { return hasUpgrade("cq", 65) },
            tooltip: "Get cq-layer upgrade 65. Reward: Increment gain ^1.05."
        },
        66: {
            name: "1e15",
            done() { return player.points.gte("1e15") && player.i.points.gte("1e533") && inChallenge("t", 11) },
            tooltip: "Get 1e15 points and 1e533 Increments in Enhanced Vaccine. Reward: Soon... Increment magnitude boosts Flawless Points and Amoeba."
        },
        67: {
            name: "Portal",
            done() { return player.csm.points.gte("1") && inChallenge("t", 11) },
            tooltip: "Get 1 Portal in Enhanced Vaccine. Reward: Auto-buy Increment Strength."
        },
        71: {
            name: "Rebirth Increment?",
            done() { return player.csm.ati.gte("1") && inChallenge("t", 11) },
            tooltip: "Get 1 Rebirth Increment. Reward: A-layer upgrade 14 effect squared."
        },
        72: {
            name: "Three Infusions 1",
            done() { return getBuyableAmount("csm", 11).gte(3) },
            tooltip: "Buy 3 Point Infusions. Reward: Unlock Increment Infusion at 1 Portal."
        },
        73: {
            name: "Three Infusions 2",
            done() { return getBuyableAmount("csm", 12).gte(3) },
            tooltip: "Buy 3 Increment Infusions. Reward: Unlock Amoeba upgrade and Amoeba Infusion at 1 Portal."
        },
        74: {
            name: "3^3 Infusions 3",
            done() { return getBuyableAmount("csm", 13).gte(7) },
            tooltip: "Buy 3^3 (7) Amoeba Infusions. Reward: Auto-buy Increment Speed."
        },
        75: {
            name: "Half of Easy Trial",
            done() { return player.cq.challenges[13] >= 5 },
            tooltip: "Fully complete Easy Trial 3. Reward: Unlock Easy Trial 6, Points ×1e7.5 then ^1.075."
        },
        76: {
            name: "Hidden Condition",
            done() { return inChallenge("cq", 23) },
            tooltip: "Enter Easy Trial 6. Reward: Can't gain Reset Points per second, but Discouragement Point 7 first effect works in trials."
        },
        77: {
            name: "Finally Arrived",
            done() { return player.cq.challenges[23] >= 1 },
            tooltip: "Complete 1 Easy Trial 6. Reward: Your expansions won't be less than Combat Power milestones-3, hidden Easy Trials 1-2, new Combat Power milestones."
        },
        81: {
            name: "More Rewards, Harder Enemies",
            done() { return player.grz.points.gte(1) },
            tooltip: "Kill 1 Infected. Reward: Keep trials in all resets."
        },
        82: {
            name: "Second Time 2",
            done() { return player.grz.points.gte(2) },
            tooltip: "Kill 2 Infected. Reward: Keep 25 Combat Power milestones."
        },
        83: {
            name: "Two More Times",
            done() { return player.grz.points.gte(4) },
            tooltip: "Kill 4 Infected. Reward: Auto-buy Legend upgrades."
        },
        84: {
            name: "New Buyable",
            done() { return player.grz.points.gte(6) },
            tooltip: "Kill 6 Infected. Reward: IN-layer upgrade 15 affects Infection Power."
        },
        85: {
            name: "Two Rows of Upgrades",
            done() { return hasUpgrade("grz", 26) },
            tooltip: "Get two rows of Infected upgrades. Reward: Rebirth Increment ×10, unlock second effects for first 3 infusions."
        },
        86: {
            name: "One Upgrade Beyond Cap",
            done() { return upgradeEffect("i", 11).gte("1e50000") },
            tooltip: "Increment upgrade 11 effect exceeds 1e50000. Reward: Infection Power gain ×10."
        },
        87: {
            name: "Tenth",
            done() { return player.grz.points.gte(10) },
            tooltip: "Kill 10 Infected. Reward: Keep 300 Combat Power on reset."
        },
        91: {
            name: "1e24",
            done() { return player.points.gte("1e24") && inChallenge("t", 11) },
            tooltip: "Get 1e24 points in Enhanced Vaccine. Reward: Auto-buy Amoeba upgrades and keep 100% Amoeba per second."
        },
        92: {
            name: "Contagious Infection",
            done() { return player.grz.points.gte(13) },
            tooltip: "Kill 13 Infected. Reward: Auto-increase Life."
        },
        93: {
            name: "Even More",
            done() { return player.grz.points.gte(14) },
            tooltip: "Kill 14 Infected. Reward: Points cap ×1e50."
        },
        94: {
            name: "Further Expansion",
            done() { return player.l.challenges[11] >= 22 },
            tooltip: "Complete 22 Expansions. Reward: Written in Combat Power milestones."
        },
        95: {
            name: "Very Lucky Number",
            done() { return upgradeEffect("i", 11).gte("1e888888") },
            tooltip: "Increment upgrade 11 effect exceeds 1e888888. Reward: Infected upgrade 23 effect is squared."
        },
        96: {
            name: "2^4",
            done() { return player.grz.points.gte(16) },
            tooltip: "Kill 16 Infected. Reward: Your Tower floors won't go below 20."
        },
        97: {
            name: "Can You Really Afford It?",
            done() { return player.cq.challenges[23] >= 2 },
            tooltip: "Complete 2 Easy Trials 6. Reward: Check inside to find out."
        },
        101: {
            name: "Final Prep Before New Content",
            done() { return hasUpgrade("grz", 61) },
            tooltip: "Buy first 5 rows of Contagious Infection upgrades. Reward: Increment ^1.1."
        },
        102: {
            name: "Very Lucky Number 2",
            done() { return player.i.points.gte("8.88e888") },
            tooltip: "Get 8.88e888 Increments. Reward: Increment gain cap becomes Portal requirement ×1000."
        },
        103: {
            name: "Infectious Disease?",
            done() { return player.grz.points.gte(18) },
            tooltip: "Kill 18 Infected. Reward: 2nd and 3rd infusion second effects ^2.2222."
        },
        104: {
            name: "Remember to Finish Before Reset",
            done() { return player.csm.points.gte(2) },
            tooltip: "Get 2 Portals. Reward: Keep Portal contents on Portal reset."
        },
        105: {
            name: "1e3",
            done() { return player.points.gte("1e3") && inChallenge("t", 11) && player.csm.points.gte(2) },
            tooltip: "Get 1e3 points in Enhanced Vaccine with 2 Portals. Reward: Increment reset requirement reduced to 10%."
        },
        106: {
            name: "Two Resources",
            done() { return player.bg.points.gte(1) },
            tooltip: "Get 1 Amplifier and Generator. Reward: Life gain ×69."
        },
        107: {
            name: "Second Life Buyable",
            done() { return getBuyableAmount("l", 12).gte(1) },
            tooltip: "Buy Life buyable 12 once. Reward: Remove softcap on Power gain and Infected base buyable."
        },
        111: {
            name: "Infinite Infection",
            done() { return player.grz.ll.gte("1.798e308") },
            tooltip: "Get 1.798e308 Infection Power. Reward: Infected upgrade 14 first effect ^(Infected+1)."
        },
        112: {
            name: "Infinite Infection ×10",
            done() { return player.grz.ll.gte("1.798e309") },
            tooltip: "Get 1.798e309 Infection Power. Reward: Remove Infected upgrade 22 softcap."
        },
        113: {
            name: "316",
            done() { return player.grz.ll.gte("3.16e316") },
            tooltip: "Get 3.16e316 Infection Power. Reward: Infection Power ×1e10 when overflowing."
        },
        114: {
            name: "Infectious Disease!",
            done() { return player.grz.jb.gte(1) },
            tooltip: "Get 1 Infectious Disease. Reward: Keep 1 Portal when entering Enhanced Vaccine."
        },
        115: {
            name: "Stuck?",
            done() { return getBuyableAmount("grz", 41).gte(9) },
            tooltip: "Buy Disease gain 9 times. Reward: Change expansion requirement to points."
        },
        116: {
            name: "Power Base Boost",
            done() { return hasUpgrade("grz", 72) },
            tooltip: "Buy all 6th row Contagious Infection upgrades. Reward: Infectious Disease gain ×1.5."
        },
        117: {
            name: "Game Crashing?",
            done() { return hasUpgrade("grz", 84) },
            tooltip: "Buy 4th Infectious Disease upgrade. Reward: Impossible - actually Infected base overflows at 300, x->(lg(x+700))*100, immunity reduction boosts Infected upgrade 25 effect, removes upgrade softcap."
        },
        121: {
            name: "Power Base!",
            done() { return getBuyableAmount("grz", 21).gte(2) },
            tooltip: "Buy Power base 2 times. Reward: Modify Infected upgrade 21 formula."
        },
        122: {
            name: "Deeper In",
            done() { return hasUpgrade("grz", 63) },
            tooltip: "Buy a 7th row Contagious Infection upgrade. Reward: Modify Infected upgrade 34 formula, Infectious Disease gain ×2.2222."
        },
        123: {
            name: "777",
            done() { return player.grz.jb.gte(7.77e77) },
            tooltip: "Get 7.77e77 Infectious Disease. Reward: 2nd Life buyable affects expansion effect."
        },
        124: {
            name: "Journey to the West",
            done() { return player.l.challenges[11] >= 25 },
            tooltip: "Complete 25 Expansions. Reward: Reduce milestone price."
        }
    },
    tabFormat: [
        "blank",
        ["display-text", function() { return "Quests: " + player.rw.achievements.length + "/" + (Object.keys(tmp.rw.achievements).length - 2) }],
        "blank", "blank",
        "achievements"
    ]
})
