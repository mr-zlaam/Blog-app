import {} from "react";

const App = () => {
  console.log(import.meta.env.VITE_APPWRITE_URL);
  return (
    <>
      <div className="">A blog app using appwrite</div>
    </>
  );
};

export default App;
