function Pokecard(props) {
  const imgSrc = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${props.id}.png`;

  return (
    <div className="Pokecard" 
        style={{background:'#f7f7',borderRadius:'10px',boxShadow:'0 4px 8px rgba(0,0,0,0.1', padding:'5px',
            textAlign:'center',fontFamily:'Arial sans serif'
        }}>
            <h2 style={{fontSize:'30px', color:'blue'}}>{props.name}</h2>
            <img style={{width:'200px',height:'200px'}}src={imgSrc} alt={name} className="Pokecard-img"/>
            <p style={{fontSize:'30px'}}>Type: {props.type}</p>
            <p style={{fontSize:'20px'}}>EXP: {props.base_experience}</p>
    </div>
  );
}