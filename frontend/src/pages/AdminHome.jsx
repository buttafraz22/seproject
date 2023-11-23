import React from 'react'
import AdminNavbar from '../components/AdminNavbar'
import { Carousel, Container, Row, Col } from 'react-bootstrap'

export default function AdminHome() {
  return (
    <div>
      <AdminNavbar />

      <Container>
      <Carousel>
        <Carousel.Item>
          <Row>
            <Col md={12} className="mt-5">
              <h1>Welcome to Cuarto Admin Panel.</h1>
            </Col>
          </Row>
        </Carousel.Item>

        <Carousel.Item>
          <Row className="landing">
            <Col md={6}>
              <h2 className="mt-5">Create Client Accounts.</h2>
            </Col>
            <Col md={6}>
              <h2 className="mt-5">Manage Client Feedbacks.</h2>
            </Col>
          </Row>
        </Carousel.Item>

        <Carousel.Item>
          <Row className="landing">
            <Col md={6}>
              <h2 className="mt-5">Update Client Accounts.</h2>
            </Col>
            <Col md={6}>
              <h2 className="mt-5">Delete Client Feedbacks.</h2>
            </Col>
          </Row>
        </Carousel.Item>

        <Carousel.Item>
          <Row className="landing">
            <Col>
              <h2 className="text-center mt-5">Manage Client Balance.</h2>
            </Col>
          </Row>
        </Carousel.Item>
      </Carousel>
    </Container>
    </div>
  )
}
