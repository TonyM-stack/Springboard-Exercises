import styles from "./HomePage.module.css";


function HomePage() 
{
    console.log("HomePage rendering");
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Space Travel: Expanding Horizons Beyond Earth</h1>
         <h2 className={styles.sectionHeading}>
          <span style={{ fontSize: "3rem"}}>👨‍🚀</span>  Journey Into The Future</h2>
        <p className={styles.section}>In a world where the impossible has become reality, where the 
        stars are no longer out of reach, welcome to the future of humanity's survival and exploration.
        Witness the evolution of technology as it transforms barren planets into thriving havens, all made
        possible by the wonders of inovation and human determination.
        </p>
      <h2 className={styles.sectionHeading}>
        <span style={{ fontSize: "3rem"}}>🌎</span> From Neglect to Innovation</h2>
        <p className={styles.section}>Once the cradle of civilization, Earth now stands as a solemn reminder of 
          the consequences or neglect and envionmnetal degradation. But fear not, for the ingeuity of mankind has 
          soared to new heights.  With our relentles pursuit of advancement, we have not only healed our scars but 
          extended our reach across the cosmos.
        </p>
      <h2 className={styles.sectionHeading}>
         <span style={{ fontSize: "3rem"}}>🚀</span> Enter Space Travel: Where Dreams Take Flight</h2> 
        <p className={styles.section}>Embark on an extraordinary journey with our groumdbreaking web application,
          aptly nameed "Space Travel." As a commander engineer, the fate of humannity's exodus rests in your hands.
          Prepare to face the ultimate challenge: evacuating humankind from their birthplace and guiding them towards
          a future among the stars
        </p>
      <h2 className={styles.sectionHeading}>
        <span style={{ fontSize: "3rem"}}>🛠️</span> Engineer, Explorer, Leader</h2> 
        <p className={styles.section}>Space Travel empowers you to engineer, design, and even dsimantle spacecraft.
          Craft vessels that defy the boundaries of imagination, envisioning a future where life flourishes beyond 
          the stars.  But remember, your role extends beyond construction - you are a leader, an explorer, a commander
          steering humanity's destiny.
        </p>
        <h2 className={styles.sectionHeading}>
           <span style={{ fontSize: "3rem"}}>👽</span> A Universe of Possibilities Awaits</h2> 
        <p className={styles.section}>Immerse yourself in the thrill of exploration as you chart interplanetary courses
          within our solar system.   Seamlessly navigate your fleet of spacecraft, hurtling through the cosmic void from 
          one celestial body to another. The universe becomes your playground, and every planet a potential home.
        </p>

    </div>
  );
}

export default HomePage;
