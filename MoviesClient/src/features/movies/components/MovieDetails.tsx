import type { Movie } from "../schemas"

function MovieDetails({ movie }: { movie: Movie }) {
  return (
    <div className="flex flex-col grow-1 gap-10 bg-neutral-300 p-5 rounded-xl shadow-sm shadow-white" >
      <h3 className="text-6xl font-bold bg-slate-500/75 rounded-xl p-5" >{movie?.title}</h3>
      <div className="flex w-full gap-5 bg-slate-500/75 p-5 rounded-xl">
        <div className="w-1/3" >
          <img className="w-full h-full object-cover rounded-xl" src={movie?.coverPhoto} />
        </div>
        <div className="flex flex-col flex-1 gap-1 text-blue-300" >
          <p className="text-xl text-wrap"><strong className="text-slate-100">Description:</strong> {movie?.description}</p>
          <p className="text-xl"><strong className="text-slate-100">Year: </strong>{movie?.year}</p>
          <p className="text-xl"><strong className="text-slate-100">Genre: </strong>{movie?.genre}</p>
          <p className="text-xl"><strong className="text-slate-100">Category: </strong>{movie?.category}</p>
          <p className="text-xl"><strong className="text-slate-100">Distribution: </strong>{movie?.distribution}</p>
          <p className="text-xl"><strong className="text-slate-100">Source: </strong><a href={movie?.url} className="font-bold text-blue-700 underline hover:text-blue-300" >Visit FzMovies</a></p>
        </div>
      </div>
    </div>
  )
}

export default MovieDetails