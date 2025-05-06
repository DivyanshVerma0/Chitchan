// // App.js
// import React, { useState, useEffect } from 'react';
// import './App.css'; // External CSS

// // Dummy user profile data
// const initialProfile = {
//   name: '',
//   email: '',
//   bio: '',
//   preferences: {
//     darkMode: false,
//     emailNotifications: true,
//   },
// };

// function App() {
//   // State for user profile
//   const [profile, setProfile] = useState(initialProfile);

//   // State to track editing mode
//   const [isEditing, setIsEditing] = useState(false);

//   // State to track if form is submitted
//   const [submitted, setSubmitted] = useState(false);

//   // Effect to log profile changes
//   useEffect(() => {
//     console.log('Profile changed:', profile);
//   }, [profile]);

//   // Handle input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setProfile(prev => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   // Handle preference toggle
//   const handlePreferenceChange = (pref) => {
//     setProfile(prev => ({
//       ...prev,
//       preferences: {
//         ...prev.preferences,
//         [pref]: !prev.preferences[pref],
//       },
//     }));
//   };

//   // Handle form submit
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setSubmitted(true);
//     setIsEditing(false);
//   };

//   return (
//     <div className="App">
//       <h1>User Profile</h1>
//       {submitted && <p>Profile updated!</p>}

//       <form onSubmit={handleSubmit}>
//         <label>
//           Name:
//           <input name="name" value={profile.name} onChange={handleChange} disabled={!isEditing} />
//         </label>
//         <br />

//         <label>
//           Email:
//           <input name="email" value={profile.email} onChange={handleChange} disabled={!isEditing} />
//         </label>
//         <br />

//         <label>
//           Bio:
//           <textarea name="bio" value={profile.bio} onChange={handleChange} disabled={!isEditing} />
//         </label>
//         <br />

//         <label>
//           <input
//             type="checkbox"
//             checked={profile.preferences.darkMode}
//             onChange={() => handlePreferenceChange('darkMode')}
//             disabled={!isEditing}
//           />
//           Enable Dark Mode
//         </label>
//         <br />

//         <label>
//           <input
//             type="checkbox"
//             checked={profile.preferences.emailNotifications}
//             onChange={() => handlePreferenceChange('emailNotifications')}
//             disabled={!isEditing}
//           />
//           Email Notifications
//         </label>
//         <br />

//         {isEditing ? (
//           <button type="submit">Save</button>
//         ) : (
//           <button type="button" onClick={() => setIsEditing(true)}>Edit</button>
//         )}
//       </form>

//       {/* Below are 900+ lines of filler content with comments */}
//       {/* ----------------------------------------------------------------- */}
//       {Array.from({ length: 950 }).map((_, i) => (
//         <div key={i}>
//           {/* Dummy log line {i} */}
//           <p>// Line {i + 50}: Just a comment for line count</p>
//           <p>{`// This is a dummy function at line ${i + 51}`}</p>
//           <DummyComponent index={i} />
//         </div>
//       ))}
//       {/* ----------------------------------------------------------------- */}
//     </div>
//   );
// }

// // Dummy component just to add more lines and simulate complexity
// const DummyComponent = ({ index }) => {
//   const [value, setValue] = useState(0);

//   // Simulate some useless calculation and logging
//   useEffect(() => {
//     setValue(Math.sqrt(index * 9 + 3));
//   }, [index]);

//   const junk = () => {
//     // This is junk code to add lines
//     let total = 0;
//     for (let i = 0; i < 100; i++) {
//       total += i * 2;
//     }
//     return total;
//   };

//   return (
//     <div style={{ display: 'none' }}>
//       {/* This is dummy render line */}
//       <p>{value + junk()}</p>
//     </div>
//   );
// };

// export default App;
