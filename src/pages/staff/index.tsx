import { useEffect, useState } from 'react'
import PlusIcon from '../../assets/icons/PlusIcon'
import { Button, Table, TableColumnsType, Image } from 'antd'
import EditIcon from '../../assets/icons/EditIcon'
import CloseIcon from '../../assets/icons/CloseIcon'
import { StaffEntity } from '../../entities/Staff'
import { getStaffs } from '../../services/staff'
import AddStaff from './actions/AddStaff'
import DeleteStaff from './actions/DeleteStaff'
import UpdateStaff from './actions/UpdateStaff'

function Staff() {

  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<StaffEntity[]>([]);
  const [paging, setPaging] = useState({
    page: 1,
    pageSize: 4,
    total: 10
  })
  const [refreshKey, setRefreshKey] = useState(false);
  const [idStaff, setIdStaff] = useState(-1)

  const columns: TableColumnsType = [
    {
      title: 'Tên nhân viên',
      key: '1',
      dataIndex: 'name'
    },
    {
      title: 'SĐT hoặc ID page',
      key: '2',
      dataIndex: 'identifier'
    },
    {
      title: 'TKNH',
      key: '3',
      dataIndex: 'bankNumber'
    },
    {
      title: 'Tên ngân hàng',
      key: '3',
      dataIndex: 'bankName'
    },
    {
      title: 'Hình ảnh',
      key: '4',
      dataIndex: 'imageUrl',
      render(value) {
        return (
          value ? (
            <div className="flex flex-wrap justify-center w-full py-4 gap-4">
            <Image.PreviewGroup
            >
              <Image className="border-2 m-auto cursor-pointer" src={value} alt="preview avatar" />
            </Image.PreviewGroup>
          </div>
          ) : (
            <p>Không có hình ảnh</p>
          )
        )
      },
      width: 200
    },
    {
      title: 'Thao tác',
      key: '6',
      render(_, record) {
        return (
          <div className="flex flex-col justify-between gap-2">
            <div
              className="flex items-center"
              onClick={() => {
                setOpenEditModal(true)
                setIdStaff(record.id)
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
                  setIdStaff(record.id)
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
      const res = await getStaffs({ page, pageSize });
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
          <span className="px-6 p-2 rounded-full bg-[#0071BA] uppercase font-bold text-2xl">Quản lý sản phẩm</span>
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
      {openAddModal && <AddStaff open={openAddModal} onClose={() => setOpenAddModal(false)} setRefreshKey={setRefreshKey} />}
      {openEditModal && <UpdateStaff open={openEditModal} onClose={() => setOpenEditModal(false)} id={idStaff} setRefreshKey={setRefreshKey} />}
      {openDeleteModal && <DeleteStaff open={openDeleteModal} onCancel={() => setOpenDeleteModal(false)} id={idStaff} setRefreshKey={setRefreshKey} />}
    </div>
  )
}

export default Staff