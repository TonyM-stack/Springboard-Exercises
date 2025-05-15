
/* TODO: Take the props. Set defaults to the quantity in Line 4 */

function InventoryItem ({name, type, quantity=0, price=0}) 
{
	const lowStockThreshold = 5;
	const valueThreshold = 1000;

	const totalValue = price * quantity;
    // Render the items details in h2//
    //TODO: Render the low stock alert based on the quantity of the item LINE 18
	// TODO: Render the high value alert based on the total value of the item LINE 24
	return (
		<div>
			<h2 style={{ fontFamily: "Arial", color: "green"}}>{name} ({type})</h2> 
			{
				quantity < lowStockThreshold
				&&
				<Message>
					<p style={{ color:"blue", fontSize: "1rem"}}>
						<span>⚠️</span>Low Stock! {quantity} remaining.</p>
				</Message>
			}
			{
				totalValue > valueThreshold
				&&
				<Message>
					<p style={{color:"orange",fontStyle:"italic"}}>
				<span>💸</span> High value - extra protection needed </p>
				</Message>

			}
		</div>
	);
}


