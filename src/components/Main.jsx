import { useState } from "react";

export default function Main() {
  // Blueprint for user data with fake information
  const fakeUserData = {
    name: { title: "Mr", first: "John", last: "Doe" },
    email: "johndoe@example.com",
    phone: "+1-202-555-0183",
    location: {
      street: { number: 123, name: "Main St" },
      city: "New York",
      state: "NY",
      country: "United States",
      postcode: "10001",
    },
    picture: { large: "https://randomuser.me/api/portraits/men/1.jpg" },
    dob: { date: "1985-05-15T09:44:18Z", age: 38 },
    login: { username: "johndoe85" },
    registered: { date: "2010-08-05T09:44:18Z" },
  };

  // Initialize state with fake data
  const [userData, setUserData] = useState(fakeUserData);
  const [gender, setGender] = useState("");
  const [country, setCountry] = useState("");

  // Array of countries with names and country codes
  const countries = [
    { name: "United States", code: "us" },
    { name: "United Kingdom", code: "gb" },
    { name: "France", code: "fr" },
    { name: "Germany", code: "de" },
    { name: "Brazil", code: "br" },
    { name: "Canada", code: "ca" },
    { name: "Australia", code: "au" },
    { name: "Japan", code: "jp" },
    { name: "China", code: "cn" },
    { name: "India", code: "in" },
    { name: "Italy", code: "it" },
    { name: "Spain", code: "es" },
    { name: "Mexico", code: "mx" },
    { name: "Russia", code: "ru" },
    { name: "South Africa", code: "za" },
    { name: "South Korea", code: "kr" },
    { name: "Netherlands", code: "nl" },
    { name: "Sweden", code: "se" },
    { name: "Norway", code: "no" },
    { name: "Finland", code: "fi" },
    { name: "Denmark", code: "dk" },
    { name: "Poland", code: "pl" },
    { name: "Greece", code: "gr" },
    { name: "Portugal", code: "pt" },
    { name: "Switzerland", code: "ch" },
    { name: "Argentina", code: "ar" },
    { name: "Chile", code: "cl" },
    { name: "Colombia", code: "co" },
    { name: "Peru", code: "pe" },
    { name: "Malaysia", code: "my" },
    { name: "Singapore", code: "sg" },
    { name: "Philippines", code: "ph" },
    { name: "Thailand", code: "th" },
    { name: "Hong Kong", code: "hk" },
    // Add more countries as needed
  ];

  async function fetchUserData() {
    let url = "https://randomuser.me/api/?";

    if (gender) {
      url += `gender=${gender}&`;
    }
    if (country) {
      url += `nat=${country}&`;
    }

    try {
      const response = await fetch(url);
      const data = await response.json();
      setUserData(data.results[0]);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchUserData();
  };

  return (
    <main>
      <div className="form-container">
        <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
          <label>
            <span>Gender:</span>
            <select
              value={gender}
              name="gender"
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="">Any</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </label>
          <label>
            <span>Country:</span>
            <select
              value={country}
              name="country"
              autoComplete="off"
              onChange={(e) => setCountry(e.target.value)}
            >
              <option value="">Any</option>
              {countries.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.name}
                </option>
              ))}
            </select>
          </label>
          <button className="generate" type="submit">
            Generate
          </button>
        </form>
      </div>

      {userData ? (
        <div className="info">
          <h3>{`${userData.name.title} ${userData.name.first} ${userData.name.last}`}</h3>
          <img src={userData.picture.large} alt="Random User" />
          <div>
            <p>
              <strong>Email:</strong> {userData.email}
            </p>
            <p>
              <strong>Phone:</strong> {userData.phone}
            </p>
            <p>
              <strong>Location:</strong> {userData.location.street.number}{" "}
              {userData.location.street.name}, {userData.location.city},{" "}
              {userData.location.state}, {userData.location.country}
            </p>
            <p>
              <strong>Postcode:</strong> {userData.location.postcode}
            </p>
            <p>
              <strong>Date of Birth:</strong>{" "}
              {new Date(userData.dob.date).toLocaleDateString()} (Age:{" "}
              {userData.dob.age})
            </p>
            <p>
              <strong>Username:</strong> {userData.login.username}
            </p>
            <p>
              <strong>Registered:</strong>{" "}
              {new Date(userData.registered.date).toLocaleDateString()}
            </p>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </main>
  );
}
