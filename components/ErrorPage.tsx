import SquircleShape from './SquircleShape';

export default function ErrorPage({
  text = 'Something went wrong!',
  reset,
}: {
  text?: string;
  reset: () => void;
}) {
  return (
    <SquircleShape
      withMotion
      cornerRadius={100}
      additionalclasses=" bg-white p-5 py-40"
    >
      <h2 className="text-center text-3xl font-bold">{text}</h2>
      <div className="flex justify-center mt-10">
        <SquircleShape cornerRadius={17}>
          <button
            onClick={() => reset()}
            type="button"
            className="bg-[#581DFF] text-xl mx-auto w-57 ml-auto text-white font-bold px-8 py-3 transition"
          >
            Try again
          </button>
        </SquircleShape>
      </div>
    </SquircleShape>
  );
}
