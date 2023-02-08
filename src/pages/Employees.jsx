import React, { useState } from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Resize, Sort, ContextMenu, Filter, Page, ExcelExport, PdfExport, Edit, Inject } from '@syncfusion/ej2-react-grids';
import { useStateContext} from "../contexts/ContextProvider"
import { ordersData, contextMenuItems } from '../data/dummy';
import { Header } from '../components';
import { Switch } from '@mui/material';
import axios from 'axios';



const Employees = () => {
  const {users,toggle,setToggle}=useStateContext();
  const handleChange=(e,username)=>{
    const token = localStorage.getItem("adminToken");
   axios.post("http://localhost:4000/admin/changeactivestatus",{username:username,activeStatus:e.target.checked},
   {
    headers: { Authorization: token }
   })
   .then((response)=>{
    console.log("set toggle run huaa")
    setToggle((prev)=>((prev+1)%2))
   })
  }
  
  const handleChangeStatus=(props)=>{
    return <Switch checked={(props.Status==="Active")?true:false}  
    inputProps={{ 'aria-label': 'controlled' }}
    onChange={(e)=>{handleChange(e,props.Username)}}
    />
  }
  
  const gridOrderImage = (props) => (
    <div>
      <img
        className="rounded-xl h-20 md:ml-3"
        src={props.ProductImage}
        alt="order-item"
      />
    </div>
  );
  const gridOrderStatus = (props) => (
    <button
      type="button"
      style={{ background: props.StatusBg }}
      className="text-white py-1 px-2 capitalize rounded-2xl text-md"
    >
      {props.Status}
    </button>
  );
  
  
const EmployeeGrid = [
    {
      headerText: 'Image',
      template: gridOrderImage,
      textAlign: 'Center',
      width: '120',
    },
    {
      field: 'Username',
      headerText: 'Username',
      width: '150',
      editType: 'dropdownedit',
      textAlign: 'Center',
    },
    
    {
      headerText: 'Status',
      template: gridOrderStatus,
      field: 'OrderItems',
      textAlign: 'Center',
      width: '120',
    },
    {
      headerText: 'Change Status',
      template: handleChangeStatus,
      textAlign: 'Center',
      width: '120'
    }
    
  ];
  
  let ordersData=[];
  users.forEach((item)=>{
    ordersData.push( 
      {
        ProductImage:(item.files.length>0)?item.files[0].url:"https://images.unsplash.com/photo-1598812866501-87ad598839e7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDR8fHxlbnwwfHx8fA%3D%3D&w=1000&q=80",
        StatusBg:(item.activeStatus)?"#8BE78B":"#FF5C8E",
        Status:(item.activeStatus)?"Active":"Deactive",
        TotalImages:item.files.length,
        Shortlisted:item.shortlisted.length,
        Username:item.username,
        _id:item._id
      }
    )
  })
  const editing = { allowDeleting: true, allowEditing: true };
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="Control Panel" />
      {
        <GridComponent
        id="gridcomp"
        dataSource={ordersData}
        allowPaging
        allowSorting
        allowExcelExport
        allowPdfExport
        contextMenuItems={contextMenuItems}
        editSettings={editing}
      >
        <ColumnsDirective>
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          {EmployeeGrid.map((item, index) => <ColumnDirective key={index} {...item} />)}
        </ColumnsDirective>
        <Inject services={[Resize, Sort, ContextMenu, Filter, Page, ExcelExport, Edit, PdfExport]} />
      </GridComponent>
      }
    </div>
  );
};
export default Employees;
