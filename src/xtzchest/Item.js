import './Item.css'
function Item({ item }) {
  const cls = `rar${item.rarity}`;
  return (
    <div style={{ color: "", marginBottom: 7, fontSize: 14 }} className={cls}>
      {item.title}
    </div>
  );
}
export default Item;
