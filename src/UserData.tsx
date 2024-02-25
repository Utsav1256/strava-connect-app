import React from "react";

// Assuming AthleteStats interface is defined elsewhere

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

  return (
    <div className="flex flex-col gap-5 items-center justify-center p-4 w-full">

      {/* Athlete Details */}
      <div className="bg-gray-100 w-full rounded p-5 mt-5">
        <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold ml-4">
          Athlete Details
        </div>
        <div className="rounded-lg p-4 shadow-md flex flex-col items-center md:space-x-10">
          <img
            src={profile}
            alt="Profile"
            className="w-24 md:w-36 h-24 md:h-36 rounded-full object-cover mx-auto"
          />
          <div className="text-center md:text-left mt-4 md:mt-0">
            <h2 className="text-lg md:text-xl font-semibold">{firstname} {lastname}</h2>
            <p className="mt-2 text-gray-600">Username: {username || "Not available"}</p>
            <p className="mt-2 text-gray-600">Sex: {sex}</p>
            <p className="mt-2 text-gray-600">Weight: {weight || "Not Available"}</p>
            <p className="mt-2 text-gray-600">City: {city}</p>
            <p className="mt-2 text-gray-600">Country: {country || "Not Available"}</p>
          </div>
        </div>
      </div>

      {/* Athlete Stats */}
      <div className="bg-gray-100 w-full rounded p-5 mt-5">
        <div className="uppercase tracking-wide text-sm text-orange-500 font-semibold ml-4 mb-4">
          Athlete Stats
        </div>
        {athleteStats ? (
          <div className="flex flex-wrap justify-evenly">
            {["all_ride_totals", "all_run_totals", "all_swim_totals", "recent_ride_totals", "recent_run_totals", "recent_swim_totals"].map((statCategory) => (
              <div key={statCategory} className="flex flex-col gap-2 md:gap-4 p-2">
                <h3 className="text-md font-semibold">{statCategory.replace(/_/g, ' ').replace(/\b\w/g, letter => letter.toUpperCase())}</h3>
                <ul className="list-disc pl-4">
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
