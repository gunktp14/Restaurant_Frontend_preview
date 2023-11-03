import { useEffect, useState } from "react";
import { useAppContext } from "../../context/appContext";
import Item from "./Item";

function Table() {
  const { restaurantList, search } = useAppContext();
  const [filteredRestaurant, setFilteredRestaurant] = useState(null);

    useEffect(() => {
      if (search.length !== 0) {

        setFilteredRestaurant(
          restaurantList.filter(
            (item) =>
              item.name.toLowerCase().includes(search.toLowerCase()) ||
              item.type.toLowerCase().includes(search.toLowerCase())
          )
        );
      }
      if (search.length === 0 || search === null) {
        setFilteredRestaurant(null);
      }
    }, [search]);
  return (
    <div className="wrapper-table">
      <table id="restaurants">
        <tr>
          <th>Name</th>
          <th>Type</th>
          <th>Image</th>
          <th>createdAt</th>
          <th>updatedAt</th>
          <th width="85px">option</th>
        </tr>
        {filteredRestaurant
          ? filteredRestaurant.map((element, index) => {
              return <Item restaurant={element} key={index} />;
            })
          : restaurantList.map((element, index) => {
              return <Item restaurant={element} key={index} />;
            })}
        {restaurantList.length === 0 && <div className="loader"></div>}
      </table>
    </div>
  );
}

export default Table;
