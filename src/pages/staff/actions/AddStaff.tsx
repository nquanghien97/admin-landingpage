import React, { useState } from 'react'
import { useNotification } from '../../../hooks/useNotification';
import { Form, Input, Modal, Image, Button, Select } from 'antd';
import { StaffType } from '../../../entities/Staff';
import { createStaff } from '../../../services/staff';

interface AddStaffProps {
  onClose: () => void;
  open: boolean;
  setRefreshKey: React.Dispatch<React.SetStateAction<boolean>>
}

interface FormValues {
  name: string;
  identifier: number;
  bankName: string;
  bankNumber: string;
  type: StaffType;
}

const typeOptions = [
  {
    label: StaffType.IDENTIFIER,
    value: 'IDENTIFIER'
  },
  {
    label: StaffType.BANK,
    value: 'BANK'
  },
]
function AddStaff(props: AddStaffProps) {
  const { onClose, open, setRefreshKey } = props;
  const [form] = Form.useForm();

  const [file, setFile] = useState<string>()
  const [loading, setLoading] = useState(false)

  const notification = useNotification()

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target || !e.target.files) return;
    const file = e.target.files[0];  // Get the first (and only) file

    const fileReader = new Promise<string>((resolve, reject) => {
      const reader = new FileReader();

      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          resolve(reader.result);
        } else {
          reject(new Error('Failed to read file as string'));
        }
      };

      reader.onerror = () => {
        reject(new Error('Failed to read file'));
      };

      reader.readAsDataURL(file);  // Read the single file as a data URL
    });


    fileReader
      .then(base64String => {
        // Handle the Base64 string, e.g., set it in state or upload to server
        setFile(base64String); // Assuming you want to save the Base64 string in state
      })
      .catch(error => {
        console.error('Error converting file to Base64:', error);
      });
  }

  const type = Form.useWatch('type', form);

  const onFinish = async (data: FormValues) => {
    setLoading(true);
    const dataSubmit = {
      name: data.name,
      identifier: data.identifier ? data.identifier : undefined,
      imageUrl: file,
      bankName: data.bankName ? data.bankName : undefined,
      bankNumber: data.bankNumber ? data.bankNumber : undefined,
      type: data.type
    }
    try {
      await createStaff(dataSubmit)
      notification.success('Thêm nhân viên thành công');
      onClose()
      setRefreshKey(pre => !pre)
    } catch (err) {
      console.log(err)
      notification.error('Thêm nhân viên thất bại')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal
      open={open}
      onCancel={onClose}
      className='!p-0 !w-4/6'
      footer={false}
    >
      <div className="w-full text-center p-3 h-[60px] leading-[36px] bg-[#0071BA] rounded-t-lg uppercase font-bold">Thêm nhân viên</div>
      <div className="p-4">
        <Form form={form} className="flex flex-col gap-6" onFinish={onFinish}>
          <div className="flex items-center h-[40px]">
            <p className="w-[120px] text-left text-[#0071BA]">Tên nhân viên</p>
            <Form.Item
              className="!mb-0 w-full"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Trường này là bắt buộc"
                },
              ]}
            >
              <Input className="py-2" />
            </Form.Item>
          </div>
          <div className="flex items-center h-[40px]">
            <p className="w-[120px] text-left text-[#0071BA]">Loại thông tin</p>
            <Form.Item
              className="!mb-0 w-full"
              name="type"
              rules={[
                {
                  required: true,
                  message: "Trường này là bắt buộc"
                }
              ]}
            >
              <Select
                options={typeOptions}
                className="w-full h-full"
                allowClear
              />
            </Form.Item>
          </div>
          {type === "IDENTIFIER" && (
            <>
              <div className="flex items-center flex-col">
                <div className="flex items-center w-full h-full">
                  <p className="w-[120px] text-left text-[#0071BA]">Hình ảnh</p>
                  <Form.Item
                    className="!mb-0 w-full"
                    name="imageUrl"
                    rules={[
                      {
                        required: true,
                        message: "Trường này là bắt buộc"
                      },
                    ]}
                  >
                    <Input type="file" className="py-2" onChange={onFileChange} />
                  </Form.Item>
                </div>
                {file && (
                  <div className="flex flex-wrap justify-center w-full py-4 gap-4">
                    <Image.PreviewGroup
                    >
                      <Image className="border-2 m-auto cursor-pointer" width={200} src={file} alt="preview avatar" />
                    </Image.PreviewGroup>
                  </div>
                )}
              </div>
              <div className="flex items-center h-[40px]">
                <p className="w-[120px] text-left text-[#0071BA]">SĐT hoặc ID page</p>
                <Form.Item
                  className="!mb-0 w-full"
                  name="identifier"
                >
                  <Input className="py-2" />
                </Form.Item>
              </div>
            </>
          )}
          {type === "BANK" && (
            <>
              <div className="flex items-center h-[40px]">
                <p className="w-[120px] text-left text-[#0071BA]">Số TKNH</p>
                <Form.Item
                  className="!mb-0 w-full"
                  name="bankNumber"
                >
                  <Input className="py-2" />
                </Form.Item>
              </div>
              <div className="flex items-center h-[40px]">
                <p className="w-[120px] text-left text-[#0071BA]">Tên ngân hàng</p>
                <Form.Item
                  className="!mb-0 w-full"
                  name="bankName"
                >
                  <Input className="py-2" />
                </Form.Item>
              </div>
            </>
          )}
          <div className="flex justify-evenly">
            <Button type="primary" danger onClick={onClose}>Hủy</Button>
            <Button type="primary" htmlType="submit" loading={loading}>Xác nhận</Button>
          </div>
        </Form>
      </div>
    </Modal>
  )
}

export default AddStaff