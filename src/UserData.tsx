import React from "react";

interface AthleteStatTotals {
  count: number;
  distance: number;
  moving_time: number;
  elapsed_time: number;
  elevation_gain: number;
}


interface AthleteStats {
  all_ride_totals: AthleteStatTotals;
  all_run_totals: AthleteStatTotals;
  all_swim_totals: AthleteStatTotals;
  recent_ride_totals: AthleteStatTotals;
  recent_run_totals: AthleteStatTotals;
  recent_swim_totals: AthleteStatTotals;

}


interface UserDataProps {
  userData: {
    firstname: string;
    lastname: string;
    bio: string;
    sex: string;
    city: string;
    countryweight: string;
    username: string;
    profile: string;
    resource_state: number;
    weight?: number; 
    country?: string; 
  };
  athleteStats: AthleteStats;
}

const UserData: React.FC<UserDataProps> = ({ userData, athleteStats }) => {
  const {
    firstname,
    lastname,
    sex,
    city,
    username,
    profile,
    weight,
    country,
  } = userData;

  
  // Rendering logic for the UserData component
  return (
    <div className="w-full flex flex-col gap-5 items-center justify-center">

      
      {/* Athlete Details */}
      <div className="bg-gray-100 w-4/5 rounded p-5 mt-5">
        <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold ml-4">
          Athlete Details
        </div>
        <div className="rounded-lg p-4 shadow-md flex items-center space-x-56">
          <img
            src={profile}
            alt="Profile"
            className="w-36 h-36 rounded-full object-cover"
          />
          <div>
            <h2 className="text-xl font-semibold">{firstname} {lastname}</h2>
            <p className="mt-2 text-gray-600">Username: {username || "Not available"}</p>
            <p className="mt-2 text-gray-600">Sex: {sex}</p>
            <p className="mt-2 text-gray-600">Weight: {weight || "Not Available"}</p>
            <p className="mt-2 text-gray-600">City: {city}</p>
            <p className="mt-2 text-gray-600">Country: {country || "Not Available"}</p>
          </div>
        </div>
      </div>

      {/* Athlete Stats */}
      <div className="bg-gray-100 w-4/5 rounded-lg p-6">
        <div className="uppercase tracking-wide text-sm text-orange-500 font-semibold ml-4 mb-4">
          Athlete Stats
        </div>
        {athleteStats ? (
          <div className="flex justify-evenly">
            {/* Render stats for each category */}
            {["all_ride_totals", "all_run_totals", "all_swim_totals", "recent_ride_totals", "recent_run_totals", "recent_swim_totals"].map((statCategory) => (
              <div key={statCategory} className="ml-6 flex flex-col gap-10">
                <h3 className="text-md font-semibold mb-2">{statCategory.replace(/_/g, ' ').replace(/\b\w/g, letter => letter.toUpperCase())}</h3>
                <ul className="list-disc pl-6">
                  {Object.entries(athleteStats[statCategory as keyof AthleteStats]).map(([key, value]) => (
                    <li key={key}>{`${key}: ${value}`}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default UserData;
