import { useState } from "react";
import ItemForm from './ItemForm.jsx';
import InventoryDisplay from './InventoryDisplay.jsx';
import styles from './SpacecraftBuilder.module.css';

function SpacecraftBuilder ()
{
	const [inventory, setInventory] = useState([]); // creates & manages inventory state

	function addItem (item) // takes new item {id, name} uses prev inventory for new array & adds new item
	{
		setInventory((prevInventory) => [...prevInventory, item]); // state update function that uses the most up to date version
	}

	function deleteItem (id) // id is the unique identifier of the item to be removed
	{
		setInventory((prevInventory) => prevInventory.filter((item) => item.id !== id)); // Loops array and keeps all that dont match id
	}

	return (
		<div>
			<h1>Spacecraft Builder</h1>

			<div className={styles.itemForm}>
				 <ItemForm onItemSubmit={addItem} /> {/*Renders ItemForm and changes addItem to onItemSubmit and passes to ItemForm*/}
			</div>

			<div> 
				 <InventoryDisplay  
					inventory={inventory}
					onDeleteItem={deleteItem}
				/> {/*Renders component and passes 2 props, deleteItem is renamed and passed to InventoryDisplay*/}
			</div>
		</div>
	);
}

// function SpacecraftBuilder ()
// {
//     const [inventory, setInventory] = useState([]); // creates & manages inventory state

//     const addItem = (item) => { // Or 'function addItem (item)',takes new item {id, name} uses prev inventory for new array & adds new item
//         setInventory(prev => [...prev, item]);  // This function is passed to ItemForm with ItemForm addItem={addItem} in div
        
//     };

//     const deleteItem = (id) => { // takes id of item to delete, filters inventory to exclude that item, updates state(array)
//         setInventory(prev => prev.filter(item => item.id !== id));  // prev => gives most up to date version of the state(array)
//     };// prev.filter(item.id !== id)); filter() returns a new array  item.id !== id keeps only the items not equal to one being deleted

//     return (
//         <div>
//             <h1>Spacecraft Builder</h1>

//             <div className={styles.itemForm}>
//                 <ItemForm addItem={addItem} /> {/*Renders ItemForm component and passes a prop 'addItem' to that component*/}
//             </div>
            
//              <div>
//                 <InventoryDisplay items={inventory}
//                  deleteItem={deleteItem} />  {/*Renders InventoryList & passes down 'items','deleteItem' */}
//              </div>

//         </div>
//     );
// }

export default SpacecraftBuilder;




