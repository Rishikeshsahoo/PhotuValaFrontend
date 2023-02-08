import React from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Resize, Sort, ContextMenu, Filter, Page, ExcelExport, PdfExport, Edit, Inject,Search,Toolbar } from '@syncfusion/ej2-react-grids';
import { useStateContext} from "../contexts/ContextProvider"
import { ordersData, contextMenuItems, ordersGrid } from '../data/dummy';
import { Header } from '../components';
import { Button } from '@mui/material';
import {  useNavigate } from 'react-router-dom';

const Orders = () => {
  const navigate=useNavigate()
  const {users}=useStateContext();
  let ordersData=[];
  users.forEach((item)=>{
    ordersData.push( 
      {
        ProductImage:(item.files.length>0)?item.files[0].url:"",
        StatusBg:(item.activeStatus)?"#8BE78B":"#FF5C8E",
        TotalImages:item.files.length,
        Shortlisted:item.shortlisted.length,
        Username:item.username,
        viewUser:<Button>View User</Button>,
        changePass:<Button>Change Password</Button>

      }
    )
  })
  
  const editing = { allowDeleting: true, allowEditing: true };
  const handleViewUser=(props)=>{
    console.log("props",props)
    navigate("/AdminApp/AdminImageSection",{state:props.Username})
  }
  const viewUserButton = (props) => (
    <Button onClick={()=>{handleViewUser(props)}}>View User</Button>
  );
  const changePassButton = (props) => (
    <Button onClick={()=>{navigate("/AdminApp/ChangePassword",{state:props.Username})}}>Change</Button>
  );

  const editedImagesButton = (props) => (
    <Button onClick={()=>{navigate("/AdminApp/UploadEdited",{state:props.Username})}}>Upload</Button>
  );

  const viewUserObj= {
    headerText: 'View User',
    template: viewUserButton,
    textAlign: 'Center',
    width: '120',
    field:'viewUser'
  };
  const changePassObj= {
    headerText: 'Change Password',
    template: changePassButton,
    textAlign: 'Center',
    width: '120',
    field:'changePassword'
  };
  const editedImages= {
    headerText: 'Edited Images',
    template: editedImagesButton,
    textAlign: 'Center',
    width: '120',
    field:'editedImages'
  };
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="Users" />
      <GridComponent
        id="gridcomp"
        dataSource={ordersData}
        allowPaging
        allowSorting
        allowExcelExport
        allowPdfExport
        contextMenuItems={contextMenuItems}
        editSettings={editing}
        toolbar={['Search']}
        width="auto"
      >
        <ColumnsDirective>
          {ordersGrid.map((item, index) => <ColumnDirective key={index} {...item} />)}
          <ColumnDirective key={"viewUser"} {...viewUserObj} />
          <ColumnDirective key={"changePass"} {...changePassObj} />
          <ColumnDirective key={"edited Images"} {...editedImages} />

        </ColumnsDirective>
        <Inject services={[Resize, Sort, ContextMenu, Filter, Page, ExcelExport, Edit, PdfExport,Toolbar,Search]} />
      </GridComponent>
    </div>
  );
};
export default Orders;
