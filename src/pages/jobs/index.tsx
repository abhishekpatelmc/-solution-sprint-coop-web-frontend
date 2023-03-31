import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Menu, Typography, Layout, Button, Descriptions, Collapse } from "antd";
import type { MenuProps } from "antd";
import type { Job, Company } from "../../types";
import moment from "moment";
import Link from "next/link";
import Footer from "../components/Footer";

const Index = () => {
  const [allCompanies, setAllCompanies] = useState<Company[]>([]);
  const [selectedCompany, setSelectedCompany] = useState<Job[]>([]);
  const SOTI = "63eeacac00f301f10c83ba7d"; //Hardcoded SOTI company_id

  const { Title } = Typography;

  const { Panel } = Collapse;

  const { Header, Content, Sider } = Layout;

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_BACKEND_URL !== undefined) {
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/companies`)
        .then((res) => res.json())
        .then((data: Company[]) => {
          setAllCompanies(data);
          getCompaniesById(data[0]?._id);
        })
        .then((res) => console.log(res))
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  const getCompaniesById = (company_id: string | undefined) => {
    if (process.env.NEXT_PUBLIC_BACKEND_URL !== undefined) {
      fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/jobs/postings/${
          company_id ? company_id : ""
        }`
      )
        .then((res) => res.json())
        .then((data: Job[]) => {
          console.log("data", data);
          setSelectedCompany(data);
        })
        .then((res) => console.log(res))
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const onClick: MenuProps["onClick"] = (companies) => {
    getCompaniesById(companies.key);
  };

  const items = allCompanies.map((companies) => {
    return {
      key: companies._id,
      label: companies.company_name,
    };
  });

  const onChange = (key: string | string[]) => {
    console.log(key);
  };

  return (
    <div className="h-screen bg-[url('../../public/images/back.svg')] bg-cover bg-center bg-no-repeat">
      <Navbar />
      <Layout>
        <Layout>
          <Sider width={200}>
            <Menu
              onClick={onClick}
              defaultSelectedKeys={[SOTI]}
              defaultOpenKeys={["sub1"]}
              mode="inline"
              items={items?.length > 0 ? items : []}
            />
          </Sider>
          <Layout style={{ padding: "0 24px 24px", paddingTop: "20px" }}>
            <Content>
              <Collapse
                accordion
                defaultActiveKey={["0"]}
                onChange={onChange}
                size="large"
              >
                {selectedCompany.map((item, index) => {
                  return (
                    <Panel header={item.job_title} key={index}>
                      <Descriptions
                        title={item.job_title}
                        extra={
                          <Link
                            className="blueButton"
                            style={{
                              display: "inline-block",
                              color: "white",
                              border: "none",
                              borderRadius: "0.8rem",
                              backgroundColor: "#2aa0f5",
                              padding: "0.5rem 1rem",
                              textDecoration: "none",
                              textTransform: "uppercase",
                              fontSize: "1rem",
                              fontWeight: "bold",
                              letterSpacing: "0.05rem",
                              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
                              cursor: "pointer",
                              transition: "background-color 0.3s ease-in-out",
                            }}
                            href={item.job_link}
                          >
                            Apply
                          </Link>
                        }
                        style={{ borderRadius: "0.5", border: 1 }}
                      >
                        <Descriptions.Item label="Term">
                          {item.term}
                        </Descriptions.Item>
                        <Descriptions.Item label="Location">
                          {item.location}
                        </Descriptions.Item>
                        <Descriptions.Item label="Date Posted">
                          {moment(item.posting_date).format("MMMM Do YYYY")}
                        </Descriptions.Item>
                        <Descriptions.Item label="Description" span={3}>
                          {item.job_descs}
                        </Descriptions.Item>
                        <Descriptions.Item label="Status" span={3}>
                          {item.open_status ? "Open" : "Close"}
                        </Descriptions.Item>
                        <Descriptions.Item label="Last Date to apply" span={3}>
                          {moment(item.posting_expiry_date).format(
                            "MMMM Do YYYY"
                          )}
                        </Descriptions.Item>
                      </Descriptions>
                    </Panel>
                  );
                })}
              </Collapse>
            </Content>
          </Layout>
        </Layout>
      </Layout>
      <Footer />
    </div>
  );
};

export default Index;
