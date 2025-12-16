

function MovieCard() {
  return (
    <div className="p-5 flex flex-col border-1 rounded-md bg-gray-800 cursor-pointer" >
      <div className="w-50 h-60 bg-white rounded-md" />
      <h4 className="my-1 font-medium hover:underline underline-offset-3" >Movie 1</h4>
      <div className="flex justify-between" >
        <p className="text-gray-300" >Genre</p>
        <p className="text-gray-300" >Year</p>
      </div>
    </div>
  )
}

export default MovieCard;