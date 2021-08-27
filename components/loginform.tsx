import React, { useState } from "react";
import H2 from "./elements/h2";
import P from "./elements/p";
import { Accordion, Button, Card, Col, Row, Form } from "react-bootstrap";
import { fetchJSON, useBaseData } from "../lib/swr-hooks";
import Image from "next/image";
import { useRouter } from "next/router";
import axios from "axios";
import apiRequest from "helpers/apiRequest";
import Spinner from "react-bootstrap/Spinner";

export default function LoginForm({ setLoginAlert }) {
  const router = useRouter();
  const [notCorrect, setNotCorrect] = useState(false);
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e, name) => {
    setState({
      ...state,
      [name]: e.target.value,
    });
  };

  const checkCedentials = () => {
    if (state.email === "" || state.password === "") {
      setNotCorrect(true);
    } else {
      authUser();
    }
  };
  const saveToken = async (email, token) => {
    try {
      const response = await axios.post("/api/save-token", { email, token });
      if (response.status === 200) {
        //LOGIN USER
        router.push("/pve");
        setLoading(false);
        console.log("DATA", response.data);
      }
    } catch (err) {}
  };
  const setNewUser = async (email, token) => {
    try {
      const response = await axios.post("/api/set-new-user", { email, token });
      if (response.status === 200) {
        //LOGIN USER
        console.log("RESPONSE DATA", response.data);
        localStorage.setItem("userID", response.data.insertId);
        router.push("/pve");
        setLoading(false);
      }
    } catch (err) {}
  };
  const chechForEmail = async (email, token) => {
    try {
      const response = await axios.get("/api/check-email", {
        params: { email: email },
      });
      if (response.status === 200 && response.data.length > 0) {
        console.log("RESPONSEE", response.data[0].id);
        localStorage.setItem("userID", response.data[0].id);
        saveToken(email, token);
      } else if (response.status === 200 && response.data.length === 0) {
        setNewUser(email, token);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // get auth user
  const authUser = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("username", state.email);
    formData.append("password", state.password);
    try {
      const response = await apiRequest({
        method: "post",
        url: "v1/auth",
        data: formData,
      });
      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("email", state.email);
        chechForEmail(state.email, response.data.token);
      }
    } catch (err) {
      setLoading(false);
      setLoginAlert(err.message || err.response.data.error);
    }
  };

  return (
    <>
      <div className={"login-form-wrapper"}>
        <Row className={"title"}>
          <Col
            xs={{ span: 12, order: 1 }}
            md={{ span: 12, order: 1 }}
            lg={{ span: 12, order: 1 }}
            xl={{ span: 4, order: 0 }}
          >
            <p className={"login-title pt-1 pt-md-4 "}>Inloggen</p>
          </Col>
          <Col
            xs={{ span: 12, order: 0 }}
            md={{ span: 12, order: 0 }}
            lg={{ span: 12, order: 0 }}
            xl={{ span: 8, order: 1 }}
          >
            <div className="form-img ">
              <Image
                src={"/tvvl_logo.png"}
                width="247"
                height="88"
                unoptimized={true}
              />
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <Form.Group>
              <Form.Control
                className={
                  notCorrect && state.email === "" ? "is-invalid" : null
                }
                size="sm"
                type="text"
                placeholder="E-mailadres"
                value={state.email}
                onChange={(e) => handleChange(e, "email")}
              />
              <br />
              <Form.Control
                className={
                  notCorrect && state.password === "" ? "is-invalid" : null
                }
                size="sm"
                type="password"
                placeholder="Wachtwoord"
                value={state.password}
                onChange={(e) => handleChange(e, "password")}
              />
            </Form.Group>
            <Button
              onClick={checkCedentials}
              className="btnclass"
              style={{ width: "246px", borderRadius: "4px" }}
            >
              {loading ? <Spinner animation="border" role="status" /> : "Login"}
            </Button>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <p className={"subtitle"}>
              Inloggen gaat via TVVL Connect, nog geen account?{" "}
            </p>
            <p className={"subtitle-link"}>
              Ga naar{" "}
              <a
                style={{ color: "#009fdf" }}
                href="https://www.tvvlconnect.nl/"
                target="_blank"
              >
                www.tvvlconnect.nl
              </a>
            </p>
          </Col>
        </Row>
      </div>

      <style jsx>{`
        .subtitle {
          font-size: 13px;
          margin-top: 25px;
          margin-bottom: 0;
        }

        .subtitle-link {
          font-size: 13px;
          color: #009fdf;
        }

        .login-title {
          font-weight: bold;
          color: #164291;
          font-size: 25px;
        }

        .title {
          padding-top: 10px;
          padding-bottom: 10px;
        }
      `}</style>
    </>
  );
}
