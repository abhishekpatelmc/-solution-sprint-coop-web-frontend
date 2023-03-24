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
  Tabs,
  InputNumber,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import Navbar from "../components/Navbar";
import type { Company } from "../../types";
import { PublicClientApplication } from "@azure/msal-browser";
import { msalConfig } from "../../authConfig";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import type { TabsProps } from "antd";

const { Option } = Select;

const Feed = () => {
  const msalInstance = new PublicClientApplication(msalConfig);

  const router = useRouter();

  const accounts = msalInstance.getAllAccounts();

  const [questions, setQuestions] = useState<string[]>([""]);
  const [pros, setPros] = useState<string[]>([""]);
  const [cons, setCons] = useState<string[]>([""]);
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
          user_id: accounts[0]?.homeAccountId,
          company_id: selectedCompany,
          comapany_name: selectedCompanyName,
          review: {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            desc: values.desc,
            questions: questions,
          },
        }),
      })
        .then((res) => {
          console.log("Form res:", res);
          toast("Your Response was successfull added!!", {
            hideProgressBar: true,
            autoClose: 4000,
            type: "success",
          });
          // eslint-disable-next-line @typescript-eslint/no-floating-promises
          router.push("/");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  const onReviewFinish = (values: any) => {
    if (process.env.NEXT_PUBLIC_BACKEND_URL !== undefined) {
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/critiques_add`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...values,
          user_id: accounts[0]?.homeAccountId,
          company_id: selectedCompany,
          comapany_name: selectedCompanyName,
          review: {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            desc: values.desc,
            cons: cons,
            pros: pros,
          },
        }),
      })
        .then((res) => {
          console.log("Form res:", res);
          toast("Your Response was successfull added!!", {
            hideProgressBar: true,
            autoClose: 4000,
            type: "success",
          });
          // eslint-disable-next-line @typescript-eslint/no-floating-promises
          router.push("/");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const onAddQuestion = () => {
    setQuestions((prevQuestions) => [...prevQuestions, ""]);
  };

  const onAddPros = () => {
    setPros((prevPros) => [...prevPros, ""]);
  };

  const onAddCons = () => {
    setCons((prevCons) => [...prevCons, ""]);
    console.log("Cons");
  };

  const onChangeQuestion = (value: string, index: number) => {
    setQuestions((prevQuestions) => {
      const newQuestions = [...prevQuestions];
      newQuestions[index] = value;
      return newQuestions;
    });
  };

  const onChangePros = (value: string, index: number) => {
    setPros((prevPros) => {
      const newPros = [...prevPros];
      newPros[index] = value;
      return newPros;
    });
  };

  const onChangeCons = (value: string, index: number) => {
    setCons((prevCons) => {
      const newCons = [...prevCons];
      newCons[index] = value;
      return newCons;
    });
  };

  const handleCompanyChange = (id: string, value: object) => {
    setSelectedCompany(id);
    setSelectedCompanyName(value);
  };

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: `Share Your Interview Experience`,
      children: (
        <Card
          cover={
            <Typography.Title
              level={2}
              style={{ padding: "20px", marginBottom: "15px" }}
            >
              Share your Interview Experience
            </Typography.Title>
          }
          type="inner"
          bordered={false}
        >
          <Form name="interview-form" onFinish={onFinish} layout="vertical">
            <Form.Item
              label="Company Name"
              name="comapany_name"
              rules={[{ required: true, message: "Please Select a Company!" }]}
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
              rules={[{ required: true, message: "Please input job title!" }]}
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
              rules={[{ required: true, message: "Please enter description!" }]}
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
              label="Did you have a postive Experience?"
              name="positive_flag"
              valuePropName="checked"
            >
              <Checkbox>Yes</Checkbox>
            </Form.Item>
            <Form.Item
              label="Rating of Interview (1-10)"
              name="difficulty_rating"
              rules={[{ required: true, message: "Please select rating!" }]}
            >
              <Slider min={0} max={10} marks={{ 0: "0", 10: "10" }} />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 20, span: 16 }}>
              <Button type="default" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Card>
      ),
    },
    {
      key: "2",
      label: `Write a Review`,
      children: (
        <Card
          cover={
            <Typography.Title
              level={2}
              style={{ padding: "20px", marginBottom: "15px" }}
            >
              Write a Review
            </Typography.Title>
          }
          type="inner"
          bordered={false}
        >
          <Form name="review-form" onFinish={onReviewFinish} layout="vertical">
            <Form.Item
              label="Company Name"
              name="comapany_name"
              rules={[{ required: true, message: "Please Select a Company!" }]}
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
              rules={[{ required: true, message: "Please input job title!" }]}
            >
              <Input placeholder="Enter job title" />
            </Form.Item>

            <Form.Item
              label="How many month have you worked?"
              name="months_length"
              rules={[{ required: true, message: "Please input job title!" }]}
            >
              <InputNumber
                placeholder="Enter job title"
                min={4}
                max={100}
                defaultValue={4}
              />
            </Form.Item>
            <Form.Item
              label="Write your Review"
              name="desc"
              rules={[{ required: true, message: "Please enter description!" }]}
            >
              <Input.TextArea
                placeholder="Enter description"
                autoSize={{ minRows: 3, maxRows: 5 }}
              />
            </Form.Item>
            <Form.Item label="Pros" required>
              {pros.map((pros, index) => (
                <Input
                  key={index}
                  value={pros}
                  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                  onChange={(e) => onChangePros(e.target.value, index)}
                  placeholder="Enter Pros"
                  style={{ marginBottom: 10 }}
                />
              ))}
              <Button
                type="dashed"
                icon={<PlusOutlined />}
                onClick={onAddPros}
                style={{ width: "100%" }}
              >
                Add Pros
              </Button>
            </Form.Item>
            <Form.Item label="Cons" required>
              {cons.map((cons, index) => (
                <Input
                  key={index}
                  value={cons}
                  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                  onChange={(e) => onChangeCons(e.target.value, index)}
                  placeholder="Enter Cons"
                  style={{ marginBottom: 10 }}
                />
              ))}
              <Button
                type="dashed"
                icon={<PlusOutlined />}
                onClick={onAddCons}
                style={{ width: "100%" }}
              >
                Add Cons
              </Button>
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 20, span: 16 }}>
              <Button type="default" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Card>
      ),
    },
  ];

  const onChange = (key: string) => {
    console.log(key);
  };

  return (
    <div className="h-screen bg-[url('../../public/images/back.svg')] bg-cover bg-center bg-no-repeat">
      <Navbar />
      <div>
        <Row justify="center" style={{ marginTop: "50px" }}>
          <Col xs={24} sm={24} md={16} lg={14} xl={12}>
            <Tabs
              defaultActiveKey="1"
              items={items}
              onChange={onChange}
              style={{
                backgroundColor: "white",
                borderRadius: "10px",
                padding: "40px",
                borderWidth: "1px",
              }}
            />
          </Col>
        </Row>
        <div className="form-container"></div>
      </div>
    </div>
  );
};

export default Feed;
