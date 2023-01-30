import { useState, useEffect } from "react";
import { NavbarComponent } from "../../components/Navbar";
import { getPhotos } from "../../api/axios";
import { Button, Col, Row } from "react-bootstrap";
import { PhotoCard } from "../../components/PhotoCard";
import { InputComponent } from "../../components/Input";
import { SelectComponent } from "../../components/Select";

export const Photos = () => {
  const [searchValue, setSearchValue] = useState("");
  const [selectValue, setSelectValue] = useState("");
  const [photosList, setPhotosList] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const filters = [
    {
      label: "Album Id",
      value: "albumId",
    },
  ];
  const [visible, setVisible] = useState(12);

  const loadMorePhotos = () => {
    setVisible((prevNum) => prevNum + 12);
  };
  console.log(visible);
  useEffect(() => {
    getPhotos()
      .then((json) => {
        setPhotosList(json);
        return json;
      })
      .then((json) => {
        setSearchResult(json);
      });
  }, []);

  const handleFilter = () => {
    if (!searchValue) return setSearchResult(photosList);

    const resultArray = photosList.filter(
      (photo) => photo.albumId.toString() === searchValue
    );
    setSearchResult(resultArray);
  };

  return (
    <div>
      <NavbarComponent />
      <Row className="py-3 px-5 mx-0">
        <h1>Photos</h1>
        <div className="d-flex items-center gap-2">
          <SelectComponent
            className="form-select"
            style={{ width: 150 }}
            name="filters"
            values={filters}
            onChange={(e) => setSelectValue(e.target.value)}
          />
          <InputComponent
            className="form-control"
            style={{ width: 250 }}
            name="search"
            placeholder="Search by album id"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <button
            type="submit"
            className="btn btn-primary"
            onClick={handleFilter}
          >
            Search
          </button>
        </div>
        <Row className="mt-3">
          {searchResult && searchResult.length > 0 ? (
            (searchResult ? searchResult : photosList)
              .slice(0, visible)
              .map(({ id, ...rest }) => (
                <Col className="mb-4" xs={3} key={id}>
                  <PhotoCard id={id} {...rest} />
                </Col>
              ))
          ) : (
            <h3>Loading...</h3>
          )}
          {visible > photosList.length || visible > searchResult.length ? (
            <p className="text-bold text-center">No more Photo</p>
          ) : (
            <Button
              variant="primary"
              style={{ width: 150, margin: "0 auto" }}
              onClick={loadMorePhotos}
            >
              Load more
            </Button>
          )}
        </Row>
      </Row>
    </div>
  );
};
