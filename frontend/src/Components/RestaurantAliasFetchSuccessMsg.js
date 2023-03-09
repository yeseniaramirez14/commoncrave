const RestaurantAliasFetchSuccessMsg = ({ restaurantAliases }) => {
  return (
    <div
      className={
        "absolute bottom-1/2 left-1/3 bg-light-pink border-2 text-green px-4 py-3"
      }
      role="alert"
    >
      <p className="font-bold">Restaurant cravings added</p>
      <p className="text-sm">{restaurantAliases}</p>
    </div>
  );
};

export default RestaurantAliasFetchSuccessMsg;
