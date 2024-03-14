// Rooms.jsx
import React, { useState, useEffect } from 'react';
import { useSupabase } from '../../Providers/SupabaseProvider';

const Rooms = () => {
  const { supabase } = useSupabase();
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        // Fetch rooms
        const { data: roomsData, error: roomsError } = await supabase.from('rooms').select('*');

        if (roomsError) {
          throw new Error('Error fetching rooms: ' + roomsError.message);
        }

        setRooms(roomsData);
        setLoading(false);
      } catch (error) {
        console.error('Error:', error.message);
        setLoading(false);
      }
    };

    fetchRooms();
  }, [supabase]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Alle værelser</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rooms.map(room => (
          <div key={room.id} className="bg-white shadow-md rounded-md overflow-hidden">
            {room.image_id && (
              <img src={`https://ouxemfujuurkzesgdrsu.supabase.co/storage/v1/object/public/Test_storage/${room.image_id}.jpg`} alt={room.title} className="w-full h-40 object-cover" />
            )}
            <div className="p-4">
              <h3 className="text-lg font-bold mb-2">{room.title}</h3>
              <h4 className='font-bold'>Beskrivelse</h4>
              <p>{room.description}</p>
              <br />
              <h4 className='font-bold'>Størrelse</h4>
              <p>{room.area}</p>
              <br />
              <h4 className='font-bold'>Max antal personer</h4>
              <p>{room.num_persons}</p>
              <br />
              <h4 className='font-bold'>Dag pris normal</h4>
              <p>{room.day_price_normal} DKK</p>
              <br />
              <h4 className='font-bold'>Dag pris flex</h4>
              <p>{room.day_price_flex} DKK</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Rooms;
