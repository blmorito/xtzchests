import { useState } from "react";
import Item from "./Item";
import "./XTZChest.css";
import { generateAccessory, generateName, rand } from "./XTZChestLogic";

function XTZChest() {
  const [items, setItems] = useState([]);

  const generate = () => {
    const classRng = rand(1, 3);
    let weaponClass = "";
    switch (classRng) {
      case 1:
        weaponClass = "warrior";
        break;
      case 2:
        weaponClass = "rogue";
        break;
      case 3:
        weaponClass = "mage";
        break;
      default:
    }
    // alert("HELLO")
    // const newArr = items;
    // items.push(1)
    console.log("###### MINTING START ##########");
    const newItems = [];
    // headgear
    let item = { title: "", rarity: 0, type: "headgear" };
    item = generateName(item);
    newItems.push(item);
    // armor
    item = { title: "", rarity: 0, type: "armor" };
    item = generateName(item);
    newItems.push(item);
    // weapon
    item = { title: "", rarity: 0, type: "weapon", weaponClass };
    item = generateName(item);
    newItems.push(item);
    // gloves
    item = { title: "", rarity: 0, type: "gloves" };
    item = generateName(item);
    newItems.push(item);
    // boots
    item = { title: "", rarity: 0, type: "boots" };
    item = generateName(item);
    newItems.push(item);
    // acc
    item = { title: "", rarity: 0, type: "accessory" };
    item = generateAccessory(item);
    newItems.push(item);
    if (rand(1, 3) === 3) {
      // add 1 more accessory
      item = { title: "", rarity: 0, type: "accessory" };
      item = generateAccessory(item);
      newItems.push(item);
    }
    setItems(newItems);
    console.log("###### MINTING END ##########");
  };
  return (
    <div>
      <p>{items.length}</p>
      <div className="chest">
        {items.map((item) => (
          <Item item={item} />
        ))}
      </div>

      <button style={{ marginTop: 5 }} onClick={() => generate()}>
        Mint
      </button>
    </div>
  );
}

export default XTZChest;
