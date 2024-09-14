import EventCard from "./EventCard";

const AcceptedEvents = () => {
  const pendingEvents = [
    {
      eventTitle: "CITC Intramurals",
      organizer: "John Doe",
      email: "johndoe@ustp.edu.ph",
      location: "USTP Cafeteria",
      genre: ["Pop", "Rock"],
      eventStart: { date: "June 06, 2024", time: "10:00 AM" },
      eventEnd: { date: "June 06, 2024", time: "5:00 PM" },
      status: "Accepted",
      department: "CITC",
      organization: "Google Developers",
      theme: "Sonatang Inato",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {pendingEvents.map((event, index) => (
        <EventCard key={index} {...event} />
      ))}
    </div>
  );
};

export default AcceptedEvents;
