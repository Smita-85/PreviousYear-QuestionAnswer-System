import React from "react";

// Subject cards data
const subjects = [
  {
    name: "Operating System",
    description: "Previous year OS questions with answers.",
    image: "https://img.icons8.com/color/96/operating-system.png",
  },
  {
    name: "DBMS",
    description: "Database Management System PYQs.",
    image: "https://img.icons8.com/color/96/database.png",
  },
  {
    name: "Java Programming",
    description: "Java coding and theory questions.",
    image: "https://img.icons8.com/color/96/java-coffee-cup-logo.png",
  },
  {
    name: "Computer Networks",
    description: "Networking concepts and PYQs.",
    image: "https://img.icons8.com/color/96/network.png",
  },
  {
    name: "Software Engineering",
    description: "SE questions with diagrams & answers.",
    image: "https://img.icons8.com/color/96/software.png",
  },
];

const StudentDashboard = ({ onSubjectSelect }) => {
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      {/* Page Title */}
      <h1 className="text-4xl font-bold text-center mb-10 text-gray-800">
        📖 Student Dashboard
      </h1>

      {/* Subject Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {subjects.map((subject) => (
          <div
            key={subject.name}
            onClick={() => onSubjectSelect(subject.name)}
            className="cursor-pointer bg-white shadow-lg rounded-2xl overflow-hidden hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
          >
            {/* Card Image */}
            <img
              src={subject.image}
              alt={subject.name}
              className="w-full h-40 object-contain bg-gray-100"
            />

            {/* Card Content */}
            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-800">
                {subject.name}
              </h2>
              <p className="text-gray-600 text-sm mt-2">
                {subject.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default StudentDashboard;