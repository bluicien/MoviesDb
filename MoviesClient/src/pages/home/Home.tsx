
function Home() {
  return (
    <div className="flex flex-col gap-y-5 h-full p-10 ml-10" >
      <h2 className="text-2xl font-bold" >Welcome to the movies database.</h2>
      <div>
        <h3 className="text-xl font-medium mb-1" >Trending now</h3>
        {/* TRENDING CONTAINER */}
        <div className="flex rounded-md p-5 bg-gray-500" >

          {/* MOVIE CARD */}
          <div className="p-5 flex flex-col border-1 rounded-md bg-gray-800 cursor-pointer" >
            <div className="w-50 h-60 bg-white rounded-md" />
            <h4 className="my-1 font-medium hover:underline underline-offset-3" >Movie 1</h4>
            <div className="flex justify-between" >
              <p className="text-gray-300" >Genre</p>
              <p className="text-gray-300" >Year</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home;