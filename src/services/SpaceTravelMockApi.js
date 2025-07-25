console.log("🔨 SpaceTravelMockApi module loaded");

import {nanoid} from "nanoid";
export class SpaceTravelMockApi
{
  static MOCK_DB = {
    planets: [
      {
        id: 0,
        name: "Mercury",
        currentPopulation: 0,
        pictureUrl: "https://upload.wikimedia.org/wikipedia/commons/8/88/Reprocessed_Mariner_10_image_of_Mercury.jpg"

      },
      {
        id: 1,
        name: "Venus",
        currentPopulation: 0,
        pictureUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Venus_globe.jpg/800px-Venus_globe.jpg"

      },
      {
        id: 2,
        name: "Earth",
        currentPopulation: 100000,
        pictureUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/The_Blue_Marble_%28remastered%29.jpg/800px-The_Blue_Marble_%28remastered%29.jpg"

      },
      {
        id: 3,
        name: "Mars",
        currentPopulation: 0,
        pictureUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/OSIRIS_Mars_true_color.jpg/800px-OSIRIS_Mars_true_color.jpg"
      },
      {
        id: 4,
        name: "Jupiter",
        currentPopulation: 0,
        pictureUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Jupiter%2C_image_taken_by_NASA%27s_Hubble_Space_Telescope%2C_June_2019.png/800px-Jupiter%2C_image_taken_by_NASA%27s_Hubble_Space_Telescope%2C_June_2019.png"

      },
      {
        id: 5,
        name: "Saturn",
        currentPopulation: 0,
        pictureUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/8423_20181_1saturn2016.jpg/1920px-8423_20181_1saturn2016.jpg"
      },
      {
        id: 6,
        name: "Uranus",
        currentPopulation: 0,
        pictureUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Uranus_as_seen_by_NASA%27s_Voyager_2_%28remastered%29_-_JPEG_converted.jpg/800px-Uranus_as_seen_by_NASA%27s_Voyager_2_%28remastered%29_-_JPEG_converted.jpg"
      },
      {
        id: 7,
        name: "Neptune",
        currentPopulation: 0,
        pictureUrl: "https://upload.wikimedia.org/wikipedia/commons/0/06/Neptune.jpg"
      }
    ],
    spacecrafts: [
      {
        id: "prispax",
        name: "Prispax",
        capacity: 10000,
        description: "Presenting the Astrolux Odyssey: a revolutionary spacecraft merging cutting-edge technology with lavish luxury, designed to usher 10,000 passengers into the solar system's embrace. A marvel of engineering, its sleek exterior is adorned with solar panels, fueling advanced propulsion while minimizing environmental impact.",
        pictureUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/STS-134_International_Space_Station_seen_from_Space_Shuttle_Endeavour.jpg/800px-STS-134_International_Space_Station_seen_from_Space_Shuttle_Endeavour.jpg",
        currentLocation: 2,
        protected: false // This spacecraft is protected and cannot be destroyed 
      },

    {
      id: "cargohauler",
      name: "Cargo Hauler",
      capacity: 202,
      description:
        "The Cargo Hauler is an automated resupply vehicle designed to ferry hundreds of kilograms of food, equipment and propellant to orbital outposts via precision rendezvous.",
      pictureUrl:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/ATV-1_Jules_Verne_approaches_ISS_%2825524892462%29.jpg/800px-ATV-1_Jules_Verne_approaches_ISS_%2825524892462%29.jpg",
      currentLocation: 5,
      protected: false
    }, // :contentReference[oaicite:0]{index=0}

    {
      id: "starcruiser",
      name: "Star Cruiser",
      capacity: 5027,
      description:
        "A next generation super heavy lift spacecraft built for deep space exploration and interplanetary missions, featuring a stainless steel hull and huge payload volume.",
      pictureUrl:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Starship_SN9_Wide_Angle.jpg/800px-Starship_SN9_Wide_Angle.jpg",
      currentLocation: 7,
      protected: false
    }, // :contentReference[oaicite:1]{index=1}

    {
      id: "explorerclass",
      name: "Explorer Class",
      capacity: 3500,
      description:
        "A deep space crew transport designed for human missions beyond low Earth orbit, pairing a pressurized crew capsule with a high efficiency service module.",
      pictureUrl:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/Orion_Service_Module.jpg/800px-Orion_Service_Module.jpg",
      currentLocation: 4,
      protected: false
    }


    ]
  };
  static MOCK_DB_KEY = "MOCK_DB";

  static prepareResponse ()
  {
    return {
      isError: false,
      data: null
    };
  }

  static wait (duration = 1000)
  {
    return new Promise(resolve => setTimeout(resolve, duration));
  }



  static getMockDb ()
  {
   
    let mockDb = localStorage.getItem(SpaceTravelMockApi.MOCK_DB_KEY);

    if (!mockDb)
    {
      localStorage.setItem(SpaceTravelMockApi.MOCK_DB_KEY, JSON.stringify(SpaceTravelMockApi.MOCK_DB));
      mockDb = SpaceTravelMockApi.MOCK_DB;
    }
    else
    {
      mockDb = JSON.parse(mockDb);
    }
    

    return mockDb;
  }

  static setMockDb (mockDb)
  {
    localStorage.setItem(SpaceTravelMockApi.MOCK_DB_KEY, JSON.stringify(mockDb));
  }
  
  static async getPlanets() {
  await this.wait();
  const response = this.prepareResponse();
  try {
    const { planets } = this.getMockDb();
    response.data = planets;        // ← assign the real array
  } catch (err) {
    response.isError = true;
    response.data = err;
  }
  return response;
}
  // static async getPlanets ()
  // {
  //   await SpaceTravelMockApi.wait();

  //   const response = SpaceTravelMockApi.prepareResponse();

  //   try
  //   {
  //     const mockDb = SpaceTravelMockApi.getMockDb();
  //     response.data = mockDb.planets;
  //   }
  //   catch (error)
  //   {
  //     response.isError = true;
  //     response.data = error;
  //   }

  //   return response;
  // }

  static async getSpacecrafts() {
  await this.wait();
  const response = this.prepareResponse();
  try {
    const { spacecrafts } = this.getMockDb();
    response.data = spacecrafts;    // ← assign the real array
  } catch (err) {
    response.isError = true;
    response.data = err;
  }
  return response;
}
  // static async getSpacecrafts ()
  // {
  //   await SpaceTravelMockApi.wait();

  //   const response = SpaceTravelMockApi.prepareResponse();

  //   try
  //   {
  //     const mockDb = SpaceTravelMockApi.getMockDb();
  //     response.data = mockDb.spacecrafts;
  //   }
  //   catch (error)
  //   {
  //     response.isError = true;
  //     response.data = error;
  //   }

  //   return response;
  // }

  static async getSpacecraftById ({id})
  {
    await SpaceTravelMockApi.wait();

    const response = SpaceTravelMockApi.prepareResponse();

    try
    {
      const mockDb = SpaceTravelMockApi.getMockDb();

      for (let i = 0; i < mockDb.spacecrafts.length; i++)
      {
        const spacecraft = mockDb.spacecrafts[i];

        if (spacecraft.id === id)
        {
          response.data = spacecraft;
          break;
        }
      }
    }
    catch (error)
    {
      response.isError = true;
      response.data = error;
    }

    return response;
  }

  static async buildSpacecraft ({name, capacity, description, pictureUrl = undefined})
  {
    await SpaceTravelMockApi.wait();

    const response = SpaceTravelMockApi.prepareResponse();

    try
    {
      const spacecraft = {id: nanoid(), name, capacity, description, pictureUrl, currentLocation: 2};

      const mockDb = SpaceTravelMockApi.getMockDb();
      mockDb.spacecrafts.push(spacecraft);
      SpaceTravelMockApi.setMockDb(mockDb);
    }
    catch (error)
    {
      response.isError = true;
      response.data = error;
    }

    return response;
  }

  static async destroySpacecraftById ({id}){
    await SpaceTravelMockApi.wait();
    const response = SpaceTravelMockApi.prepareResponse();

    try {
      const mockDb = SpaceTravelMockApi.getMockDb();
      for (let i = 0; i < mockDb.spacecrafts.length; i++) {
        const spacecraft = mockDb.spacecrafts[i];
        if (spacecraft.id !== id) continue;

        if (spacecraft.protected) {
           throw new Error("This spacecraft cannot be deleted.");
        }
        // If the spacecraft is protected, throw an error 

        // if (spacecraft.id === id)
        
          mockDb.spacecrafts.splice(i, 1);
          SpaceTravelMockApi.setMockDb(mockDb);

          response.data = mockDb;
          break;
        
      }
    }
    catch (error)
    {
      response.isError = true;
      response.data = error;
    }

    return response;
  }
       
    static async sendSpacecraftToPlanet({ spacecraftId, targetPlanetId }) {
    await this.wait();
    const response = { isError: false, data: null };


    try {
      const mockDb = this.getMockDb();
 
      // normalize IDs to string for lookup
      const sId = String(spacecraftId);
      const pId = String(targetPlanetId);


      // 1) find craft
      const craft = mockDb.spacecrafts.find((s) => String(s.id) === sId);
      console.log("🛰️ Craft found:", craft);
      if (!craft) throw new Error("Spacecraft not found.");

      // 2) no-op if already on target
      if (String(craft.currentLocation) === pId) {
        throw new Error("The spacecraft is already on this planet!");
      }

      // 3) find origin & target planets
      const origin = mockDb.planets.find((p) => String(p.id) === String(craft.currentLocation));
      const target = mockDb.planets.find((p) => String(p.id) === pId);
       console.log("🌍 Origin planet before:", origin.id, origin.currentPopulation);
       console.log("🏁 Target planet before:", target.id, target.currentPopulation);
      if (!origin) throw new Error("Origin planet not found.");
      if (!target) throw new Error("Target planet not found.");

      // 4) compute transfer
      const toTransfer = Math.min(origin.currentPopulation, craft.capacity);
       console.log("⚡ To transfer:", toTransfer, "(capacity:", craft.capacity, ")");

      // 5) adjust populations once
      origin.currentPopulation -= toTransfer;
      target.currentPopulation += toTransfer;
       console.log("🔁 Origin planet after:", origin.currentPopulation);
       console.log("🔁 Target planet after:", target.currentPopulation);

      // 6) move craft
      craft.currentLocation = target.id;

      // 7) persist
      this.setMockDb(mockDb);
      response.data = mockDb;
    } catch (err) {
      response.isError = true;
      response.data = err;
    }

    return response;
  }// static async sendSpacecraftToPlanet ({spacecraftId, targetPlanetId})
  // {
  //   await SpaceTravelMockApi.wait();

  //   const response = SpaceTravelMockApi.prepareResponse();

  //   try
  //   {
  //     const mockDb = SpaceTravelMockApi.getMockDb();

  //     for (let i = 0; i < mockDb.spacecrafts.length; i++)
  //     {
  //       const spacecraft = mockDb.spacecrafts[i];

  //       if (spacecraft.id === spacecraftId)
  //       {
  //         if (spacecraft.currentLocation === targetPlanetId)
  //         {
  //           throw new Error("The spacecraft is already on this planet!");
  //         }

  //         let transferredCapacity = spacecraft.capacity;

  //         for (const planet of mockDb.planets)
  //         {
  //           if (planet.id === spacecraft.currentLocation)
  //           {
  //             if (planet.currentPopulation < transferredCapacity)
  //             {
  //               transferredCapacity = Math.min(planet.currentPopulation, transferredCapacity);
  //             }

  //             planet.currentPopulation -= transferredCapacity;
  //           }
  //         }

  //         for (const planet of mockDb.planets)
  //         {
  //           if (planet.id === targetPlanetId)
  //           {
  //             planet.currentPopulation += transferredCapacity;
  //             break;
  //           }
  //         }

  //         spacecraft.currentLocation = targetPlanetId;
  //         SpaceTravelMockApi.setMockDb(mockDb);

  //         response.data = mockDb;
  //         break;
  //       }
  //     }
  //   }
  //   catch (error)
  //   {
  //     response.isError = true;
  //     response.data = error;
  //   }

  //   return response;
  // }
  static resetMockDb() {
    const initial = {
      planets: [
            {
        id: 0,
        name: "Mercury",
        currentPopulation: 2000,
        pictureUrl: "https://upload.wikimedia.org/wikipedia/commons/8/88/Reprocessed_Mariner_10_image_of_Mercury.jpg"

      },
      {
        id: 1,
        name: "Venus",
        currentPopulation: 5500,
        pictureUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Venus_globe.jpg/800px-Venus_globe.jpg"

      },
      {
        id: 2,
        name: "Earth",
        currentPopulation: 100000,
        pictureUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/The_Blue_Marble_%28remastered%29.jpg/800px-The_Blue_Marble_%28remastered%29.jpg"

      },
      {
        id: 3,
        name: "Mars",
        currentPopulation: 4300,
        pictureUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/OSIRIS_Mars_true_color.jpg/800px-OSIRIS_Mars_true_color.jpg"
      },
      {
        id: 4,
        name: "Jupiter",
        currentPopulation: 8000,
        pictureUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Jupiter%2C_image_taken_by_NASA%27s_Hubble_Space_Telescope%2C_June_2019.png/800px-Jupiter%2C_image_taken_by_NASA%27s_Hubble_Space_Telescope%2C_June_2019.png"

      },
      {
        id: 5,
        name: "Saturn",
        currentPopulation: 4500,
        pictureUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/8423_20181_1saturn2016.jpg/1920px-8423_20181_1saturn2016.jpg"
      },
      {
        id: 6,
        name: "Uranus",
        currentPopulation: 8000,
        pictureUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Uranus_as_seen_by_NASA%27s_Voyager_2_%28remastered%29_-_JPEG_converted.jpg/800px-Uranus_as_seen_by_NASA%27s_Voyager_2_%28remastered%29_-_JPEG_converted.jpg"
      },
      {
        id: 7,
        name: "Neptune",
        currentPopulation: 6000,
        pictureUrl: "https://upload.wikimedia.org/wikipedia/commons/0/06/Neptune.jpg"
      }
    ],
       
      spacecrafts: [
         {
        id: "prispax",
        name: "Prispax",
        capacity: 10000,
        description: "Presenting the Astrolux Odyssey: a revolutionary spacecraft merging cutting-edge technology with lavish luxury, designed to usher 10,000 passengers into the solar system's embrace. A marvel of engineering, its sleek exterior is adorned with solar panels, fueling advanced propulsion while minimizing environmental impact.",
        pictureUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/STS-134_International_Space_Station_seen_from_Space_Shuttle_Endeavour.jpg/800px-STS-134_International_Space_Station_seen_from_Space_Shuttle_Endeavour.jpg",
        currentLocation: 2,
        protected: false // This spacecraft is protected and cannot be destroyed 
      },

    {
      id: "cargohauler",
      name: "Cargo Hauler",
      capacity: 202,
      description:
        "The Cargo Hauler is an automated resupply vehicle designed to ferry hundreds of kilograms of food, equipment and propellant to orbital outposts via precision rendezvous.",
      pictureUrl:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/ATV-1_Jules_Verne_approaches_ISS_%2825524892462%29.jpg/800px-ATV-1_Jules_Verne_approaches_ISS_%2825524892462%29.jpg",
      currentLocation: 5,
      protected: false
    }, // :contentReference[oaicite:0]{index=0}

    {
      id: "starcruiser",
      name: "Star Cruiser",
      capacity: 5027,
      description:
        "A next generation super heavy lift spacecraft built for deep space exploration and interplanetary missions, featuring a stainless steel hull and huge payload volume.",
      pictureUrl:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Starship_SN9_Wide_Angle.jpg/800px-Starship_SN9_Wide_Angle.jpg",
      currentLocation: 7,
      protected: false
    }, // :contentReference[oaicite:1]{index=1}

    {
      id: "explorerclass",
      name: "Explorer Class",
      capacity: 3500,
      description:
        "A deep space crew transport designed for human missions beyond low Earth orbit, pairing a pressurized crew capsule with a high efficiency service module.",
      pictureUrl:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/Orion_Service_Module.jpg/800px-Orion_Service_Module.jpg",
      currentLocation: 4,
      protected: false
    }
 ],
      
    }; 
    localStorage.setItem(
      SpaceTravelMockApi.MOCK_DB_KEY,
      JSON.stringify(initial)
  );
  }
} 
