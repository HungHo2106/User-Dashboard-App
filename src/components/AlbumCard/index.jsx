import { Button } from "react-bootstrap";

export const AlbumCard = ({ deleteAlbum, title, index, albumId }) => {
  return (
    <div
      className={
        "d-flex items-center justify-content-between border rounded text-decoration-none text-black"
      }
    >
      <div className=" py-2 flex-shrink-0 border-end d-flex items-center justify-content-center w-10 px-4">
        {index + 1}
      </div>
      <div className="py-2 w-100 px-4 text-truncate fw-bold text-start">
        {title}
      </div>
      <div className="text-center flex-shrink-0 w-10 py-2 px-4">
        <Button size="sm" variant="danger" onClick={() => deleteAlbum(albumId)}>
          X
        </Button>
      </div>
    </div>
  );
};
