import { useEffect, useState } from "react"

type Movie = {
  id: string,
  title: string,
  year: number,
  genre: string,
  category: string,
  description: string,
  distribution: string
}

function Movies() {

  const [movies, setMovies] = useState<Movie[]>([]);

  

  useEffect(() => 
  {
    async function getMovies() {
      try {
        const data = await fetch(`${import.meta.env.VITE_MOVIES_API}/api/movies`);
        const movies = await data.json();
        console.log(movies);
        setMovies(movies);
      } catch (error) {
        console.error(error);
      }
    }

  getMovies();
  }, [])
  return (
    <div className="flex flex-col gap-y-5 h-full" >
      <h2 className="text-2xl font-bold">Movies</h2>
      <div className="border-2 rounded-lg p-5" >
        <div>Filters</div>
        <div className="overflow-x-auto" >
          <table className="table-fixed w-full text-left border-collapse" >
            <thead>
              <tr>
                <th className="border-b-1 border-gray-400 px-2 py-1 w-8" ></th>
                <th className="border-b-1 border-gray-400 px-2 py-1 w-32" >Title</th>
                <th className="border-b-1 border-gray-400 px-2 py-1 w-12" >Year</th>
                <th className="border-b-1 border-gray-400 px-2 py-1 w-20" >Genre</th>
                <th className="border-b-1 border-gray-400 px-2 py-1 w-20" >Category</th>
                <th className="border-b-1 border-gray-400 px-2 py-1" >Description</th>
                <th className="border-b-1 border-gray-400 px-2 py-1 w-24" >Distribution</th>
              </tr>
            </thead>
            <tbody>
            {movies && movies.map((movie, i) =>
              <tr key={movie.id} >
                <td className="border-y-1 border-gray-400 px-2 py-1 whitespace-nowrap" >{i + 1}</td>
                <td className="border-y-1 border-gray-400 px-2 py-1 truncate" >{movie.title}</td>
                <td className="border-y-1 border-gray-400 px-2 py-1 whitespace-nowrap" >{movie.year}</td>
                <td className="border-y-1 border-gray-400 px-2 py-1 whitespace-nowrap" >{movie.genre}</td>
                <td className="border-y-1 border-gray-400 px-2 py-1 whitespace-nowrap" >{movie.category}</td>
                <td className="border-y-1 border-gray-400 px-2 py-1 truncate" >{movie.description}</td>
                <td className="border-y-1 border-gray-400 px-2 py-1 whitespace-nowrap" >{movie.distribution}</td>
              </tr>
            )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Movies