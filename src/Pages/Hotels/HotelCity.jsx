// // HotelCity.jsx

// import React, { useState, useEffect } from 'react';
// import { useLocation, Link } from 'react-router-dom';
// import { useSupabase } from '../../Providers/SupabaseProvider';

// const HotelCity = () => {
//   const { supabase } = useSupabase();
//   const location = useLocation();
//   const selectedCity = location.state?.city;
//   const [hotels, setHotels] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     async function fetchHotelsByCity() {
//       try {
//         if (selectedCity) {
//           const { data, error } = await supabase
//             .from('hotels')
//             .select('*')
//             .eq('city_id', selectedCity.id);

//           if (error) {
//             console.error('Error fetching hotels:', error.message);
//             setError(error.message);
//             return;
//           }

//           setHotels(data);
//           setLoading(false);
//         }
//       } catch (error) {
//         console.error('Error fetching hotels:', error.message);
//         setError(error.message);
//         setLoading(false);
//       }
//     }

//     fetchHotelsByCity();
//   }, [supabase, selectedCity]);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   return (
//     <div>
//       {/* Hero Section */}
//       {selectedCity && (
//         <div className="relative bg-gray-900 overflow-hidden">
//           {/* Display city image */}
//           <img className="w-full h-80 object-cover object-center" src={`https://ouxemfujuurkzesgdrsu.supabase.co/storage/v1/object/public/Test_storage/${selectedCity.image_id}.jpg`} alt={selectedCity.title} />
//           <div className="absolute inset-0 bg-black opacity-50"></div>
//           <div className="absolute inset-0 flex items-center justify-center">
//             <h1 className="text-4xl font-bold tracking-wide text-white">{`Vores hoteller i ${selectedCity.name}`}</h1>
//           </div>
//         </div>
//       )}


//         {/* Vertical red line on the right side */}
//         <div className="vl bg-gray-400 h-3/4 w-1 absolute lg:right-64 sm:right-0 right-0 lg:left-auto left-auto" />
//   <div className="mt-8 pl-44 pr-72"> {/* Add padding to the entire section */}
//       {/* City description */}
//       {selectedCity && (
//         <div className="left-0 mt-8">
//           <h2 className="text-xl font-bold mb-2">Om {selectedCity.name}</h2>
//           <p>{selectedCity.description}</p>
//         </div>
//       )}

//       {/* Hotels */}
//       <div className="left-0 mt-8">
//         <h2 className="text-2xl font-bold mb-4">Hoteller i {selectedCity && selectedCity.name}</h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
//           {hotels.map(hotel => (
//             <Link to={`/hotels/${selectedCity.name}/${hotel.id}`} key={hotel.id} className="cursor-pointer p-2 rounded-lg border border-gray-300 hover:bg-gray-100">
//               <img src={`https://ouxemfujuurkzesgdrsu.supabase.co/storage/v1/object/public/Test_storage/${hotel.image_id}.jpg`} alt={hotel.name} className="w-full h-64 object-cover rounded-lg mb-4" />
//               <h3 className="text-xl font-bold">{hotel.title}</h3>
//               <p>{hotel.teaser}</p>
//             </Link>
//           ))}
//         </div>
//       </div>
//     </div>
//     </div>
//   );
// };

// export default HotelCity;

import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useSupabase } from '../../Providers/SupabaseProvider';

const HotelCity = () => {
  const { supabase } = useSupabase();
  const location = useLocation();
  const selectedCity = location.state?.city;
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchHotelsByCity() {
      try {
        if (selectedCity) {
          const { data, error } = await supabase
            .from('hotels')
            .select('*')
            .eq('city_id', selectedCity.id);

          if (error) {
            console.error('Error fetching hotels:', error.message);
            setError(error.message);
            return;
          }

          setHotels(data);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching hotels:', error.message);
        setError(error.message);
        setLoading(false);
      }
    }

    fetchHotelsByCity();
  }, [supabase, selectedCity]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      {/* Hero Section */}
      {selectedCity && (
        <div className="relative bg-gray-900 overflow-hidden">
          {/* Display city image */}
          <img className="w-full h-80 object-cover object-center" src={`https://ouxemfujuurkzesgdrsu.supabase.co/storage/v1/object/public/Test_storage/${selectedCity.image_id}.jpg`} alt={selectedCity.title} />
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="text-4xl font-bold tracking-wide text-white">{hotels.length === 1 ? `Vores hotel i ${selectedCity.name}` : `Vores hoteller i ${selectedCity.name}`}</h1>
          </div>
        </div>
      )}

      {/* Vertical red line on the right side */}
      <div className="hidden lg:block vl bg-gray-400 h-3/4 w-1 absolute lg:right-64 sm:right-0 right-0 lg:left-auto left-auto" />

      {/* Padding */}
      <div className="mt-8 px-4 lg:px-12 xl:px-24"> {/* Add padding to the entire section */}
        {/* City description */}
        {selectedCity && (
          <div className="mt-8">
            <h2 className="text-xl font-bold mb-2">Om {selectedCity.name}</h2>
            <p>{selectedCity.description}</p>
          </div>
        )}

        {/* Hotels */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {hotels.map(hotel => (
            <Link to={`/hotels/${selectedCity.name}/${hotel.id}`} key={hotel.id} className="cursor-pointer p-2 rounded-lg border border-gray-300 hover:bg-gray-100">
              <img src={`https://ouxemfujuurkzesgdrsu.supabase.co/storage/v1/object/public/Test_storage/${hotel.image_id}.jpg`} alt={hotel.name} className="w-full h-64 object-cover rounded-lg mb-4" />
              <h3 className="text-xl font-bold">{hotel.title}</h3>
              <p>{hotel.teaser}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HotelCity;
