import styles from "./BuildPage.module.css";
import {Link} from "react-router-dom";
import {useState} from "react";
import SpaceTravelApi from "../services/SpaceTravelApi";
import { useNavigate } from "react-router-dom";
import { useSpacecrafts } from "../context/SpacecraftContext";
import Button from "../components/Button";

function BuildPage({refreshSpacecrafts}) {
    console.log("BuildPage rendering");

    const [formData, setFormData] = useState({
        name: "",
        capacity: "",
        description: "",
        pictureUrl: "", 
    });

    const [errors, setErrors] = useState({});  // State to hold validation errors, validating the form data
    const {setSpacecrafts } = useSpacecrafts(); // Using the context to set spacecrafts
    const navigate = useNavigate(); // Hook to programmatically navigate after form submission
    // const [pictureUrl, setPictureUrl] = useState(""); // State to hold the selected picture URL

  const imageOptions = [
  {
    label: 'SpaceX',
    value:
      'https://upload.wikimedia.org/wikipedia/commons/0/07/SpaceX_Crew_Dragon.jpg',
  },
  {
    label: 'Faith 7',
    value:
      'https://upload.wikimedia.org/wikipedia/commons/c/c5/Faith_7_spacecraft%2C_Space_Center_Houston%2C_Texas%2C_US_julesvernex2.jpg',
  },
  {
    label: 'Interstellar ',
    value:
      'https://upload.wikimedia.org/wikipedia/commons/7/76/Interstellar_spacecraft.png',
  },
];


    function validate() {
        const newErrors = {};
        if (!formData.name) newErrors.name = "Name is required";
        if (!formData.capacity || isNaN(formData.capacity)) newErrors.capacity = "Capacity must be a number";
        if (!formData.description) newErrors.description = "Description is required";
        return newErrors;
    }

    async function handleSubmit(event) {
        event.preventDefault(); // Prevent the default form submission behavior

        const newErrors = validate(); // Validate input data 
        setErrors(newErrors); // Show validation errors 

        if (Object.keys(newErrors).length > 0) return; // If there are validation errors, do not proceed
       
        // build the spacecraft 
        await SpaceTravelApi.buildSpacecraft({...formData, 
            capacity: Number(formData.capacity), // Convert capacity to a number;
        });
    
       
         const refreshed = await SpaceTravelApi.getSpacecrafts();
         if (!refreshed.isError) setSpacecrafts(refreshed.data); 
        navigate("/spacecrafts"); // Navigate to the Spacecrafts page after successful submission
    }

  return (
   
    <div className={styles.container}>
      <h1 className={styles.heading}>Build Your Spacecraft</h1>

      <p className={styles.section}>
        Welcome to the Build page, where you can design and create your own spacecraft. Choose from various components and configurations to engineer a vessel that meets your space travel needs.
      </p>
      
         <Button onClick={() => navigate(-1)}  variant="backButton">  {/*Go back 1 */}
               Back
         </Button>

        <div className={styles.formBox}>
         <form className={styles.form} onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Name"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className={errors.name ? styles.error : ""}
              />
               {errors.name && <p className={styles.error}>{errors.name}</p>}

             <input
               type="number"
               placeholder="Capacity"
               value={formData.capacity}
               onChange={(e) => setFormData({ ...formData, capacity: e.target.value})}
               className={errors.capacity ? styles.error : ""}
               />
                 {errors.name && <p className={styles.error}>{errors.capacity}</p>}

            <textarea
              placeholder="Description"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              className={errors.description ? styles.error : ""}
            />
            {errors.name && <p className={styles.error}>{errors.description}</p>}

            {/* <input
                type="text"
                placeholder="Picture URL"
                value={formData.pictureUrl}
                onChange={(e) =>
                setFormData({ ...formData, pictureUrl: e.target.value })} // Should update formData with pictureUrl  
            /> */}

              {/* ↓ dropdown for pictureUrl ↓ */}
      <label htmlFor="picture-select" className={styles.label}>
        Choose an Image:
      </label>
      <select
        id="picture-select"
        className={styles.select}
        value={formData.pictureUrl}
        onChange={e => {
            // setPictureUrl(e.target.value);
            setFormData({ ...formData, pictureUrl: e.target.value }); // Update formData with selected pictureUrl
        }}
      >
        {/* Options for the dropdown */}
        <option value="">-- pick one (or paste below) --</option>
        {imageOptions.map(opt => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      {/* optional: let them still paste a custom URL */}
      <input
        className={styles.input}
        type="text"
        placeholder="…or paste a custom URL"
        value={formData.pictureUrl}
        onChange={e => {
            // setPictureUrl(e.target.value);
            setFormData({ ...formData, pictureUrl: e.target.value }); // Update formData with custom URL
        }}
      />

      {/* preview */}
      {formData.pictureUrl && (
        <div className={styles.preview}>
          <img
            src={formData.pictureUrl} 
            alt="Preview"
            className={styles.previewImage}
          />
        </div>
      )}

               <Button type="submit" variant="submitButton">
                       Build Spacecraft 
               </Button>  

         </form>  
      </div>
          
    </div>
 
  );
}

export default BuildPage;