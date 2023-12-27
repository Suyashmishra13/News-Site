import React, { useState } from "react";
import { Card, Col, Container, Row, } from "react-bootstrap";
import './CardComponent.css'; // Import the CSS file for styling
import useNewsData from "../hooks/useNewsData";
import CustomPagination from "./CustomPagination";

const NewsList = (props) => {
  const { category, searchTerm } = props;
  const [currentPage, setCurrentPage] = useState(1);
  const [dateFilter, setDateFilter] = useState("");
  const [regionFilter, setRegionFilter] = useState("");
  const [languageFilter, setLanguageFilter] = useState("");
  const pageSize = 6;

  const onPageChange = (pageNumber) => setCurrentPage(pageNumber);

  const handleDateFilterChange = (e) => setDateFilter(e.target.value);
  const handleRegionFilterChange = (e) => setRegionFilter(e.target.value);
  const handleLanguageFilterChange = (e) => setLanguageFilter(e.target.value);

  const { newsData, loading, error } = useNewsData(category, searchTerm, dateFilter, regionFilter, languageFilter);

  return (
    <Container>
      <Row>
        <Col xs={12} md={12}>
          <Button
            variant="primary"
            className="mb-3"
            onClick={() => {
              const filterCollapse = document.getElementById("filterCollapse");
              filterCollapse.classList.toggle("show");
            }}
          >
            Show Filters
          </Button>

          <div className="collapse" id="filterCollapse">
            <Form>
              {/* <Form.Group className="mb-3">
                <Form.Label>Filter by Date:</Form.Label>
                <Form.Control
                  type="date"
                  value={dateFilter}
                  onChange={handleDateFilterChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Filter by Region:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter region (e.g., India)"
                  value={regionFilter}
                  onChange={handleRegionFilterChange}
                />
              </Form.Group> */}
              <Form.Group className="mb-3">
                <Form.Label>Filter by Language:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter language code (e.g., en,hi,fr)"
                  value={languageFilter}
                  onChange={handleLanguageFilterChange}
                />
              </Form.Group>
              <Button
                variant="primary"
                type="button"
                onClick={() => {
                  setCurrentPage(1);
                  const filterCollapse = document.getElementById("filterCollapse");
                  filterCollapse.classList.remove("show");
                }}
              >
                Apply Filters
              </Button>
            </Form>
          </div>
        </Col>

        {newsData.map((article, index) => (
          <Col xs={12} md={6} lg={4} key={index}>
            <Card className="skeleton">
              <Card.Img src={article.image} variant="top" className="skeleton-img" />
              <Card.Body className="skeleton-content">
                <Card.Title className="skeleton-title">{article.title}</Card.Title>
                <Card.Text className="skeleton-text">{article.description}</Card.Text>
                <Card.Link href={article.url} className="skeleton-link">Read More</Card.Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <CustomPagination
        currentPage={currentPage}
        totalPages={Math.ceil(newsData.length / pageSize)}
        onPageChange={onPageChange}
      />
    </Container>
  );
};

export default NewsList;
