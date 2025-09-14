/*import React from "react";
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
      <h1 className="text-4xl font-bold text-center mb-10 text-gray-800">
        📖 Student Dashboard
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {subjects.map((subject) => (
          <div
            key={subject.name}
            onClick={() => onSubjectSelect(subject.name)}
            className="cursor-pointer bg-white shadow-lg rounded-2xl overflow-hidden hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
          >
          
            <img
              src={subject.image}
              alt={subject.name}
              className="w-full h-40 object-contain bg-gray-100"
            />

          comment-Card Content 
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
*/
import React, { useState, useEffect } from "react";
import axios from "axios";

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

const StudentDashboard = () => {
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  // Fetch questions when subject changes
  useEffect(() => {
    const fetchQuestions = async () => {
      if (!selectedSubject) return;
      setLoading(true);
      try {
        const res = await axios.get(
          `http://localhost:5000/api/questions?subject=${selectedSubject}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setQuestions(res.data);
      } catch (err) {
        console.error("Error fetching questions:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchQuestions();
  }, [selectedSubject, token]);

  const toggleFavorite = (q) => {
    setFavorites((prev) =>
      prev.find((f) => f._id === q._id)
        ? prev.filter((f) => f._id !== q._id)
        : [...prev, q]
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <h1 className="text-4xl font-bold text-center mb-10 text-gray-800">
        📖 Student Dashboard
      </h1>

      {/* Subject Cards */}
      {!selectedSubject && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {subjects.map((subject) => (
            <div
              key={subject.name}
              onClick={() => setSelectedSubject(subject.name)}
              className="cursor-pointer bg-white shadow-lg rounded-2xl overflow-hidden hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              <img
                src={subject.image}
                alt={subject.name}
                className="w-full h-40 object-contain bg-gray-100"
              />
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
      )}

      {/* Questions Section */}
      {selectedSubject && (
        <div>
          <button
            className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
            onClick={() => setSelectedSubject(null)}
          >
            🔙 Back to Subjects
          </button>

          <h2 className="text-2xl font-bold mb-6 text-gray-700">
            Questions for {selectedSubject}
          </h2>

          {loading && <p>Loading questions...</p>}

          {!loading && questions.length === 0 && (
            <p>No questions found for {selectedSubject}</p>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {questions.map((q) => (
              <div
                key={q._id}
                className="bg-white shadow-md rounded-xl p-4 relative"
              >
                <h3 className="text-lg font-semibold text-gray-800">
                  {q.year} - {q.subject}
                </h3>
                <p className="mt-2 text-gray-700">
                  <strong>Q:</strong> {q.questionText}
                </p>
                <p className="mt-1 text-gray-600">
                  <strong>A:</strong> {q.answerText}
                </p>
                <button
                  className="absolute top-4 right-4 text-xl"
                  onClick={() => toggleFavorite(q)}
                >
                  {favorites.find((f) => f._id === q._id) ? "❤️" : "🤍"}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentDashboard;

