import { Fragment } from 'react';
import useFetch from '../../hooks/useFetch';
import './FeaturedProperties.css';

const FeaturedProperties = () => {
   const { data, loading, error } = useFetch(
      'http://192.168.0.117:8800/api/hotels?featured=true&limit=4'
   );

   console.log(data);
   return (
      <div className="fp">
         {loading ? (
            'Loading please wait'
         ) : (
            <Fragment>
               {data.map((item) => (
                  <div className="fpItem" key={item._id}>
                     <img
                        src={
                           item.photos[0]
                              ? item.photos[0]
                              : 'https://cf.bstatic.com/xdata/images/xphoto/square300/57584488.webp?k=bf724e4e9b9b75480bbe7fc675460a089ba6414fe4693b83ea3fdd8e938832a6&o='
                        }
                        alt=""
                        className="fpImg"
                     />
                     <span className="fpName">{item.name}</span>
                     <span className="fpCity">{item.city}</span>
                     <span className="fpPrice">
                        Starting from ${item.cheapestPrice}
                     </span>
                     {item.rating && (
                        <div className="fpRating">
                           <button>{item.rating}</button>
                           <span>Excellent</span>
                        </div>
                     )}
                  </div>
               ))}
            </Fragment>
         )}
      </div>
   );
};

export default FeaturedProperties;
