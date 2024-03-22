'use client'

import React from "react";
import {
  Typography,
  Card,
  CardHeader,
  CardBody,
  IconButton,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Tooltip,
  Progress,
  CardFooter,
  Button,
} from "@material-tailwind/react";
import {
  EllipsisVerticalIcon,
  ArrowUpIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";

import { CheckCircleIcon, ClockIcon, DocumentArrowUpIcon, DocumentDuplicateIcon, DocumentMinusIcon, DocumentPlusIcon, DocumentTextIcon, UserGroupIcon, UserPlusIcon } from "@heroicons/react/24/solid";


export function ODADashboardHome() {

  const date=new Date()

  return (
    <div className="col-md-12 bg-white max-h-screen">

      <div className='mt-3'>
        <Typography variant="h4" className="mb-2 text-start text-primary ms-4 me-1">
          Members Dashboard
        </Typography>
        <hr />
      </div>
      <div className="mb-5 flex flex-wrap gap-5 justify-center mt-3 ms-1 me-1">
        <Card className="col-md-4 h-50 bg-secondary pointer-events-auto">
          <CardHeader
            variant="gradient"
            // color={color}
            floated={false}
            shadow={true}
            className="absolute"
          >
          {React.createElement(UserGroupIcon, {
                className: "w-6 h-6 text-dark",
              })}
          </CardHeader>
          <CardBody className='text-light mt-4 '>
            <Typography variant="h4" className="mb-2 text-start text-warning">
              Available Members
            </Typography>
            <Typography className="mb-0 text-start mt-3 fs-5">
              0
            </Typography>
            <div className="mb-0 flex justify-end mt-1 col-md-12">
            <Typography as='a' href='/lmacm/src/oda/members/available-members' className="btn btn-dark">
              View
            </Typography>
            </div>
          </CardBody>
          {/* <CardFooter className="">
            <Button>View</Button>
          </CardFooter> */}
        </Card>

        <Card className=" col-md-4 h-50 bg-secondary pointer-events-auto">
          <CardHeader
            variant="gradient"
            // color={color}
            floated={false}
            shadow={true}
            className="absolute"
          >
          {React.createElement(UserPlusIcon, {
                className: "w-6 h-6 text-dark",
              })}
          </CardHeader>
          <CardBody className='text-light mt-4 '>
            <Typography variant="h4" className="mb-2 text-start text-warning">
              {date.getFullYear()} Registered Members
            </Typography>
            <Typography className="mb-0 text-start mt-3 fs-5">
              0
            </Typography>
            <div className="mb-0 flex justify-end mt-1 col-md-12">
            <Typography as='a' href='/lmacm/src/oda/members/registered-members' className="btn btn-dark">
              View
            </Typography>
            </div>
          </CardBody>
          {/* <CardFooter className="">
            <Button>View</Button>
          </CardFooter> */}
        </Card>

        <Card className=" col-md-4 h-50 bg-secondary pointer-events-auto">
          <CardHeader
            variant="gradient"
            // color={color}
            floated={false}
            shadow={true}
            className="absolute"
          >
          {React.createElement(UserCircleIcon, {
                className: "w-6 h-6 text-dark",
              })}
          </CardHeader>
          <CardBody className='text-light mt-4 '>
            <Typography variant="h4" className="mb-2 text-start text-warning">
            {date.getFullYear()} Deacon Members
            </Typography>
            <Typography className="mb-0 text-start mt-3 fs-5">
              0
            </Typography>
            <div className="mb-0 flex justify-end mt-1 col-md-12">
            <Typography as='a' href='/lmacm/src/oda/members/deacon-members' className="btn btn-dark">
              View
            </Typography>
            </div>
          </CardBody>
          {/* <CardFooter className="">
            <Button>View</Button>
          </CardFooter> */}
        </Card>

        <Card className=" col-md-4 h-50 bg-secondary pointer-events-auto">
          <CardHeader
            variant="gradient"
            // color={color}
            floated={false}
            shadow={true}
            className="absolute"
          >
          {React.createElement(UserCircleIcon, {
                className: "w-6 h-6 text-dark",
              })}
          </CardHeader>
          <CardBody className='text-light mt-4 '>
            <Typography variant="h4" className="mb-2 text-start text-warning">
            {date.getFullYear()} Acolyte Members
            </Typography>
            <Typography className="mb-0 text-start mt-3 fs-5">
              0
            </Typography>
            <div className="mb-0 flex justify-end mt-1 col-md-12">
            <Typography as='a' href='/lmacm/src/oda/members/acolyte-members' className="btn btn-dark">
              View
            </Typography>
            </div>
          </CardBody>
          {/* <CardFooter className="">
            <Button>View</Button>
          </CardFooter> */}
        </Card>
    
      </div>

      <div className='mt-3'>
        <Typography variant="h4" className="mb-2 text-start text-primary ms-4 me-1">
          Project Dashboard
        </Typography>
        <hr />
      </div>
      <div className="mb-5 flex flex-wrap gap-5 justify-center mt-3 ms-1 me-1">
        <Card className=" col-md-3 h-50 bg-secondary pointer-events-auto">
          <CardHeader
            variant="gradient"
            // color={color}
            floated={false}
            shadow={true}
            className="absolute"
          >
          {React.createElement(DocumentDuplicateIcon, {
                className: "w-6 h-6 text-dark",
              })}
          </CardHeader>
          <CardBody className='text-light mt-4 '>
            <Typography variant="h4" className="mb-2 text-start text-warning">
              Available Projects
            </Typography>
            <Typography className="mb-0 text-start mt-3 fs-5">
              0
            </Typography>
            <div className="mb-0 flex justify-end mt-1 col-md-12">
            <Typography as='a' href='/lmacm/src/oda/projects/available-projects' className="btn btn-dark">
              View
            </Typography>
            </div>
          </CardBody>
          {/* <CardFooter className="">
            <Button>View</Button>
          </CardFooter> */}
        </Card>

        <Card className=" col-md-3 h-50 bg-secondary pointer-events-auto">
          <CardHeader
            variant="gradient"
            // color={color}
            floated={false}
            shadow={true}
            className="absolute"
          >
          {React.createElement(DocumentArrowUpIcon, {
                className: "w-6 h-6 text-dark",
              })}
          </CardHeader>
          <CardBody className='text-light mt-4 '>
            <Typography variant="h4" className="mb-2 text-start text-warning">
              Ongoing Projects
            </Typography>
            <Typography className="mb-0 text-start mt-3 fs-5">
              0
            </Typography>
            <div className="mb-0 flex justify-end mt-1 col-md-12">
            <Typography as='a' href='/lmacm/src/oda/projects/ongoing-projects' className="btn btn-dark">
              View
            </Typography>
            </div>
          </CardBody>
          {/* <CardFooter className="">
            <Button>View</Button>
          </CardFooter> */}
        </Card>

        <Card className=" col-md-3 h-50 bg-secondary pointer-events-auto">
          <CardHeader
            variant="gradient"
            // color={color}
            floated={false}
            shadow={true}
            className="absolute"
          >
          {React.createElement(DocumentTextIcon, {
                className: "w-6 h-6 text-dark",
              })}
          </CardHeader>
          <CardBody className='text-light mt-4 '>
            <Typography variant="h4" className="mb-2 text-start text-warning">
              Completed Projects
            </Typography>
            <Typography className="mb-0 text-start mt-3 fs-5">
              0
            </Typography>
            <div className="mb-0 flex justify-end mt-1 col-md-12">
            <Typography as='a' href='/lmacm/src/oda/projects/completed-projects' className="btn btn-dark">
              View
            </Typography>
            </div>
          </CardBody>
          {/* <CardFooter className="">
            <Button>View</Button>
          </CardFooter> */}
        </Card>

        <Card className=" col-md-3 h-50 bg-secondary pointer-events-auto">
          <CardHeader
            variant="gradient"
            // color={color}
            floated={false}
            shadow={true}
            className="absolute"
          >
          {React.createElement(DocumentMinusIcon, {
                className: "w-6 h-6 text-dark",
              })}
          </CardHeader>
          <CardBody className='text-light mt-4 '>
            <Typography variant="h4" className="mb-2 text-start text-warning">
              Pending Projects
            </Typography>
            <Typography className="mb-0 text-start mt-3 fs-5">
              0
            </Typography>
            <div className="mb-0 flex justify-end mt-1 col-md-12">
            <Typography as='a' href='/lmacm/src/oda/projects/pending-projects' className="btn btn-dark">
              View
            </Typography>
            </div>
          </CardBody>
          {/* <CardFooter className="">
            <Button>View</Button>
          </CardFooter> */}
        </Card>

        <Card className=" col-md-3 h-50 bg-secondary pointer-events-auto">
          <CardHeader
            variant="gradient"
            // color={color}
            floated={false}
            shadow={true}
            className="absolute"
          >
          {React.createElement(DocumentPlusIcon, {
                className: "w-6 h-6 text-dark",
              })}
          </CardHeader>
          <CardBody className='text-light mt-4 '>
            <Typography variant="h4" className="mb-2 text-start text-warning">
              Future Projects
            </Typography>
            <Typography className="mb-0 text-start mt-3 fs-5">
              0
            </Typography>
            <div className="mb-0 flex justify-end mt-1 col-md-12">
            <Typography as='a' href='/lmacm/src/oda/projects/future-projects' className="btn btn-dark">
              View
            </Typography>
            </div>
            
          </CardBody>
          {/* <CardFooter className="">
            <Button>View</Button>
          </CardFooter> */}
        </Card>
    
      </div>

      <div className='mt-3'>
        <Typography variant="h4" className="mb-2 flex gap-2 text-start text-primary ms-4 me-1">
          {date.getFullYear()} Contribution Dashboard
        </Typography>
        <hr />
      </div>
      <div className="mb-5 flex flex-wrap gap-5 justify-center mt-3 ms-1 me-1">
        <Card className=" col-md-3 h-50 bg-secondary pointer-events-auto">
          <CardHeader
            variant="gradient"
            // color={color}
            floated={false}
            shadow={true}
            className="absolute"
          >
          {React.createElement(DocumentDuplicateIcon, {
                className: "w-6 h-6 text-dark",
              })}
          </CardHeader>
          <CardBody className='text-light mt-4 '>
            <Typography variant="h4" className="mb-2 text-start text-warning">
              Available Contributions
            </Typography>
            <Typography className="mb-0 text-start mt-3 fs-5">
              0
            </Typography>
            <div className="mb-0 flex justify-end mt-1 col-md-12">
            <Typography as='a' href='/lmacm/src/oda/contributions/available-contributions' className="btn btn-dark">
              View
            </Typography>
            </div>
          </CardBody>
          {/* <CardFooter className="">
            <Button>View</Button>
          </CardFooter> */}
        </Card>

        <Card className=" col-md-3 h-50 bg-secondary pointer-events-auto">
          <CardHeader
            variant="gradient"
            // color={color}
            floated={false}
            shadow={true}
            className="absolute"
          >
          {React.createElement(DocumentArrowUpIcon, {
                className: "w-6 h-6 text-dark",
              })}
          </CardHeader>
          <CardBody className='text-light mt-4 '>
            <Typography variant="h4" className="mb-2 text-start text-warning">
              Ongoing Contributions
            </Typography>
            <Typography className="mb-0 text-start mt-3 fs-5">
              0
            </Typography>
            <div className="mb-0 flex justify-end mt-1 col-md-12">
            <Typography as='a' href='/lmacm/src/oda/contributions/ongoing-contributions' className="btn btn-dark">
              View
            </Typography>
            </div>
          </CardBody>
          {/* <CardFooter className="">
            <Button>View</Button>
          </CardFooter> */}
        </Card>
    
      </div>
      
    </div>
  );
}

export default ODADashboardHome;