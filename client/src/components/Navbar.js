function NavBar() {
  return (
    <nav className="bg-gray-800 p-6">
      <div className="flex items-center justify-between h-16">
        <div className="flex items-center">
          <div className="ml-10 flex items-baseline space-x-4">
            <a
              href="/home"
              className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              Home
            </a>
            <a
              href="/chat"
              className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              Chat
            </a>
            <a
              href="/create"
              className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              Create
            </a>
            <a
              href="/goals"
              className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              Goals
            </a>
            <a
              href="/profile"
              className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              Profile
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
export default NavBar;
