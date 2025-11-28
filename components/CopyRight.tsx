function CopyRight({ textColor = "text-[#7A7A7A]", className = "" }) {
  return (
    <div
      className={`mt-8 text-center text-[10px] md:text-[12px] ${textColor} ${className}`}
    >
      &copy; All Right Resaved for <span className="font-bold">Dopin LLC</span>{" "}
      • Copyright {new Date().getFullYear()}
    </div>
  );
}

export default CopyRight;
