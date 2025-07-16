

const Projects = () => {
  return (
    <section id="projects" className="min-h-screen pt-28 bg-white dark:bg-gray-900">
      <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">My Projects</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4 md:px-8 max-w-6xl mx-auto">
        {/* Project 1 */}
        <div className="border border-gray-300 dark:border-gray-600 rounded-xl shadow-md p-8 bg-white dark:bg-gray-800 transition-transform duration-300 hover:scale-105 hover:shadow-lg flex flex-col">
          <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">Cab Booking System</h3>
          <p className="text-base mb-3 text-gray-700 dark:text-gray-300">A web platform to book cabs with location, fare estimate, and admin control.</p>
          <p className="text-base mb-3 text-gray-700 dark:text-gray-300"><strong>Tech:</strong> Node.js, MongoDB, JavaScript</p>
          <button className="mt-auto px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-transform duration-300 hover:scale-105 font-semibold">View</button>
        </div>
        {/* Project 2 */}
        <div className="border border-gray-300 dark:border-gray-600 rounded-xl shadow-md p-8 bg-white dark:bg-gray-800 transition-transform duration-300 hover:scale-105 hover:shadow-lg flex flex-col">
          <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">Online Voting System</h3>
          <p className="text-base mb-3 text-gray-700 dark:text-gray-300">A review paper exploring secure and transparent e-voting using blockchain and biometrics.</p>
          <p className="text-base mb-3 text-gray-700 dark:text-gray-300"><strong>Tech:</strong> Blockchain, Biometric Auth</p>
          <button className="mt-auto px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-transform duration-300 hover:scale-105 font-semibold">View</button>
        </div>
        {/* Project 3 */}
        <div className="border border-gray-300 dark:border-gray-600 rounded-xl shadow-md p-8 bg-white dark:bg-gray-800 transition-transform duration-300 hover:scale-105 hover:shadow-lg flex flex-col">
          <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">Portfolio Website</h3>
          <p className="text-base mb-3 text-gray-700 dark:text-gray-300">A responsive personal portfolio to showcase skills, projects, and contact info.</p>
          <p className="text-base mb-3 text-gray-700 dark:text-gray-300"><strong>Tech:</strong> React.js, CSS, JavaScript</p>
          <button className="mt-auto px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-transform duration-300 hover:scale-105 font-semibold">View</button>
        </div>
        {/* Project 4 */}
        <div className="border border-gray-300 dark:border-gray-600 rounded-xl shadow-md p-8 bg-white dark:bg-gray-800 transition-transform duration-300 hover:scale-105 hover:shadow-lg flex flex-col">
          <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">Chat Application</h3>
          <p className="text-base mb-3 text-gray-700 dark:text-gray-300">A real-time chat app using WebSockets with room-based messaging and authentication.</p>
          <p className="text-base mb-3 text-gray-700 dark:text-gray-300"><strong>Tech:</strong> React, Node, Socket.IO</p>
          <button className="mt-auto px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-transform duration-300 hover:scale-105 font-semibold">View</button>
        </div>
      </div>
    </section>
  );
};

export default Projects;