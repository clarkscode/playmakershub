import EventCard from "./EventCard";

const OngoingEvents = () => {
  const ongoingEvents = [
    {
      eventTitle: "Ongoing Event",
      organizer: "Jane Doe",
      email: "janedoe@ustp.edu.ph",
      location: "USTP Campus",
      genre: ["Tech", "Music"],
      eventStart: { date: "Sept 10, 2024", time: "9:00 AM" },
      eventEnd: { date: "Sept 10, 2024", time: "6:00 PM" },
      status: "Ongoing",
      department: "CITC",
      organization: "USTP",
      theme: "Innovation",
      participants: 50, // Current participants
      maxParticipants: 100, // Maximum participants
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {ongoingEvents.map((event, index) => (
        <EventCard key={index} {...event} />
      ))}
    </div>
  );
};

export default OngoingEvents;
