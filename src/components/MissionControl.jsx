import {useState} from "react";

import styles from "./MissionControl.module.css";

import MissionCard from "./MissionCard.jsx";
import MissionAction from "./MissionAction.jsx";
import MissionFilter from "./MissionFilter.jsx";

// Call this componenent, which passes a single props object, which is destructuring. <MissionControl initialMissions={someValue} />
// which results in this:  props = { initialMissions: someValue }, ({ initialMissions }) is shorthand for props.initialMissions.
function MissionControl ({initialMissions})  // Same as const MissonControl = ({intialMissions}) => {};
{
	const INITIAL_FILTER = "All"; // Default value to start with

	const [missions, setMissions] = useState(initialMissions); // Creates a state called missions with initialMissions as intial value
	const [filter, setFilter] = useState(INITIAL_FILTER); // filter: current filter (like 'All, Active, Completed, Planned')

	function updateMissionStatus (id, newStatus) // Updates mission status using setMissions to update the state,
	{
		setMissions(prevMissions => prevMissions.map(mission => mission.id === id ? {...mission, status: newStatus} : mission));
	}    // using .map() to return a new array, if mission.id matches the given id, it updates the status or leaves missions unchanged here at end

	const filteredMissions = missions.filter(mission => filter === "All" || mission.status === filter);
    // This filters missions based on the selected filter: If filter is "All" → include all missions.
	// Otherwise → include only missions whose status matches the filter.
	return (
		<div>
			<h1>Space Mission Control</h1>

			<div className={styles.filterContainer}>
				<MissionFilter setFilter={setFilter} />
			</div>

			{
				filteredMissions.map(mission =>  // Loops over each filtered mission.
				                     {
					                     const {id, name, status, crew} = mission;

					                     return (
						                     <div
							                     key={id}
							                     className={styles.missionContainer}
						                     >
							                     <div>
								                     <MissionCard       //Renders a MissionCard for displaying mission details.
									                     name={name}
									                     status={status}
									                     crew={crew}
								                     />
							                     </div>

							                     <div>
								                     <MissionAction  //Renders a MissionAction with: missionId: which mission to act on.
									                     missionId={id}
									                     onUpdateMissionStatus={updateMissionStatus} // callback to update the status when an action happens.
								                     />
							                     </div>
						                     </div>
					                     );
				                     })
			}
		</div>
	);
}

export default MissionControl;
