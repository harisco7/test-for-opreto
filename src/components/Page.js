import React, { useEffect, useState, useMemo } from "react";

import { Layout, Typography, Button, Row, Col, Table } from "antd";

import { RightOutlined, LeftOutlined, StarFilled } from "@ant-design/icons";

const { Header, Content, Footer } = Layout;
const { Title } = Typography;
const { Column } = Table;

export default function Page() {
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    fetch(
      "https://interview.opreto.com/nfl_statistics/harissmajlagic39@gmail.com"
    )
      .then((res) => res.json())
      .then((res) => {
        setData(res);
        if (res.length > 0) {
          setSelected(res[0].Year);
        }
      });
  }, []);

  const selectedYear = useMemo(
    () => data.find((item) => item.Year === selected),
    [selected, data]
  );

  const getColor = (year) => {
    let index = data.findIndex((result) => result.Year === year) + 1;

    if (index % 15 === 0) {
      return "success";
    } else if (index % 3 === 0) {
      return "warning";
    } else if (index % 5 === 0) {
      return "danger";
    }

    return "default";
  };

  const selectedIndex = useMemo(
    () => data.findIndex((item) => item.Year === selected),
    [data, selected]
  );

  return (
    <Layout className="layout">
      <Header></Header>
      <Content style={{ padding: "50px" }}>
        <div className="site-layout-content">
          <Row>
            <Col span={4}>
              {selectedIndex > 0 && (
                <Button
                  type="primary"
                  onClick={() => setSelected(data[selectedIndex - 1].Year)}
                >
                  <LeftOutlined />
                </Button>
              )}
            </Col>
            <Col span={16}>
              {selectedYear && (
                <Title type={getColor(selectedYear.Year)} className="center">
                  {selectedYear.Year}
                  {(selectedIndex + 1) % 2 === 0 && <StarFilled />}
                </Title>
              )}
            </Col>
            <Col span={4}>
              {selectedIndex >= 0 && (
                <Button
                  type="primary"
                  onClick={() =>
                    setSelected(data[(selectedIndex + 1) % data.length].Year)
                  }
                  style={{ float: "right" }}
                >
                  <RightOutlined />
                </Button>
              )}
            </Col>
          </Row>
          {selectedYear && (
            <Table dataSource={[selectedYear]} scroll={{ x: 1300 }}>
              {Object.keys(selectedYear).map((item) => (
                <Column title={item} dataIndex={item} key={item}></Column>
              ))}
            </Table>
          )}
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>This is test project</Footer>
    </Layout>
  );
}
