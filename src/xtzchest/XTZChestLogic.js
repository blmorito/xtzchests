import {
  baseAccessories,
  baseArmor,
  baseBoots,
  baseGloves,
  baseHeadgear,
  baseWeapMage,
  baseWeapRogue,
  baseWeapWarrior,
  prefix,
  prefixEpic,
  prefixRare,
  prefixSuper,
  suffix,
  suffixEpic,
  suffixRare,
} from "./items";

export function isCorrupted() {
  const rng = rand(1, 1000);
  return rng === 666;
}

export function generateName(item) {
  console.log("~~ Generating " + item.type);
  let txt = "";
  switch (item.type) {
    case "headgear":
      txt = baseHeadgear[rand(0, baseHeadgear.length - 1)];
      break;
    case "armor":
      txt = baseArmor[rand(0, baseHeadgear.length - 1)];
      break;
    case "gloves":
      txt = baseGloves[rand(0, baseGloves.length - 1)];
      break;
    case "boots":
      txt = baseBoots[rand(0, baseBoots.length - 1)];
      break;
    case "weapon":
      if (item.weaponClass === "warrior") {
        txt = baseWeapWarrior[rand(0, baseWeapWarrior.length - 1)];
      } else if (item.weaponClass === "rogue") {
        txt = baseWeapRogue[rand(0, baseWeapRogue.length - 1)];
      } else if (item.weaponClass === "mage") {
        txt = baseWeapMage[rand(0, baseWeapMage.length - 1)];
      }
      break;
  }
  item = addPrefix(item);
  item = addSuffix(item);
  if (item.rarity > 0) {
    item = addTier(item);
  }
  item.title =
    (item.prefix ? `${item.prefix} ` : "") +
    txt +
    ` ${item.suffix}` +
    (item.tier ? ` ${item.tier}` : "");
  if (isCorrupted()) {
    item.title = `Corrupted ${item.title}`;
    item.rarity = -1;
  }
  console.log(item);
  return item;
}

export function generateAccessory(item) {
  console.log("~~ Generating " + item.type);
  let txt = baseAccessories[rand(0, baseAccessories.length - 1)];
  const psRng = rand(1, 2);
  // accessory can only have prefix or suffix, not both.
  if (psRng === 1) {
    item = addPrefix(item);
  } else {
    item = addSuffix(item);
  }
  if (item.rarity > 0) {
    item = addTier(item);
  }
  item.title =
    (item.prefix ? `${item.prefix} ` : "") +
    txt +
    (item.suffix ? ` ${item.suffix}` : "") +
    (item.tier ? ` ${item.tier}` : "");
  if (isCorrupted()) {
    item.title = `Corrupted ${item.title}`;
    item.rarity = -1;
  }
  console.log(item);
  return item;
}

export function rand(lowest, highest) {
  var adjustedHigh = highest - lowest + 1;
  return Math.floor(Math.random() * adjustedHigh) + parseFloat(lowest);
}

export function addPrefix(item) {
  let rarity = 0;
  let pref = "";
  const rng = rand(1, 10);
  if (rng > 5) {
    if (rand(1, 10) > 5) {
      if (rand(1, 10) > 5) {
        if (rand(1, 10) > 5) {
          rarity = 4;
        } else {
          rarity = 3;
        }
      } else {
        rarity = 2;
      }
    } else {
      rarity = 1;
    }
  }
  switch (rarity) {
    case 1:
      pref = prefix[rand(0, prefix.length - 1)];
      break;
    case 2:
      pref = prefixRare[rand(0, prefixRare.length - 1)];
      break;
    case 3:
      pref = prefixEpic[rand(0, prefixEpic.length - 1)];
      break;
    case 4:
      pref = prefixSuper[rand(0, prefixSuper.length - 1)];
      break;
  }
  if (item.rarity !== -1) {
    item.rarity = rarity;
  }
  item.prefix = pref;
  return item;
}

export function addSuffix(item) {
  let rarity = 0;
  let suff = "";
  const rng = rand(1, 10);
  if (rng > 6) {
    if (rand(1, 10) > 5) {
      if (rand(1, 10) > 9) {
        rarity = 3;
      } else {
        rarity = 2;
      }
    } else {
      rarity = 1;
    }
  }
  switch (rarity) {
    case 1:
      suff = suffix[rand(0, suffix.length - 1)];
      break;
    case 2:
      suff = suffixRare[rand(0, suffixRare.length - 1)];
      break;
    case 3:
      suff = suffixEpic[rand(0, suffixEpic.length - 1)];
      break;
  }
  item.suffix = suff;
  return item;
}

export function addTier(item) {
  let tier = "";
  let rng = rand(1, 10);
  if (item.rarity > 2) {
    // higher chance for tier
    if (rng > 2) {
      tier = getTier();
    }
  } else {
    if (rng > 7) {
      tier = getTier();
    }
  }
  item.tier = tier;
  return item;
}
function getTier() {
  let tier = "";
  let rng = rand(1, 10);
  if (rng > 5) {
    rng = rand(1, 10);
    if (rng > 5) {
      rng = rand(1, 10);
      if (rng > 7) {
        tier = "V";
      } else {
        tier = "IV";
      }
    } else {
      tier = "III";
    }
  } else {
    tier = "II";
  }
  return tier;
}
