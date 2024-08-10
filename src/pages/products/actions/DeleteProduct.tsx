import { Button, Modal } from 'antd'
import { useState } from 'react';
import { useNotification } from '../../../hooks/useNotification';
import { deleteProduct } from '../../../services/products';

interface DeleteProductProps {
  open: boolean;
  onCancel: () => void;
  id: number;
  setRefreshKey: React.Dispatch<React.SetStateAction<boolean>>
}

function DeleteProduct(props: DeleteProductProps) {
  const { open, onCancel, id, setRefreshKey } = props
  const [loading, setLoading] = useState(false);

  const notification = useNotification();

  const onSubmit = async () => {
    setLoading(true);
    try {
      await deleteProduct(id)
      notification.success('Xóa sản phẩm thành công')
      onCancel();
      setRefreshKey(pre => !pre)
    } catch (err) {
      console.log(err)
      notification.error('Xóa sản phẩm thất bại')
    } finally {
      setLoading(false);
    }
  }

  return (
    <Modal
      open={open}
      className='!p-0 !w-1/2'
      onCancel={onCancel}
      footer={false}
      wrapClassName='!p-0'
    >
      <div className="w-full text-center p-3 h-[60px] leading-[36px] bg-[#0071BA] rounded-t-lg uppercase font-bold">{`Bạn muốn xóa sản phẩm này không`}</div>
      <div className="flex justify-center gap-12 p-4">
        <Button type="primary" danger onClick={onCancel}>Hủy</Button>
        <Button type="primary" onClick={onSubmit} loading={loading}>Xác nhận</Button>
      </div>
    </Modal>
  )
}

export default DeleteProduct