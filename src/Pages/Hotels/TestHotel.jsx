
import { useSupabase } from '../../Providers/SupabaseProvider';
import { useEffect, useState } from 'react';


const Hotels = () => {
  const { supabase } = useSupabase();
  const [fetchError, setFetchError] = useState(null);
  const [hotels, setHotels] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    const getHotels = async () => {
      try {
        setIsLoading(true);

        let query = supabase.from('hotels').select('*');

        if (selectedCountry) {
          query = query.filter('country', 'eq', selectedCountry);
        }

        const { data, error } = await query;

        if (error) {
          throw new Error('Could not fetch hotels');
        }

        if (data) {
          const hotelsWithImages = await Promise.all(
            data.map(async (hotel) => {
              try {
                const { data: imageData, error: imageError } = await supabase.storage
                  .from('public/Test_storage')
                  .download(`${hotel.image_id}.jpg`);

                if (imageError) {
                  throw new Error(`Error fetching image ${hotel.image_id}`);
                }

                return { ...hotel, image: imageData };
              } catch (imageError) {
                console.error(imageError.message);
                return { ...hotel, image: null };
              }
            })
          );

          setHotels(hotelsWithImages);
        }
      } catch (error) {
        console.error(error.message);
        setFetchError('An error occurred while fetching data.');
      } finally {
        setIsLoading(false);
      }
    };

    getHotels();
  }, [supabase, selectedCountry]);

  const countries = ['Country1', 'Country2', 'Country3']; // Replace with your actual country names

  return (
    <div>
      {/* Hero Image */}
      <div className="hero-image">
        {/* Add your hero image content here */}
        <h1>Welcome to our Hotel Booking Platform</h1>
      </div>

      {/* Navigation to Choose Countries */}
      <nav>
        <ul>
          <li onClick={() => setSelectedCountry(null)}>All Countries</li>
          {countries.map((country) => (
            <li key={country} onClick={() => setSelectedCountry(country)}>
              {country}
            </li>
          ))}
        </ul>
      </nav>

      {/* Hotel Listings */}
      {isLoading && <p>Loading...</p>}
      {fetchError && <p>{fetchError}</p>}
      {hotels && (
        <div>
          {hotels.map((hotel) => (
            <div key={hotel.title}>
              <h3>{hotel.title}</h3>
              {hotel.image && (
                <img
                  src={URL.createObjectURL(hotel.image)} // Convert Blob to data URL
                  alt={hotel.title}
                />
              )}
              <p>{hotel.slug}:</p>
              <p>{hotel.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Hotels;




      {/* Hero Section */}
      <div className="relative bg-gray-900 overflow-hidden">
        <div className="absolute inset-0">
          <img className="w-full h-1/2" src={testCityImage} alt="Test City" />
          <div className="absolute inset-0 bg-black opacity-50"></div>
        </div>
        <div className="relative z-10 flex flex-col items-center justify-center h-screen text-center text-white">
          <h1 className="text-4xl font-bold tracking-wide">Welcome to Test City</h1>
          <p className="text-lg mt-4">Explore the wonders of this amazing city</p>
          {/* You can add any additional elements here, like buttons or links */}
        </div>
      </div>