/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Button,
  DatePicker,
  Checkbox,
  Slider,
  Select,
  Col,
  Row,
  Typography,
  Card,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import Navbar from "../components/Navbar";
import type { Company } from "../../types";

const { Option } = Select;

const Feed = () => {
  const [questions, setQuestions] = useState<string[]>([""]);
  const [selectedCompany, setSelectedCompany] = useState("");
  const [selectedCompanyName, setSelectedCompanyName] = useState({});
  const [allCompanies, setAllCompanies] = useState<Company[]>([]);

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_BACKEND_URL !== undefined) {
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/companies`)
        .then((res) => res.json())
        .then((data: Company[]) => {
          setAllCompanies(data);
        })
        .then((res) => console.log(res))
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  const onFinish = (values: any) => {
    if (process.env.NEXT_PUBLIC_BACKEND_URL !== undefined) {
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/interviews_add`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...values,
          company_id: selectedCompany,
          comapany_name: selectedCompanyName,
          questions: questions,
        }),
      })
        .then((res) => console.log(res))
        .catch((err) => {
          console.log(err);
        });
    }
    console.log("Received values of form: ", values);
  };

  const onAddQuestion = () => {
    setQuestions((prevQuestions) => [...prevQuestions, ""]);
  };

  const onChangeQuestion = (value: string, index: number) => {
    setQuestions((prevQuestions) => {
      const newQuestions = [...prevQuestions];
      newQuestions[index] = value;
      return newQuestions;
    });
  };

  const handleCompanyChange = (id: string, value: object) => {
    setSelectedCompany(id);
    setSelectedCompanyName(value);
  };

  return (
    <div className="h-screen bg-[url('../../public/images/back.svg')] bg-cover bg-center bg-no-repeat">
      <Navbar />
      <div>
        <Row justify="center" style={{ marginTop: "50px" }}>
          <Col xs={24} sm={24} md={16} lg={14} xl={12}>
            <Card
              cover={
                <Typography.Title
                  level={2}
                  style={{ padding: "20px", marginBottom: "15px" }}
                >
                  Share your Experience
                </Typography.Title>
              }
              type="inner"
              bordered={false}
            >
              <Form name="interview-form" onFinish={onFinish} layout="vertical">
                <Form.Item
                  label="Company Name"
                  name="comapany_name"
                  rules={[
                    { required: true, message: "Please Select a Company!" },
                  ]}
                >
                  <Select
                    placeholder="Select a company"
                    onChange={(id, obj) => handleCompanyChange(id, obj)}
                    value={selectedCompany}
                  >
                    {allCompanies.map((company) => (
                      <Option key={company._id} value={company._id}>
                        {company.company_name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>

                <Form.Item
                  label="Job Title"
                  name="job_title"
                  rules={[
                    { required: true, message: "Please input job title!" },
                  ]}
                >
                  <Input placeholder="Enter job title" />
                </Form.Item>
                <Form.Item
                  label="Date of Interview"
                  name="interview_date"
                  rules={[
                    {
                      required: true,
                      message: "Please select interview date!",
                    },
                  ]}
                >
                  <DatePicker style={{ width: "100%" }} />
                </Form.Item>
                <Form.Item
                  label="Short Description of Interview"
                  name="desc"
                  rules={[
                    { required: true, message: "Please enter description!" },
                  ]}
                >
                  <Input.TextArea
                    placeholder="Enter description"
                    autoSize={{ minRows: 3, maxRows: 5 }}
                  />
                </Form.Item>
                <Form.Item label="Questions asked in Interview" required>
                  {questions.map((question, index) => (
                    <Input
                      key={index}
                      value={question}
                      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                      onChange={(e) => onChangeQuestion(e.target.value, index)}
                      placeholder="Enter question"
                      style={{ marginBottom: 10 }}
                    />
                  ))}
                  <Button
                    type="dashed"
                    icon={<PlusOutlined />}
                    onClick={onAddQuestion}
                    style={{ width: "100%" }}
                  >
                    Add Question
                  </Button>
                </Form.Item>
                <Form.Item
                  label="Job Offer Received"
                  name="job_offer_flag"
                  valuePropName="checked"
                >
                  <Checkbox>Yes</Checkbox>
                </Form.Item>
                <Form.Item
                  label="Rating of Interview (1-10)"
                  name="difficulty_rating"
                  rules={[{ required: true, message: "Please select rating!" }]}
                >
                  <Slider min={1} max={10} marks={{ 1: "1", 10: "10" }} />
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 20, span: 16 }}>
                  <Button type="default" htmlType="submit">
                    Submit
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </Col>
        </Row>
        <div className="form-container"></div>
      </div>
    </div>
  );
};

export default Feed;
