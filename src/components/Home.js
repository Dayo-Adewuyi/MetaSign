import React from "react";
import { Row, Col, Button } from "antd";
import pe from "../assets/pe.jpg";
import ReactRotatingText from "react-rotating-text";
import { useNavigate } from "react-router-dom";
import { APP_DESC } from "../util/constants";
import { CheckCircleOutlined, CheckCircleTwoTone } from "@ant-design/icons";

const CHECKLIST_ITEMS = [
  "Secured minting of signatures",
  "No risk of data breach",
  "No exhorbitant fees",
];

function Home(props) {
  const navigate = useNavigate();

  const goToCreate = () => {
    navigate("/create");
  };
  return (
    <div className="hero-section">
      <Row>
        <Col span={12}>
          <div className="hero-slogan-section">
            <div className="hero-slogan">
              <p>
                 Secure signature requests for&nbsp;
                <ReactRotatingText
                  items={["businesses", "individuals", "everyone"]}
                />
                .
              </p>
            </div>
           
            {CHECKLIST_ITEMS.map((item, i) => {
              return (
                <p>
                  <CheckCircleTwoTone twoToneColor="#00aa00" />
                  &nbsp;
                  {item}
                </p>
              );
            })}
            <br />

            <Button type="primary" size="large" onClick={goToCreate}>
              Create signature request
            </Button>
          </div>
        </Col>
        <Col span={12}>
          <img src={pe} className="hero-image" alt="hero" />
        </Col>
      </Row>
    </div>
  );
}

Home.propTypes = {};

export default Home;
