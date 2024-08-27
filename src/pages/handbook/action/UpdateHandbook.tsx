import React, { useEffect, useState } from 'react'
import { HandbookEntity } from '../../../entities/Handbook';
import { useNotification } from '../../../hooks/useNotification';
import { getHandbook, updateHandbook } from '../../../services/handbooks';
import { Button, Form, Modal, Image, Input } from 'antd';
import { Editor } from '@tinymce/tinymce-react';

interface EditProductProps {
  open: boolean;
  onClose: () => void;
  id: number
  setRefreshKey: React.Dispatch<React.SetStateAction<boolean>>
}

interface FormValues {
  title: string;
}

function UpdateHandbook(props: EditProductProps) {
  const { open, onClose, id, setRefreshKey } = props;

  const [form] = Form.useForm();

  const [file, setFile] = useState<File>()
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)
  const [dataHandbook, setDataHandbook] = useState<HandbookEntity>()

  const notification = useNotification();

  useEffect(() => {
    (async() => {
      const res = await getHandbook(id)
      const data = res.data.data as HandbookEntity
      setDataHandbook(res.data.data)
      form.setFieldsValue({
        title: data.title,
      });
    })()
  }, [form, id]);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target || !e.target.files) return;
    const newFiles = e.target.files[0]
    try {
      setFile(newFiles)
    } catch(err) {
      console.log(err)
    }
  }

  const onFinish = async (data: FormValues) => {
    setLoading(true);
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('content', content);
    formData.append('file', file!)
    try {
      await updateHandbook(id, formData)
      notification.success('Sửa cẩm nang thành công')
      onClose();
      setRefreshKey(pre => !pre)
    } catch (err) {
      console.log(err)
      notification.error('Sửa cẩm nang thất bại')
    } finally {
      setLoading(false);
    }
  }

  if(!dataHandbook) return <div>Loading...</div>

  return (
    <Modal
      open={open}
      onCancel={onClose}
      className='!p-0 !w-4/6 !top-4'
      footer={false}
    >
      <div className="w-full text-center p-3 h-[60px] leading-[36px] bg-[#0071BA] rounded-t-lg uppercase font-bold">Sửa sản phẩm</div>
      <div className="p-4">
        <Form form={form} className="flex flex-col gap-6" onFinish={onFinish}>
          <div className="flex items-center h-[40px]">
            <p className="w-[120px] text-left text-[#0071BA]">Tiêu đề</p>
            <Form.Item
              className="!mb-0 w-full"
              name="title"
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
          <div className="flex items-center flex-col">
            <div className="flex items-center w-full h-full">
              <p className="w-[120px] text-left text-[#0071BA]">Hình ảnh</p>
              <Form.Item
                className="!mb-0 w-full"
                name="images"
              >
                <Input type="file" className="py-2" onChange={onFileChange} />
              </Form.Item>
            </div>
            {file ? (
              <div className="flex flex-wrap justify-center w-full py-4 gap-4">
                <Image.PreviewGroup
                >
                  <Image className="border-2 m-auto cursor-pointer" width={200} src={URL.createObjectURL(file)} alt="preview avatar" />
                </Image.PreviewGroup>
              </div>
            ) : (
              <div className="flex flex-wrap justify-center w-full py-4 gap-4 eee">
                <Image.PreviewGroup
                >
                  <Image className="border-2 m-auto cursor-pointer" width={200} src={`${import.meta.env.VITE_API_URL}${dataHandbook.imageUrl}`} alt="preview avatar" />
                </Image.PreviewGroup>
              </div>
            )}
          </div>
          <div className="flex items-center">
            <p className="w-[106px] text-left text-[#0071BA]">Nội dung</p>
            <Editor
              apiKey="hkoepxco9p2gme5kius6axtlk3n83yberu5a59m56l7dhgn3"
              value={content}
              onEditorChange={(newContent) => setContent(newContent)}
              init={{
                height: 300,
                width: 1000,
                menubar: false,
                extended_valid_elements: "iframe[src|frameborder|style|scrolling|class|width|height|name|align]",
                valid_elements: '*[*]',
                plugins: [
                  'advlist autolink lists link image charmap print preview anchor',
                  'searchreplace visualblocks code fullscreen',
                  'insertdatetime media paste code help wordcount textcolor',
                  'table',
                  'media',
                  'mediaembed'
                ],
                toolbar:
                  'undo redo | formatselect | bold italic backcolor | ' +
                  'alignleft aligncenter alignright alignjustify | ' +
                  'bullist numlist outdent indent | table | forecolor | removeformat | media',
                setup: (editor) => {
                  editor.on('init', () => {
                    editor.setContent(dataHandbook.content)
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

export default UpdateHandbook