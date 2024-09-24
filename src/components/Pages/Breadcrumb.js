// Breadcrumbs.js
import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from 'react-router-dom';
import {  getAllLead } from "../../features/leadSlice";
const Breadcrumb = () => {
  const dispatch = useDispatch();

  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);
  const { lead ,loading } = useSelector((state) => state.lead);
  const { agent  } = useSelector((state) => state.agent);
  const capitalizeFirstLetter = (str) => {
    return str
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };
  
  const capitalizeFirstLetter1 = (str) => {
    const foundObject = agent?.agent?.find((obj) => obj._id === str);
      return foundObject?.agent_name
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };
  const capitalizeFirstLetter2 = (str) => {
    if(str!=='followupleads'){
       const foundObject = lead?.lead?.find((obj) => obj._id === str);
      return foundObject?.full_name
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    }
  
   
  };



  return (
    <div>
      <Link to="/">Dashboard /</Link>
       {pathnames['0']=='call_log_details'?<> {pathnames.map((name, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;
        return isLast ? (
          <span key={name}>
          {capitalizeFirstLetter1(name)}
            </span>
        ) : (
          <span key={name}>
            <Link to={routeTo}> {capitalizeFirstLetter(name)}</Link> /&nbsp;
          </span>
        );
      })}</>:pathnames['0']=='followupleads'?<>{pathnames.map((name, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;
        return isLast ? (
          <span key={name}>
          {capitalizeFirstLetter2(name)}
            </span>
        ) : (
          <span key={name}>
            <Link to={routeTo}> {capitalizeFirstLetter(name)}</Link> /&nbsp;
          </span>
        );
      })}</>:<>{pathnames.map((name, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;
        return isLast ? (
          <span key={name}>
          {capitalizeFirstLetter(name)}
            </span>
        ) : (
          <span key={name}>
            <Link to={routeTo}> {capitalizeFirstLetter(name)}</Link> /&nbsp;
          </span>
        );
      })}</>}
     
    </div>
  );
};

export default Breadcrumb;
