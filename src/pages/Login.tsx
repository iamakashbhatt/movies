// src/pages/Login.tsx
import React, { useState } from "react";
import { Form, Input, Button } from "antd";
import { useNavigate } from "react-router-dom";
import {
  UserOutlined,
  LockOutlined,
  EyeOutlined,
  EyeInvisibleOutlined,
} from "@ant-design/icons";

interface LoginFormValues {
  username: string;
  password: string;
}

const Login: React.FC = () => {
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = (values: LoginFormValues) => {
    const { username, password } = values;
    if (username === "admin" && password === "admin") {
      localStorage.setItem("loginInfo", JSON.stringify(values));
      navigate("/dashboard");
    } else {
      console.log("Login failed");
      form.setFields([
        {
          name: "username",
          errors: username !== "admin" ? ["Incorrect Username!"] : [],
        },
        {
          name: "password",
          errors: password !== "admin" ? ["Incorrect Password!"] : [],
        },
      ]);
    }
  };

  return (
    <div className="wrapper">
      <div className="login-container">
        <h2 className="login-title">Login</h2>
        <Form
          form={form}
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your Username!",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your Password!",
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type={passwordVisible ? "text" : "password"}
              placeholder="Password"
              suffix={
                passwordVisible ? (
                  <EyeOutlined onClick={() => setPasswordVisible(false)} />
                ) : (
                  <EyeInvisibleOutlined
                    onClick={() => setPasswordVisible(true)}
                  />
                )
              }
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Log in
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
