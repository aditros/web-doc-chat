import PropTypes from 'prop-types';

const Layout = ({ children }) => {

  const currentYear = new Date().getFullYear();

  return (
      <div className="h-screen w-screen flex flex-col bg-gray-100">
          <header className="bg-gray-800 text-white p-4 text-center font-bold">
              WebLLM Document Chat
          </header>
          <main className="flex-grow flex flex-col items-center justify-center">
              {children}
          </main>
          <footer className="bg-gray-800 text-white text-center p-2">
              &copy; {currentYear} Web Doc Chat
          </footer>
      </div>
  );
}
Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;