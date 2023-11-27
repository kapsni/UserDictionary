// src/components/UserDetail.js
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchCountryList, fetchCurrentTime } from "../api";
import { selectSelectedUser } from "../redux/usersSlice";
import axios from "axios";
import Clock from "./Clock";
import CountrySelector from "./CountrySelector";

const UserDetail = () => {
  const { id } = useParams();
  const user = useSelector(selectSelectedUser);
  const [countryList, setCountryList] = useState([]);
  const [currentTime, setCurrentTime] = useState("");
  const [posts, setPosts] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");

  useEffect(() => {
    const fetchCountries = async () => {
      const countries = await fetchCountryList();
      setCountryList(countries);
    };

    fetchCountries();
  }, []);

  useEffect(() => {
    const fetchUserPosts = async () => {
      if (user) {
        const response = await axios.get(
          `https://jsonplaceholder.typicode.com/posts?userId=${user.id}`,
        );
        setPosts(response.data.slice(0, 3)); // Display max 3 posts
      }
    };

    fetchUserPosts();
  }, [user]);

  const handleCountryChange = async (country) => {
    setSelectedCountry(country);

    // Fetch current time for the selected country
    // const time = await fetchCurrentTime(country);
    // setCurrentTime(time.utc_datetime);
    // console.log(currentTime);
  };

  return (
    <div className="user-detail-container">
      {user && (
        <div className="user-detail-section">
          <h2 className="user-detail-header">{user.name}</h2>
          <div className="user-detail-subsection">
            {/* Display user details */}
            <div>
              <p>Username: {user.username}</p>
              <p>Catch Phrase: {user.company.catchPhrase}</p>
            </div>
            <div>
              <p>
                Address: {user.address.street}, {user.address.suite},{" "}
                {user.address.city}
              </p>
              <p>Email: {user.email}</p>
              <p>Phone: {user.phone}</p>
            </div>
          </div>
          <div className="user-detail-subsection">
            {/* Display clock and country selector */}

            {/* <Clock /> */}
            <CountrySelector onSelect={handleCountryChange} />
          </div>
          <div className="user-detail-subsection">
            {/* Display user posts */}
            <h3>User Posts</h3>
            <div className="user-detail-post-container">
              {posts.map((post) => (
                <div key={post.id} className="user-detail-post-card">
                  <h4 className="user-detail-post-title">{post.title}</h4>
                  <p className="user-detail-post-content">{post.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDetail;
