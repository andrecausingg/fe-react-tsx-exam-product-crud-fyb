import { useEffect } from "react";

const NotFound: React.FC = () => {
  useEffect(() => {
    window.location.href = "/";
  }, []);

  return (
    <>
      <h1>Not Found!</h1>
    </>
  );
};

export default NotFound;
