
import ItemCard from './ItemCard';
import ItemAction from './ItemAction';

import styles from './InventoryDisplay.module.css';

// This code returns the InventoryDisplay UI with cards showing each items name, qty, type and a button to delete
function InventoryDisplay ({inventory, onDeleteItem})  // Accepts an items array and a deleteItem function, recieved from SB
{                                                      // Destructures inventory and onDeleteItem
  return (                      
    <div>
      <h2> Inventory</h2>
      
      {
        inventory.map((item) => (  // Loops over each item in the inventory array
          <div 
              key={item.id}  // required by React to track items in a list, key prop
               className={styles.itemContainer}  // Applies styles from the CSS module
          >
             <div>
                <ItemCard  // Renders the ItemCard component for current item, passes props for name, type, qty
                    name={item.name} 
                    type={item.type} 
                    quantity={item.quantity} 
                /> 
              </div>

                 <div>
                   <ItemAction // Renders a separate ItemAction component (Delete Button), passes 2 props itemId and onDeleteItem
                   
                       itemId={item.id} // unique id for this item
                       onDeleteItem={onDeleteItem} // callback function to remove item, defined in SpacecraftBuilder w/ deleteItem(id) function
                    />  
                  </div> {/* deleteItem is renamed onDeleteItem when component is rendered and passed from InventoryDisplay to ItemAction */}
            </div>
        ))
       }  
    </div>
  );
}

export default InventoryDisplay;
