import React, { useEffect, useState } from "react";
import axios from "axios";
import UserData from "./UserData";

type AthleteStats = {
  all_ride_totals: Record<string, any>;
  all_run_totals: Record<string, any>;
  all_swim_totals: Record<string, any>;
};

type AthleteData = {
  firstname: string;
  lastname: string;
  bio: string;
  sex: string;
  city: string;
  countryweight: string;
  username: string;
  profile: string;
  resource_state: number;
};

const clientId = "121975";
const clientSecret = "3eb88fded0c20596ef609f8d7862faa253494615";
const redirectUri = "http://localhost:5173";
const scope = "read_all";

const App: React.FC = () => {
  const [accessToken, setAccessToken] = useState<string>("");
  const [authHandled, setAuthHandled] = useState<boolean>(false);
  const [userData, setUserData] = useState<AthleteData | null>(null);
  const [athleteStats, setAthleteStats] = useState<AthleteStats | null>(null);

  const fetchAthleteStats = async (id: string, token: string) => {
    try {
      const response = await axios.get(
        `https://www.strava.com/api/v3/athletes/${id}/stats`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setAthleteStats(response.data);
    } catch (error) {
      console.error("Error fetching athlete stats:", error);
    }
  };

  const fetchAthleteData = async (token: string) => {
    try {
      const response = await axios.get("https://www.strava.com/api/v3/athlete", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUserData(response.data);
      fetchAthleteStats(response.data.id, token);
    } catch (error) {
      console.error("Error fetching athlete data:", error);
    }
  };

  const exchangeAuthorizationForToken = async (authorizationCode: string) => {
    try {
      const response = await axios.post("https://www.strava.com/oauth/token", {
        client_id: clientId,
        client_secret: clientSecret,
        code: authorizationCode,
        grant_type: 'authorization_code', // Ensure grant_type is included as per OAuth2 specification
        redirect_uri: redirectUri,
      });
      setAccessToken(response.data.access_token);
      localStorage.setItem("accessToken", response.data.access_token);
      fetchAthleteData(response.data.access_token);
    } catch (error) {
      console.error("Authorization Error:", error);
    }
  };

  const handleAuthenticationCallback = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const authorizationCode = urlParams.get("code");
    if (authorizationCode && !authHandled) {
      exchangeAuthorizationForToken(authorizationCode);
      setAuthHandled(true);
    }
  };

  useEffect(() => {
    const storedAccessToken = localStorage.getItem("accessToken");
    if (storedAccessToken) {
      setAccessToken(storedAccessToken);
      fetchAthleteData(storedAccessToken);
    } else {
      handleAuthenticationCallback();
    }
  }, [authHandled]); // Dependency on authHandled to re-evaluate after handling auth

  const handleConnect = () => {
    const authorizationUrl = `https://www.strava.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}`;
    window.location.href = authorizationUrl;
  };

  return (
    <div>
      {accessToken ? (
        userData && athleteStats ? (
          <UserData userData={userData} athleteStats={athleteStats} />
        ) : (
          <p>Loading user data...</p>
        )
      ) : (
        <div className="bg-slate-600 w-full h-screen flex flex-col items-center justify-center">
          <h1 id="headerText" className="text-2xl font-semibold text-slate-50 tracking-wider">
            StravaConnect
          </h1>
          <div className="bg-slate-200 p-12 rounded-lg">
            <h1 className="text-2xl text-red-500 p-4 rounded-lg text-center">
              Connect to Strava
            </h1>
            <button onClick={handleConnect} className="bg-green-600 text-white font-medium rounded-lg p-2 hover:brightness-110 active:translate-y-1">
              Connect
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
