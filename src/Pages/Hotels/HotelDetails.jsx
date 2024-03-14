import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSupabase } from '../../Providers/SupabaseProvider';

const HotelDetails = () => {
  const { hotelId } = useParams();
  const { supabase } = useSupabase();
  const [hotel, setHotel] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch hotel details
        const { data: hotelData, error: hotelError } = await supabase
          .from('hotels')
          .select('*')
          .eq('id', hotelId)
          .single();

        if (hotelError) {
          throw new Error('Error fetching hotel details');
        }

        setHotel(hotelData);

        // Fetch rooms for the hotel
        const { data: roomsData, error: roomsError } = await supabase
          .from('rooms')
          .select('*')
          .eq('id', hotelId);

        if (roomsError) {
          console.error('Error fetching rooms:', roomsError);
          throw new Error('Error fetching rooms');
        }

        setRooms(roomsData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error.message);
        setError(error.message);
        setLoading(false);
      }
    }

    fetchData();
  }, [supabase, hotelId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      {/* Path above hotel title */}
      <div>
        <Link to="/">Home</Link> {'>'} 
        <Link to="/hotels"> Hotels</Link> {'>'}
        <span>{hotel.title}</span>
      </div>
      <br />
      {/* Hotel details */}
      <h2 className="text-2xl font-bold mb-4">{hotel.title}</h2>
      <br />
      <p>{hotel.description}</p>

      {/* Room grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {/* Each room item */}
        {rooms.map(room => (
          <div key={room.id} className="p-4 border rounded-lg">
            <img src={room.image} className="w-full h-48 object-cover rounded-lg mb-2" alt={room.title} />
            <h3 className="text-xl font-bold mb-2">{room.title}</h3>
            <p>{room.description}</p>
            {/* Add arrow down icon here */}
          </div>
        ))}
      </div>
      <h2>test</h2>
    </div>
  );
};

export default HotelDetails;
