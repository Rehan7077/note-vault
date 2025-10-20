import './Loader.css'
const Loader = () => {
  return (
    <div className="loader-overlay">
      <h2>Hii, User NoteVault is Loading</h2>
      <div className="loader">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
};

export default Loader;
