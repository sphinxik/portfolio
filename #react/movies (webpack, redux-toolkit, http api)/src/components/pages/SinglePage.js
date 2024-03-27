import MediaCard from "../mediaCard/MediaCard";

function SinglePage({dataType}) {
  return (
    <div className="page">
      <MediaCard dataType={dataType} />
    </div>
  );
}

export default SinglePage;
