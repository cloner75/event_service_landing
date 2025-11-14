"use client";

import PersonImage from "./PersonImage";

export default function PeopleGroup() {
  const people = [
    {
      img: "p_1.jpg",
      style:
        "absolute top-[-50px] right-[30px] md:right-[-160px] md:top-[760px]",
    },
    {
      img: "p_2.jpg",
      style: "absolute top-[-50px] left-[30px] md:top-[330px] md:left-[-260px]",
    },
    {
      img: "p_3.jpg",
      style: "absolute top-[150px] left-[40px] md:left-[-160px] md:top-[760px]",
    },
    {
      img: "p_4.jpg",
      style: "absolute top-[250px] left-[40px] md:left-[10px] md:top-[430px]",
    },
    {
      img: "p_5.jpg",
      style: "absolute top-[250px] right-[40px] md:right-[20px] md:top-[430px]",
    },
    {
      img: "p_6.jpg",
      style:
        "absolute top-[150px] right-[10px] md:right-[-80px] md:top-[230px]",
    },
  ];

  return (
    <div className="relative w-full h-full">
      {people.map((p, index) => (
        <PersonImage
          key={p.img}
          imgName={p.img}
          style={p.style}
          appearDelay={(index + 1) * 1} // staggered delay
        />
      ))}
    </div>
  );
}
