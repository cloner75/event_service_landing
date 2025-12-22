"use client";

import PersonImage from "./PersonImage";

export default function PeopleGroup() {
  const people = [
    {
      img: "p_1.jpg",
      style:
        "absolute top-[-50px] right-[30px] lg:right-[-160px] lg:top-[760px]",
    },
    {
      img: "p_2.jpg",
      style: "absolute top-[-50px] left-[30px] lg:top-[330px] lg:left-[-260px]",
    },
    {
      img: "p_3.jpg",
      style: "absolute top-[150px] left-[40px] lg:left-[-160px] lg:top-[760px]",
    },
    {
      img: "p_4.jpg",
      style: "absolute top-[250px] left-[40px] lg:left-[10px] lg:top-[430px]",
    },
    {
      img: "p_5.jpg",
      style: "absolute top-[250px] right-[40px] lg:right-[20px] lg:top-[430px]",
    },
    {
      img: "p_6.jpg",
      style:
        "absolute top-[150px] right-[10px] lg:right-[-80px] lg:top-[230px]",
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
