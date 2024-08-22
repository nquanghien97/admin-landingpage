import { Button, Image, Table, TableColumnsType } from "antd"
import { useEffect, useState } from "react";
import EditIcon from "../../assets/icons/EditIcon";
import CloseIcon from "../../assets/icons/CloseIcon";
import EditProduct from "./actions/EditProduct";
import DeleteProduct from "./actions/DeleteProduct";
import { getProducts } from "../../services/products";
import { ProductEntity } from "../../entities/Products";
import PlusIcon from "../../assets/icons/PlusIcon";
import AddProduct from "./actions/AddProduct";
import withAuth from "../../hocs/withAuth";


function Products() {

  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<ProductEntity[]>([]);
  const [paging, setPaging] = useState({
    page: 1,
    pageSize: 4,
    total: 10
  })
  const [refreshKey, setRefreshKey] = useState(false);
  const [idProduct, setIdProduct] = useState(-1);

  useEffect(() => {
    document.title = "Sản phẩm"
  }, []);

  const columns: TableColumnsType = [
    {
      title: "Tên sản phẩm",
      dataIndex: 'name',
      key: 1,
      width: 200,
    },
    {
      title: "Hình ảnh",
      dataIndex: 'images',
      key: 2,
      render(value: {id: number, imageUrl: string, productId: number }[]) {
        return (
          <div className="flex flex-wrap justify-center w-full py-4 gap-4">
            <Image.PreviewGroup
            >
              {
                value.map((file, index) => (
                  <Image key={index} className="border-2 m-auto cursor-pointer" width={100} height={100} src={`${import.meta.env.VITE_API_URL}${file.imageUrl}`} alt="preview avatar" />
                ))
              }
            </Image.PreviewGroup>
          </div>
        )
      }
    },
    {
      title: "Giá tiền",
      dataIndex: 'price',
      key: 3
    },
    {
      title: "Mô tả",
      dataIndex: 'description',
      key: 4,
      width: 300,
      render(value) {
        return <div dangerouslySetInnerHTML={{ __html: value }} />
      } 
    },
    {
      title: "Mô tả chi tiết",
      dataIndex: 'details',
      key: 5,
      width: 300,
      render(value) {
        return <div dangerouslySetInnerHTML={{ __html: value }} />
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
                setIdProduct(record.id)
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
                  setIdProduct(record.id)
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
      const res = await getProducts({ page, pageSize });
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
      {openAddModal && <AddProduct open={openAddModal} onClose={() => setOpenAddModal(false)} setRefreshKey={setRefreshKey} />}
      {openEditModal && <EditProduct open={openEditModal} onClose={() => setOpenEditModal(false)} id={idProduct} setRefreshKey={setRefreshKey} />}
      {openDeleteModal && <DeleteProduct open={openDeleteModal} onCancel={() => setOpenDeleteModal(false)} id={idProduct} setRefreshKey={setRefreshKey} />}
    </div>
  )
}

const ProductsWithAuth = withAuth(Products)
export default ProductsWithAuth