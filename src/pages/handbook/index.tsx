import { TableColumnsType, Image, Button, Table } from 'antd'
import { useEffect, useState } from 'react';
import { HandbookEntity } from '../../entities/Handbook';
import EditIcon from '../../assets/icons/EditIcon';
import CloseIcon from '../../assets/icons/CloseIcon';
import PlusIcon from '../../assets/icons/PlusIcon';
import AddHandbook from './action/AddHandbook';
import UpdateHandbook from './action/UpdateHandbook';
import DeleteHandbook from './action/DeleteHandbook';
import { getHandbooks } from '../../services/handbooks';
import withAuth from '../../hocs/withAuth';

function Handbook() {

  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<HandbookEntity[]>([]);
  const [paging, setPaging] = useState({
    page: 1,
    pageSize: 2,
    total: 10
  })
  const [refreshKey, setRefreshKey] = useState(false);
  const [idHandbook, setIdHandbook] = useState(-1);

  useEffect(() => {
    document.title = "Cẩm nang"
  }, []);

  const columns: TableColumnsType = [
    {
      title: "Tiêu đề",
      dataIndex: 'title',
      key: 1,
      width: 100
    },
    {
      title: "Hình ảnh",
      dataIndex: 'imageUrl',
      key: 2,
      render(value) {
        return (
          <div className="flex flex-wrap justify-center w-full py-4 gap-4">
            <Image.PreviewGroup
            >
              <Image className="border-2 m-auto cursor-pointer" src={`${import.meta.env.VITE_API_URL}${value}`} alt="preview avatar" />
            </Image.PreviewGroup>
          </div>
        )
      },
      width: 200
    },
    {
      title: "Nội dung",
      dataIndex: 'content',
      key: 5,
      render(value) {
        return <div className="px-4" dangerouslySetInnerHTML={{ __html: value }} />
      }
    },
    {
      title: "Thao tác",
      dataIndex: 5,
      width: 100,
      render(_, record) {
        return (
          <div className="flex flex-col justify-between gap-2">
            <div
              className="flex items-center"
              onClick={() => {
                setOpenEditModal(true)
                setIdHandbook(record.id)
              }
              }
            >
              <Button
                className="w-full"
                type="primary"
                icon={<EditIcon width={16} height={16} color="black" />}
              >
                <p className="text-black">Sửa</p>
              </Button>
            </div>
            <div className="flex items-center min-w-[120px]">
              <Button
                icon={<CloseIcon />}
                type="primary"
                danger
                className="w-full"
                onClick={() => {
                  setOpenDeleteModal(true)
                  setIdHandbook(record.id)
                }}
              >      
                <p>Xóa</p>
              </Button>
            </div>
          </div>
        )
      },
    }
  ]

  const fetchData = async ({ page, pageSize } : { page: number, pageSize: number }) => {
    setLoading(true);
    try {
      const res = await getHandbooks({ page, pageSize });
      setData(res.data.data);
      setPaging(res.data.paging)
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    (async () => {
      await fetchData({ page: paging.page, pageSize: paging.pageSize })
    })()
  }, [paging.page, paging.pageSize, refreshKey])

  const onChangePaging = async (page: number, pageSize: number ) => {
    await fetchData({ page: page, pageSize: pageSize })
  }

  return (
    <div className="h-full p-4">
      <div className="flex mb-4">
        <div className="m-auto">
          <span className="px-6 p-2 rounded-full bg-[#0071BA] uppercase font-bold text-2xl">Quản lý Cẩm nang</span>
        </div>
        <div
          className="bg-[#0071ba] rounded-md cursor-pointer h-full px-4 py-2 flex items-center justify-center hover:opacity-80 duration-300 text-white"
          onClick={() => setOpenAddModal(true)}
        >
          Thêm mới
          <PlusIcon color="white" />
        </div>
      </div>
      <Table
        dataSource={data}
        columns={columns}
        rowKey={record => record.id}
        bordered
        loading={loading}
        pagination={{
          total: paging.total,
          pageSize: paging.pageSize,
          onChange: onChangePaging,
          showSizeChanger: true
        }}
      />
      {openAddModal && <AddHandbook open={openAddModal} onClose={() => setOpenAddModal(false)} setRefreshKey={setRefreshKey} />}
      {openEditModal && <UpdateHandbook open={openEditModal} onClose={() => setOpenEditModal(false)} id={idHandbook} setRefreshKey={setRefreshKey} />}
      {openDeleteModal && <DeleteHandbook open={openDeleteModal} onCancel={() => setOpenDeleteModal(false)} id={idHandbook} setRefreshKey={setRefreshKey} />}
    </div>
  )
}

const HandbookWithAuth = withAuth(Handbook)

export default HandbookWithAuth