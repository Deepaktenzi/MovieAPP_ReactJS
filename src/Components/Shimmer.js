const Shimmer = () => {
  return (
    <div className="container">
      <div className="shimmer-list">
        {Array(12)
          .fill('')
          .map((e, idx) => (
            <div key={idx} className="shimmer-card">
              <div className="shine" id="image_shine"></div>
              <div className="shine" id="lines_shine"></div>
              <div className="shine" id="lines_shine"></div>
              <div className="shine" id="lines_shine"></div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Shimmer;
