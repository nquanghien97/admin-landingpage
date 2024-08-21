import { Form, Input, Modal, Select, Button } from 'antd'
import { getStaff, updateStaff } from '../../../services/staff';
import { useEffect, useState } from 'react';
import { StaffEntity, StaffType } from '../../../entities/Staff';
import { useNotification } from '../../../hooks/useNotification';

interface UpdateProductProps {
  open: boolean;
  onClose: () => void;
  id: number
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

function UpdateStaff(props: UpdateProductProps) {
  const { onClose, open, id, setRefreshKey } = props
  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false)
  const [dataStaff, setDataStaff] = useState<StaffEntity>()

  const notification = useNotification();

  const type = Form.useWatch('type', form);

  useEffect(() => {
    (async () => {
      const res = await getStaff(id)
      const data = res.data.data as StaffEntity
      setDataStaff(res.data.data)
      form.setFieldsValue({
        name: data.name,
        identifier: data.identifier,
        bankName: data.bankName,
        bankNumber: data.bankNumber,
        type: data.type
      });
    })()
  }, [form, id]);

  const onFinish = async (data: FormValues) => {
    setLoading(true);
    const dataSubmit = {
      name: data.name,
      identifier: data.identifier ? data.identifier : undefined,
      bankName: data.bankName ? data.bankName : undefined,
      bankNumber: data.bankNumber ? data.bankNumber : undefined,
      type: data.type || dataStaff?.type,
      id
    }
    try {
      await updateStaff(dataSubmit)
      notification.success('Thêm cẩm nang thành công')
      onClose();
      setRefreshKey(pre => !pre)
    } catch (err) {
      console.log(err)
      notification.error('Thêm cẩm nang thất bại')
    } finally {
      setLoading(false);
    }
  }

  return (
    <Modal
      open={open}
      onCancel={onClose}
      className='!p-0 !w-4/6 !top-4'
      footer={false}
    >
      <div className="w-full text-center p-3 h-[60px] leading-[36px] bg-[#0071BA] rounded-t-lg uppercase font-bold">Sửa nhân viên</div>
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

export default UpdateStaff