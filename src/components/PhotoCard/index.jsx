import { Card } from "react-bootstrap";

export const PhotoCard = ({ url, title, id, albumId }) => {
  return (
    <Card className="w-100">
      <Card.Img variant="top" src={url} />
      <Card.Body>
        <Card.Title className="w-full text-truncate">{title}</Card.Title>
        <Card.Text className="mb-1">Id: #{id}</Card.Text>
        <Card.Text>Album Id: #{albumId}</Card.Text>
      </Card.Body>
    </Card>
  );
};
