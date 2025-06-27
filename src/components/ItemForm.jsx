import {useState} from "react";

import styles from "./ItemForm.module.css";

function ItemForm ({onItemSubmit})  // Where all the info for inventory gets entered
{
	const INITIAL_DATA = {  // uses object(data) to hold all form fields
		name: "",
		quantity: "",
		type: "",
		agreeToTerms: false
	};

	const [data, setData] = useState(INITIAL_DATA); // Stores all form fields in single state object
	const [errors, setErrors] = useState({}); // way to track which fields are invalid, stored as an object

	function handleInputChange (event)  // Updates a forms state dynamically
	{
		const {name, value, type, checked} = event.target; // uses object destructuring to pull properties from input element in html
                                                        // so the eventHandler uses input with the dynamic handler below
		setData((prevFormData) => ({ // setData updates the state with prevFormData which copies all previous values
			...prevFormData,
			[name]: type === "checkbox" ? checked : value // Using computed property names to update a specific field
		}));  // [name] is a value or input, if the input is a checkbox use true or false, if not use the value typed by user
	}         // So name="agreetoterms" type="checkbox" checked=true then update becomes agreeToTerms: true
	

	function validateForm () // Start with empty object to collect validation errors
	{
		let newFormErrors = {};

		if (!data.name) // Checks whether the form is empty
		{
			newFormErrors.name = true; // If name is empty mark it as an error
		}
		if (!data.quantity)
		{
			newFormErrors.quantity = true;
		}
		if (!data.type)
		{
			newFormErrors.type = true;
		}
		if (!data.agreeToTerms)
		{
			newFormErrors.agreeToTerms = true;
		}

		setErrors(newFormErrors); // Stores validation errors in state, used to highlight fields (red) in a color

		return Object.keys(newFormErrors).length === 0; // Returns true if no errors, false if errors, handleSubmit will use the info
	}

	function handleSubmit (event)  // 
	{
		event.preventDefault(); // Prevents browser default form behavior

		const isFormValid = validateForm(); // Calls the validate form function, stores true or false

		if (isFormValid)  // Proceeds only if form passed validation checks
		{
			const newItem = {  // Spreads the data object (name, qty, type, etc), adds unique id timestamp and random number
				...data,
				id: `${Date.now()}-${Math.floor(Math.random() * 1000)}`
			};

			onItemSubmit(newItem);  // calls the addItem(onItemSubmit)function from SB that was passed down and passes new item to it, updates inventory in SB
			setData(INITIAL_DATA);  // Resets the form by clearing the input state.
			setErrors({});    // Clears the error state so no fields remain highlighted.
		}
	}
// function ItemForm({addItem}) {  // addItem is recieved as a prop and called in handleSubmit by addItem(newItem)
//     const [name, setName] = useState("");  // stores input values for name
//     const [type, setType] = useState("");  // stores input values for type
//     const [quantity, setQuantity] = useState(""); // stores input values for quantity
//     const [error, setError] = useState({name: false, type: false,}); // if a field is empty on submission it gets flagged with CSS

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         const errors = {    // Each key in the errors object corresponds to a form field, and the value is true if that field is invalid.
//            name: name.trim() === '', // → Checks if the name is empty or only whitespace.
//            type: type.trim() === '',  // → Checks if the dropdown has a selected value.
//            quantity: quantity.trim() === '' || isNaN(quantity) || Number(quantity) <= 0,
//         };  // Ensures qty is not blank, is a number, and is greater than 0
//         setError(errors); // allows storage of errors in state and highlight each feild with error in css

//         const hasError = Object.values(errors).some(err => err); // if there is an error stops submission
//         if (hasError) return; // prevents following block from running unless all fields are valid

//         const newItem = {
//             id: Date.now().toString(),
//             name,
//             type,
//             quantity: Number(quantity)
//         };
        
//         addItem(newItem); // When the form is submited valid data, addItem(newItem) is called, which triggers setInventory(...) in SpacecraftBuilder — effectively updating the inventory state.
//         setName('');
//         setType('');
//         setQuantity('');
//         setError({ name: false, type: false, quantity: false });
//     };

    return (
       <form onSubmit={handleSubmit} // Handles form submission via handleSubmit
        className={styles.form}
       >
         <h2>Add an Item to the Inventory</h2>

          {/* 4 INPUT FIELDS */}
         <div className={`${styles.element} ${errors["name"] ? styles.error : ""}`}>
            {/* Allows you to dynamically highlight input fields that are in error using template literals */}
            <input
                type="text"
              	name="name"
				placeholder="Name"
				value={data.name}
				onChange={handleInputChange}
            />
         </div>

         <div className={`${styles.element} ${errors["quantity"] ? styles.error : ""}`}>
				<input
					type="number"
					name="quantity"
					placeholder="Quantity"
					value={data.quantity}
					onChange={handleInputChange}
				/>
			</div>

            <div className={`${styles.element} ${errors["type"] ? styles.error : ""}`}>
				<textarea
					name="type"
					placeholder="Type"
					value={data.type}
					onChange={handleInputChange}
				/>
			</div>

            	<div className={`${styles.agreeToTerms} ${errors["agreeToTerms"] ? styles.error : ""}`}>
				<input
					type="checkbox"
					name="agreeToTerms"
					id="agreeToTerms"
					checked={data.agreeToTerms}
					onChange={handleInputChange}
				/>
				<label htmlFor="agreeToTerms">Agree to Terms</label>
			</div>

			<button // Submits form and triggers handleSubmit
				type="submit"
				className={styles.button}
			>
				Add
			</button>

      
       </form>      
    );
}

export default ItemForm;
