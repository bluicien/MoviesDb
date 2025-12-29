
function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center translate-y-50" >
      <div className="flex flex-col gap-5 p-10 md:py-20 md:px-40 bg-black/20 rounded-3xl shadow-md" >
        <div className="w-20 h-20 md:w-50 md:h-50 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        <div className="text-5xl text-blue-500 text-shadow-md text-shadow-black hidden md:block" >Loading...</div>
      </div>
    </div>
  )
}

export default LoadingSpinner