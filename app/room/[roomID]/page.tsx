function RoomPage({ params }: { params: { roomID: string } }) {
  return (
    <div>
      <h1>Game arena: {params.roomID}</h1>
    </div>
  );
}

export default RoomPage;
