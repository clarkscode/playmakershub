import opensea from "../assets/OpenSea.png";

function Header() {
  return (
    <header className="bg-neutral-950 bg-[radial-gradient(ellipse_70%_70%_at_50%_90%,rgba(120,119,198,0.3),rgba(255,255,255,0))]">
      <div className="px-4 mx-auto sm:px-6 lg:px-8 xl:px-12">
        <div className="flex items-center justify-between h-16 lg:h-[72px]">
          <div className="flex items-center flex-shrink-0">
            <a href="#" title="" className="inline-flex">
              <span className="sr-only"> Rareblocks logo </span>
              <img
                className="w-auto h-8"
                src={opensea}
                alt="opensea logo"
                width={160}
                height={160}
              />
            </a>
          </div>

          <div className="flex items-center justify-end ml-auto">
            <div className="hidden lg:flex lg:items-center lg:space-x-8">
              <a
                href="#faq"
                title="Frequently Asked Question"
                className="text-xl font-semibold text-white transition-all duration-200 rounded hover:text-[#2081E2]"
              >
                FAQ
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
