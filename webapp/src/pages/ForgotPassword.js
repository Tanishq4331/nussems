import React, { useRef, useState } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
  const emailRef = useRef();
  const { resetPassword, setAlert } = useAuth();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setAlert({
        message: "Check your inbox for further instructions",
        success: true,
      });
    } catch {
      setAlert({ message: "Failed to reset password", success: false });
    }

    setLoading(false);
  }

  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="w-100" style={{ maxWidth: "450px" }}>
        <Card>
          <Card.Body>
            <h2 className="text-center mb-4">Password Reset</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group id="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" ref={emailRef} required />
              </Form.Group>
              <Button disabled={loading} className="w-100" type="submit">
                Reset Password
              </Button>
            </Form>
            <div className="w-100 text-center mt-3">
              <Link to="/login">Login</Link>
            </div>
          </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
          Need an account? <Link to="/register">Register</Link>
        </div>
      </div>
    </Container>
  );
}
