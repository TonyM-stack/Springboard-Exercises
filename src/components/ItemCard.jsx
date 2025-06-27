import styles from './ItemCard.module.css'

function ItemCard({ name, type, quantity }) { // Creates component and Destructures props: name, type, qty, pulls them out of 
                                              // an object or array to assign to a variable.  Cleaner, easier to read
  return (
    <> 
      <h2 className={styles.title}>{name}</h2>
      <p className={styles.detail}>Type: {type}</p>
      <p className={styles.detail}>Quantity: {quantity}</p>
    </>
  );
}

export default ItemCard;