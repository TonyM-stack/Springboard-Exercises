import styles from "./ItemAction.module.css";

function ItemAction ({itemId, onDeleteItem}) // props passed from SB to SI and now to ItemAction
{
	return (
		<>
			<button
				className={styles.button}
				onClick={() => onDeleteItem(itemId)} // Button calls onDeleteItem(itemId), which triggers deleteItem(itemId) in SB which updates and removes item
			>                                      
				Delete
			</button>
		</>
	);
}
// function ItemAction({ id, deleteItem }) { // Creates ItemAction component
//   return (
//     <button className={styles.button}
//     onClick={() => deleteItem(id)}>
//       Delete
//     </button>



//   );
// }

export default ItemAction;