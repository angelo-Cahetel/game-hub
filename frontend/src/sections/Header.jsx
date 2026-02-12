const Header = () => {
  const buttons = ["Home", "Minha Biblioteca", "Descobrir"];

  return (
    <header>
      <aside className="w-72 bg-white text-white p-4">
        <div className="flex align-center">
          <img
            src="https://i.pravatar.cc/40"
            alt="User Avatar"
            className="rounded-full"
          />
          <div className="flex-col text-start px-4">
            <h2 className="text-black text-lg font-semibold font-roboto">
              Usuário
            </h2>
            <p className="text-neutral-600 text-xs font-light font-roboto">
              Membro desde xxxx
            </p>
          </div>
        </div>

        <div className="my-8">
          <ul className="list-none list-outside">
            {buttons.map((buttons) => (
              <li key={buttons} className="mb-2 text-start text-black">
                <a
                  href="#"
                  className="font-roboto text-lg hover:text-gray-400"
                >
                  {buttons}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </header>
  );
};

export default Header;
