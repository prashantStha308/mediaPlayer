const Tile = ({ item }) => {
  return (
    <div>
          <section id="user_tile" className="group relative overflow-hidden rounded-lg">
        <div className="text-2xl text-gray-800 dark:text-white bg-white/55 dark:bg-black/35 backdrop-blur-3xl border border-gray-500 rounded-lg px-8 py-5 grid shadow-lg hover:border-purple-500 transition-all duration-300 ease-in-out z-20 hover:border-l-pink-300 hover:border-r-purple-700 ">
            <div className=" grid gap-4 whitespace-normal break-all max-w-[250px]">
                <h1 className="text-sm" > <span className="font-bold text-purple-600 dark:text-white">Username:</span> hmm </h1>
                <h4 className="text-sm"> <span className="font-bold text-purple-600 dark:text-white">Email:</span> hmm </h4>
            </div>
        </div>

    </section>

    </div>
  )
}

export default Tile