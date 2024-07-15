import { useState } from "react";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="App">
      <form
        //   onSubmit={handleSubmit}
        className="mx-auto border-2 p-9 md:p-12 w-72 md:w-96 border-cyan-400 mt-36 h-84"
      >
        <h3 className="pb-6 test-2xl text-center text-white">Login</h3>

        {/* <button className="px-3 y-1 rounded-sm bg-cyan-400">Sign Up</button> */}

        <label className="block mb-1 test-xl text-cyan-400" htmlFor="username">
          Username
        </label>
        <input
          className="w-full h-8 p-1 mb-6 focus:outline-none"
          id="username"
          type="text"
          onChange={(e) => setUsername(e.target.value)}
        />

        <label className="block mb-1 test-xl text-cyan-400" htmlFor="password">
          Password
        </label>
        <input
          className="w-full h-8 p-1 mb-6 focus:outline-none"
          id="password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="flex justify-between">
          <button className="px-3 y-1 rounded-sm bg-cyan-400" type="button">
            Cancel
          </button>
          <button className="px-3 y-1 rounded-sm bg-cyan-400" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
export default Login;
