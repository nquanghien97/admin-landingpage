import { Editor } from "@tinymce/tinymce-react";
import { Form, Input, Modal, Image, Button } from "antd";
import { useEffect, useState } from "react";
import { ProductEntity } from "../../../entities/Products";
import { getProduct, updateProduct } from "../../../services/products";
import { useNotification } from "../../../hooks/useNotification";

interface EditProductProps {
  open: boolean;
  onClose: () => void;
  id: number
  setRefreshKey: React.Dispatch<React.SetStateAction<boolean>>
}

interface FormValues {
  name: string;
  price: number;
  discountPrice: number;
}

function EditProduct(props: EditProductProps) {
  const { onClose, open, id, setRefreshKey } = props;
  const [form] = Form.useForm();

  const [files, setFiles] = useState<File[]>([])
  const [description, setDescription] = useState('')
  const [details, setDetails] = useState('')
  const [loading, setLoading] = useState(false)
  const [dataProduct, setDataProduct] = useState<ProductEntity>()

  const notification = useNotification();

  useEffect(() => {
    (async() => {
      const res = await getProduct(id)
      const data = res.data.data as ProductEntity
      setDataProduct(res.data.data)
      form.setFieldsValue({
        name: data.name,
        price: data.price,
        discountPrice: data.discountPrice
      });
    })()
  }, [form, id])

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target || !e.target.files) return;
    const newFiles = Array.from(e.target.files)
    try {
      setFiles(newFiles)
    } catch(err) {
      console.log(err)
    }
  }

  const onFinish = async (data: FormValues) => {
    setLoading(true);
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('price', data.price.toString());
    formData.append('discountPrice', data.discountPrice.toString());
    formData.append('description', description);
    formData.append('details', details);
    files.forEach(file => formData.append('file', file))
    try {
      await updateProduct(id, formData)
      onClose()
      setRefreshKey(pre => !pre)
      notification.success('Chỉnh sửa sản phẩm thành công');
    } catch (err) {
      console.log(err)
      notification.error('Chỉnh sửa sản phẩm thất bại')
    } finally {
      setLoading(false)
    }
  }

  if(!dataProduct) return <div>Loading...</div>

  return (
    <Modal
      open={open}
      onCancel={onClose}
      className='!p-0 !w-4/6 !top-4'
      footer={false}
    >
      <div className="w-full text-center p-3 h-[60px] leading-[36px] bg-[#0071BA] rounded-t-lg uppercase font-bold">Thêm sản phẩm</div>
      <div className="p-4">
        <Form form={form} className="flex flex-col gap-6" onFinish={onFinish}>
          <div className="flex items-center h-[40px]">
            <p className="w-[120px] text-left text-[#0071BA]">Tên sản phẩm</p>
            <Form.Item
              className="!mb-0 w-full"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Trường này là bắt buộc"
                },
              ]}
              initialValue={dataProduct?.name}
            >
              <Input className="py-2" />
            </Form.Item>
          </div>
          <div className="flex items-center flex-col">
            <div className="flex items-center w-full h-full">
              <p className="w-[120px] text-left text-[#0071BA]">Hình ảnh</p>
              <Form.Item
                className="!mb-0 w-full"
                name="images"
              >
                <Input multiple type="file" className="py-2" onChange={onFileChange} />
              </Form.Item>
            </div>
            {files.length !== 0 ? (
              <div className="flex flex-wrap justify-center w-full py-4 gap-4">
                <Image.PreviewGroup
                >
                  {
                    files.map((file, index) => (
                      <Image key={index} className="border-2 m-auto cursor-pointer" width={100} height={100} src={URL.createObjectURL(file)} alt="preview avatar" />
                    ))
                  }
                </Image.PreviewGroup>
              </div>
            ) : (
              <div className="flex flex-wrap justify-center w-full py-4 gap-4 eee">
                <Image.PreviewGroup
                >
                  {
                    dataProduct?.images.map((file, index) => (
                      <Image key={index} className="border-2 m-auto cursor-pointer" width={100} height={100} src={`${import.meta.env.VITE_API_URL}${file.imageUrl}`} alt="preview avatar" />
                    ))
                  }
                </Image.PreviewGroup>
              </div>
            )}
          </div>
          <div className="flex items-center h-[40px]">
            <p className="w-[120px] text-left text-[#0071BA]">Giá tiền</p>
            <Form.Item
              className="!mb-0 w-full"
              name="price"
              rules={[
                {
                  required: true,
                  message: "Trường này là bắt buộc"
                },
                () => ({
                  validator(_, value) {
                    if (!value) {
                      return Promise.reject();
                    }
                    if (isNaN(value)) {
                      return Promise.reject("Số phải là số");
                    }
                    return Promise.resolve();
                  },
                }),
              ]}
              initialValue={dataProduct?.price}
            >
              <Input className="py-2" />
            </Form.Item>
          </div>
          <div className="flex items-center h-[40px]">
            <p className="w-[120px] text-left text-[#0071BA]">Giá tiền giảm giá</p>
            <Form.Item
              className="!mb-0 w-full"
              name="discountPrice"
              rules={[
                {
                  required: true,
                  message: "Trường này là bắt buộc"
                },
                () => ({
                  validator(_, value) {
                    if (!value) {
                      return Promise.reject();
                    }
                    if (isNaN(value)) {
                      return Promise.reject("Số phải là số");
                    }
                    return Promise.resolve();
                  },
                }),
              ]}
              initialValue={dataProduct?.price}
            >
              <Input className="py-2" />
            </Form.Item>
          </div>
          <div className="flex items-center">
            <p className="w-[106px] text-left text-[#0071BA]">Mô tả</p>
            <Editor
              apiKey="hkoepxco9p2gme5kius6axtlk3n83yberu5a59m56l7dhgn3"
              value={description}
              onEditorChange={(newContent) => setDescription(newContent)}
              init={{
                height: 300,
                width: 1000,
                menubar: false,
                extended_valid_elements : "iframe[src|frameborder|style|scrolling|class|width|height|name|align]",
                valid_elements: '*[*]',
                plugins: [
                  'advlist autolink lists link image charmap print preview anchor',
                  'searchreplace visualblocks code fullscreen',
                  'insertdatetime media paste code help wordcount textcolor',
                  'table',
                  'media'
                ],
                toolbar:
                  'undo redo | formatselect | bold italic backcolor | ' +
                  'alignleft aligncenter alignright alignjustify | ' +
                  'bullist numlist outdent indent | table | forecolor | removeformat | media',
                setup: (editor) => {
                  editor.on('init', () => {
                    editor.setContent(dataProduct.description)
                  })
                }
              }}
            />
          </div>
          <div className="flex items-center">
            <p className="w-[106px] text-left text-[#0071BA]">Mô tả chi tiết</p>
            <Editor
              apiKey="hkoepxco9p2gme5kius6axtlk3n83yberu5a59m56l7dhgn3"
              value={details}
              onEditorChange={(newContent) => setDetails(newContent)}
              init={{
                height: 300,
                width: 1000,
                menubar: false,
                plugins: [
                  'advlist autolink lists link image charmap print preview anchor',
                  'searchreplace visualblocks code fullscreen',
                  'insertdatetime media paste code help wordcount textcolor',
                  'table',
                  'media'
                ],
                toolbar:
                'undo redo | formatselect | bold italic backcolor | ' +
                'alignleft aligncenter alignright alignjustify | ' +
                'bullist numlist outdent indent | table | forecolor | removeformat | media',
                setup: (editor) => {
                  editor.on('init', () => {
                    editor.setContent(dataProduct.details)
                  })
                }
              }}
            />
          </div>
          <div className="flex justify-evenly">
            <Button type="primary" danger onClick={onClose}>Hủy</Button>
            <Button type="primary" htmlType="submit" loading={loading}>Xác nhận</Button>
          </div>
        </Form>
      </div>
    </Modal>
  )
}

export default EditProduct