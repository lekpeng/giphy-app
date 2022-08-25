const GifDisplay = ({ gifUrl }) => {
  return (
    <div className="gif-display">
      <iframe
        src={gifUrl}
        width="480"
        height="270"
        frameBorder="0"
        className="giphy-embed"
        allowFullScreen></iframe>
    </div>
  );
};

export default GifDisplay;
