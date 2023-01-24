
const Home = () => {
    return (
      <div className="h-screen flex justify-center items-center">
        <div className="m-2">
          <h1 className="text-center">I am..</h1>
        </div>
        <div className="flex justify-center space-x-4">
            <button
              className="w-50 bg-white tracking-wide text-green font-bold rounded border-b-2 border-green hover:border-green hover:bg-light-pink hover:text-green shadow-md py-2 px-6 inline-flex items-center">
              <span className="mx-auto">Starting a Group</span>
            </button>
            <button
              className="w-50 bg-white tracking-wide text-green font-bold rounded border-b-2 border-green hover:border-green hover:bg-light-pink hover:text-green shadow-md py-2 px-6 inline-flex items-center">
              <span className="mx-auto">Joining a Group</span>
            </button>
        </div>
      </div>
    );
  }
  
  export default Home;
  