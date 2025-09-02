const AboutPage = () => {
  return (
    <div className="min-h-screen bg-black text-green-400 px-6 py-10">
      {/* Page Header */}
      <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-10">
        CSMIT Technical Club
      </h1>

      {/* Introduction */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Introduction</h2>
        <p className="text-gray-300 text-lg leading-relaxed">
          CSMIT Technical Club is a hub for innovation, coding, and building the future.
          Our mission is to empower students with hands-on technical experience, workshops,
          and collaborative projects that bridge the gap between academics and industry.
        </p>
      </section>

      {/* Objectives */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Objectives</h2>
        <ul className="list-disc list-inside text-gray-300 text-lg space-y-2">
          <li>Promote innovation and technical skills among students.</li>
          <li>Encourage collaborative learning and team projects.</li>
          <li>Organize workshops, hackathons, and coding competitions.</li>
          <li>Prepare students for industry-level challenges and internships.</li>
        </ul>
      </section>

      {/* Alumni Achievements */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Alumni Achievements</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Example Alumni Card */}
          <div className="bg-gray-800 rounded-2xl p-4 flex flex-col items-center shadow-md hover:shadow-lg transition">
            <img
              src="https://via.placeholder.com/150"
              alt="Alumni Name"
              className="w-32 h-32 rounded-full mb-4 border-2 border-green-400"
            />
            <h3 className="font-semibold text-lg mb-1">John Doe</h3>
            <p className="text-gray-300 text-center">
              Successfully placed at Google as Software Engineer
            </p>
          </div>

          <div className="bg-gray-800 rounded-2xl p-4 flex flex-col items-center shadow-md hover:shadow-lg transition">
            <img
              src="https://via.placeholder.com/150"
              alt="Alumni Name"
              className="w-32 h-32 rounded-full mb-4 border-2 border-green-400"
            />
            <h3 className="font-semibold text-lg mb-1">Jane Smith</h3>
            <p className="text-gray-300 text-center">
              Founded a startup in AI and won national innovation awards
            </p>
          </div>

          <div className="bg-gray-800 rounded-2xl p-4 flex flex-col items-center shadow-md hover:shadow-lg transition">
            <img
              src="https://via.placeholder.com/150"
              alt="Alumni Name"
              className="w-32 h-32 rounded-full mb-4 border-2 border-green-400"
            />
            <h3 className="font-semibold text-lg mb-1">Alice Lee</h3>
            <p className="text-gray-300 text-center">
              Completed research internship at MIT and published papers in robotics
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
