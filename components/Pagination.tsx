

interface PagintaionProps {
  currentPage: number;
  onPageChange: (page: number) => void;
  totalPages: number;
  visiblePageNumbers?: number;
}

export default function Pagination({
  currentPage,
  onPageChange,
  totalPages,
  visiblePageNumbers = 5,
}: PagintaionProps) {
  const array = new Array(visiblePageNumbers);
  const pages = () => {
    let startingNumber = 1;
    let endNumber = startingNumber + visiblePageNumbers;
    if (currentPage === 1) {
      startingNumber = 1;
    } else {
      startingNumber =
        currentPage -
        (visiblePageNumbers - Math.floor(visiblePageNumbers / 2)) +
        1;
      if (Math.sign(startingNumber) <= 0) {
        startingNumber = 1;
      }
    }
    for (let i = startingNumber; i < endNumber + startingNumber - 1; i++) {
      array[i] = i;
    }
  };
  pages();

  return (
    <div className="w-max flex gap-1 m-auto my-5">
      {array.map((item) => (
        <button
          disabled={item > totalPages}
          onClick={() => {
            onPageChange(item);
          }}
          className={`${
            currentPage === item
              ? "bg-gray-600 text-white border-gray-400 rounded-md"
              : ` text-black `
          } px-3 py-2 text-black disabled:text-gray-300`}
          key={item}
        >
          {item}
        </button>
      ))}
    </div>
  );
}
