import { Button, Form, Input } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { useNavigate } from 'react-router-dom';
import withAuth from '../hocs/withAuth';
import { useEffect, useState } from 'react';
import { useNotification } from '../hooks/useNotification';
import { login } from "../services/auth";

interface FormValue {
  username: string;
  password: string;
}

function Login() {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm<FormValue>()
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Đăng nhập"
  }, []);

  const notification = useNotification();
  const onSubmit = async (formValue: FormValue) => {
    setLoading(true)
    try {
      const res = await login(formValue);
      notification.success("Đăng nhập thành công")
      const { data } = res
      localStorage.setItem('token', data.accessToken)
      navigate('/')
    } catch (err) {
      console.log(err)
      notification.error("Đăng nhập không thành công")
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div className="bg-[url('./assets/background-login.jpg')] bg-no-repeat bg-auto w-screen h-screen bg-center flex items-center justify-center">
        <div className="md:w-6/12 bg-white opacity-80 rounded-md p-8">
          <div className="text-[#0071BA] uppercase text-3xl font-bold py-8 text-center">
            <p>Đăng nhập</p>
          </div>
          <Form
            form={form}
            className="flex flex-col"
            onFinish={onSubmit}
          >
            <Form.Item
              className="!mb-0 py-2"
              name="username"
              rules={[
                {
                  required: true,
                  message: "Trường này là bắt buộc"
                }
              ]}
              >
                <Input
                    placeholder="Tên đăng nhập"
                    size="large"
                  />
            </Form.Item>
            <Form.Item
              className="!mb-0 py-2"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Trường này là bắt buộc"
                }
              ]}
              >
                <Input.Password
                  placeholder="Mật khẩu"
                  size="large"
                  iconRender={
                    (visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)
                  }
                />
            </Form.Item>
            
            <div className="flex justify-center my-4">
              <Button
                color="info"
                className="text-white" style={{outline: 'none'}}
                htmlType="submit"
                type="primary"
                loading={loading}
              >
                Đăng nhập
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </>
  )
}

const LoginWithAuth =  withAuth(Login, false);

export default LoginWithAuth;