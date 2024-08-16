import { error, opensea } from "../../assets";

const NotFound = () => {
  return (
    <section className="h-screen w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] dark:bg-gray-900 py-20">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center">
          <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-[180px] text-[#B3B3B3] flex justify-center gap-5">
            4 <img src={error} alt="404 gif" width={100} height={100} /> 4
          </h1>

          <p className="mb-4 text-3xl tracking-tight font-bold text-white md:text-4xl dark:text-white">
            This page is lost.
          </p>
          <p className="text-[#b3b3b3]  text-[20px] mb-5">
            We&apos;ve explored deep and wide, <br /> but we can&apos;t find the
            page you were looking for.
          </p>
          <div className="flex justify-center">
            <img src={opensea} alt="opensea logo" width={150} height={150} />
          </div>
          {/* <a
            href="/"
            className="inline-flex bg-blue-500 text-white bg-primary-600 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900 my-4"
          >
            Back to Home
          </a> */}
        </div>
      </div>
    </section>
  );
};

export default NotFound;
