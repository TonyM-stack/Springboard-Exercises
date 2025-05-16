function Pokedex({ pokemon }) {  //- This defines a **React functional component** named `Pokedex`.
//- The `{ pokemon }` part uses **object destructuring** to pull the `pokemon` prop out directly 
// (instead of writing `props.pokemon`).
    return (
       
       <div
       className="Pokedex" style={{display:'flex',flexWrap:'wrap',alignContent:'center',
       gap:'20px', padding:'10px',}}>
        <div style={{width:'100%',textAlign:'center'}}>
            <h1 style={{fontFamily:'Arial',fontSize:'40px',color:'darkred'}}>Pokedex</h1>
        </div>
       
        {pokemon.map(p => (         //- We're using `.map()` to **loop over the `pokemon` array**.- For each Pokémon (`p`), 
                                    // this returns a JSX element: `<Pokecard />`                  
            <Pokecard 
              key={p.id}
              id={p.id}
              name={p.name}
              type={p.type}
              base_experience={p.base_experience}
            />
        ))}
       </div> 
    );
}

  const defaultPokemon = [
        { id: 4, name: 'Charmander', type: 'fire', base_experience: 62 },
        { id: 7, name: 'Squirtle', type: 'water', base_experience: 63 },
        { id: 11, name: 'Metapod', type: 'bug', base_experience: 72 },
        { id: 12, name: 'Butterfree', type: 'flying', base_experience: 178 },
        { id: 25, name: 'Pikachu', type: 'electric', base_experience: 112 },
        { id: 39, name: 'Jigglypuff', type: 'normal', base_experience: 95 },
        { id: 94, name: 'Gengar', type: 'poison', base_experience: 225 },
        { id: 133, name: 'Eevee', type: 'normal', base_experience: 65 }
      ];






