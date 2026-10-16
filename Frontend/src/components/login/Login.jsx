import { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { AuthContext } from "../../AuthContext/AuthContext";
import { useNavigate } from "react-router-dom";

function Login() {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const { setToken } = useContext(AuthContext);
  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/auth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        },
      );
      const data = await response.json();
      setToken(data.token);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <Form className="mt-5 pt-5" onSubmit={onSubmit}>
      <Form.Group className="mb-3" controlId="email">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          name="email"
          onChange={handleChange}
          placeholder="Enter email"
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          name="password"
          onChange={handleChange}
          placeholder="Password"
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

export default Login;
