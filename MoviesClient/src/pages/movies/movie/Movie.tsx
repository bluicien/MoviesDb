import { Navigate, useParams } from "react-router"
import { useGetMovie } from "../../../features/movies/useGetMovie";
import LoadingSpinner from "../../../components/LoadingSpinner";

function Movie() {
  const params = useParams();
  if (!params.id) return <Navigate to={"movies"} replace />

  const { data, isLoading, error } = useGetMovie(params.id)
  if (isLoading) return <LoadingSpinner />;
  if (error) return <p>{error.message}</p>;
  console.log(data)

  return (
    <div className="flex flex-col grow-1 gap-10 bg-neutral-300 p-5 rounded-xl shadow-sm shadow-white" >
      <h3 className="text-6xl font-bold bg-slate-500/75 rounded-xl p-5" >{data?.title}</h3>
      <div className="flex w-full gap-5 bg-slate-500/75 p-5 rounded-xl">
        <div className="w-1/3" >
          <img className="w-full h-full object-cover rounded-xl" src={data?.coverPhoto} />
        </div>
        <div className="flex flex-col flex-1 gap-1 text-blue-300" >
          <p className="text-xl text-wrap"><strong className="text-slate-100">Description:</strong> {data?.description}</p>
          <p className="text-xl"><strong className="text-slate-100">Year: </strong>{data?.year}</p>
          <p className="text-xl"><strong className="text-slate-100">Genre: </strong>{data?.genre}</p>
          <p className="text-xl"><strong className="text-slate-100">Category: </strong>{data?.category}</p>
          <p className="text-xl"><strong className="text-slate-100">Distribution: </strong>{data?.distribution}</p>
          <p className="text-xl"><strong className="text-slate-100">Source: </strong><a href={data?.url} className="font-bold text-blue-700 underline hover:text-blue-300" >Visit FzMovies</a></p>
        </div>
      </div>
    </div>
  )
}

export default Movie