const HeadlineCards = () => {
  return (
    <div className="max-w-[1640px] mx-auto p-4 py-12 grid md:grid-cols-2 gap-6">
      {/* Card */}

      {/* Card */}
      <div className="rounded-xl relative">
        {/* Overlay */}
        <div className="absolute w-full h-full bg-black/50 rounded-xl text-white">
          <p className="font-bold text-2xl px-2 pt-4 text-orange-500">
            New <span className="text-white">Restaurants</span>{" "}
          </p>
          <p className="px-2">
            Added <span className="text-orange-500">Daily</span>{" "}
          </p>
        </div>
        <img
          className="max-h-[160px] md:max-h-[200px] w-full object-cover rounded-xl"
          src="https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fGJicXxlbnwwfDB8MHx8&auto=format&fit=crop&w=800&q=60"
          alt="/"
        />
      </div>
      {/* Card */}
      <div className="rounded-xl relative">
        {/* Overlay */}
        <div className="absolute w-full h-full bg-black/50 rounded-xl text-white">
          <p className="font-bold text-2xl px-2 pt-4">
            <span className="text-orange-500">We Deliver</span> Desserts Too
          </p>
          <p className="px-2">
            Tasty <span className="text-orange-500">Treats</span>{" "}
          </p>
        </div>
        <img
          className="max-h-[160px] md:max-h-[200px] w-full object-cover rounded-xl"
          src="https://images.unsplash.com/photo-1559715745-e1b33a271c8f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTd8fGRlc3NlcnR8ZW58MHwwfDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60"
          alt="/"
        />
      </div>
    </div>
  );
};

export default HeadlineCards;
