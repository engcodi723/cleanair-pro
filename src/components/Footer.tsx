
const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto text-center">
        <p>&copy; {new Date().getFullYear()} CleanAir. All rights reserved.</p>
        <p className="mt-2">에어컨 청소의 표준, 클린에어</p>
      </div>
    </footer>
  );
};

export default Footer;
