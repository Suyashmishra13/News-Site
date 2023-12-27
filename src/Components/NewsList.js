import React, { useState } from "react";
import { Card, Col, Container, Row, } from "react-bootstrap";
import './CardComponent.css'; // Import the CSS file for styling
import useNewsData from "../hooks/useNewsData";
import CustomPagination from "./CustomPagination";

const NewsList = (props) => {
  const { category, searchTerm } = props;
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;

  const onPageChange = (pageNumber) => setCurrentPage(pageNumber);

  const { newsData, loading, error } = useNewsData(category, searchTerm);

  if (loading) {
    // Skeleton loading when data is still loading
    return (
      <Container>
        <Row>
          {[...Array(pageSize)].map((_, index) => (
            <Col xs={12} md={6} lg={4} key={index}>
              <Card className="skeleton">
                <Card.Img className="skeleton-img" />
                <Card.Body className="skeleton-content">
                  <Card.Title className="skeleton-title"></Card.Title>
                  <Card.Text className="skeleton-text"></Card.Text>
                  <Card.Link className="skeleton-link"></Card.Link>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    );
  }

  if (error) {
    // Display an error message if there is an error
    return <div>Error: {error.message}</div>;
  }

  const totalArticles = newsData.length;
  const totalPages = Math.ceil(totalArticles / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentArticles = newsData.slice(startIndex, endIndex);

  return (
    <Container>
      <Row>
        {currentArticles?.map((article, index) => (
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
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </Container>
  );
};

export default NewsList;
