import PersonWithQuote from "./PersonWithQuote";

const QUOTES = [
  {
    imgName: "alic.jpg",
    title: "Alic",
    quote:
      "Loved the energy. The chat before the event helped me feel comfortable joining!",
    style: "top-[90%] left-[15%] md:top-0 md:left-[-200px]",
  },
  {
    imgName: "roby.jpg",
    title: "Roby",
    quote:
      "It’s crazy how easy it was to find friends with similar interests here.",
    style: "top-[140%] left-[35%] md:top-[280px] md:left-[-120px]",
  },
  {
    imgName: "samantha.jpg",
    title: "Samantha",
    quote: "Met my new favorite crew here. Dopin works!",
    style: "top-[180%] left-[15%] md:top-[600px] md:left-[-180px]",
  },
  {
    imgName: "Darrius.jpg",
    title: "Darrius",
    quote: "Good people, chill atmosphere. Can’t wait for the next one.",
    style: "hidden md:flex top-[50px] right-[-30%]",
  },
  {
    imgName: "Vinh.jpg",
    title: "Vinh",
    quote:
      "Everything was smooth — joined the chat, met up, and had an awesome night.",
    style: "hidden md:flex top-[300px] right-[-20%]",
  },
  {
    imgName: "Vinh_2.jpg",
    title: "Vinh",
    quote: "So fun! We ended up hanging out even after the event ended.",
    style: "hidden md:flex top-[600px] right-[-300px]",
  },
];

function PersonQuotes() {
  return QUOTES.map((q) => (
    <PersonWithQuote
      key={q.imgName}
      imgName={q.imgName}
      title={q.title}
      quote={q.quote}
      style={q.style}
    />
  ));
}

export default PersonQuotes;
