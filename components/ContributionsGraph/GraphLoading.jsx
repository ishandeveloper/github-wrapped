const GraphLoading = ({ className }) => {
  const commits = new Array(280).fill(0);

  return (
    <div className={`${className} graph-loading`}>
      <ul className="squares">
        {commits.map((commit, index) => (
          <li data-level={`${Math.floor(Math.random() * 4)}`} key={index}></li>
        ))}
      </ul>
    </div>
  );
};

export default GraphLoading;
