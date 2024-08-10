import { Button, Modal } from "antd";
import { useState } from "react";
import { useNotification } from "../../../hooks/useNotification";
import { deleteFeedback } from "../../../services/feedbacks";

interface DeleteProductProps {
  open: boolean;
  onCancel: () => void;
  id: number;
  setRefreshKey: React.Dispatch<React.SetStateAction<boolean>>
}

function DeleteFeedback(props: DeleteProductProps) {
  const { open, onCancel, id, setRefreshKey } = props

  const [loading, setLoading] = useState(false);

  const notification = useNotification();

  const onSubmit = async () => {
    setLoading(true);
    try {
      await deleteFeedback(id)
      notification.success('Xóa feedback thành công')
      onCancel();
      setRefreshKey(pre => !pre)
    } catch (err) {
      console.log(err)
      notification.error('Xóa feedback thất bại')
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
    <div className="w-full text-center p-3 h-[60px] leading-[36px] bg-[#0071BA] rounded-t-lg uppercase font-bold">{`Bạn muốn xóa feedback này không`}</div>
    <div className="flex justify-center gap-12 p-4">
      <Button type="primary" danger onClick={onCancel}>Hủy</Button>
      <Button type="primary" onClick={onSubmit} loading={loading}>Xác nhận</Button>
    </div>
  </Modal>
  )
}

export default DeleteFeedback